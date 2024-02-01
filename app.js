/*
$(function () {
  // Use jQuery UI autocomplete on the search input
  $("#searchInput").autocomplete({
    source: function (request, response) {
      // Use Google's suggestion API endpoint
      $.ajax({
        url: "https://suggestqueries.google.com/complete/search",
        data: { q: request.term },
        dataType: "jsonp",
        success: function (data) {
          response(data[1]); // Extract suggestions from the response
        },
      });
    },
    minLength: 1, // Minimum characters before triggering suggestions
  });
});
*/
function fetchAndDisplayXML(url) {
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
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
fetchAndDisplayXML("https://militarywatchmagazine.com/feeds/headlines.xml");
