const server =  'http://10.128.107.241:3004' // 'http://localhost:3004'
const urlSearch = `${server}/search/`
const urlVCard = `${server}/vCard`
const urlVCardsLinks = `${server}/vcards`
const mock = 'https://8927bd71-c3b2-4b04-acdf-e4fe6a5d67e3.mock.pstmn.io/staff/'

let staff

window.onload = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const url = urlSearch + replaceSpacesWithPluses(name)

    staff = await getJSON(url).then(thenUpdateLabel)
        .then(thenGenerateTableStaffTable)

}

const generateLinkToVCard = async (staffJson) => {
    return await fetch(urlVCard, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(staffJson)
    }).then((res)=>{
        return res.json()
    })
}

const getJSON = async (url) => {
    return await fetch(url).then((res) => {
        return res.json()
    }).catch((error) => {
        console.log(error)
        return {}
    })
}

const thenUpdateLabel = (staffJsonTable) => {
    updateFoundNumberHeader(staffJsonTable.length)
    return staffJsonTable
}

const thenGenerateTableStaffTable = async (staffJsonTable) => {
    const table = document.getElementById("table-results")

    generateStaffTableHeaders(table, staffJsonTable)
    for (let staffJson of staffJsonTable) {
        const newRow = document.createElement("tr")
        for (let key in staffJson) {
            const newData = document.createElement("td")
            newData.innerHTML = staffJson[key]
            newRow.appendChild(newData)
        }
        const newData = document.createElement("td")
        const file = await generateLinkToVCard(encodeJsonForVCard(staffJson))
        const link = vCardLink(`${urlVCardsLinks}/${file.fileName}`, file.fileName)
        newData.appendChild(link)
        newRow.appendChild(newData)
        table.appendChild(newRow)
    }

    return staffJsonTable
}

const generateStaffTableHeaders = (table, staffJsonTable) => {
    const newRow = document.createElement("tr")
    const firstRecord = staffJsonTable[0]
    for (let key in firstRecord) {
        const newHeader = document.createElement("th")
        newHeader.innerHTML = key
        newRow.appendChild(newHeader)
    }
    table.appendChild(newRow)
}

const vCardLink = (link, name) => {
    const vCardButton = document.createElement("a")
    vCardButton.innerHTML = 'vCard'
    vCardButton.href = link
    vCardButton.download = name
    return vCardButton
}

const updateFoundNumberHeader = (number) => {
    document.getElementById('number-results').innerHTML = `Liczba znalezionych: ${number ? number : 0}`
}

const encodeJsonForVCard = (staffJson) => {
    return {
        firstName: staffJson.firstName,
        lastName: staffJson.lastName,
        title: staffJson.title,
        organization: staffJson.affiliation
    }
}

function replaceSpacesWithPluses(string) {
    return string.replace(/\s/g, '+')
}