// fetchHeadlines.js

const fetch = require("node-fetch");
const parser = require("xml2js").parseString;

exports.handler = async (event, context) => {
  try {
    const response = await fetch(
      "https://militarywatchmagazine.com/feeds/headlines.xml"
    );
    const xmlData = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ xmlData }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching headlines" }),
    };
  }
};
