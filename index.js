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

    if(amount.value != ""){
        account.balance += Number(amount.value);
    
        localStorage.setItem("account", JSON.stringify(account))


        closeForm();
        showInfo(`You have Successfully deposited the sum of $${amount.value}`);

        const balance = document.getElementById("balance");
        
        if(balance.textContent != "****.**"){
            balance.textContent = `$${account.balance}`;
        }
    }
}

function withdraw(){

    const amount = document.getElementById("depositAmount");
    const account = JSON.parse(localStorage.getItem("account"));

    if(amount.value != ""){
        if(amount.value <= account.balance){
            account.balance -= Number(amount.value);
            localStorage.setItem("account", JSON.stringify(account))

            closeForm();
            showInfo(`You have Successfully withdrawn the sum of $${amount.value}`);

            const balance = document.getElementById("balance");
            if(balance.textContent != "****.**"){
                balance.textContent = `$${account.balance}`;
            }
        }else{
            showInfo("Baba! you dey whine, check amount way you put o")
            closeForm();
            document.getElementById("infoText").style.color = "red"
        }
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
    document.getElementById("Form").style.display = "none";
}

function showDashboard(){
    dashboard.style.display = "flex";
    accountContainer.style.display = "none";

    const account = JSON.parse(localStorage.getItem("account"));
    const userChar = document.getElementById("userChar")
    userChar.textContent = account.name;
}

function showForm(type, action){
    const transactType = document.getElementById("transactType");
    transactType.textContent = type;

    const transactAction = document.getElementById("transactAction");
    transactAction.textContent = action;

    const transactBtn = document.getElementById("transactBtn");
    transactBtn.textContent = type;

    if(type == "Deposit"){
        transactBtn.removeEventListener("click", withdraw)
        transactBtn.addEventListener("click", deposit);
    }else if(type == "Withdraw"){
        transactBtn.addEventListener("click", withdraw);
        transactBtn.removeEventListener("click", deposit)
    }

    const Form = document.getElementById("Form");
    Form.style.display = "flex"
    document.getElementById("depositAmount").value = "";

}

function showInfo(info){
    const h1 = document.createElement("h1");
    h1.textContent = info;

    h1.id = "infoText"

    informationDiv.append(h1)
    informationDiv.style.display = "block";

    setTimeout(() => {
        informationDiv.style.display = "none";
        h1.textContent = ""
    }, 4000);

    showDashboard();
}