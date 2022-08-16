const express = require('express')
const path = require('path')
const fs = require("fs");
const Parser = require("rss-parser");

let app = express()
let host = "127.0.0.1"
let port = "5555"
app.use(express.static(path.resolve(__dirname, "wwwroot")));

app.listen(
    // process.env.PORT,
    // process.env.IP,
    // local values
    port,
    host,
    () => {
        // console.log(`Server is runing on http://${process.env.IP}:${process.env.PORT}`);
        // local values
        console.log(`Server is runing on http://${host}:${port}`);
    }
);

// -- RSS Parser
// TODO : mettre les flux RSS dans un tableau, parcourire le tableau et comparer avec le fichier JSON

(async function main() {

    const urls = [
        "https://www.google.fr/alerts/feeds/15619974748131115017/8380039576618842492", // Google -> PWA
        "https://www.youtube.com/feeds/videos.xml?channel_id=UCnEHCrot2HkySxMTmDPhZyg", // youtube -> Defend Intelligence
        "https://korben.info/feed" // korben blog
    ];


    const parser = new Parser();
    for (let i = 0; i < urls.length; i++) {
        const feed = await parser.parseURL(urls[i]);
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

        fs.writeFileSync(fileName, JSON.stringify(items));
        console.log(feed);
    }
    // const feed = await parser.parseURL(urls[i]); // PWA

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