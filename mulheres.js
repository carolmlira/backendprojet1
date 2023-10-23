const express = require  ("express")
const router = express.Router()
const {v4 : uuidv4} = require('uuid')
const cors = require('cors')//permite colococar no front
const conectaBancoDeDados = require('./BancoDeDados')//ligando ao arquivo
conectaBancoDeDados() //chamando a funcão

const Mulher = require('./mulhermodel')


const app = express()
app.use(express.json())
app.use(cors())
const porta = 3333

//POST

async function criaMulher(request, response) {

    const novaMulher = new Mulher({

        nome: request.body.nome,

        imagem: request.body.imagem,

        minibio: request.body.minibio,

        citacao: request.body.citacao

    })

    try {

        const mulherCriada = await novaMulher.save()

        response.status(201).json(mulherCriada)

    } catch (erro) {

        console.log(erro)

    }

}
function mostraPorta() { console. log("Servidor criado e rodando na porta ", porta) 
}
async function mostraMulheres(request, response){
    try {
      const mulheresVindasDoBancoDeDados = await Mulher.find()
      response.json(mulheresVindasDoBancoDeDados)
    }catch(erro) {

      console.log(erro)
    }
  }
//PATCH

async function corrigeMulher(request, response) {

    try {

        const mulherEncontrada = await Mulher.findById(request.params.id)

        if (request.body.nome) {

            mulherEncontrada.nome = request.body.nome

        }
        if (request.body.minibio) {

            mulherEncontrada.minibio = request.body.minibio

        }
        if (request.body.imagem) {

            mulherEncontrada = request.body.imagem

        }
        if (request.body.citacao) {

            mulherEncontrada = request.body.citacao

        }
        const mulherAtualizadaNoBancoDeDados = await mulherEncontrada.save()
        response.json(mulherAtualizadaNoBancoDeDados)
    } catch (erro) {
        console.log(erro)
    }
}

//DELETE

async function deletaMulher(request, response) {

    try {

        await Mulher.findByIdAndDelete(request.params.id)

        response.json({ messagem: 'Mulher deletada com sucesso!'})

    } catch(erro) {

        console.log(erro)

    }

}

app.use(router.get('/mulheres', mostraMulheres))
app.use(router.post('/mulheres', criaMulher))
app.use(router.patch('/mulheres/:id', corrigeMulher))// configurei a rota PATH/mulheres
app.use(router.delete('/mulheres/:id', deletaMulher))//rota delete
app.listen(porta, mostraPorta )