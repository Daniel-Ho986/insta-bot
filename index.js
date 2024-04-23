// index.js
require("dotenv").config();
const express = require("express");
const { CronJob } = require("cron");
const { IgApiClient } = require('instagram-private-api');
const fs = require('fs');
const { promisify } = require('util');
const existsAsync = promisify(fs.exists);

const app = express();
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Listening to port ${port}...`);
});

const postToInsta = async () => {
    const ig = new IgApiClient(); 
    ig.state.generateDevice(process.env.INSTAGRAM_USERNAME);
    await ig.account.login(process.env.INSTAGRAM_USERNAME, process.env.IG_PASSWORD);

    const path = './generated-image.jpeg';

    if (await existsAsync(path)) {
        const photo = await ig.publish.photo({
            file: fs.readFileSync(path),
            caption: 'Nice photo!',
        });
        console.log(`Posted with ID: ${photo.media_id}`);
    } else {
        console.error("Image file does not exist.");
    }
}

postToInsta();

const cronJob = new CronJob("30 5 * * *", postToInsta);
cronJob.start();
