const API = "https://api.trace.moe/search";

let animeResult = {};

async function whatAnime(imageBlob) {
  try {
    const response = await axios.post(API, imageBlob, {
      headers: {
        "Content-type": "image/jpeg",
      },
    });
    return response.data.result;
  } catch (error) {
    alert("Failed to fetch anime info. Please try again.");
    console.log(error);
  }
}
function createList(animeResult) {
  // Get the results container (already in your HTML)
  let container = document.getElementById("results");
  if (!container) {
    container = document.createElement("div");
    container.id = "results";
    document.body.appendChild(container);
  }
  container.innerHTML = ""; // Only clear results, not other elements

  if (!Array.isArray(animeResult) || animeResult.length === 0) {
    container.innerHTML = "<p>No results found.</p>";
    return;
  }

  animeResult.forEach((item) => {
    const div = document.createElement("div");
    div.className = "result-card";
    div.innerHTML = `
    <p><strong>Title:</strong> ${item.filename || "Unknown"}</p>
    <p><strong>Episode:</strong> ${item.episode || "N/A"}</p>
    <div>
      <video width="320" height="240" controls>
        <source src="${item.video}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>
  `;
    container.appendChild(div);
  });
}

document.querySelector("form").addEventListener("submit", async function (e) {
  e.preventDefault();
  const fileInput = document.getElementById("image");
  const file = fileInput.files[0];
  if (file) {
    const result = await whatAnime(file);
    animeResult = result;
    console.log(animeResult);
    createList(animeResult);
  } else {
    alert("please select an image file");
  }
});
