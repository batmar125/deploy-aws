const express = require('express')
const puppeteer = require('puppeteer');
const app = express()

function getdata () {
    return new Promise(async (resolve, reject) => {
        try {
            const browser = await puppeteer.launch({ headless: false });
            const page = await browser.newPage();
            await page.goto("https://blaze.com/pt/games/double");
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('div.entry');
                items.forEach((item, i) => {
                    results.push({
                        id:  i + 1,
                        text: item.innerText,
                    });
                });
                return results;
              })
            browser.close();
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
app.get('/api',async (req, res) => {
    console.log("Request on API"),
    await getdata().then(await res.send(await getdata().then())).catch(console.log)
}
)
app.listen(5000, () => {
    console.log("server listening on port: " + "5000")
})
