const militaryWatchMagazine =
  "https://militarywatchmagazine.com/feed/headlines.rss";
const militaryWatchMagazineTableID = "militaryWatchMagazine-table-container";
const defenseBlog = "https://defence-blog.com/feed/";

const redditNews = "https://www.reddit.com/r/worldnews/.rss";
const redditNewsTableID = "reddit-table-container";

// Function to fetch and parse XML data
function fetchAndDisplayXML(targetUrl, tableID) {
  const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";

  fetch(targetUrl, {
    headers: {
      method: "GET",
      mode: "no-cors",
credentials: "include", // Include credentials if needed
    headers: {
      "Content-Type": "text/xml",
      "X-Requested-With": "XMLHttpRequest",
    },
    },
  })
    .then((response) => response.text())
    .then((data) => {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data, "text/xml");
      displayTable(xmlDoc, tableID);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function fetchAndDisplayXMLred(targetUrl, tableID) {
  fetch(targetUrl)
    .then((response) => response.text())
    .then((data) => {
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data, "text/xml");
      displayTable(xmlDoc, tableID);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to create and display table from XML data
function displayTable(xmlDoc, tableID) {
  var items = xmlDoc.querySelectorAll("item");
  var tableHTML = "<table class='table table-striped'>";

  // Loop through the first 5 items
  for (var i = 1; i < Math.min(6, items.length); i++) {
    var title = items[i].querySelector("title").textContent;
    tableHTML += "<tr><td>" + title + "</td></tr>";
    console.log("XML Response:", title, i);
  }

  tableHTML += "</table>";

  document.getElementById(tableID).innerHTML = tableHTML;
}

// Fetch and display the XML data
fetchAndDisplayXML(militaryWatchMagazine, militaryWatchMagazineTableID);
fetchAndDisplayXMLred(redditNews, redditNewsTableID);
