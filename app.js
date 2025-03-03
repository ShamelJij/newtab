// Function to fetch and display XML data using Netlify Functions
function fetchAndDisplayXML(targetUrl, tableID) {
  fetch(`/.netlify/functions/fetchNews?url=${encodeURIComponent(targetUrl)}`)
    .then((response) => response.text())
    .then((data) => {
      console.log("Raw API Response:", data);

      // Check if the response is XML
      if (data.startsWith("<?xml") || data.startsWith("<rss")) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(data, "text/xml");
        displayTable(xmlDoc, tableID);
      } else {
        console.error("Invalid XML response:", data);
        document.getElementById(tableID).innerHTML = "<p>Error: Invalid data received from the API.</p>";
      }
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to create and display a table from XML data
function displayTable(xmlDoc, tableID) {
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
}

// URLs for the APIs
const bbcNews = "http://feeds.bbci.co.uk/news/rss.xml";
const bbcNewsTableID = "militaryWatchMagazine-table-container"; // Replace with your container ID

// Fetch and display data for BBC News
fetchAndDisplayXML(bbcNews, bbcNewsTableID);

async function getMMNews() {
  const url = "/.netlify/functions/fetchMMNews";

  try {
    const response = await fetch(url);
    const data = await response.text();

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "text/xml");

    const titles = xmlDoc.querySelectorAll("title");

    let output = "\t {{MilitaryWatchMagazine}} \n";
    titles.forEach((title, index) => {
      output += `${(index + 1).toString().padStart(2, "0")}. ${title.textContent}\n`;
    });

    console.log(output);

    const container = document.getElementById("mmnews-container");
    if (container) {
      container.textContent = output;
    }
  } catch (error) {
    console.error("Error fetching or parsing data:", error);
  }
}

getMMNews();
