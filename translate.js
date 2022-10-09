import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
const firebaseConfig = {
  apiKey: "AIzaSyCAo-i9wtdKXIi3xlH5pTaytk57rmh_La4",
  authDomain: "translator-sp.firebaseapp.com",
  databaseURL: "https://translator-sp-default-rtdb.firebaseio.com",
  projectId: "translator-sp",
  storageBucket: "translator-sp.appspot.com",
  messagingSenderId: "400475577102",
  appId: "1:400475577102:web:b139806fa59dba5097155f",
  measurementId: "G-YGWMKJ2MFV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const dbref = ref(db);

var picture = document.getElementById('deku');
var transbutton = document.getElementById('translate')
var inp = document.getElementById('input')
var username = sessionStorage.getItem("username")
console.log(username)
var icon = document.getElementById("icon");
icon.addEventListener('click',changetheme);
function changetheme(){
    document.body.classList.toggle("darkmode");
    if(document.body.classList.contains("darkmode")){
        icon.src = "sun.png"
    }else{
        icon.src = "moon.png"
    }
}

transbutton.addEventListener('click',buttonpressed)
function display(){
    picture.style.visibility = "hidden";
}
function buttonpressed(){
    var inpval = inp.value;
    var inplang = 'en';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'ee9724626cmsh42a8affc83784adp10e3c9jsn0dd0a4f2fd2b',
            'X-RapidAPI-Host': 'translated-mymemory---translation-memory.p.rapidapi.com'
        }
    };
    const fus = ref(db, 'users/'+username);
            onValue(fus,(snapshot) => {
                    if(snapshot.exists()){
                    
                    var outlang = snapshot.val().Lang
                    console.log(outlang)
                    
                    fetch(`https://translated-mymemory---translation-memory.p.rapidapi.com/api/get?langpair=${inplang}|${outlang}&q=${inpval}&mt=1&onlyprivate=0&de=a%40b.c`, options)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        console.log(data.responseData.translatedText)
                        let translatedtext = data.responseData.translatedText;
                        let utterance;
                        utterance = new SpeechSynthesisUtterance(translatedtext);
                        utterance.lang = outlang;
                        picture.style.visibility = "visible";
                        speechSynthesis.speak(utterance);
                        utterance.addEventListener('end', display);
                    })
                    .catch(err => console.error(err))
                    }else{
                        console.log('no data available');
                    }
                
            
                });
}
