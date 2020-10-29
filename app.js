const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const newTeam = [];

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
    console.log(answer.managerName);
    const manager = new Manager(
        answer.managerName,
        answer.managerId,
        answer.managerEmail,
        answer.officeNumber
    );
    console.log(`${answer.managerName} has been added.`);
    newTeam.push(manager);
    nextMember();
});
function nextMember() {
    inquirer.prompt([
        {
          name: "newRole",
          type: "list",
          message: "Choose the next member of your team:",
          choices: ["Add an Engineer", "Add an Intern", "My team is complete"],
        },
    ]).then(function (answer) {
        if (answer.choice === "Add an Engineer") {
            addEngineer();
        } else if (answer.choice === "Add an Intern") {
            addIntern();
        } else (render());
    });
};

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
            name: "engineerGithub",
            type: "input",
            message: "Enter the engineer's GitHub username."
        },
    ]).then((answer) => {
            const engineer = new Engineer(
                answer.engineerName,
                answer.engineerId,
                answer.engineerEmail,
                answer.engineerGithub
            );
            console.log(`${answer.engineerName} has been added.`);
            newTeam.push(engineer);
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
            newTeam.push(intern);
            nextMember();
    });
};
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
