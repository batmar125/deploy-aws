const { application } = require('express')
const express = require('express')
const app = express()
const port = 5000
const puppeteer = require('puppeteer')
const cors = require('cors');
app.use(cors({
    origin: '127.0.0.1/'
}));
const minimal_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
    ];
function getdata () {
    return new Promise(async (resolve, reject) => {
        try {
            let urls = await page.evaluate(() => {
                let results = [];
                let items = document.querySelectorAll('div.entry');
                items.forEach((item, i) => {
                    results.push({
                        id:  i + 1,
                        text: item.innerText,
                        type: "Entrada e Número"
                    });
                });
                return results.slice(0 ,20);
              })
            return resolve(urls);
        } catch (e) {
            return reject(e);
        }
    })
}
            
app.get('/api',async (req, res) => {
    await getdata().then(await res.send(await getdata().then())).catch(console.log),
    console.log("Request was made")
})

app.listen(port, async () => {
    console.log("You've started the server on port" + " " + port + "Your browser is opened. Please wait 1/2 seconds before going to next step.")
    browser = await puppeteer.launch({ headless: true, args: minimal_args, executablePath: '/usr/bin/chromium-browser'})
    page = await browser.newPage()
    console.log("Browser opened")
    page.goto('https://blaze.com/pt/games/double')
    console.log("You entered the blazeURL/ Now you are able to run.")
})
