// var list = [];
var modal 


if ((JSON.parse(localStorage.getItem('listOfUsers'))) == null) {
    var list = [];

} else {
    var list = JSON.parse(localStorage.getItem('listOfUsers'));
    // list.forEach(initialDataToTable);

}

$(document).ready(function () {

    modal = document.getElementById("myModal"); 
    var selectedRow = null;
    let form = document.getElementById("form");

    let formSubmitBtn = document.getElementById("submit");
    formSubmitBtn.addEventListener("click", formSubmit);
    // document.getElementById("add").addEventListener("click", clearForm);

    list.forEach(initialDataToTable);


    //Initial Data insertion in Table from LocalStorage
    function initialDataToTable(element, index) {
        console.log("list iterating");

        let table = document.getElementById("listTable").getElementsByTagName('tbody')[0];
        let row = table.insertRow(index);
        DataToTable(element, row);
        actionConfirmationToast("Inserted");
    }


    //DataToTable for NewEntry or data from LocalStorage
    function DataToTable(person, row) {

        row.insertCell(0).innerHTML = person.name;
        row.insertCell(1).innerHTML = person.dob;
        row.insertCell(2).innerHTML = person.address;
        row.insertCell(3).innerHTML = person.country;
        row.insertCell(4).innerHTML = person.hobbies;
        row.insertCell(5).innerHTML = `<select name="" onchange="updateGender(this)" class="edit-gender"><option value="${person.gender}">${person.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>`;
        row.insertCell(6).innerHTML = person.email;
        row.insertCell(7).innerHTML = person.role;
        row.insertCell(8).innerHTML = '<button onclick="editRow(this)" class="edit">Edit</button> <button onclick="deleteRow(this)" class="delete">Delete</button>';
    }


    //Form Submit Action
    function formSubmit(event) {
        event.preventDefault();
        const person1 = {
            name: '', dob: '', address: '', country: '', hobbies: '', gender: '', email: '', password: '', role: ''
        }
        const person = formDataProcess(person1);

        list.push(person);
        localStorage.setItem('listOfUsers', JSON.stringify(list));

        let index = list.length - 1;
        list.forEach(element => {
            console.log(element);
        });

        let table = document.getElementById("listTable").getElementsByTagName('tbody')[0];
        let row = table.insertRow(table.length);

        DataToTable(person, row);
        clearForm();
        actionConfirmationToast("Insert");

    }
});

function editRow(button) {
    selectedRow = button.parentElement.parentElement;
    console.log(selectedRow.innerHTML);
    let currIndexValue = selectedRow.rowIndex - 1;
    console.log(currIndexValue);
    console.log("Row no is " + selectedRow.rowIndex);
    resetUpdateForm(currIndexValue);

    console.log(selectedRow.cells[0].innerHTML);
}

//Getting user from list and Displaying user values in form
function resetUpdateForm(currIndexValue) {
    //Getting user from list and Displaying user values in form
    const currPerson = list[currIndexValue];
    clearForm();
    document.getElementById("reset").click();

    document.getElementById("name").value = currPerson.name;
    document.getElementById("dob").value = currPerson.dob;
    document.getElementById("address").value = currPerson.address;
    document.getElementById("email").value = currPerson.email;
    document.getElementById("country").value = currPerson.country;
    document.getElementById("gender").value = currPerson.gender;
    document.getElementById("gender").value = currPerson.gender;
    document.getElementById("password").value = currPerson.password;
    document.getElementById("role").value = currPerson.role;

    var currHobbies = currPerson.hobbies;

    let checkboxes = document.getElementsByName("hobby");

    for (let i = 0; i < checkboxes.length; i++) {
        if (currHobbies.includes(checkboxes[i].dataset.hobby)) {
            checkboxes[i].checked = true;
        }
    }

    document.getElementById("submit").style.display = "none";
    document.getElementById("update").style.display = "inline-block";
    document.getElementById("update").value = currIndexValue;
    document.getElementById("reset").value = currIndexValue;
    document.getElementById("reset").type = "button";
}


//Updating user details on-click Update button
function updateForm(button) {
    let updateIndex = button.value;
    console.log("UpIndex no is " + updateIndex);
    const person = formDataProcess(list[updateIndex]);
    // var validFormState = validateFormFields(person, "update");
    // if (validFormState == true) {
    if (true) {

        list[updateIndex] = person;
        localStorage.setItem('listOfUsers', JSON.stringify(list));

        list.forEach(element => {
            console.log(element);
        });

        let table = document.getElementById("listTable").getElementsByTagName('tbody')[0];
        let row = table.rows[updateIndex];

        DataToTable1(person, row);

        clearForm();
        // actionConfirmationMsg("Record Updated Successfully!!!");
        actionConfirmationToast("Update");


    } else {
        // event.preventDefault();
    }

}

//Gender Updation from DropDown
function updateGender(genderBox) {
    selectedRow = genderBox.parentElement.parentElement;
    
    // selectedCell = genderBox.parentElement;
    // console.log(selectedCell.innerHTML);
    let currIndexValue = selectedRow.rowIndex - 1;
    // console.log(currIndexValue);
    // console.log("Row no is " + selectedRow.rowIndex);
    // console.log(genderBox.value);

    let selectedOption = genderBox.value;
    // let genderBox = "Gender" + updateIndex;

    //Getting user from list, updating gender values, updating list and Table
    const existingPer = list[currIndexValue];
    existingPer.gender = selectedOption;
    list[currIndexValue] = existingPer;
    localStorage.setItem('listOfUsers', JSON.stringify(list));

    genderBox.innerHTML = `<select name="" onchange="updateGender(this)" class="edit-gender"><option value="${existingPer.gender}">${existingPer.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>`;
    // // actionConfirmationMsg("Gender Updated Successfully!!!");
    actionConfirmationToast("Update");
};



