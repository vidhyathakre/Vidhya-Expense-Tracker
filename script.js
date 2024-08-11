const balance = document.getElementById("balance");
const money_plus = document.getElementById("money-plus");
const money_minus = document.getElementById("money-minus");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// const dummyTransactions = [
//     {id: 1, text: "Flower", amount: -20},
//     {id: 2, text: "Book", amount: -10},
//     {id: 3, text: "Salary", amount: 300},
// ];


// let transactions = dummyTransactions;


const localStorageTransactions = JSON.parse(localStorage.getItem("transactions"));

let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];


//////////////// Add transacation ////////////
function addTransaction(e){
    e.preventDefault();
    if(
        text.value.trim() === "" || amount.value.trim() === ""
    ){
        alert("Please Enter Text And Value");
    }
    else{
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value,

        };

        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();
        text.value = "";
        amount.value = "";
    }
}

function generateID(){
    return Math.floor(Math.random()*100000000);

}


// add to dom
function addTransactionDOM(transaction){
    // console.log(transaction);
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    item.classList.add(
        transaction.amount < 0 ? "minus" : "plus" 
    );

    item.innerHTML = `
    ${transaction.text}<span>${sign}${Math.abs(transaction.amount)}</span> <button class = "delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

// remove ytansactions ///
function removeTransaction(id){
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateLocalStorage();
    Init();
}


function updateValues(){
    const amounts = transactions.map(transaction => transaction.amount);

    const total = amounts.reduce((acc,item) => (acc += item),0).toFixed(2);

    const income = amounts.filter(item => item > 0).reduce((acc,item) => (acc += item),0).toFixed(2);
    
    const expense = (amounts.filter(item => item < 0).reduce((acc,item) => (acc += item),0)*-1).toFixed(2);

    balance.innerText = `Rs ${total}`;
    money_plus.innerText = `Rs ${income}`;
    money_minus.innerText = `Rs ${expense}`;
}

// update local storage
function updateLocalStorage(){
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

function Init(){
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}


Init();

form.addEventListener("submit",addTransaction);
// addTranscationDOM(transactions);