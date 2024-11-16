// // Ensure the Translation API is available before proceeding
if (typeof translation === "undefined") {
  alert(
    "Translation API is not available. Please ensure the API is enabled in Chrome Canary or Dev."
  );
  // return;
}

// Check if the translator is available for the required language pair
async function checkAvailability(sourceLang, targetLang) {
  const languagePair = {
    sourceLanguage: sourceLang,
    targetLanguage: targetLang,
  };

  // Check if translation is available for the desired language pair
  const canTranslate = await translation.canTranslate(languagePair);
  let translator;

  if (canTranslate !== "no") {
    if (canTranslate === "readily") {
      // The translator can immediately be used
      translator = await translation.createTranslator(languagePair);
    } else if (canTranslate === "after-download") {
      // The translator can be used after the model is downloaded
      translator = await translation.createTranslator(languagePair);

      // Optionally, listen to the download progress
      console.log("Downloading language model...");
      translator.addEventListener("downloadprogress", (e) => {
        console.log(`Progress: ${e.loaded}/${e.total}`);
      });

      // Wait until the model is fully ready for use
      await translator.ready;
    }
  } else {
    alert("Translation is not available for this language pair.");
    return null;
  }

  return translator;
}

// Translating from one language to another
async function translateText() {
  const inputText = document.getElementById("inputText").value;
  const sourceLang = document.getElementById("sourceLang").value;
  const targetLang = document.getElementById("targetLang").value;

  if (!inputText) {
    alert("Please enter text to translate.");
    return;
  }

  try {
    const translator = await checkAvailability(sourceLang, targetLang);
    if (translator) {
      const translationResult = await translator.translate(inputText);
      document.getElementById(
        "outputText"
      ).innerText = `Translation: ${translationResult}`;
    }
  } catch (error) {
    console.error("Error during translation:", error);
    alert("An error occurred while translating. Check console for details.");
  }
}

// Attach event listener to the Translate button
document
  .getElementById("translateBtn")
  .addEventListener("click", translateText);
