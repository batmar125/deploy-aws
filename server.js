const venom = require('venom-bot');
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const PORT = 5000
app.use(bodyParser.json())
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
const limparBase = async (contatos) => {
    const stage1 = await JSON.stringify(contatos)
    const stage2 = await stage1.replaceAll('(', '')
    const stage3 = await stage2.replaceAll(')', '')
    const stage4 = await stage3.replaceAll('-', '')
    const stage5 = await stage4.replaceAll(' ', '')
    console.log(stage5)
    return await JSON.parse(stage5)
}
const montarPaginaOutro = (qrcode) => {
    app.use('/qrcode', (req, res) => {
        res.send(`<img src="${qrcode}" ></img>`)
        console.log("pagina montada")
    })
}
const startingClient = async () => {
    venom
    .create(
        'Computador Gabriel',
        (base64Qr, asciiQR, attempts, urlCode) => {
            montarPaginaOutro(base64Qr)
        },
        (statusSession, session) => {
        console.log('Status Session: ', statusSession);
        //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
        //Create session wss return "serverClose" case server for close
        console.log('Session name: ', session);
        },
        {
        multidevice: true,
        
        folderNameToken: 'tokens', //folder name when saving tokens
        mkdirFolderToken: './data/app',
        headless: true, //Turn off and on/WhatsApp screen
        createPathFileToken: true,
        puppeteerOptions: { executablePath: '/usr/bin/chromium-browser'}

    })
    .then((client) => {
        console.log("client running: " + client)

        const enviarMensagens = async (client, contatos, nomes, tempo, mensagem) => {
                const contatosFormatados = await limparBase(contatos)
                console.log(await contatosFormatados)
                for(k in contatosFormatados) {
                    await sleep(parseInt(tempo))
                    console.log(`Contato: ${[k]}` + contatosFormatados[k] + " Nome: " + nomes[k])
                    await client.sendText("55" + contatosFormatados[k] + "@c.us", mensagem)
                    .then((result) => {
                        console.log('Result: ', result); //return object success
                        })
                        .catch((erro) => {
                        console.error('Error when sending: ', erro); //return object error
                        });
                }
                }
        app.post(`/teste`, (req, res) => {
            console.log("Post recebido.." + "Sua lista de contatos foi:" + req.body.contatos)
            let mensagem = req.body.mensagem;
            let contatos = req.body.contatos;
            let nomes = req.body.nomes;
            let tempo = req.body.timeout

            enviarMensagens(client, contatos, nomes, tempo, mensagem)
        })
}).catch((erro) => {
        console.log(erro);
    });
}


app.listen(PORT, () => {
    startingClient()
    console.log("servidor rodando")
})
