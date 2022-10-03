const express = require('express')
const axios = require('axios')
const moment = require('moment')

const app = express()
const PORT = 3000
const HOST = '0.0.0.0'
const API = 'https://resultados.tse.jus.br/oficial/ele2022/544/dados-simplificados/br/br-c0001-e000544-r.json'

moment.locale('pt-br')

async function candidates(){

  const returnCandidates = await getCandidates()

  let nowMoment = moment().calendar()
  console.log(`----------${nowMoment}----------`)

  for (let index = 0; index < returnCandidates.length; index++) {

    console.log(`${index + 1} - CANDIDATO: ${returnCandidates[index].nm} | VOTOS: ${returnCandidates[index].vap} | PERCENTUAL: ${returnCandidates[index].pvap}`)

  }

}

async function getCandidates(){

  let result = null

  await axios.get(API)
  .then(response => {
    result = response.data.cand
  }).catch(error => {
    console.log(error)
  })

  return result
}

app.listen(PORT, HOST, () => {

  setInterval(function() {
    candidates()
  }, 5000);

  console.log(`🚀 Back-end started! ${HOST}:${PORT}`)

})