$(document).ready(function () {
	//your code here
// Constants for tag options 
const tagOptions = [ 
	"p", "h1", "h2", 
	"h3", "h4", "h5", 
	"h6", "span", 
]; 

const WORDSARR = [
    "bus", "train", "lightrail", "subway", "ferry", "bike", "walk", "transportation", "scooter", "skateboard", 
    "transit", "shuttle", "taxi", "bus stop", "train station", "ferry terminal", "crosswalk", "headsign", "fare zone", 
    "transfer", "farebox", "real-time tracking", "interline", "cable car", "bullet train", "metro", "funicular", 
    "passenger", "bus driver", "operator", "train conductor", "shelterboard", "crosstown", "fare", "route"
]

// Get DOM elements 
const optionsContainer = 
	document.querySelector(".options"); 
const outputContainer = 
	document.querySelector(".output"); 
const tagsSelect = 
	document.getElementById("tags"); 
const paragraphsSlider = 
	document.getElementById( 
		"paragraphs"
	); 
const sentenceSlider = 
    document.getElementById("sentences");
const wordsSlider = 
	document.getElementById("words"); 
const paragraphsValue = 
	document.getElementById( 
		"paragraphsValue"
	); 
const wordsValue = 
	document.getElementById( 
		"wordsValue"
	); 

// Create Options UI 
function createOptionsUI() { 

// With tag options, fill up the <select> element. 
	tagOptions.forEach((tag) => { 
		const option = 
			document.createElement( 
				"option"
			); 
		option.value = tag; 
		option.textContent = `<${tag}>`; 
		tagsSelect.appendChild(option); 
	}); 

// Event listeners for sliders 
	paragraphsSlider.addEventListener( 
		"input", 
		updateParagraphsValue 
	); 
	wordsSlider.addEventListener( 
		"input", 
		updateWordsValue 
	); 
    sentenceSlider.addEventListener(
        "input", 
        updateSentencesValue
    )

	const generateButton = 
		document.getElementById( 
			"generate"
		); 
	generateButton.addEventListener( 
		"click", 
		generateLoremIpsum 
	); 
} 

// Update the displayed value for Paragraphs 
function updateParagraphsValue() { 
	paragraphsValue.textContent = 
		paragraphsSlider.value; 
} 

// Words per Paragraph have got to be updated on the display 
function updateWordsValue() { 
	wordsValue.textContent = 
		wordsSlider.value; 
} 

// Sentences per Paragraph have got to be updated on the display
function updateSentencesValue() {
    sentencesValue.textContent = 
        sentenceSlider.value;
}



// Generate Lorem Ipsum text 
function generateLoremIpsum() { 
	const paragraphs = parseInt( 
		paragraphsSlider.value 
	); 
    const sentences = parseInt(sentenceSlider.value);
	const tag = 
		document.getElementById( 
			"tags"
		).value; 
	const includeHtml = 
		document.getElementById( 
			"include"
		).value; 
	const wordsPerSentence = parseInt( 
		wordsSlider.value 
	); 

	const loremIpsumText = generateText( 
		paragraphs, 
		tag, 
		includeHtml, 
		sentences,
		wordsPerSentence 
	); 
	displayLoremIpsum(loremIpsumText); 
} 

// Function to generate Lorem Ipsum text 
function generateText( 
	paragraphs, 
	tag, 
	includeHtml, 
	sentencesPerParagraph,
	wordsPerSentence 
) { 
    
	// Create an array of paragraphs 
	const loremIpsumArray = new Array( 
		paragraphs 
	).fill(""); 

	// Generate sentences for each paragraph
	for (
		let i = 0;
		i < paragraphs;
		i++
	) {
		const sentences = generateSentences(
			sentencesPerParagraph,
			wordsPerSentence
		);
		loremIpsumArray[i] =
			includeHtml === "Yes"
				? `<${tag}>${sentences}</${tag}`
				: sentences;
	}

	// Join paragraphs into a single string 
	return loremIpsumArray.join("\n"); 
} 


// Function to generate a specified number of sentences
function generateSentences(
	sentencesPerParagraph,
	wordsPerSentence
) {
	const sentencesArray = new Array(
		sentencesPerParagraph
	).fill(" ");

  
	// Generate words for each sentence
	for (
		let i = 0;
		i < sentencesPerParagraph;
		i++
	) {
		sentencesArray[i] = generateWords(
			wordsPerSentence
		);

        // Add a period at the end of each sentence
        sentencesArray[i] = sentencesArray[i] + ".";
	}

	let sentencesArr = sentencesArray.join(" ");

	//  Capitalize the first letter of each sentence
	let newSentencesArray = sentencesArr
		.split(". ")
		.map((sentence) => {
			return (
				sentence.charAt(0).toUpperCase() +
				sentence.slice(1)
			);
		});
	
	// Join sentences into a single string
	return newSentencesArray.join(". ");

}

// Function to generate a specified number of words 
function generateWords(numWords) { 
	console.log('GENERATING WORDS HERE')
	// Lorem Ipsum text for demonstration purposes 
	const words = WORDSARR
    console.log('WORDS:', words)

	// Ensure the number of words requested is within the bounds of the available words 
    let wordsRes;
	if (numWords <= words.length) { 
        // choose random words from the array
        const randomWords = words.sort(() => Math.random() - 0.5);
        wordsRes = words.slice(0, numWords).join(" ");
	} else { 
		wordsRes = words.join(" "); 
	} 
    console.log('WORDS RES:', wordsRes)
    return wordsRes;
} 

// Display Lorem Ipsum text 
function displayLoremIpsum(text) { 
	outputContainer.innerHTML = text; 
} 

// Initialize the app 
createOptionsUI();
});  
