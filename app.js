const express = require('express')
const path = require('path')
const host = process.env.IP
const port = process.env.PORT

let app = express() 

app.use(express.static(path.resolve(__dirname, "/www/SPA-RSS/wwwroot")));

app.listen( port, host ,() => { //process.env.PORT, process.env.IP,
   console.log(`Server is runing on http://${host}:${port}`) //${IP}:${PORT}
});
// app.listen(
//     process.env.ALWAYSDATA_HTTPD_PORT,
//     process.env.ALWAYSDATA_HTTPD_IP,
//     function(){
//         console.log('Server is runing');
//     }
// );
/******************************************************************** */
// Import dependencies
const fs = require("fs");
const Parser = require("rss-parser");

(async function main() {

    // Make a new RSS Parser
    const parser = new Parser();

    // Get all the items in the RSS feed
    const feed = await parser.parseURL("https://www.google.fr/alerts/feeds/15619974748131115017/8380039576618842492"); // PWA

    let items = [];

    // Clean up the string and replace reserved characters
    const fileName = `./wwwroot/data/${feed.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;

    if (fs.existsSync(fileName)) {
        items = require(`./${fileName}`);
    }

    // Add the items to the items array
    await Promise.all(feed.items.map(async (currentItem) => {

        // Add a new item if it doesn't already exist
        if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
            items.push(currentItem);
        }

    }));

    // Save the file
    fs.writeFileSync(fileName ,JSON.stringify(items));


    // ----------------------
    //      RSS N°2         |
    // ----------------------
    // Get all the items in the RSS feed
    const feed2 = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCnEHCrot2HkySxMTmDPhZyg"); // Defend Intelligence

    let items2 = [];

    // Clean up the string and replace reserved characters
    const fileName2 = `./wwwroot/data/${feed2.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;

    if (fs.existsSync(fileName2)) {
        items2 = require(`./${fileName2}`);
    }

    // Add the items to the items array
    await Promise.all(feed2.items.map(async (currentItem2) => {

        // Add a new item if it doesn't already exist
        if (items2.filter((item2) => isEquivalent(item2, currentItem2)).length <= 0) {
            items2.push(currentItem2);
        }

    }));

    // Save the file
    fs.writeFileSync(fileName2 ,JSON.stringify(items2));
})();

function isEquivalent(a, b) {
    // Create arrays of property names
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    // if number of properties is different, objects are not equivalent
    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        // if values of same property are not equal, objects are not equivalent
        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    // if we made it this far, objects are considered equivalent
    return true;
}