//Express
const express = require("express")
const fs = require("fs")
const port = 3004

const app = express()

app.get("/:rev", (req, res) => {
    const stringRev = req.params.rev
    let stringToSend = [...stringRev].reverse().join('') 
    res.send(stringToSend)
})


app.listen(port, () => {
    console.log(`Endpoint na porcie:${port}`);
})