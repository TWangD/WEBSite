const commands = new Set([
  "list",
  "status",
  "toggle",
  "next",
  "previous",
  "volume"
]);

function isLocalController(url) {
  try {
    const parsed = new URL(url);

    return (
      parsed.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(parsed.hostname)
    );
  } catch {
    return false;
  }
}

chrome.runtime.onMessage.addListener((message, sender, reply) => {
  if (
    sender.id !== chrome.runtime.id ||
    !isLocalController(sender.url)
  ) {
    return;
  }

  (async () => {
    const { command, tabId, value } = message;

    if (!commands.has(command)) {
      throw new Error("Unsupported command.");
    }

    if (command === "list") {
      const tabs = await chrome.tabs.query({
        url: "https://music.youtube.com/*"
      });

      return tabs.map(tab => ({
        id: tab.id,
        title: tab.title
      }));
    }

    if (!Number.isInteger(tabId)) {
      throw new Error("Select a YouTube Music tab.");
    }

    if (
      command === "volume" &&
      (!Number.isFinite(value) || value < 0 || value > 1)
    ) {
      throw new Error("Invalid volume.");
    }

    const tab = await chrome.tabs.get(tabId);

    if (
      !tab.url ||
      new URL(tab.url).origin !== "https://music.youtube.com"
    ) {
      throw new Error("The selected tab is no longer YouTube Music.");
    }

    let response;

    try {
      response = await chrome.tabs.sendMessage(tabId, {
        command,
        value
      });
    } catch {
      throw new Error(
        "Refresh your YouTube Music tab, then reconnect."
      );
    }

    if (!response) {
      throw new Error("YouTube Music did not respond.");
    }

    if (response.error) {
      throw new Error(response.error);
    }

    return response.result;
  })()
    .then(result => reply({ result }))
    .catch(error => reply({ error: error.message }));

  return true;
});