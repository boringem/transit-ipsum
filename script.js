// DOM ELEMENTS 
const optionsContainer = $('.options');
const outputContainer = $('.output');
const paragraphSlider = $('#paragraphs');
const wordSlider = $('#words');
const paragraphValue = $('#paragraphsValue');
const wordsValue = $('#wordsValue');
const generateButton = $('#generate');

// UI 

function createOptionsUI() {
    // Event Listeners
    paragraphSlider.on('input', updateParagraphValue);
    wordSlider.on('input', updateWordValue);
    generateButton.on('click', generateLoremIpsum);
}

// FUNCTIONS
// Update display value for paragraphs 
function updateParagraphValue() {
    paragraphValue.text(paragraphSlider.val());
}

// Update display value for words
function updateWordValue() {
    wordsValue.text(wordSlider.val());
}

// Create Lorem Ipsum text 
function generateLoremIpsum() {
    const paragraphs = parseInt(paragraphSlider.val());
    const words = parseInt(wordSlider.val());

    const loremIpsum = generateText(paragraphs, words);
    displayLoremIpsum(loremIpsum); 
}

// Generate Lorem Ipsum text
function generateText(paragraphs, words) {
    const placeholderText = 'Bus train lightrail ferry bike walk transportation scooter skateboard transit shuttle taxi. Bus stop train station ferry terminal crosswalk. Headsign fare zone transfer farebox real-time tracking.'
    
    // Create an array of paragraphs
    const loremIpsumArray = new Array(paragraphs).fill("");
    
    // Generate words for each paragraph 
    for ( let i = 0; i < paragraphs; i++ ) {
        const words = generateWords(wordsPerParagraph);
        loremIpsumArray[i] = words;
        return loremIpsumArray.join('\n');
    }
}

// Generate a specified number of words 
function generateWords(numWords) {
    const placeholderText = 'Bus  train  lightrail  tram  subway  ferry  bike  walk  transportation  scooter  skateboard  transit  shuttle  taxi. Bus stop  train station  ferry terminal  crosswalk.  Headsign  fare zone  transfer  farebox  real-time tracking.'
    const words = placeholderText.split('  ');

    // ensure the number of words requested is within the bounds of the available words
    if (numWords <= words.length) {
        return words.slice(0, numWords).join(' ');
    } else {
        return words.join(' ');
    }
}

// Display lorem ipsum text
function displayLoremIpsum(text) {
    outputContainer.text(text); 
}

// Initialize the app
createOptionsUI();