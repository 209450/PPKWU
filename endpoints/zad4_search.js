var fetch = require('node-fetch')
var { htmlDOMfromURL } = require('./zad3')

const weeiaStaffSearchURL = 'https://adm.edu.p.lodz.pl/user/users.php?search='

searchStaff = async (req, res) => {
    let name = req.params.name
    const url = tryMakeUrlQuery(weeiaStaffSearchURL, name)

    const document = await htmlDOMfromURL(url)
    userInfo = document.querySelectorAll('div.user-info')

    let resultJson = []
    for (let info of userInfo) {
        const name = info.querySelector('h3 a').innerHTML
        const nameSplited = name.split(" ")
        const firstName = nameSplited[0]
        const lastName = nameSplited[1]
        const title = info.querySelector('h4').innerHTML
        const affiliation = info.querySelector('span.item-content').innerHTML
        resultJson.push({firstName, lastName, title, affiliation})
    }

    res.json(resultJson)
}

function tryMakeUrlQuery(url, params) {
    try {
        let queryParams = replaceSpacesWithPluses(params)
        return url + queryParams
    }
    catch (error) {
        return url
    }
}

function replaceSpacesWithPluses(string) {
    return string.replace(/\s/g, '+')
}



module.exports = { searchStaff }