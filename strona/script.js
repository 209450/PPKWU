const urlSearch = 'http://localhost:3004/search/'
const urlVCard = 'http://localhost:3004/vCard'
const mock = 'https://8927bd71-c3b2-4b04-acdf-e4fe6a5d67e3.mock.pstmn.io/staff/'

window.onload = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name');
    const url = urlSearch + replaceSpacesWithPluses(name)

    console.log(url)

    await getJSON(url).then(thenUpdateLabel)
        .then(thenGenerateTableStaffTable)
        .then(thenAvaibleVCardGenerationButton)

    document.getElementById("submit-search-button").onclick = () => {
        console.log("aaa")
    }
}

const generateVCard = () => {
    fetch(urlVCard, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ aa: 53 })
    })
}

const getJSON = async (url) => {
    return await fetch(url).then((res) => {
        return res.json()
    }).catch((error) => {
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
        table.appendChild(newRow)
    }

    return staffJsonTable
}

const thenAvaibleVCardGenerationButton = (staffJsonTable) => {
    const container = document.getElementById("search-results")
    const button = document.createElement("button")
    button.className = 'submit-button'
    button.innerHTML = 'Ściągnij vCard'
    button.onclick = (event) => generateVCard()
    container.appendChild(button)

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




const updateFoundNumberHeader = (number) => {
    document.getElementById('number-results').innerHTML = `Liczba znalezionych: ${number ? number : 0}`
}

function replaceSpacesWithPluses(string) {
    return string.replace(/\s/g, '+')
}