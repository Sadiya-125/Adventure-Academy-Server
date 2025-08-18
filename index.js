const express = require("express");
const cors = require("cors");
const { YoutubeTranscript } = require("youtube-transcript");

const app = express();
app.use(cors({ origin: "*" }));

app.get("/api/transcript/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const transcriptArr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
    });
    const transcript = transcriptArr.map((t) => t.text).join(" ");
    res.json({ transcript });
  } catch (err) {
    console.error("Transcript Fetch Failed:", err.message);

    if (err.message.includes("Transcript is disabled")) {
      return res
        .status(404)
        .json({ error: "Transcript Not Available for this Video." });
    }

    if (err.message.includes("Video unavailable")) {
      return res.status(404).json({ error: "Video Unavailable or Private." });
    }

    res.status(500).json({ error: "Server Error Fetching Transcript." });
  }
});

app.listen(5000, () => console.log("Server Running on http://localhost:5000"));
