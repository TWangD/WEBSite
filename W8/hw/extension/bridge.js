(() => {
  const commands = new Set([
    "list",
    "status",
    "toggle",
    "next",
    "previous",
    "volume"
  ]);

  const isYouTubeMusic =
    location.origin === "https://music.youtube.com";

  // ---------- Local controller page ----------

  if (!isYouTubeMusic) {
    window.addEventListener("message", async event => {
      if (
        event.source !== window ||
        event.origin !== location.origin ||
        event.data?.source !== "gesture-music-page"
      ) {
        return;
      }

      const { id, command, tabId, value } = event.data;

      if (!Number.isSafeInteger(id) || !commands.has(command)) {
        return;
      }

      try {
        const response = await chrome.runtime.sendMessage({
          command,
          tabId,
          value
        });

        window.postMessage({
          source: "gesture-music-extension",
          id,
          ...response
        }, location.origin);
      } catch {
        window.postMessage({
          source: "gesture-music-extension",
          id,
          error: "Extension disconnected. Refresh both tabs."
        }, location.origin);
      }
    });

    return;
  }

  // ---------- YouTube Music page ----------

  function getVideo() {
    const video = document.querySelector("video");

    if (!video) {
      throw new Error(
        "Choose a song and play it once in YouTube Music."
      );
    }

    return video;
  }

  function readState() {
    const video = getVideo();

    return {
      paused: video.paused,
      volume: video.muted ? 0 : video.volume,
      title:
        document.querySelector("ytmusic-player-bar .title")
          ?.textContent?.trim() || document.title,
      artist:
        document.querySelector("ytmusic-player-bar .byline")
          ?.textContent?.trim() || ""
    };
  }

  chrome.runtime.onMessage.addListener((message, sender, reply) => {
    if (sender.id !== chrome.runtime.id) return;

    (async () => {
      const video = getVideo();

      switch (message.command) {
        case "status":
          break;

        case "toggle": {
          const button = document.querySelector(
            "ytmusic-player-bar #play-pause-button"
          );

          if (button) {
            button.click();
          } else if (video.paused) {
            await video.play();
          } else {
            video.pause();
          }

          break;
        }

        case "next":
        case "previous": {
          const button = document.querySelector(
            `ytmusic-player-bar .${message.command}-button`
          );

          if (
            !button ||
            button.disabled ||
            button.getAttribute("aria-disabled") === "true"
          ) {
            throw new Error(
              "Track control unavailable. Start a playlist or queue."
            );
          }

          button.click();
          break;
        }

        case "volume":
          if (
            !Number.isFinite(message.value) ||
            message.value < 0 ||
            message.value > 1
          ) {
            throw new Error("Invalid volume.");
          }

          video.volume = message.value;
          video.muted = message.value === 0;
          break;

        default:
          throw new Error("Unsupported player command.");
      }

      // Allow the player's UI to react before reading its state.
      if (message.command !== "status") {
        await new Promise(resolve => setTimeout(resolve, 200));
      }

      return readState();
    })()
      .then(result => reply({ result }))
      .catch(error => reply({ error: error.message }));

    return true;
  });
})();