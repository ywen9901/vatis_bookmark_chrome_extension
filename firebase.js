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

const getSubCollections = firebase.functions().httpsCallable('getSubCollections');

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
    
    chrome.identity.getProfileUserInfo((userinfo) => {
        const user = userinfo.email;

        if(msg.command == 'fetchFolder') {
            getSubCollections({ docPath: 'users/' + user }).then(function(result) {
                sendResponse({ data: result.data.collections });
            }).catch(function(error) {
                console.error(error)
            });
        }
        
        if(msg.command == 'fetchPlan') {
            console.log(msg.data)
            db.collection('users').doc(user).collection(msg.data).get().then((querySnapshot) => {
                var notes = new Array();
                querySnapshot.forEach((note) => {
                    notes.push(note.id);
                })
                console.log(notes);
                sendResponse({data: notes});
            })
        }
    
        if(msg.command == 'add') {
            chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
                const url = tabs[0].url;
                console.log(`${msg.data.folder} ${msg.data.plan} ${url}`)
    
                var content = db.collection('users').doc(user).collection(msg.data.folder).doc(msg.data.plan)
                
                /// users/yww9901@gmail.com/桃園/SMTLiYlAcxhKAhlt6v7r/bookmark
                db.collection('users').doc(user).collection(msg.data.folder).doc(msg.data.plan).collection('bookmark').get().then((res) => {
                    // var size = 0;
    
                    // res.forEach((doc) => {
                    //     size = size + 1;
                    // })
    
                    // console.log(size);
    
                    var path = db.collection('users').doc(user).collection(msg.data.folder).doc(msg.data.plan).collection('bookmark').doc()
                    
                    path.set({
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
        }
    })

    return true;
    // alert(`${request} ${window.location.href}`)
    // if(msg.command == "post") {
    //     console.log("do post");
        
    // }
})