var fetch = require('node-fetch')
var {htmlDOMfromURL} = require('./zad3')

const weeiaStaffSearchURL = 'https://adm.edu.p.lodz.pl/user/users.php'

searchStaff = async (req, res) =>{
    const name = req.params.name
    const url = weeiaStaffSearchURL + name
    const document = await htmlDOMfromURL(url)

    events = []
    let active = document.querySelectorAll("td.active")
    active.forEach(element => {
        day = element.querySelector(":scope a.active").innerHTML
        title = element.querySelector(":scope p").innerHTML
        events.push(ICSEvent(title, year, month, day))
    })
}




module.exports = {searchStaff}