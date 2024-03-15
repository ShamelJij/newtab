document.getElementById("fetchDataBtn").addEventListener("click", function () {
  fetch("/api/data")
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById("dataContainer");
      container.innerHTML = `<p>${data.message}</p>`;
    })
    .catch((error) => {
      console.error("Error fetching data: ", error);
      const container = document.getElementById("dataContainer");
      container.innerHTML = `<p>Error fetching data. Please try again later.</p>`;
    });
});