//Clears form
function clearForm() {

    document.getElementById("submit").style.display = "inline-block";
    document.getElementById("update").style.display = "none";
    // document.getElementById("reset").value = "";
    document.getElementById("reset").type = "reset";
    // document.getElementsByTagName("input").value = "";
    // let checkboxes = document.getElementsByName("hobby");
    // for (let i = 0; i < checkboxes.length; i++) {
    //     checkboxes[i].checked = false;
    // }

    // $("#form select").val("");
    // $("#form .feedback").html("");
    // $("#form input").val("").prop("checked", false);
    // $("#form input").removeClass("invalid-field valid-field");
    // $("#form select").removeClass("invalid-field valid-field");
    document.getElementById("reset").click();


}


//Form Data Processing for adding or updating user 
function formDataProcess(person) {

    let name = document.getElementById("name").value;
    let dob = document.getElementById("dob").value;
    let address = document.getElementById("address").value;
    let email = document.getElementById("email").value;
    let country = document.getElementById("country").value;
    let gender = document.getElementById("gender").value;
    let password = document.getElementById("password").value;
    let role = document.getElementById("role").value;

    let hobbiesArray = [];
    let checkboxes = document.getElementsByName("hobby");
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            hobbiesArray.push(checkboxes[i].value);
        }
    }
    console.log(hobbiesArray);

    person.name = name;
    person.dob = dob;
    person.address = address;
    person.email = email;
    person.country = country;
    person.gender = gender;
    person.password = password;
    person.role = role;
    person.hobbies = hobbiesArray;

    return person;
}

//DataToTable
function DataToTable1(person, row) {
    row.cells[0].innerHTML = person.name;
    row.cells[1].innerHTML = person.dob;
    row.cells[2].innerHTML = person.address;
    row.cells[3].innerHTML = person.country;
    row.cells[4].innerHTML = person.hobbies;
    row.cells[5].innerHTML = `<select name="" onchange="updateGender(this)" class="edit-gender"><option value="${person.gender}">${person.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>`;
    row.cells[6].innerHTML = person.email;
    row.cells[7].innerHTML = person.role;
    row.cells[8].innerHTML = '<button onclick="editRow(this)" class="edit">Edit</button> <button onclick="deleteRow(this)" class="delete">Delete</button>';
}


//Action status display using Toast - Insert/Update/Delete message
function actionConfirmationToast(msg) {
    // document.getElementById("toast").style.display = "block";
    document.getElementById("toast").style.display = "block";
    document.getElementById("toast-header").innerHTML = '<strong class="me-auto">' + msg + ' operation</strong><button type="button" class="btn-close" onclick="toastClose()" data-bs-dismiss="toast" aria-label="Close"></button>';
    document.getElementById("toast-body").innerHTML = 'Record ' + msg + 'd successfully!!!';
    const toastTimeOut = setTimeout(removeActionMsg, 5000);
    function removeActionMsg() {
        toastClose();
        clearTimeout(toastTimeOut);
    }
}

//close tost notification
function toastClose() {
    document.getElementById("toast").style.display = "none";
    document.getElementById("toast-header").innerHTML = "";
    document.getElementById("toast-body").innerHTML = "";
    // $(".toast").hide();
    // $(".toast-header").html("");
    // $(".toast-body").html("");

};

//Model-PopUp for before deletion
function deleteRow(button) {

    selectedRow = button.parentElement.parentElement;
    console.log(selectedRow.innerHTML);
    let currIndexValue = selectedRow.rowIndex - 1;
    console.log(currIndexValue);
    console.log("Row no is " + selectedRow.rowIndex);

    // document.getElementById("myModal").style.display = "flex";
    modal.style.display = "flex";

    let modelBox = document.getElementById("modal-content");

    modelBox.innerHTML = "<p><h2>Delete Record?</h2></p>";
    modelBox.innerHTML += `<div><button id="del-yes" onclick="deleteYes(${currIndexValue})"  data-index="${currIndexValue}" class='mod-btn btn btn-danger'>Yes</button>
    <button id="del-no" onclick="deleteNo()" class="mod-btn btn btn-success" type="reset">No</button></div>`;

};

//Deletes record
function deleteYes(remIndex) {
    // let remIndex = $(this).data("index");
    console.log(remIndex);
    list.splice(remIndex, 1);
    localStorage.setItem('listOfUsers', JSON.stringify(list));
    // list.forEach(element => {
    //     console.log(element);
    // });

    let table = document.getElementById("listTable").getElementsByTagName('tbody')[0];
    let row = table.rows[remIndex];
    row.remove();
    // $(`#tbody tr:eq("${remIndex}")`).remove();
    clearForm();
    document.getElementById("myModal").style.display = "none";
    // actionConfirmationMsg("Record Deleted Successfully!!!");
    actionConfirmationToast("Delete");
}

//Aborts Delete operation & Removes PopUp
function deleteNo() {
    document.getElementById("myModal").style.display = "none";

};

// // Aborts Delete operation & Removes PopUp
// window.onclick = function (event) {
//     console.log("window clicked");
//     let modal = document.getElementById("myModal");
//     if (document.getElementById("myModal").style.display !== "none") {
//         document.getElementById("myModal").style.display = "none";
//     }
// }

