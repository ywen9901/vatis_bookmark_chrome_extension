document.addEventListener('DOMContentLoaded', () => {
    // const bg = chrome.extension.getBackgroundPage()
    // Object.keys(bg.bears).forEach((url) => {
    //     const div = document.createElement('div')
    //     div.textContent = `${url}: ${bg.bears[url]}`
    //     document.body.appendChild(div)
    // })

    document.getElementById('btn').addEventListener('click', onclick, false)
    
    function onclick() {
        const bg = chrome.extension.getBackgroundPage()
        var e = document.getElementById("selector");
        var strUser = e.options[e.selectedIndex].text;
        bg.console.log(strUser)
        // chrome.tabs.query(
        //     {currentWindow: true, active: true},
        //     function(tabs) {
        //         chrome.tabs.sendMessage(tabs[0].id, strUser)
        //     }
        // )
        chrome.runtime.sendMessage(strUser);
    }

    // function setCount(res) {
    //     const div = document.createElement('div')
    //     div.textContent = `${res.count} bears`
    //     document.body.appendChild(div)
    // }
}, false)