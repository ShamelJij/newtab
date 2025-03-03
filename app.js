async function getMMNews() {
  const url = "/.netlify/functions/fetchMMNews";

  try {
    const response = await fetch(url);
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

    let output = "\t {{MilitaryWatchMagazine}} \n";
    items.forEach((item, index) => {
      const title = item.querySelector("title").textContent;
      const description = item.querySelector("description").textContent;
      const link = item.querySelector("link").textContent;

      output += `${(index + 1).toString().padStart(2, "0")}. ${title}\n`;
      output += `   Description: ${description}\n`;
      output += `   Link: ${link}\n\n`;
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
