//Simple Banking System

//class to creat objects of the wallets
class wallet {
    constructor(type, balance) {
        this.type = type,
        this.balance = balance;
    }

    checkBalance(){
        console.log(`${this.type} balance: $${this.balance}`)
    }
}

// The two wallets
const mainWallet = new wallet("main", 100000);
const savingsWallet = new wallet("savings", 0);

function deposit(from, amount){
    mainWallet.balance += amount
    console.log(`You have successfully deposited $${amount} to main wallet`)
}

function withdraw(amount){
    if(amount > mainWallet.balance){
        window.alert("Insuficient Fund")
    }else{
        mainWallet.balance -= amount;
        console.log(`You have successfully withdrawn $${amount}`)
    }
}

function updateBalance(){}

deposit("bank", 30);
mainWallet.checkBalance()

//withdraw(40000000);
mainWallet.checkBalance()