const axios = require("axios");

exports.handler = async (event, context) => {
  const url = "https://militarywatchmagazine.com/feeds/headlines.xml";

  try {
    const response = await axios.get(url);
    return {
      statusCode: 200,
      body: response.data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error fetching data" }),
    };
  }
};
