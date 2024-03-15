const apiUrl = process.env.API_URL;
import express from "express";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Set the 'x-content-type-options' header for all routes
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  next();
});

app.use(express.static("public"));
app.get("/api/rss", async (req, res) => {
  try {
    const response = await fetch(
      "https://militarywatchmagazine.com/feeds/headlines.xml"
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("text/xml")) {
      throw new Error("Unexpected response content type. Expected text/xml.");
    }

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
});

// Endpoint to get RSS feed data
/*
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
});
  */

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
