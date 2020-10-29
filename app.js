const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "./output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const employees = [];

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
inquirer.prompt([
    {
        name: "managerName",
        type: "input",
        message: "What is your manager's name?",
    },
    {
        name: "managerId",
        type: "input",
        message: "What is your manager's id?",
    },
    {
        name: "managerEmail",
        type: "input",
        message: "What is your manager's email address?",
    },
    {
        name: "officeNumber",
        type: "input",
        message: "What is your manager's office number?",
    },

]).then((answer) => {
    const manager = new Manager(
        answer.managerName,
        answer.managerId,
        answer.managerEmail,
        answer.officeNumber
    );
    console.log(`${answer.managerName} has been added.`);
    employees.push(manager);
    nextMember();
});
function addEngineer(){
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
            const engineer = new Engineer(
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
function addIntern(){
    inquirer.prompt([
        {
            name: "internName",
            type: "input",
            message: "Enter the intern's name."
        },
        {
            name: "internId",
            type: "input",
            message: "Enter the intern's id."
        },
        {
            name: "internEmail",
            type: "input",
            message: "Enter the intern's email address."
        },
        {
            name: "school",
            type: "input",
            message: "Enter the name of the intern's school."
        },
    ]).then((answer) => {
            console.log(answer.internName);
            const intern = new Intern (
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
            render;
            fs.writeFileSync(outputPath);
            // fs.appendFileSync(outputPath, html);
            console.log('Team saved!');
            
            };
        });
    };

