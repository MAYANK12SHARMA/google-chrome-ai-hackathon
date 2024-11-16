// // Global session variable
// let chatSession;

// // Function to read the content of a .txt file
// async function readFileContent(filePath) {
//   try {
//     const response = await fetch(filePath);
//     if (!response.ok) {
//       throw new Error(`Could not fetch the file: ${response.statusText}`);
//     }
//     const text = await response.text();
//     return text;
//   } catch (error) {
//     console.error("Error reading file:", error);
//     return null;
//   }
// }
// // Initialize the chatbot
// async function initializeChat() {
//   const { available } = await ai.languageModel.capabilities();
//   if (available === "readily") {
//     const systemPrompt = await readFileContent('file.txt');
//     chatSession = await ai.languageModel.create({
//       systemPrompt: systemPrompt || "You are a friendly assistant.",
//     });
//     addMessage("Chatbot ready! How can I help you today?", "bot");
//   } else {
//     addMessage(
//       "Model not available. Please ensure the Prompt API is enabled.",
//       "bot"
//     );
//   }
// }

// // Add a message to the chatbox
// function addMessage(message, sender) {
//   const chatbox = document.getElementById("chatbox");
//   const msgElement = document.createElement("p");
//   msgElement.textContent = message;
//   msgElement.className = sender;
//   chatbox.appendChild(msgElement);
//   chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bottom
// }

// // Handle user input
// document
//   .getElementById("chat-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const userInput = document.getElementById("user-input").value;
//     if (!userInput) return;

//     // Add user's message to the chatbox
//     addMessage(userInput, "user");

//     // Clear input field
//     document.getElementById("user-input").value = "";

//     // Send prompt to the chatbot
//     try {
//       const botResponse = await chatSession.prompt(userInput);
//       addMessage(botResponse, "bot");
//     } catch (error) {
//       addMessage("Error: Unable to process your request.", "bot");
//       console.error(error);
//     }
//   });

// // Start the chatbot on page load
// // window.onload = initializeChat;

// // Global session variable
// let chatSession;

// // Function to read the content of a .txt file
// async function readFileContent(filePath) {
//   try {
//     const response = await fetch(filePath);
//     if (!response.ok) {
//       throw new Error(`Could not fetch the file: ${response.statusText}`);
//     }
//     const text = await response.text();
//     return text;
//   } catch (error) {
//     console.error("Error reading file:", error);
//     return null;
//   }
// }

// // Initialize the chatbot
// async function initializeChat() {
//   try {
//     const capabilities = await ai.languageModel.capabilities();
//     console.log("Capabilities:", capabilities);

//     if (capabilities && capabilities.available === "readily") {
//       let systemPrompt = await readFileContent("../file.txt");
//       console.log("System Prompt Loaded:", systemPrompt);

//       if (!systemPrompt) {
//         systemPrompt = "You are a friendly assistant."; // Fallback
//       }

//       if (ai && ai.languageModel && ai.languageModel.create) {
//         chatSession = await ai.languageModel.create({ systemPrompt });
//         console.log("Chat session created:", chatSession);
//         addMessage("Chatbot ready! How can I help you today?", "bot");
//       } else {
//         console.error("Language model is not available.");
//         addMessage("Error: Language model not available.", "bot");
//       }
//     } else {
//       addMessage(
//         "Model not available. Please ensure the Prompt API is enabled.",
//         "bot"
//       );
//     }
//   } catch (error) {
//     console.error("Error initializing chat:", error);
//     addMessage(
//       "Error initializing the chatbot. Please try again later.",
//       "bot"
//     );
//   }
// }

// // Add a message to the chatbox
// function addMessage(message, sender) {
//   const chatbox = document.getElementById("chatbox");
//   const msgElement = document.createElement("p");
//   msgElement.textContent = message;
//   msgElement.className = sender;
//   chatbox.appendChild(msgElement);
//   chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bottom
// }

// // Handle user input
// document
//   .getElementById("chat-form")
//   .addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const userInput = document.getElementById("user-input").value;
//     if (!userInput) return;

//     // Add user's message to the chatbox
//     addMessage(userInput, "user");

//     // Clear input field
//     document.getElementById("user-input").value = "";

//     // Send prompt to the chatbot
//     try {
//       const botResponse = await chatSession.prompt(userInput);
//       addMessage(botResponse, "bot");
//     } catch (error) {
//       addMessage("Error: Unable to process your request.", "bot");
//       console.error(error);
//     }
//   });

// // Start the chatbot on page load
// window.onload = initializeChat;

// Global session variable
let chatSession;

// Function to read the content of a .txt file
async function readFileContent(filePath) {
  try {
    const response = await fetch(filePath);
    if (!response.ok) {
      throw new Error(`Could not fetch the file: ${response.statusText}`);
    }
    const text = await response.text();
    return text;
  } catch (error) {
    console.error("Error reading file:", error);
    return null;
  }
}

// Initialize the chatbot
async function initializeChat() {
  try {
    // Check if AI language model is initialized
    if (
      !ai ||
      !ai.languageModel ||
      typeof ai.languageModel.create !== "function"
    ) {
      console.error("AI language model is not initialized correctly.");
      addMessage("Error: AI language model is not available.", "bot");
      return;
    }

    // Check capabilities
    const capabilities = await ai.languageModel.capabilities();
    console.log("Capabilities:", capabilities);
    if (!capabilities || capabilities.available !== "readily") {
      console.error("Language model is not available.");
      addMessage(
        "Model not available. Please ensure the Prompt API is enabled.",
        "bot"
      );
      return;
    }

    // Load system prompt
    let systemPrompt = await readFileContent("../file.txt");
    console.log("System Prompt Loaded:", systemPrompt);
    if (!systemPrompt) {
      console.log("No system prompt loaded, using fallback.");
      systemPrompt = "You are a friendly assistant.";
    }

    // Check if chatSession already exists
    if (chatSession) {
      console.log("Chat session already exists.");
      addMessage("Chatbot is already initialized.", "bot");
      return;
    }

    // Create chat session
    try {
      chatSession = await ai.languageModel.create({ systemPrompt });
      console.log("Chat session created successfully.");
      addMessage("Chatbot ready! How can I help you today?", "bot");
    } catch (error) {
      console.error("Error creating chat session:", error);
      addMessage(
        "Error initializing the chatbot. Please try again later.",
        "bot"
      );
    }
  } catch (error) {
    console.error("Error initializing chat:", error);
    addMessage(
      "Error initializing the chatbot. Please try again later.",
      "bot"
    );
  }
}

// Add a message to the chatbox
function addMessage(message, sender) {
  const chatbox = document.getElementById("chatbox");
  const msgElement = document.createElement("p");
  msgElement.textContent = message;
  msgElement.className = sender;
  chatbox.appendChild(msgElement);
  chatbox.scrollTop = chatbox.scrollHeight; // Auto-scroll to bottom
}

// Handle user input
document
  .getElementById("chat-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const userInput = document.getElementById("user-input").value;
    if (!userInput) return;

    // Add user's message to the chatbox
    addMessage(userInput, "user");

    // Clear input field
    document.getElementById("user-input").value = "";

    // Send prompt to the chatbot
    try {
      const botResponse = await chatSession.prompt(userInput);
      addMessage(botResponse, "bot");
    } catch (error) {
      addMessage("Error: Unable to process your request.", "bot");
      console.error(error);
    }
  });

// Start the chatbot on page load
window.onload = initializeChat;
