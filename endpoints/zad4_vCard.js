
generateVCard = (req, res) =>{
    console.log(req.body)
    // res.send("xd")
    res.json(req.body)
}

module.exports = {generateVCard}