const inquirer = require('inquirer');
const ContactController = require("./ContactController");

module.exports = class MenuController {
    constructor(){
        this.mainMenuQuestions = [
            {
                type: "list",
                name: "mainMenuChoice",
                message: "Please choose from an option below: ",
                choices: [
                    "Add new contact",
                    "Get today's date",
                    "Exit"
                ]
            }
        ];
        this.book = new ContactController();
    }

    main(){
        console.log('Welcome to AddressBloc!');
        inquirer.prompt(this.mainMenuQuestions).then((response) => {
            switch(response.mainMenuChoice){
                case "Add new contact":
                  this.addContact();
                  break;
                case "Get today's date":
                  this.getDate();
                  break;
                case "Exit":
                  this.exit();
                default:
                  console.log("Invalid input");
                  this.main();
            }
        })
        .catch((err) => {
            console.log(err);
        });
    }

    clear(){
        console.log('\x1Bc');
    }

    addContact(){
        this.clear();
        inquirer.prompt(this.book.addContactQuestions).then((answers) => {
            this.book.addContact(answers.name, answers.phone, answers.email).then((contact) => {
                console.log("Contact added successfully!");
                this.main();
            }).catch((err) => {
                console.log(err);
                this.main();
            });
        });
    }

    getDate(){
        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        var today = new Date();
        console.log(today.toLocaleDateString("en-US", options));
        this.main();
    }

    exit(){
        console.log("Thanks for using AddressBloc!");
        process.exit();
    }

    remindMe(){
        return "Learning is a life-long pursuit";
    }
}