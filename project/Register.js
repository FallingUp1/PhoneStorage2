"use strict";
var users = JSON.parse(localStorage.getItem('users'));

const signInBtn = document.querySelector('.signin-btn');
const signUpBtn = document.querySelector('.signup-btn');
const formBox = document.querySelector('.form-box');
const body = document.body;


let LoginPoleLogin = document.querySelector("#PoleDlyaLogina");
let LoginPolePassword = document.querySelector("#PoleDlyaPassword");
let LoginKnopkaEnter = document.querySelector("#EnterButton");
let LoginMessage = document.querySelector(".form__messageSignin");

let RegisterPoleName = document.querySelector("#RegistrPoleName");
let RegisterPoleLogin = document.querySelector("#RegisterPoleLogin");
let RegisterPolePassword = document.querySelector("#RegisterPolePassword");
let RegisterPoleRepeatPassword = document.querySelector("#RegisterPoleRepeatPassword");
let RegisterButton = document.querySelector("#RegistrButton");
let RegisterMessage = document.querySelector(".form__messageSignup");



signUpBtn.addEventListener('click',function () {
    formBox.classList.add('active');
    body.classList.add('active');
});

signInBtn.addEventListener('click',function() {
    formBox.classList.remove('active');
    body.classList.remove('active');
});



RegisterButton.addEventListener('click',Register); 


    function Register(json){

    let Name = RegisterPoleName.value;
    let Login = RegisterPoleLogin.value;
    let Password = RegisterPolePassword.value;

    fetch('https://dummyjson.com/users')
    .then((response) => response.json())
    .then((json) => jsonRegister(json,Name,Login,Password));
}

function jsonRegister(json,Name,Login,Password){
    let AllUsers = json.users;
    let Proverka = false;

    console.log(AllUsers)

    for (const user of AllUsers){
        if (Login == user.username){
            Proverka = true
        }
    }
    if(Proverka != true){
        fetch('https://dummyjson.com/users/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            firstName: Name,
            username: Login,
            password: Password
          })
          })
          .then(res => res.json())
          .then(console.log);
           alert("Вы зарегистрировались")
    }
    else{
        alert("Такой пользователь уже существует")
        Proverka = false;
       }
}



LoginKnopkaEnter.addEventListener('click',json1); 

let jsonUser;

function json1(){

let Login = LoginPoleLogin.value;
let Password = LoginPolePassword.value;

fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: Login,
      password: Password,
    })
  })
.then((response) => response.json())
.then((json) => ShowUsers(json));
}

function ShowUsers(json){
    jsonUser = json;
    if (json.message == "Invalid credentials"){
        alert("Неверные данные")
    }
        else
        {
            localStorage.setItem('token',jsonUser.token)
            localStorage.setItem('id',jsonUser.id)
            document.location.href = "index.html"
        }
}




