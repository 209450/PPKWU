//Express
const express = require("express")
const fs = require("fs")
const port = 3004

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

app.listen(port, () => {
    console.log(`Endpoint na porcie:${port}`);
})