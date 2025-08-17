const express = require("express");
const cors = require("cors");
const { YoutubeTranscript } = require("youtube-transcript");

const app = express();
app.use(cors({ origin: "http://localhost:8080" }));

app.get("/api/transcript/:videoId", async (req, res) => {
  try {
    const videoId = req.params.videoId;
    const transcriptArr = await YoutubeTranscript.fetchTranscript(videoId, {
      lang: "en",
    });
    const transcript = transcriptArr.map((t) => t.text).join(" ");
    res.json({ transcript });
  } catch (err) {
    console.error("Transcript Fetch Failed:", err);
    res.status(500).json({ error: "Failed to Fetch Transcript" });
  }
});

app.listen(5000, () => console.log("Server Running on http://localhost:5000"));
