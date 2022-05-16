const express = require('express')
const puppeteer = require('puppeteer');
const app = express()
const cors = require('cors')
    
    function getdata () {
        return new Promise(async (resolve, reject) => {
            try {
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
                const browser = await puppeteer.launch({ headless: true, args: minimal_args, executablePath: '/usr/bin/chromium-browser' });
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
                    return results.slice(0, 20);
                  })
                browser.close();
                return resolve(urls);
            } catch (e) {
                return reject(e);
            }
        })
    }
    app.get('/api',async (req, res) => {
        res.header("Access-Control-Allow-Origin", "*")
        app.use(cors())
        var today = new Date();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        console.log("Foi feito um pedido na API do Henrique ás:" + time ),
        await getdata().then(await res.send(await getdata().then())).catch(console.log)
    }
    )
    app.listen(5000, () => {
        console.log("Servidor Rodando:) HFM")
    })
