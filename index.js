const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "*" }));
app.use(express.json());

app.get("/api/transcript/:videoId", async (req, res) => {
  try {
    const { videoId } = req.params;
    const url = `https://deserving-harmony-9f5ca04daf.strapiapp.com/utilai/yt-transcript/${videoId}`;

    const response = await fetch(url);

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Transcript Fetch Failed with ${response.status}` });
    }

    const transcriptData = await response.text();

    if (!transcriptData || transcriptData.length === 0) {
      return res.status(404).json({ error: "Transcript Not Available" });
    }

    res.json({
      videoId,
      transcript: transcriptData,
    });
  } catch (err) {
    console.error("Transcript Fetch Failed:", err);
    res.status(500).json({ error: "Failed to Fetch Transcript" });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
