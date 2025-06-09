function getQuery() {
  return encodeURIComponent(document.getElementById('searchQuery').value.trim());
}

function redirectToSite(site) {
  const query = getQuery();
  if (!query) {
    alert("Please enter a search term");
    return;
  }

  let url = "";
  switch(site) {
    case "myntra":
      url = `https://www.myntra.com/search?q=${query}`;
      break;
    case "flipkart":
      url = `https://www.flipkart.com/search?q=${query}`;
      break;
    case "amazon":
      url = `https://www.amazon.in/s?k=${query}`;
      break;
    case "ajio":
      url = `https://www.ajio.com/search/?text=${query}`;
      break;
  }
  window.open(url, "_blank");
}

function redirectAll() {
  ['myntra', 'flipkart', 'amazon', 'ajio'].forEach(site => redirectToSite(site));
}
