const express = require("express")
const router = express.Router()

const app = express()
const porta = 3333

const mulheres = [
    {
        nome: 'Simara conceição',
        imagem:'https://www.ibe.edu.br/wp-content/uploads/2019/02/5-previs%C3%B5es-para-as-mulheres-em-2019.jpg ',
        minibio: 'Desenvolvedora de sistemas e instrutora'
    },
    {
        nome: 'Iana Chan',
        imagem:'https://www.rbsdirect.com.br/imagesrc/27595217.jpg?w=700 ',
        minibio: 'Fundadora da programaria'
    },
    {
        nome: 'Nina da Hora',
        minibio: 'Hacker antirracista'
    }
]


function mostraMulheres(request, response) {
    response.json(mulheres)
}

function mostraPorta() {
    console.log("Servidor criado e rodando na porta ", porta)
}

app.use(router.get('/mulheres', mostraMulheres))
app.listen(porta, mostraPorta)