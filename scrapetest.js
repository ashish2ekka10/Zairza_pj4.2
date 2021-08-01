const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const writeStream = fs.createWriteStream('data.csv');

writeStream.write(`Title,Price,Total reviews \n`);

request('https://webscraper.io/test-sites/e-commerce/allinone',(error,response,html) =>{
    if(!error && response.statusCode == 200){
        const $ = cheerio.load(html);

        
        $('.thumbnail').each((i,el) =>{
            const item = $(el).find(".title")
            .text();

            const price = $(el).find(".price")
            .text();

            const desc = $(el).find("div[class='ratings'] .pull-right")
            .text();

            
            writeStream.write(`${item},${price},${desc} \n`);

        })


        console.log('Scraping done.....');
    }
});