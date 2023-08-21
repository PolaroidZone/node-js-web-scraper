const fs = require("fs");
const axios = require("axios");
const cheerio = require("cheerio");

// Get the URL from the command line arguments
const url = process.argv[2];

if (!url) {
  console.error("Please provide a URL as a command-line argument.");
  process.exit(1);
}

// Function to scrape links and images
async function scrapeWebsite() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const images = [];
    $("img").each((index, element) => {
      const image = $(element).attr("src");
      if (image) {
        images.push(image);
      }
    });

    return images;
  } catch (error) {
    console.error("Error while scraping:", error);
    return { images: [] };
  }
}

scrapeWebsite().then(({ images }) => {
  //write the images to a json file
  fs.writeFile(
    "scraped_images.json",
    JSON.stringify(images, null, 2),
    (err) => {
      if (err) {
        console.error("Error saving images to JSON file:", err);
      } else {
        console.log("Images saved to scraped_images.json");
      }
    }
  );
});
