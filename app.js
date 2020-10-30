// Dependencies:
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// Variables for the path for team.html file
const OUTPUT_DIR = path.resolve(__dirname, "./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Include module from htmlRenderer.js
const myRender = require("./lib/htmlRenderer");
const employees = [];

// Prompts for manager:
console.log("Let's build a Team!!!!!");
inquirer.prompt([
    {
        name: "managerName",
        type: "input",
        message: "What is the manager's name?",
    },
    {
        name: "managerId",
        type: "input",
        message: "What is the manager's id?",
    },
    {
        name: "managerEmail",
        type: "input",
        message: "What is the manager's email address?",
    },
    {
        name: "officeNumber",
        type: "input",
        message: "What is the manager's office number?",
    },

]).then((answer) => {
    // A new manager is made and pushed into the empty employees object:
    const manager = new Manager(
        answer.managerName,
        answer.managerId,
        answer.managerEmail,
        answer.officeNumber
    );
    console.log(`${answer.managerName} has been added.`);
    employees.push(manager);
    // Function call to initiate the next set of questions or to generate the html file for the team:
    nextMember();
});
// If user chooses to add an engineer employee and associated prompts:
function addEngineer() {
    inquirer.prompt([
        {
            name: "engineerName",
            type: "input",
            message: "Enter the engineer's name."
        },
        {
            name: "engineerId",
            type: "input",
            message: "Enter the engineer's id."
        },
        {
            name: "engineerEmail",
            type: "input",
            message: "Enter the engineer's email address."
        },
        {
            name: "github",
            type: "input",
            message: "Enter the engineer's GitHub username."
        },
    ]).then((answer) => {
        // A new engineer is created and info is pushed to employee object   
        const engineer = new Engineer (
            answer.engineerName,
            answer.engineerId,
            answer.engineerEmail,
            answer.github
        );
        console.log(`${answer.engineerName} has been added.`);
        employees.push(engineer);
        nextMember();
    });
};
// If user chooses to add an intern employee and associated prompts:
function addIntern() {
    inquirer.prompt([
        {
            name: "internName",
            type: "input",
            message: "Enter the intern's name."
        },
        {
            name: "internId",
            type: "input",
            message: "Enter the intern's id: "
        },
        {
            name: "internEmail",
            type: "input",
            message: "Enter the intern's email address: "
        },
        {
            name: "school",
            type: "input",
            message: "Enter the name of the intern's school: "
        },
    ]).then((answer) => {
        const intern = new Intern(
            answer.internName,
            answer.internId,
            answer.internEmail,
            answer.school
        );
        console.log(`${answer.internName} has been added.`);
        employees.push(intern);
        nextMember();
    });
};
// Function that asks what type of employee you want to add:
function nextMember() {
    inquirer.prompt([
        {
            name: "newRole",
            type: "list",
            message: "Choose the next member of your team:",
            choices: ["Add an Engineer", "Add an Intern", "My team is complete"],
        },
    ]).then(function (answer) {
        if (answer.newRole === "Add an Engineer") {
            addEngineer();
        } else if (answer.newRole === "Add an Intern") {
            addIntern();
        } else {
            // If no other employees to add, a call to use the html render function for completed team
            fs.writeFileSync(outputPath, myRender(employees));

            console.log('Your team has been saved!');
        };
    });
};

