//Simple Banking System
const accountContainer = document.getElementById("register");
const dashboard = document.getElementById("dashboard");
const informationDiv = document.getElementById("information");
const saveUser = document.getElementById("saveUser");

//class to creat objects of the wallets
class wallet {
    constructor(name, balance) {
        this.name = name,
        this.balance = balance + 10;
    }

    checkBalance(){
        console.log(`${this.type} balance: $${this.balance}`)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("account") == null){
        accountContainer.style.display = "flex";
        regUser()
    }else{
        showDashboard();
    }
})

function regUser(){
    saveUser.addEventListener("click", () => {
        const username = document.getElementById("username").value.toUpperCase();
        const amount = document.getElementById("amount").value;

        if(username != "" && amount != ""){
            const account = new wallet(username, Number(amount));
            localStorage.setItem("account", JSON.stringify(account))
            showInfo(`Welcome to Cash Vault ${username}. You have a freebie of $10`)
        }
    })
}

function deposit(){
    const amount = document.getElementById("depositAmount");
    const account = JSON.parse(localStorage.getItem("account"));

    account.balance += Number(amount.value);
    
    localStorage.setItem("account", JSON.stringify(account))


    closeForm();
    showInfo(`You have Successfully deposited the sum of $${amount.value}`);

    const balance = document.getElementById("balance");
    
    if(balance.textContent != "****.**"){
        balance.textContent = `$${account.balance}`;
    }
}

function withdraw(amount){
    if(amount > mainWallet.balance){
        window.alert("Insuficient Fund")
    }else{
        mainWallet.balance -= amount;
        console.log(`You have successfully withdrawn $${amount}`)
    }
}

function ToogleBalance(para){
    const balance = document.getElementById("balance");
    const account = JSON.parse(localStorage.getItem("account"))
    
    if(balance.textContent == "****.**"){
        balance.textContent = `$${account.balance}`;
    }else{
        balance.textContent = `****.**`;
    }
}

function closeForm(){
    document.getElementById("despositForm").style.display = "none";
}

function showDashboard(){
    dashboard.style.display = "flex";
    accountContainer.style.display = "none";

    const account = JSON.parse(localStorage.getItem("account"));
    const userChar = document.getElementById("userChar")
    userChar.textContent = account.name;
}

function showForm(){
    const despositForm = document.getElementById("despositForm");
    despositForm.style.display = "flex"
   document.getElementById("depositAmount").value = "";
}

function showInfo(info){
    const h1 = document.createElement("h1");
    h1.textContent = info;
    informationDiv.append(h1)
    informationDiv.style.display = "block";

    setTimeout(() => {
        informationDiv.style.display = "none";
        h1.textContent = ""
    }, 2500);

    showDashboard();
}