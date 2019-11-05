//Express
const express = require("express")
const fs = require("fs")
const port = 3004

var async = require('express-async-await')
var fetch = require('node-fetch')
var jsdom = require("jsdom")

const app = express()

const specialChars = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g

app.get("/:rev", (req, res) => {
    const stringRev = req.params.rev
    let stringToSend = [...stringRev].reverse().join('')
    res.send(stringToSend)
})

app.get("/checkletters/:str", (req, res) => {
    const stringRev = req.params.str
    const lower = /[a-z]/.test(stringRev)
    const upper = /[A-Z]/.test(stringRev)
    const special = specialChars.test(stringRev)
    const result = { lowerCase: lower, uppercase: upper, special: special }
    res.send(result)
})

app.get("/download/ics", async (req, res) => {
    let htmlres
    await fetch("http://www.weeia.p.lodz.pl")
        .then((res) => res.text())
        .then((html) => htmlres = html)
        .catch((err) => console.log(err))

    const dom = new jsdom.JSDOM(htmlres)
    const document = dom.window.document

    let active = document.querySelectorAll("td.active")
    active.forEach(element => {
        console.log(element.querySelector(":scope a.active").innerHTML)
        console.log(element.querySelector(":scope p").innerHTML)
    });
})

app.listen(port, () => {
    console.log(`Endpoint na porcie:${port}`);
})