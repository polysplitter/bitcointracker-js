'use-strict'
const express = require('express')
const request = require('request')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.sendfile(__dirname + "/index.html")
})

app.post('/', (req, res, next) => {
    let crypto = req.body.crypto
    let fiat = req.body.fiat

    let baseURL = 'https://apiv2.bitcoinaverage.com/convert/global'

    let options = {
        url: baseURL,

    }
    
    request(options, (error, response, body) => {
        const data = JSON.parse(body)
        let price = data.last

        let currentDate = data.display_timestamp

        res.write(`<p>The current date is ${currentDate}</p>`)
        res.write(`<h1>The price of ${crypto} is: ${price} ${fiat}</h1>`)
        res.send()
    })
})

app.listen(3000, () => {
    console.log('server is running on port: 3000')
})