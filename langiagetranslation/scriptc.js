// // // Check if the Translation API is available for the desired language pair
// // async function checkAvailability(sourceLang, targetLang) {
// //   const languagePair = {
// //     sourceLanguage: sourceLang,
// //     targetLanguage: targetLang,
// //   };
// //   const canTranslate = await translation.canTranslate(languagePair);

// //   if (canTranslate === "readily") {
// //     return await translation.createTranslator(languagePair);
// //   } else if (canTranslate === "after-download") {
// //     const translator = await translation.createTranslator(languagePair);
// //     console.log("Downloading language model...");
// //     translator.addEventListener("downloadprogress", (e) => {
// //       console.log(`Progress: ${e.loaded}/${e.total}`);
// //     });
// //     await translator.ready;
// //     return translator;
// //   } else {
// //     alert("Translation is not available for this language pair.");
// //     return null;
// //   }
// // }

// // // Translate the user's input text
// // async function translateText() {
// //   const inputText = document.getElementById("inputText").value;
// //   const sourceLang = document.getElementById("sourceLang").value;
// //   const targetLang = document.getElementById("targetLang").value;

// //   if (!inputText) {
// //     alert("Please enter text to translate.");
// //     return;
// //   }

// //   try {
// //     const translator = await checkAvailability(sourceLang, targetLang);
// //     if (translator) {
// //       const translation = await translator.translate(inputText);
// //       document.getElementById(
// //         "outputText"
// //       ).innerText = `Translation: ${translation}`;
// //     }
// //   } catch (error) {
// //     console.error("Error during translation:", error);
// //     alert("An error occurred while translating. Check console for details.");
// //   }
// // }

// // // Attach event listener to the Translate button
// // document
// //   .getElementById("translateBtn")
// //   .addEventListener("click", translateText);

// // Ensure the Translation API is available before proceeding
// if (typeof translation === "undefined") {
//   alert(
//     "Translation API is not available. Make sure Chrome Canary or Dev is running with the API enabled."
//   );
// //   return;
// }

// // Check if the Translation API is available for the desired language pair
// async function checkAvailability(sourceLang, targetLang) {
//   const languagePair = {
//     sourceLanguage: sourceLang,
//     targetLanguage: targetLang,
//   };
//   const canTranslate = await translation.canTranslate(languagePair);

//   if (canTranslate === "readily") {
//     return await translation.createTranslator(languagePair);
//   } else if (canTranslate === "after-download") {
//     const translator = await translation.createTranslator(languagePair);
//     console.log("Downloading language model...");
//     translator.addEventListener("downloadprogress", (e) => {
//       console.log(`Progress: ${e.loaded}/${e.total}`);
//     });
//     await translator.ready;
//     return translator;
//   } else {
//     alert("Translation is not available for this language pair.");
//     return null;
//   }
// }
