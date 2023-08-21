const axios = require('axios');
const cheerio = require('cheerio');

// Get the URL from the command line arguments
const url = process.argv[2];

if (!url) {
  console.error('Please provide a URL as a command-line argument.');
  process.exit(1);
}

// Function to scrape links and images
async function scrapeWebsite() {
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const links = [];
    $('a').each((index, element) => {
      const link = $(element).attr('href');
      if (link) {
        links.push(link);
      }
    });

    const images = [];
    $('img').each((index, element) => {
      const image = $(element).attr('src');
      if (image) {
        images.push(image);
      }
    });

    return { links, images };
  } catch (error) {
    console.error('Error while scraping:', error);
    return { links: [], images: [] };
  }
}

// Call the scraping function
scrapeWebsite().then(({ links, images }) => {
  console.log('Links:');
  links.forEach(link => console.log(link));

  console.log('\nImages:');
  images.forEach(image => console.log(image));
});
        