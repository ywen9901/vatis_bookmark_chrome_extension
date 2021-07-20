document.addEventListener('DOMContentLoaded', () => {
    // const bg = chrome.extension.getBackgroundPage()
    // Object.keys(bg.bears).forEach((url) => {
    //     const div = document.createElement('div')
    //     div.textContent = `${url}: ${bg.bears[url]}`
    //     document.body.appendChild(div)
    // })

    chrome.runtime.sendMessage({command: "fetchFolder"}, (response) => {
        response.data.forEach(element => {
            var select = document.getElementById('selector');
            var opt = document.createElement('option');
            opt.innerHTML = element;
            select.appendChild(opt);
        });
    });
    
    document.getElementById('selector').addEventListener('change', onchange, false)

    function onchange() {
        console.log('changed')
        const bg = chrome.extension.getBackgroundPage()
        var e = document.getElementById("selector");
        var strUser = e.options[e.selectedIndex].text;

        chrome.runtime.sendMessage({command: "fetchPlan", data: strUser}, (response) => {
            response.data.forEach(element => {
                var select = document.getElementById('selector2');
                var opt = document.createElement('option');
                opt.innerHTML = element;
                select.appendChild(opt);
            });
        });
    }

    document.getElementById('btn').addEventListener('click', onclick, false)
    
    function onclick() {
        const bg = chrome.extension.getBackgroundPage()

        var folder = document.getElementById("selector");
        var folderV = folder.options[folder.selectedIndex].text;

        var plan = document.getElementById("selector2");
        var planV = plan.options[plan.selectedIndex].text;
        // chrome.tabs.query(
        //     {currentWindow: true, active: true},
        //     function(tabs) {
        //         chrome.tabs.sendMessage(tabs[0].id, strUser)
        //     }
        // )
        chrome.runtime.sendMessage({command: "add", data: {folder: folderV, plan: planV}}, (res) => {
            window.close();
        });
    }

    // function setCount(res) {
    //     const div = document.createElement('div')
    //     div.textContent = `${res.count} bears`
    //     document.body.appendChild(div)
    // }
}, false)