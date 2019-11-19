const specialChars = /^[a-zA-Z0-9!@#\$%\^\&*\)\(+=._-]+$/g

parseString = (req, res) =>{
    const stringRev = req.params.str
    const lower = /[a-z]/.test(stringRev)
    const upper = /[A-Z]/.test(stringRev)
    const special = specialChars.test(stringRev)
    const result = { lowerCase: lower, uppercase: upper, special: special }
    res.send(result)
}

module.exports = { parseString}