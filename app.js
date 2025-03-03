const militaryWatchMagazine =
  "https://militarywatchmagazine.com/feed/headlines.rss";
const militaryWatchMagazineTableID = "militaryWatchMagazine-table-container";

const redditNews = "https://www.reddit.com/r/worldnews/.rss";
const redditNewsTableID = "reddit-table-container";

function fetchAndDisplayXML(targetUrl, tableID) {
  fetch(`/.netlify/functions/fetchNews?url=${encodeURIComponent(targetUrl)}`)
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

fetchAndDisplayXML(militaryWatchMagazine, militaryWatchMagazineTableID);
fetchAndDisplayXML(redditNews, redditNewsTableID);
