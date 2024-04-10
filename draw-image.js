const { createCanvas, loadImage } = require("canvas");
const fs = require("fs");
// require("dotenv").config();

// Import the helper function.
const { formatText } = require("./utils/format-text");

// Draw Image
async function generateAndSaveImage(quoteData, imageUrl, outputPath) {
    // Dimension for the portrait image
    const width = 1080;
    const height = 1350;

    // Center alignment variables
    const centerX = width / 2;
    const centerY = 600;

    // Instantiate the canvas object
    const canvas = createCanvas(width, height);
    const context = canvas.getContext("2d");

    if (imageUrl) {
        // Load and draw image on canvas
        const image = await loadImage(imageUrl);
        context.drawImage(image, 0, 0, width, height);
    } else {
        // Fill background with purple 
        context.fillStyle = "#764abc";
        context.fillRect(0, 0, width, height);
    }

    context.fillStyle = "rgba(0, 0, 0, 0.5)";
    const textLines = formatText(`"${quoteData.q}"`);
    // Calculate overlay height dynamically based on the number of text lines
    const overlayHeight = textLines.length * 120 + 120;
    context.fillRect(50, height / 3 + 35, width - 100, overlayHeight);

    context.font = "bold 35pt 'PT Sans', 'Arial', sans-serif";
    context.textAlign = "center";
    context.fillStyle = "#fff";

    // Format and render the quote
    textLines.forEach((line, index) => {
        context.fillText(line, centerX, centerY + index * 60);
    });

    // Render the author
    context.font = "30pt 'PT Sans', 'Arial', sans-serif";
    context.fillText(`- ${quoteData.a}`, centerX, centerY + textLines.length * 60 + 30);

    // Write the image to file
    const buffer = canvas.toBuffer("image/jpg");
    fs.writeFileSync(outputPath, buffer);
}

module.exports = { generateAndSaveImage };

// // Fetch today's quote from the ZenQuotes API
// async function getZenQuote() {
//     const api_url = "https://zenquotes.io/api/today/";
//     const response = await fetch(api_url);
//     const data = await response.json();
//     return data[0];
// }

// // Fetch a random nature image from Pexels API
// async function fetchRandomImageURL() {
//     const url = `https://api.pexels.com/v1/search?query=nature&per_page=30`;
//     const response = await fetch(url, {
//         headers: {
//             Authorization: process.env.PEXELS_API_KEY,
//         },
//     });
//     const data = await response.json();
//     if (data && data.photos && data.photos.length > 0) {
//         const randomIndex = Math.floor(Math.random() * data.photos.length);
//         return data.photos[randomIndex].src.original;
//     }
//     return null;
// }

// // Draw the image
// async function drawImage() {
//     const quoteData = await getZenQuote();
//     const imageUrl = await fetchRandomImageURL();

//     // Dimension for the portrait image
//     const width = 1080;
//     const height = 1350;

//     // Center alignment variables
//     const centerX = width / 2;
//     const centerY = 600;

//     // Instantiate the canvas object
//     const canvas = createCanvas(width, height);
//     const context = canvas.getContext("2d");

//     if (imageUrl) {
//         // Load and draw image on canvas
//         const image = await loadImage(imageUrl);
//         context.drawImage(image, 0, 0, width, height);
//     } else {
//         // Fill background with purple 
//         context.fillStyle = "#764abc";
//         context.fillRect(0, 0, width, height);
//     }

//     context.fillStyle = "rgba(0, 0, 0, 0.5)";
//     const textLines = formatText(`"${quoteData.q}"`);
//     // Calculate overlay height dynamically based on the number of text lines
//     const overlayHeight = textLines.length * 120 + 120; 
//     context.fillRect(50, height / 3 + 35, width - 100, overlayHeight);
    
//     context.font = "bold 35pt 'PT Sans', 'Arial', sans-serif";
//     context.textAlign = "center";
//     context.fillStyle = "#fff";

//     // Format and render the quote
//     textLines.forEach((line, index) => {
//         context.fillText(line, centerX, centerY + index * 60);
//     });

//     // Render the author
//     context.font = "30pt 'PT Sans', 'Arial', sans-serif";
//     context.fillText(`- ${quoteData.a}`, centerX, centerY + textLines.length * 60 + 30); 
    
//     // Write the image to file
//     const buffer = canvas.toBuffer("image/png");
//     fs.writeFileSync("./image.png", buffer);
// }
	
// drawImage();