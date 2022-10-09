import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getDatabase, ref, set, onValue, get, update } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-database.js";
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

const login = document.getElementById('login');
login.addEventListener('click',loginpressed);
function loginpressed(){
    var username = document.getElementById('username').value
    var mail = document.getElementById('mail').value
    var  pass = document.getElementById('pass').value
    var lang = document.getElementById('lang').value
    if(validateusername(username) == false){
        alert('username should be greater than 6 characters');
        return
    }
    if(validatemail(mail) == false){
        alert('email is not in correct format')
        return
    }
    if(validatepass(pass) == false){
        alert('password should be greater than 8 characters ')
        return
    }
    if(lang == null){ return}

    signInWithEmailAndPassword(auth, mail, pass)
        .then((udata)=>{
            const user  = udata.user;
            const fus = ref(db, 'users/'+username);
            onValue(fus,(snapshot) => {
                    if(snapshot.exists()){
                        if(snapshot.val().Mail == mail){
                            sessionStorage.setItem("username", username);
                            alert('user signed in successfully');
                            update(ref(db, 'users/'+username),{
                                Lang : lang
                            });
                            window.location.href = "translate.html";
                        }else{
                            alert('wrong username');
                        }
                        //console.log("daataa undi")
                    }else{
                        console.log('no data available');
                    }
                });
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        });
}
// validation of password
function validatepass(password){
    if(password < 8){
        return false;
    }else{
        return true;
    }
}
// validation of mail
function validatemail(mail){
    var expression = /^[^@]+@\w+(\.\w+)+\w$/
    if( expression.test(mail) == true){
        return true;
    }else{
        return false;
    }
}
// validation of username and fullname
function validateusername(username){
    if(username == null ){
        return false;
    }
    if(username.length < 6 ){
        return false;
    }else{
        return true;
    }
}
function validatefullname(fullname){
    if(fullname == null ){
        return false;
    }
    if(fullname.length < 6 ){
        return false;
    }else{
        return true;
    }
}