// Global variable to store the summarizer instance
let summarizer;

// Function to initialize the summarizer
async function initializeSummarizer() {
  try {
    // Check if the Summarizer API is available
    const canSummarize = await ai.summarizer.capabilities();
    console.log("Summarizer capabilities:", canSummarize);

    if (!canSummarize || canSummarize.available === "no") {
      console.error("Summarizer is not available.");
      document.getElementById("summaryResult").textContent =
        "Summarizer is not available. Please make sure the Summarization API is enabled.";
      return;
    }

    // If the summarizer is available, create an instance
    if (canSummarize.available === "readily") {
      summarizer = await ai.summarizer.create();
      console.log("Summarizer created successfully.");
    } else {
      console.log("Summarizer is being downloaded...");
      summarizer = await ai.summarizer.create();
      summarizer.addEventListener("downloadprogress", (e) => {
        console.log(`Download progress: ${e.loaded} / ${e.total}`);
      });
      await summarizer.ready;
      console.log("Summarizer ready for use.");
    }
  } catch (error) {
    console.error("Error initializing the summarizer:", error);
    document.getElementById("summaryResult").textContent =
      "Error initializing summarizer. Please try again later.";
  }
}

// Function to handle the summarization process
async function summarizeText() {
  const inputText = document.getElementById("inputText").value;

  if (!inputText.trim()) {
    alert("Please enter some text to summarize!");
    return;
  }

  // Show processing message
  document.getElementById("processingMessage").style.display = "block";

  try {
    // Check if summarizer is initialized
    if (!summarizer) {
      console.error("Summarizer is not initialized.");
      document.getElementById("summaryResult").textContent =
        "Summarizer is not initialized. Please try again later.";
      return;
    }

    // Summarize the input text
    const summary = await summarizer.summarize(inputText);
    console.log("Summary:", summary);

    // Display the summary
    document.getElementById("summaryResult").textContent = summary;

    // Hide processing message
    document.getElementById("processingMessage").style.display = "none";

    // Optionally destroy the summarizer to release resources
    summarizer.destroy();
    summarizer = null;
  } catch (error) {
    console.error("Error summarizing text:", error);
    document.getElementById("summaryResult").textContent =
      "Error summarizing the text. Please try again later.";
    // Hide processing message
    document.getElementById("processingMessage").style.display = "none";
  }
}

// Add event listener for summarize button
document
  .getElementById("summarizeButton")
  .addEventListener("click", summarizeText);

// Initialize the summarizer when the page loads
window.onload = initializeSummarizer;
