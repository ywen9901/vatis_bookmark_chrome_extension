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

    // var select = document.getElementById('selector');
    // var opt = document.createElement('option');
    // opt.innerHTML = '';
    // select.appendChild(opt);

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if(msg.command == 'fetch') {
        db.collection('notes').get().then((querySnapshot) => {
            var notes = new Array();
            querySnapshot.forEach((note) => {
                notes.push(note.id);
            })
            console.log(notes);
            sendResponse({data: notes});
        })
        return true;
    }

    if(msg.command == 'add') {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            console.log(`${msg.data.folder} ${url}`)

            var content = db.collection('notes').doc(msg.data.folder)
            
            db.collection('notes').doc(msg.data.folder).collection('bookmark').get().then((res) => {
                var size = 0;

                res.forEach((doc) => {
                    size = size + 1;
                })

                console.log(size);

                db.collection('notes').doc(msg.data.folder).collection('bookmark').doc(`url${size}`).set({
                    url: url
                },  { merge: true })
                .then(() => {
                    alert("Document successfully written!");
                })
                .catch((error) => {
                    alert("Error writing document: ", error);
                })
            })
        });
        return true;
    }
    
    // alert(`${request} ${window.location.href}`)
    // if(msg.command == "post") {
    //     console.log("do post");
        
    // }
})