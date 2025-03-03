// URLs for the APIs
const militaryWatchMagazineUrl = "https://militarywatchmagazine.com/feed/headlines.rss";
const redditNewsUrl = "https://www.reddit.com/r/worldnews/.rss";
const bbcNewsUrl = "http://feeds.bbci.co.uk/news/rss.xml";

// Container IDs for the tables
const militaryWatchMagazineTableID = "militaryWatchMagazine-table-container";
const redditTableID = "reddit-table-container";
const bbcTableID = "bbc-table-container";

// Function to fetch and display XML data
async function fetchAndDisplayXML(targetUrl, tableID) {
  try {
    const response = await fetch(`/.netlify/functions/fetchNews?url=${encodeURIComponent(targetUrl)}`);
    const data = await response.text();

    console.log("Raw API Response:", data);

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    const parseError = xmlDoc.querySelector("parsererror");
    if (parseError) {
      console.error("XML Parsing Error:", parseError.textContent);
      return;
    }

    const items = xmlDoc.querySelectorAll("item");

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

    for (let i = 0; i < Math.min(5, items.length); i++) {
      const title = items[i].querySelector("title").textContent;
      const description = items[i].querySelector("description").textContent;

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

    document.getElementById(tableID).innerHTML = tableHTML;
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

// Fetch and display data for all feeds
fetchAndDisplayXML(militaryWatchMagazineUrl, militaryWatchMagazineTableID);
fetchAndDisplayXML(redditNewsUrl, redditTableID);
fetchAndDisplayXML(bbcNewsUrl, bbcTableID);
