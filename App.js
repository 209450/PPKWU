//Express
const express = require("express")
const fs = require("fs")
const port = 3004

//HTML parse
var async = require('express-async-await')
var fetch = require('node-fetch')
var jsdom = require("jsdom")

//ICS generator
const ics = require('ics')

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

app.get("/download/ics/:year/:month", async (req, res) => {
    let { year, month } = req.params

    if (isNaN(year) || isNaN(month) || !Number.isInteger(Number(year)) || !Number.isInteger(Number(month)) || year <= 0 || month <= 0 || month > 12) {
        res.send("Invalid number!")
    }

    month < 10 ? month = '0' + month : month

    const document = await htmlDOMfromURL(templateWeeiaURL({ year: year, month: month }))

    events = []
    let active = document.querySelectorAll("td.active")
    active.forEach(element => {
        day = element.querySelector(":scope a.active").innerHTML
        title = element.querySelector(":scope p").innerHTML
        events.push(ICSEvent(title, year, month, day))
    });

    try {
        icsFileData = generateICSfromEvents(events)

        fileName = `weeia_${year}_${month}.ics`
        fs.writeFileSync(fileName, icsFileData)
        res.download(fileName, (err) => {
            fs.unlinkSync(fileName)
        })
    }
    catch (e) {
        res.send("ICS file generation error!")
    }

})



async function htmlDOMfromURL(url) {
    let htmlres
    await fetch(url)
        .then((res) => res.text())
        .then((html) => htmlres = html)
        .catch((err) => console.log(err))

    const dom = new jsdom.JSDOM(htmlres)
    return dom.window.document
}

function templateWeeiaURL({ year, month }) {
    return `http://www.weeia.p.lodz.pl/pliki_strony_kontroler/kalendarz.php?rok=${year}&miesiac=${month}&lang=1`
}

function generateICSfromEvents(events) {
    const { error, value } = ics.createEvents(events)
    if (error || !value) throw error
    else return value
}

function ICSEvent(title, year, month, day) {
    return { title: title, start: [year, month, day], end: [year, month, day] }
}

app.listen(port, () => {
    console.log(`Endpoint na porcie:${port}`);
})