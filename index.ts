
import inquirer from "inquirer";
import { faker } from '@faker-js/faker';

///requirment
// 1 - user data = done
// 2- atm machine = done
// 3- machine functinality = 


/// user data

interface User {
    id : number,
    pin: number,
    Name:string,
    AccountNumber: number,
    Balance:number
}

const CreateUser =()=>{
    let users :User[]  = []

    for(let i = 0; i <5 ; i++){
        let user: User ={
            id: i,
            pin: 1000 + i ,
            Name:faker.person.fullName(),
            AccountNumber:Math.floor(1000000 * Math.random()*900000),
            Balance:100000 +i

        }
        users.push(user)
    }
    return users

    
};

/// ATM machine

let AtmMachine = async( users :User []) => {
    const res = await inquirer.prompt({
          type:"number",
          message:"write a pin code",
          name:"pin"


    })
    
    const user = users.find(val => val.pin == res.pin)
    if(user){
        console.log(`welcome ${user.Name}`);
        atmFunc(user)
        return
    }
    else{
        console.log("invalid user pin");
        
    }
    

}

// Atm Function
 const atmFunc =async (user:User) =>{
    const ans = await inquirer. prompt({
        type:"list",
        name:"select",
        message:"what do you want",
        choices: ["withdraw" , "balance" , "exit" ,"deposite"]

    })

    // withdraw
    if(ans.select == "withdraw"){
        const amount = await inquirer.prompt({
            type:"number",
            name:"rupee",
            message:"enter a amount"
        })
        if(amount.rupee > user.Balance){
            return console.log("insufficuent balance");
        }

        if(amount.rupee > 25000){
            return console.log("you dont withdraw greater than 25000");
        }
            console.log(`withdraw amount : ${amount.rupee}`);
            console.log(`REmaining balance : ${user.Balance - amount.rupee}`);
    

 }

 /// balance

 if(ans.select == "balance"){
    console.log(`your current balance : ${user.Balance}`);
    return
 }


  ///deposite 

if(ans.select == "deposite"){
    const userDeposite = await inquirer.prompt({
        type:"number",
        message:"your deposite amount",
        name:"rupee"

    })
    console.log(`your deposite amount  is: ${userDeposite.rupee}`);
    console.log(`After deposite your total amount   is : ${userDeposite.rupee + user.Balance}`);
 }

 /// exit 

if(ans.select == "exit"){
    console.log("thanks for using ATM");
 }



}










const users = CreateUser();
AtmMachine(users);


