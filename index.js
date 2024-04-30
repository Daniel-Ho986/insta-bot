require("dotenv").config();
const express = require("express");
const { CronJob } = require("cron");
const { IgApiClient } = require("instagram-private-api");
const fs = require("fs");
const { promisify } = require("util");
const existsAsync = promisify(fs.exists);
const { generateAndSaveImage } = require('./draw-image');

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});

const ig = new IgApiClient();
ig.state.generateDevice(process.env.INSTAGRAM_USERNAME);

const postToInsta = async (outputPath) => {
  try {
    await ig.account.login(
      process.env.INSTAGRAM_USERNAME,
      process.env.IG_PASSWORD
    );
    if (await existsAsync(outputPath)) {
      const photo = await ig.publish.photo({
        file: fs.readFileSync(outputPath),
        caption: "Nice photo!",
      });
      console.log('Image posted successfully to Instagram');
    }
  } catch (error) {
    console.log("Error posting image to Instagram", error);
  }

};

main();

async function main() {
    try {
        // Fetch quote and image URL
        const quoteData = await getZenQuote();
        const imageUrl = await fetchRandomImageURL();

        // Generate and save image
        const outputPath = './generated-image.jpeg';
        await generateAndSaveImage(quoteData, imageUrl, outputPath);

        // Post image to Instagram
        await postToInsta(outputPath);
    } catch (error) {
        console.error('Error:', error);
    }
}

// const cronJob = new CronJob("30 5 * * *", postToInsta);
// cronJob.start();

// Function to fetch today's quote from ZenQuotes API
async function getZenQuote() {
  const api_url = "https://zenquotes.io/api/today/";
  const response = await fetch(api_url);
  const data = await response.json();
  return data[0];
}

// Function to fetch a random nature image from Pexels API
async function fetchRandomImageURL() {
  const url = `https://api.pexels.com/v1/search?query=nature&per_page=30`;
  const response = await fetch(url, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY,
    },
  });
  const data = await response.json();
  if (data && data.photos && data.photos.length > 0) {
    const randomIndex = Math.floor(Math.random() * data.photos.length);
    return data.photos[randomIndex].src.original;
  }
  return null;
}
