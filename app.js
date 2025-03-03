// URLs for the APIs
const militaryWatchMagazine = "https://militarywatchmagazine.com/feed/headlines.rss";
const militaryWatchMagazineTableID = "militaryWatchMagazine-table-container";

const redditNews = "https://www.reddit.com/r/worldnews/.rss";
const redditNewsTableID = "reddit-table-container";

// Function to fetch and display XML data using Netlify Functions
function fetchAndDisplayXML(targetUrl, tableID) {
  // Use Netlify Function to proxy the request
  fetch(`/.netlify/functions/fetchNews?url=${encodeURIComponent(targetUrl)}`)
    .then((response) => response.text())
    .then((data) => {
      // Parse the XML data
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(data, "text/xml");

      // Display the data in a table
      displayTable(xmlDoc, tableID);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to create and display a table from XML data
function displayTable(xmlDoc, tableID) {
  const items = xmlDoc.querySelectorAll("item");
  let tableHTML = "<table class='table table-striped'>";

  // Loop through the first 5 items
  for (let i = 0; i < Math.min(5, items.length); i++) {
    const title = items[i].querySelector("title").textContent;
    const link = items[i].querySelector("link").textContent;

    // Add a row to the table
    tableHTML += `
      <tr>
        <td><a href="${link}" target="_blank">${title}</a></td>
      </tr>
    `;
  }

  tableHTML += "</table>";

  // Insert the table into the specified container
  document.getElementById(tableID).innerHTML = tableHTML;
}

// Fetch and display data for both APIs
fetchAndDisplayXML(militaryWatchMagazine, militaryWatchMagazineTableID);
fetchAndDisplayXML(redditNews, redditNewsTableID);
