const express = require('express')
const path = require('path')
const fs = require("fs");
const Parser = require("rss-parser");

let app = express() 
let host = "127.0.0.1"
let port = "5555"
app.use(express.static(path.resolve(__dirname, "wwwroot")));

app.listen(
    //process.env.PORT,
    //process.env.IP,
    // local values
    port, 
    host,
    ()=>{
        // console.log(`Server is runing on http://${process.env.IP}:${process.env.PORT}`);
        // local values
        console.log(`Server is runing on http://${host}:"5555"`);
    }
);

// -- RSS Parser

(async function main() {

    const parser = new Parser();
    const feed = await parser.parseURL("https://www.google.fr/alerts/feeds/15619974748131115017/8380039576618842492"); // PWA
    const fileName = `./wwwroot/data/${feed.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;
    let items = [];

    if (fs.existsSync(fileName)) {
        items = require(`./${fileName}`);
    }

    await Promise.all(feed.items.map(async (currentItem) => {
        if (items.filter((item) => isEquivalent(item, currentItem)).length <= 0) {
            items.push(currentItem);
        }

    }));

    fs.writeFileSync(fileName ,JSON.stringify(items));


//-- FLUX RSS N°2

    const feed2 = await parser.parseURL("https://www.youtube.com/feeds/videos.xml?channel_id=UCnEHCrot2HkySxMTmDPhZyg"); // defend-inteligence
    const fileName2 = `./wwwroot/data/${feed2.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;
    let items2 = [];

    if (fs.existsSync(fileName2)) {
        items2 = require(`./${fileName2}`);
    }

    await Promise.all(feed2.items.map(async (currentItem2) => {
        if (items2.filter((item2) => isEquivalent(item2, currentItem2)).length <= 0) {
            items2.push(currentItem2);
        }

    }));

    fs.writeFileSync(fileName2 ,JSON.stringify(items2));

//-- FLUX RSS N°3

    const feed3 = await parser.parseURL("https://jobs.groupe-psa.com/handlers/offerRss.ashx?lcid=1036&Rss_JobFamily=1863&Rss_Country=79"); // stelantis jobs
    const fileName3 = `./wwwroot/data/${feed3.title.replace(/\s+/g, "-").replace(/[/\\?%*:|"<>]/g, '').toLowerCase()}.json`;
    let items3 = [];

    if (fs.existsSync(fileName3)) {
        items3 = require(`./${fileName3}`);
    }

    await Promise.all(feed3.items.map(async (currentItem3) => {
        if (items3.filter((item3) => isEquivalent(item3, currentItem3)).length <= 0) {
            items3.push(currentItem3);
        }

    }));

    fs.writeFileSync(fileName3 ,JSON.stringify(items3));
})();

function isEquivalent(a, b) {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);

    if (aProps.length != bProps.length) {
        return false;
    }

    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];

        if (a[propName] !== b[propName]) {
            return false;
        }
    }

    return true;
}