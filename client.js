console.log(`'ello world`);

$(handleStart);

let employeeList = [];

function handleStart() {
    console.log(`innit`);

    $(`#submitButton`).on(`click`, addEmployee);
    $(`#submitButton`).on(`click`, monthlySal);
    $(`#tableBody`).on(`click`, `.fireButton`, fireEmployee);
};

function addEmployee() {

    const employee = {
        firstName: $(`#firstNameButton`).val(),
        lastName: $(`#lastNameButton`).val(),
        id: $(`#idNumButton`).val(),
        title: $(`#titleButton`).val(),
        annualSalary: $(`#annualSalaryButton`).val()
    };

    employeeList.push(employee);
    employeeToTable();

    $(`#firstNameButton`).val('')
    $(`#lastNameButton`).val('')
    $(`#idNumButton`).val('')
    $(`#titleButton`).val('')
    $(`#annualSalaryButton`).val('')

}

function employeeToTable() {

    $(`#tableBody`).empty();

    for (let employee of employeeList) {
        const info = $(`
        <tr>
            <td>${employee.firstName}</td>
            <td>${employee.lastName}</td>
            <td>${employee.id}</td>
            <td>${employee.title}</td>
            <td>${employee.annualSalary}</td>
            <td><button class="btn btn-warning fireButton" id="fireButton">Fire</button></td>
        </tr>
        `);
        $(`#tableBody`).append(info);

    };
}


function monthlySal() {
    $(`.monthlyCost`).empty();

    let allAnnualSal = 0;
    let monthlySalary;

    for (let employee of employeeList) {

        let annualSal = employee.annualSalary;
        console.log('annualSal', annualSal);

        let divByTwelve = (annualSal / 12);
        console.log('divByTwelve', divByTwelve);

        allAnnualSal += divByTwelve;
        console.log(allAnnualSal);

        if (allAnnualSal > 20000) {
            $(`.monthlyCost`).addClass('overTwentyK');
        };

        monthlySalary = `
     <p> Total Monthly: ${formatCurrency(allAnnualSal)} </p>
        `;

        console.log(typeof monthlySalary);

    }
    $(`.monthlyCost`).append(monthlySalary);
};


function fireEmployee() {
    console.log('get fired lol');

    let indexVar = $(this).closest(`tr`).index();
    employeeList.splice(indexVar, 1);
    $(this).closest(`tr`).remove();

}

function formatCurrency(number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2,
    }).format(number);
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}