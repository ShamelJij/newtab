// Function to fetch and parse XML data
function fetchAndDisplayXML() {
  const corsProxyUrl = "https://cors.bridged.cc/";
  const targetUrl = "https://militarywatchmagazine.com/feeds/headlines.xml";

  fetch(corsProxyUrl + targetUrl)
    .then((response) => response.text())
    .then((data) => {
      console.log("XML Response:", data);
      var parser = new DOMParser();
      var xmlDoc = parser.parseFromString(data, "text/xml");
      displayTable(xmlDoc);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

// Function to create and display table from XML data
function displayTable(xmlDoc) {
  var items = xmlDoc.querySelectorAll("item");
  var tableHTML = "<table>";
  tableHTML += "<tr><th>Title</th><th>Link</th><th>Published Date</th></tr>";

  items.forEach((item) => {
    var title = item.querySelector("title").textContent;
    var link = item.querySelector("link").textContent;
    var pubDate = item.querySelector("pubDate").textContent;

    tableHTML += "<tr>";
    tableHTML += "<td>" + title + "</td>";
    tableHTML +=
      '<td><a href="' + link + '" target="_blank">' + link + "</a></td>";
    tableHTML += "<td>" + pubDate + "</td>";
    tableHTML += "</tr>";
  });

  tableHTML += "</table>";

  document.getElementById("table-container").innerHTML = tableHTML;
}

// Fetch and display the XML data
fetchAndDisplayXML();
