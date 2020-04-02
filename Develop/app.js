const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

const confirm = [
    {
        message: 'add an employee',
        type: 'confirm',
        name: 'confirm'
    }
]

const questions = [
    {
        type: 'list',
        name: 'role',
        choices: ["Manager", "Engineer", "Intern"]
    },
    {
        type: 'input',
        name: 'name',
        message: "what is your name"

    },
    {
        type: 'input',
        name: 'id',
        message: "what is your ID"

    },
    {
        type: 'input',
        name: 'email',
        message: 'whats your email'
    }
]

const engineerQuestions = [
    {
        type: 'input',
        name: 'github',
        message: 'what is your github'
    }
]

const managerQuestions = [
    {
        type: 'input',
        name: 'officeNumber',
        message: 'what is your office number'
    }
]

const internQuestions = [
    {
        type: 'input',
        name: 'school',
        message: 'what is your school name'
    }
]


const engineer = async (data) => {
    const res = await inquirer.prompt(engineerQuestions)
    console.log(res);
    const e = new Engineer(data.name, data.id, data.email, res.github);
    employees.push(e);
    console.log(employees);
    init();
}

const manager = async (data) => {
    const res = await inquirer.prompt(managerQuestions)
    console.log(res);
    const e = new Manager(data.name, data.id, data.email, res.officeNumber);
    employees.push(e);
    console.log(employees);
    init();
}

const intern = async (data) => {
    const res = await inquirer.prompt(internQuestions)
    console.log(res);
    const e = new Intern(data.name, data.id, data.email, res.school);
    employees.push(e);
    init();
}

const exit = async (data) => {
    fs.writeFile('./templates/team.html', render(), function (err) {
        if (err) throw err;
        console.log('team website created!');
    });
}

const init = async () => {
    const choice = await inquirer.prompt(confirm)
    if (choice.confirm) {
        const res = await inquirer.prompt(questions)
        switch(res.role){
            case 'Manager':
                return console.log(res)
            case 'Engineer':
                return console.log(res)
            case 'Intern':
                return console.log(res)
            default:
                console.log('default')
                break;
        }
    } else {
        console.log("please just enter something");
    }
    exit(res);
}

init()