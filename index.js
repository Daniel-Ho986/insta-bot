// Blog: https://www.ryancarmody.dev/blog/how-to-automate-instagram-posts-with-nodejs

// Tutorial: https://www.youtube.com/watch?v=XzyYi_yv86A&ab_channel=AviMamenko

// Hosting Platform: https://www.youtube.com/watch?v=MusIvEKjqsc&t=50s&ab_channel=TraversyMedia

const express = require("express");
const app = express();

const Instagram = require("./utils/instagram-web-api");
const { generateAndSaveImage } = require("./draw-image");

require("dotenv").config();

const port = process.env.PORT || 4000;

// const { CronJob } = require("cron");
// const fs = require("fs");

const instagramLoginFunction = () => {
  const client = new Instagram({
    username: process.env.INSTAGRAM_USERNAME,
    password: process.env.INSTAGRAM_PASSWORD,
  });

  const instagramPostPictureFunction = async () => {
    await client
      .getPhotosByUsername({ username: process.env.INSTAGRAM_USERNAME })
      .then(
        (res) =>
          res.user.edge_owner_to_timeline_media.edges.map(
            (edge) => edge.node.edge_media_to_caption.edges[0].node.text
          )[0]
      )
      .then((mostRecent) => Number(mostRecent.split(" - ")[0]))
      .then((latestNumber) => {
        const updateNumber = latestNumber + 1;
      });
  };

  instagramPostPictureFunction();
};

instagramLoginFunction();

app.listen(port, () => {
  console.log(`Listening to port ${port}...`);
});

async function main() {
  try {
    // Fetch quote and image URL
    const quoteData = await getZenQuote();
    const imageUrl = await fetchRandomImageURL();

    // Generate and save image
    const outputPath = "./generated-image.jpeg";
    await generateAndSaveImage(quoteData, imageUrl, outputPath);

    // Post image to Instagram
    // await postImageToInstagram(outputPath);
  } catch (error) {
    console.error("Error:", error);
  }
}

// main();
// Define cron job to run the main function every day at 5:30 AM
// const cronJob = new CronJob("30 5 * * *", main);
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
