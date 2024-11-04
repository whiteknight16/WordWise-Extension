const url = "https://api.quotable.io/random";
let quote;

// Fetch a quote (simulated for this example)
const fetchQuote = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (e) {
    document.querySelector(".quote").innerHTML = "Some error occurred";
    console.error(e); // Log the error for debugging
  }
};

// Get a new quote
const getQuote = async () => {
  quote = await fetchQuote();
  if (!quote?.content || !quote?.author) {
    document.querySelector(".quote").innerHTML = "Some error occurred";
    return;
  }
  document.querySelector(".quote").innerHTML = quote.content;
  document.querySelector(".by").innerHTML = `By: ${quote.author}`;
};

// Copy the quote to clipboard
const copyQuote = () => {
  if (!quote?.content || !quote?.author) {
    alert("Some error occurred");
    return;
  }
  const text = `${quote.content} - ${quote.author}`;
  navigator.clipboard.writeText(text).then(
    () => {
      alert("Quote copied to clipboard!");
    },
    () => {
      alert("Failed to copy the quote.");
    }
  );
};

// Change theme
const setTheme = () => {
  let theme = localStorage.getItem("theme");
  const themeIcon = document.querySelector("#themeIcon");

  if (theme === null) {
    localStorage.setItem("theme", "light");
    theme = "light";
  }

  if (theme === "light") {
    themeIcon.src = "./assets/moon.png"; // Change to moon icon for dark theme
    document.querySelector("body").classList.add("light");
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.src = "./assets/sun.png"; // Change to sun icon for light theme
    document.querySelector("body").classList.remove("light");
    localStorage.setItem("theme", "light");
  }
};

// Event listeners
document.addEventListener("DOMContentLoaded", () => {
  // Add event listener for the theme icon
  const themeIcon = document.querySelector("#themeIcon");
  themeIcon.addEventListener("click", setTheme);

  // Add event listener for the Get Quote button
  const getQuoteBtn = document.querySelector("#getQuoteBtn");
  getQuoteBtn.addEventListener("click", getQuote);

  // Add event listener for the Copy Quote button
  const copyQuoteBtn = document.querySelector("#copyQuoteBtn");
  copyQuoteBtn.addEventListener("click", copyQuote);

  // Call getQuote on load
  getQuote();
});
