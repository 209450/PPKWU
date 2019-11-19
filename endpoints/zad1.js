stringRev = (req, res) => {
    const stringRev = req.params.rev
    let stringToSend = [...stringRev].reverse().join('')
    res.send(stringToSend)
}

module.exports = { stringRev } 