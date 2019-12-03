//Express
const express = require("express")
const fs = require("fs")
const port = 3004



const app = express()

//zadania 
const zad1 = require('./endpoints/zad1')
const zad2 = require('./endpoints/zad2')
const zad3 = require('./endpoints/zad3')
const zad4 = require('./endpoints/zad4')

app.use("/strona", express.static(__dirname + '/strona'))

app.get("/search", zad4.searchStaff)

app.get("/:rev", zad1.stringRev)

app.get("/checkletters/:str", zad2.parseString)

app.get("/download/ics/:year/:month", zad3.generateICS)


app.listen(port, () => {
    console.log(`Endpoint na porcie:${port}`);
})