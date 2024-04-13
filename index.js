// https://www.ryancarmody.dev/blog/how-to-automate-instagram-posts-with-nodejs

require("dotenv").config();
const express = require("express");
const { CronJob } = require("cron");
const { IgApiClient } = require('instagram-private-api');
const { generateAndSaveImage } = require('./draw-image');
const { readFile } = require('fs');
const { promisify } = require('util');
const readFileAsync = promisify(readFile);

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});

const postToInsta = async () => {
    const ig = new IgApiClient(); 
    ig.state.generateDevice(process.env.INSTAGRAM_USERNAME);
    await ig.account.login(process.env.INSTAGRAM_USERNAME, process.env.IG_PASSWORD);

    const path = './generated-image.jpeg'

    // await ig.publish.photo({
    //     file: path,
    //     caption: 'Really nice photo!',
    // });
}

postToInsta();

// async function main() {
//     try {
//         // Fetch quote and image URL
//         const quoteData = await getZenQuote();
//         const imageUrl = await fetchRandomImageURL();

//         // Generate and save image
//         const outputPath = './generated-image.jpeg';
//         await generateAndSaveImage(quoteData, imageUrl, outputPath);

//         // Post image to Instagram
//         // await postImageToInstagram(outputPath);
//     } catch (error) {
//         console.error('Error:', error);
//     }
// }

// main()
// Define cron job to run the main function every day at 5:30 AM
// const cronJob = new CronJob("30 5 * * *", main);
// cronJob.start();

// Function to fetch today's quote from ZenQuotes API
// async function getZenQuote() {
//     const api_url = "https://zenquotes.io/api/today/";
//     const response = await fetch(api_url);
//     const data = await response.json();
//     return data[0];
// }

// Function to fetch a random nature image from Pexels API
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
