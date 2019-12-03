const urlSearch = 'http://localhost:3004/strona/'

window.onload = async () => {

    const urlParams = new URLSearchParams(window.location.search);
    const myParam = urlParams.get('search');
    console.log([myParam])

    let staffJson
    getStaffInfo(urlSearch,staffJson)

    console.table(staffJson)

    document.getElementById("submit-search-button").onclick = () => {
        console.log("aaa")
    }
}



getStaffInfo = async (url, json) => {
    await fetch(url).then((res) => {
        json = res.json()
    })
}