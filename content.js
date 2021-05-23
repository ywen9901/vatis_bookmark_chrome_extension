const firebaseConfig = {
    apiKey: "AIzaSyAB0ecInqB916tHL5nKNM2D9dSoX1J8qKU",
    authDomain: "journote-a1641.firebaseapp.com",
    projectId: "journote-a1641",
    storageBucket: "journote-a1641.appspot.com",
    messagingSenderId: "279176524141",
    appId: "1:279176524141:web:fe1671b96b7a2e576d2a64"
};

firebase.initializeApp(firebaseConfig);
console.log(firebase);

var db = firebase.firestore();
console.log(db);
  
// alert('Grrr.')
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
//     const re = new RegExp('bear', 'gi')
//     const matches = document.documentElement.innerHTML.match(re)
//     sendResponse({count: matches.length})
// })

// const re = new RegExp('bear', 'gi')
// const matches = document.documentElement.innerHTML.match(re)

// chrome.runtime.sendMessage({
//     url: window.location.href,
//     count: matches.length
// })

chrome.runtime.onMessage.addListener((request) => {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        console.log(`${request} ${url}`)

        db.collection(request).doc().set({
            url: url
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        })
        // use `url` here inside the callback because it's asynchronous!
    });

    
    // alert(`${request} ${window.location.href}`)
    // if(msg.command == "post") {
    //     console.log("do post");
        
    // }
})