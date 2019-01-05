'use-strict'
const express = require('express')
const request = require('request')

const app = express()

app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res, next) => {
    let crypto = req.body.crypto
    let fiat = req.body.fiat
    let amount = req.body.amount

    let baseURL = 'https://apiv2.bitcoinaverage.com/convert/global'

    let options = {
        url: baseURL,
        method: 'GET',
        qs: {
            from: crypto,
            to: fiat,
            amount: amount
        }
    }
    
    request(options, (error, response, body) => {
        const data = JSON.parse(body)
        let price = data.price

        console.log(price)

        let currentDate = data.time

        res.write(`<p>The current date is ${currentDate}</p>`)
        res.write(`<h1>${amount} ${crypto} is currently worth: ${price} ${fiat}</h1>`)
        res.send()
    })
})

app.listen(3000, () => {
    console.log('server is running on port: 3000')
})