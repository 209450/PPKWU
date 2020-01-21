var vCardsJS = require('vcards-js');
const fs = require("fs")

const vcardsPath = __dirname + '/vcards/'

generateLinkToVCard = (req, res) =>{
    const vCard = vCardsJS();

    const reqJson = req.body 
    for(key in reqJson){
        vCard[key] = reqJson[key]
    }

    // console.log(vCard.getFormattedString())
    try{
        const fileName = `${vCard.firstName}_${vCard.lastName}_${Date.now()}.vcf`
        const filePath = vcardsPath + fileName

        fs.writeFileSync(filePath, vCard.getFormattedString(),'utf8')
        res.json({fileName})
        // setTimeout(()=> fs.unlinkSync(vcardsPath + fileName), 3000)
    }
    catch(error){
        console.log(error)
        res.status(400)
        res.send("vCard file generation error!")
    }
}

module.exports = {generateVCard: generateLinkToVCard}