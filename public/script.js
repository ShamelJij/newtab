document.getElementById("fetchDataBtn").addEventListener("click", function () {
  fetch("/api/rss")
    .then((response) => response.json())
    .then((data) => {
      const items = data.item; // Assuming the data structure based on the RSS feed
      const tableBody = document
        .getElementById("rssDataTable")
        .getElementsByTagName("tbody")[0];
      tableBody.innerHTML = ""; // Clear existing rows
      items.forEach((item) => {
        const row = tableBody.insertRow();
        const titleCell = row.insertCell(0);
        const dateCell = row.insertCell(1);
        const descCell = row.insertCell(2);
        const linkCell = row.insertCell(3);

        titleCell.textContent = item.title;
        dateCell.textContent = item.pubDate;
        descCell.textContent = item.description;
        linkCell.innerHTML = `<a href="${item.link}">Link</a>`;
      });
    })
    .catch((error) => console.error("Error fetching data:", error));
});
