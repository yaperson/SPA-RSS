const express = require('express')
const path = require('path')
const host = '127.0.0.1' //yanis-projet.alwaysdata.net
const port = 5052

let app = express() 

app.use(express.static(path.resolve(__dirname, "wwwroot")));

app.listen(port, host, () => {
    console.log(`Server is runing on http://${host}:${port}`)
})

// app.listen(
//     process.env.ALWAYSDATA_HTTPD_PORT,
//     process.env.ALWAYSDATA_HTTPD_IP,
//     ()=>{
//         console.log(`Server is runing on http://${ALWAYSDATA_HTTPD_IP}:${ALWAYSDATA_HTTPD_PORT}`);
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
    const feed = await parser.parseURL("https://www.google.fr/alerts/feeds/15619974748131115017/8380039576618842492"); // https://www.reddit.com/.rss

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
    const feed2 = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCnEHCrot2HkySxMTmDPhZyg"); // http://blog.chromium.org/atom.xml

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

    // ----------------------
    //      RSS N°3         |
    // ----------------------
    // Get all the items in the RSS feed
    const feed3 = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCnEHCrot2HkySxMTmDPhZyg"); // http://blog.chromium.org/atom.xml

    let items3 = [];

    // Clean up the string and replace reserved characters
    const fileName3 = `./wwwroot/data/${feed3.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;

    if (fs.existsSync(fileName3)) {
        items3 = require(`./${fileName3}`);
    }

    // Add the items to the items array
    await Promise.all(feed3.items.map(async (currentItem3) => {

        // Add a new item if it doesn't already exist
        if (items3.filter((item3) => isEquivalent(item3, currentItem3)).length <= 0) {
            items3.push(currentItem3);
        }

    }));

    // Save the file
    fs.writeFileSync(fileName3 ,JSON.stringify(items3));

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