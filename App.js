//Express
const express = require("express")
const fs = require("fs")
const port = 3004



const app = express()

//zadania 
const zad1 = require('./endpoints/zad1')
const zad2 = require('./endpoints/zad2')
const zad3 = require('./endpoints/zad3')
const zad4Search = require('./endpoints/zad4_search')
const zad4vCard = require('./endpoints/zad4_vCard')

app.use(express.json()) 
app.use(express.urlencoded({ extended: true }))
app.use("/strona", express.static(__dirname + '/strona'))

app.get("/search/:name", zad4Search.searchStaff)

app.use("/vcards", express.static(__dirname +'/endpoints/vcards'))
app.post("/vCard",zad4vCard.generateVCard)
app.get("/vCard",)

app.get("/checkletters/:str", zad2.parseString)

app.get("/download/ics/:year/:month", zad3.generateICS)

app.get("/:rev", zad1.stringRev)

app.listen(port, () => {
    console.log(`Endpoint na porcie:${port}`);
})