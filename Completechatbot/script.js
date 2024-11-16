let summarizer;
let chatSession;
let uploadedFileContent = "";

// Initialize Summarizer
async function initializeSummarizer() {
  try {
    const canSummarize = await ai.summarizer.capabilities();
    console.log("Summarizer capabilities:", canSummarize);

    if (!canSummarize || canSummarize.available === "no") {
      console.error("Summarizer is not available.");
      document.getElementById("summaryResult").textContent =
        "Summarizer is not available. Please make sure the Summarization API is enabled.";
      return;
    }

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

// Function to handle file upload and read the content
async function readFileContent(file) {
  const reader = new FileReader();

  reader.onload = function (event) {
    uploadedFileContent = event.target.result;
    document.getElementById(
      "file-status"
    ).textContent = `File uploaded successfully. Content length: ${uploadedFileContent.length} characters.`;
    document.getElementById("process-btn").disabled = false; // Enable processing button
  };

  reader.onerror = function (error) {
    console.error("Error reading file:", error);
    document.getElementById("file-status").textContent = "Error reading file.";
  };

  reader.readAsText(file); // Read as plain text
}

// Handle file upload
document
  .getElementById("file-upload")
  .addEventListener("change", function (event) {
    const file = event.target.files[0];
    if (file) {
      readFileContent(file);
    }
  });

// Function to summarize uploaded content
async function summarizeText() {
  if (!uploadedFileContent.trim()) {
    alert("Please upload a file first!");
    return;
  }

  document.getElementById("processingMessage").style.display = "block";
  try {
    const summary = await summarizer.summarize(uploadedFileContent);
    document.getElementById("summaryResult").textContent = summary;
    document.getElementById("processingMessage").style.display = "none";
  } catch (error) {
    console.error("Error summarizing text:", error);
    document.getElementById("summaryResult").textContent =
      "Error summarizing the text.";
    document.getElementById("processingMessage").style.display = "none";
  }
}

// Handle summarize button
document
  .getElementById("summarizeButton")
  .addEventListener("click", summarizeText);

// Function to initialize the chatbot
async function initializeChat() {
  if (!uploadedFileContent) {
    alert("Please upload a file first!");
    return;
  }

  try {
    const capabilities = await ai.languageModel.capabilities();
    console.log("Capabilities:", capabilities);
    if (capabilities.available === "readily") {
      const systemPrompt = uploadedFileContent;
      chatSession = await ai.languageModel.create({
        systemPrompt: systemPrompt || "You are a friendly assistant.",
      });
      addMessage("Chatbot ready! How can I help you today?", "bot");
    } else {
      addMessage(
        "Model not available. Please ensure the Prompt API is enabled.",
        "bot"
      );
    }
  } catch (error) {
    console.error("Error initializing chat:", error);
    addMessage("Error initializing the chatbot.", "bot");
  }
}

// Function to handle user input and generate responses
document
  .getElementById("chat-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    addMessage(userInput, "user");

    document.getElementById("user-input").value = ""; // Clear input field

    try {
      const botResponse = await chatSession.prompt(userInput);
      addMessage(botResponse, "bot");
    } catch (error) {
      addMessage("Error: Unable to process your request.", "bot");
      console.error(error);
    }
  });

// Add message to chatbox
function addMessage(message, sender) {
  const chatbox = document.getElementById("chatbox");
  const msgElement = document.createElement("p");
  msgElement.textContent = message;
  msgElement.className = sender;
  chatbox.appendChild(msgElement);
  chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bottom
}

// Initialize chatbot and summarizer on page load
window.onload = async () => {
  await initializeSummarizer(); // Initialize summarizer first
  document
    .getElementById("process-btn")
    .addEventListener("click", initializeChat); // Enable processing button to initialize chatbot
};
