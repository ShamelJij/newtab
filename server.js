import express from "express";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

// Endpoint to get RSS feed data
app.get("/api/rss", async (req, res) => {
  try {
    const response = await fetch(
      "https://militarywatchmagazine.com/feeds/headlines.xml"
    );
    const xmlData = await response.text();
    console.log("XML Data:", xmlData); // Log XML data for debugging
    const jsonData = await parseStringPromise(xmlData, {
      mergeAttrs: true,
      explicitArray: false,
    });
    res.json(jsonData.rss.channel);
  } catch (error) {
    console.error("Error fetching or parsing RSS feed:", error);
    res.status(500).send("Error fetching or parsing RSS feed");
  }
  /*
  try {
    const response = await fetch(
      "https://militarywatchmagazine.com/feeds/headlines.xml"
    );
    const xmlData = await response.text();
    const jsonData = await parseStringPromise(xmlData, {
      mergeAttrs: true,
      explicitArray: false,
    });
    res.json(jsonData.rss.channel);
  } catch (error) {
    console.error("Error fetching RSS feed:", error);
    res.status(500).send("Error fetching RSS feed");
  }
  */
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
