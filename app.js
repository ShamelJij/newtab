// URLs for the APIs
const redditNewsUrl = "https://www.reddit.com/r/worldnews/.rss";
const bbcNewsUrl = "http://feeds.bbci.co.uk/news/rss.xml";

// Container IDs for the tables
const redditTableID = "reddit-table-container";
const bbcTableID = "bbc-table-container";

// Function to fetch and display XML data using Netlify Functions
async function fetchAndDisplayXML(targetUrl, tableID) {
  try {
    // Fetch the XML data using the Netlify Function
    const response = await fetch(`/.netlify/functions/fetchNews?url=${encodeURIComponent(targetUrl)}`);
    const data = await response.text();

    console.log("Raw API Response:", data);

    // Parse the XML data
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    // Check for parsing errors
    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      console.error("XML Parsing Error:", parseError.textContent);
      return;
    }

    // Extract all <item> elements
    const items = xmlDoc.querySelectorAll("item");

    // Create the table HTML
    let tableHTML = `
      <table class='table table-striped'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
    `;

    // Loop through the first 5 items
    for (let i = 0; i < Math.min(5, items.length); i++) {
      const title = items[i].querySelector("title").textContent;
      const description = items[i].querySelector("description").textContent;

      // Add a row to the table
      tableHTML += `
        <tr>
          <td>${title}</td>
          <td>${description}</td>
        </tr>
      `;
    }

    tableHTML += `
        </tbody>
      </table>
    `;

    // Insert the table into the specified container
    document.getElementById(tableID).innerHTML = tableHTML;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

// Fetch and display data for Reddit News and BBC News
fetchAndDisplayXML(redditNewsUrl, redditTableID);
fetchAndDisplayXML(bbcNewsUrl, bbcTableID);
