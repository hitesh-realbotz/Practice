var modal;

if ((JSON.parse(localStorage.getItem('listOfUsers'))) == null) {
    var list = [];

} else {
    var list = JSON.parse(localStorage.getItem('listOfUsers'));
}

$(document).ready(function () {

    modal = document.getElementById("myModal");

    // let form = document.getElementById("form");

    //Event Listeners
    document.getElementById("submit").addEventListener("click", formSubmit);
    document.getElementById("eye").addEventListener("click", togglePassWord);
    document.getElementById("name").addEventListener("blur", blurName);
    document.getElementById("dob").addEventListener("blur", blurDob);
    document.getElementById("address").addEventListener("blur", blurAddress);
    document.getElementById("email").addEventListener("blur", blurEmail);
    document.getElementById("password").addEventListener("blur", blurPassword);
    document.getElementById("country").addEventListener("change", changeCountry);
    document.getElementById("gender").addEventListener("change", changeGender);
    document.getElementById("role").addEventListener("change", changeRole);
    let hobbyelement = document.querySelectorAll("input[name='hobby']");
    for (let i = 0; i < hobbyelement.length; i++) {
        hobbyelement[i].addEventListener("change", changeHobby);
    }


    //Setting DOB's Max-Date to Current Date
    let today = new Date();
    today = today.getFullYear() + '-' + ((today.getMonth() < 10) ? ('0' + today.getMonth()) : today.getMonth()) + '-' + ((today.getDate() < 10) ? ('0' + today.getDate()) : today.getDate());
    document.getElementById("dob").max = today;


    //Initial Data insertion in List & Table from LocalStorage
    list.forEach(initialDataToTable);
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

        let validFormState = validateFormFields(person, event, "new");
        console.log("form status is " + validFormState);
        if (validFormState == true) {

            list.push(person);
            localStorage.setItem('listOfUsers', JSON.stringify(list));
            list.forEach(element => {
                console.log(element);
            });
            let table = document.getElementById("listTable").getElementsByTagName('tbody')[0];
            let row = table.insertRow(table.length);

            DataToTable(person, row);
            clearForm();
            actionConfirmationToast("Insert");
        } else {
            event.preventDefault();
        }

    }

});

//Displaying User-details in form in-click Edit Button against respective user
function editRow(button) {
    let selectedRow = button.parentElement.parentElement;
    console.log(selectedRow.innerHTML);
    let currIndexValue = selectedRow.rowIndex - 1;
    console.log(currIndexValue);
    console.log("Row no is " + selectedRow.rowIndex);
    resetUpdateForm(currIndexValue);

}

//Updating user details on-click Update button
function updateForm(button, event) {
    let updateIndex = button.value;
    console.log("UpIndex no is " + updateIndex);
    const person = formDataProcess(list[updateIndex]);
    var validFormState = validateFormFields(person, "update");
    if (validFormState == true) {
        list[updateIndex] = person;
        localStorage.setItem('listOfUsers', JSON.stringify(list));

        list.forEach(element => {
            console.log(element);
        });

        let table = document.getElementById("listTable").getElementsByTagName('tbody')[0];
        let row = table.rows[updateIndex];

        row.cells[0].innerHTML = person.name;
        row.cells[1].innerHTML = person.dob;
        row.cells[2].innerHTML = person.address;
        row.cells[3].innerHTML = person.country;
        row.cells[4].innerHTML = person.hobbies;
        row.cells[5].innerHTML = `<select name="" onchange="updateGender(this)" class="edit-gender"><option value="${person.gender}">${person.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>`;
        row.cells[6].innerHTML = person.email;
        row.cells[7].innerHTML = person.role;
        row.cells[8].innerHTML = '<button onclick="editRow(this)" class="edit">Edit</button> <button onclick="deleteRow(this)" class="delete">Delete</button>';

        clearForm();
        // actionConfirmationMsg("Record Updated Successfully!!!");
        actionConfirmationToast("Update");
    } else {
        event.preventDefault();
    }

}

//Reset button
function resetForm(button, event) {
    console.log("type is  " + button.type);
    if (button.type === "reset") {
        console.log("type is reset");
        clearForm();
    } else {
        console.log("type is not reset");
        let currIndexValue = button.value;
        console.log("this.value is ====" + currIndexValue);
        resetUpdateForm(currIndexValue);
    }
}

//Getting user from list and Displaying user values in form
function resetUpdateForm(currIndexValue) {

    const currPerson = list[currIndexValue];
    clearForm();

    document.getElementById("name").value = currPerson.name;
    document.getElementById("dob").value = currPerson.dob;
    document.getElementById("address").value = currPerson.address;
    document.getElementById("email").value = currPerson.email;
    document.getElementById("country").value = currPerson.country;
    document.getElementById("gender").value = currPerson.gender;
    document.getElementById("password").value = currPerson.password;
    document.getElementById("role").value = currPerson.role;

    let currHobbies = currPerson.hobbies;
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

//Gender Updation from DropDown
function updateGender(genderBox) {
    let selectedRow = genderBox.parentElement.parentElement;
    let currIndexValue = selectedRow.rowIndex - 1;
    let selectedOption = genderBox.value;

    //Getting user from list, updating gender values, updating list and Table
    const existingPer = list[currIndexValue];
    existingPer.gender = selectedOption;
    list[currIndexValue] = existingPer;
    localStorage.setItem('listOfUsers', JSON.stringify(list));

    genderBox.innerHTML = `<select name="" onchange="updateGender(this)" class="edit-gender"><option value="${existingPer.gender}">${existingPer.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>`;
    // // actionConfirmationMsg("Gender Updated Successfully!!!");
    actionConfirmationToast("Update");
}

//Clears form
function clearForm() {
    document.getElementById("submit").style.display = "inline-block";
    document.getElementById("update").style.display = "none";
    document.getElementById("reset").type = "reset";
    document.getElementById("password").type = "password";

    let fields = document.querySelectorAll("#form input,select, .feedback");
    for (let i = 0; i < fields.length; i++) {
        fields[i].classList.remove("invalid-field", "valid-field");
        if (fields[i].className == "feedback") { fields[i].innerHTML = "" }
    }
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


//Model-PopUp for before deletion
function deleteRow(button) {

    let selectedRow = button.parentElement.parentElement;
    let currIndexValue = selectedRow.rowIndex - 1;
    modal.style.display = "flex";
    let modelBox = document.getElementById("modal-content");

    modelBox.innerHTML = "<p><h2>Delete Record?</h2></p>";
    modelBox.innerHTML += `<div><button id="del-yes" onclick="deleteYes(${currIndexValue})"  data-index="${currIndexValue}" class='mod-btn btn btn-danger'>Yes</button>
    <button id="del-no" onclick="deleteNo()" class="mod-btn btn btn-success" type="reset">No</button></div>`;
};

//Deletes record
function deleteYes(remIndex) {
    list.splice(remIndex, 1);
    localStorage.setItem('listOfUsers', JSON.stringify(list));

    let table = document.getElementById("listTable").getElementsByTagName('tbody')[0];
    let row = table.rows[remIndex];
    row.remove();
    clearForm();
    modal.style.display = "none";
    // actionConfirmationMsg("Record Deleted Successfully!!!");
    actionConfirmationToast("Delete");
}

//Aborts Delete operation & Removes PopUp
function deleteNo() {
    modal.style.display = "none";
};

// Aborts Delete operation & Removes PopUp
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


//Validation of form fields on-click Submit button
function validateFormFields(person, event, purpose) {
    let validFormFieldsArray = [];

    if (purpose == "new") {
        validFormFieldsArray.push(validateNameField(person.name, event));
    }
    validFormFieldsArray.push(validatePasswordField(person.password, event));
    validFormFieldsArray.push(validateAddressField(person.address, event));
    validFormFieldsArray.push(validateEmailField(person.email, event));
    validFormFieldsArray.push(validateHobbiesField(person.hobbies, event));
    validFormFieldsArray.push(validateGenderField(person.gender, event));
    validFormFieldsArray.push(validateCountryField(person.country, event));
    validFormFieldsArray.push(validateRoleField(person.role, event));
    validFormFieldsArray.push(validateDOBField(person.dob, event));
    console.log("Array include false value is ===== " + validFormFieldsArray.includes(false));

    return !validFormFieldsArray.includes(false);
}

{   //Fast-Validation : when input field value changes

    function blurName(event) {
        let name = this.value;
        validateNameField(name, event);
    };
    function blurDob(event) {
        let dob = this.value;
        validateDOBField(dob, event);
    };
    function blurAddress(event) {
        let address = this.value;
        validateAddressField(address, event);
    };
    function blurEmail(event) {
        let email = this.value;
        validateEmailField(email, event);
    };

    function blurPassword(event) {
        let password = this.value;
        validatePasswordField(password, event);
    };
    function changeCountry(event) {
        let country = this.value;
        validateCountryField(country, event);
    };
    function changeGender(event) {
        let gender = this.value;
        validateGenderField(gender, event);
    };
    function changeRole(event) {
        let role = this.value;
        validateRoleField(role, event);
    };
    function changeHobby(event) {
        let hobbiesArray = [];
        let checkboxes = document.getElementsByName("hobby");

        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].checked) {
                hobbiesArray.push(checkboxes[i].value);
            }
        }
        validateHobbiesField(hobbiesArray, event)
    };

}


{   //Implementation of form-field validation

    //Input elements class updation based on validation status
    function validationClassUp(add, rem, inputField) {
        inputField.classList.add(add);
        inputField.classList.remove(rem);
    }

    function validateHobbiesField(checkedHobby, event) {
        let hobbyInput = document.getElementsByName("hobby");
        if (checkedHobby.length === 0) {
            document.getElementById("hobby-feedback").innerHTML = "Select atleast one hobby";
            validationClassUp("invalid-field", "valid-field");
            return false;
        } else {
            document.getElementById("hobby-feedback").innerHTML = "";
            validationClassUp("valid-field", "invalid-field");
            return true;
        }

        // function validationClassUp(add, rem) {
        function validationClassUp(add, rem) {
            for (let i = 0; i < hobbyInput.length; i++) {
                hobbyInput[i].classList.add(add);
                hobbyInput[i].classList.remove(rem);
            }
        }
    }


    function validateCountryField(selectedCountry, event) {
        let countryInput = document.getElementById("country");
        if (selectedCountry === "") {
            document.getElementById("country-feedback").innerHTML = "Select Country";
            validationClassUp("invalid-field", "valid-field", countryInput);
            return false;
        } else {
            document.getElementById("country-feedback").innerHTML = "";
            validationClassUp("valid-field", "invalid-field", countryInput);
            return true;
        }
    }


    function validateGenderField(selectedGender, event) {
        let genderInput = document.getElementById("gender");
        if (selectedGender == "") {
            document.getElementById("gender-feedback").innerHTML = "Select Gender";
            validationClassUp("invalid-field", "valid-field", genderInput);
            return false;
        } else {
            document.getElementById("gender-feedback").innerHTML = "";
            validationClassUp("valid-field", "invalid-field", genderInput);
            return true;
        }
    }


    function validateRoleField(selectedRole, event) {
        let roleInput = document.getElementById("role");
        if (selectedRole == "") {
            document.getElementById("role-feedback").innerHTML = "Select Role";
            validationClassUp("invalid-field", "valid-field", roleInput);
            return false;
        } else {
            document.getElementById("role-feedback").innerHTML = "";
            validationClassUp("valid-field", "invalid-field", roleInput);
            return true;
        }
    }

    function validateNameField(name, event) {
        let nameInput = document.getElementById("name");

        if (!isValidName(name)) {
            document.getElementById("name-feedback").innerHTML = "Name should be unique";
            validationClassUp("invalid-field", "valid-field", nameInput);
            return false;
        } else {
            document.getElementById("name-feedback").innerHTML = "";
            validationClassUp("valid-field", "invalid-field", nameInput);
            return true;
        }
    }

    function isValidName(name) {
        let isValid = true;
        name = name.toLowerCase().trim();
        if (name == "") {
            return false;
        }

        list.forEach(checkInList);
        function checkInList(element) {
            if (element.name.toLowerCase() === name) {
                isValid = false;
            }
        }
        return isValid;
    }


    function validateDOBField(dob, event) {
        let dobInput = document.getElementById("dob");
        if (!isValidDOB(dob)) {
            document.getElementById("dob-feedback").innerHTML = "Select DOB";
            validationClassUp("invalid-field", "valid-field", dobInput);
            return false;
        } else {
            document.getElementById("dob-feedback").innerHTML = "";
            validationClassUp("valid-field", "invalid-field", dobInput);
            return true;
        }
    }

    function isValidDOB(dob) {
        return dob !== "";
    }


    function validateEmailField(email, event) {
        let emailInput = document.getElementById("email");
        if (!isValidEmail(email)) {
            document.getElementById("email-feedback").innerHTML = "Enter valid email-id";

            validationClassUp("invalid-field", "valid-field", emailInput);
            return false;
        } else {
            document.getElementById("email-feedback").innerHTML = "";
            validationClassUp("valid-field", "invalid-field", emailInput);
            return true;
        }
    }


    function isValidEmail(email) {
        let nameInput = document.getElementById("name");
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            console.log("false");
            return false;
        } else {
            console.log("okay");
            return true;
        }
    }


    function validateAddressField(address, event) {
        let addressInput = document.getElementById("address");
        if (!isValidAddress(address)) {
            document.getElementById("address-feedback").innerHTML = "Address required";
            validationClassUp("invalid-field", "valid-field", addressInput);
            return false;
        } else {
            document.getElementById("address-feedback").innerHTML = "";
            validationClassUp("valid-field", "invalid-field", addressInput);
            return true;
        }
    }

    function isValidAddress(address) {
        return address.trim() !== "";
    }


    function validatePasswordField(password, event) {
        let passwordInput = document.getElementById("password");
        if (!isValidPassword(password)) {
            document.getElementById("password-feedback").innerHTML = "Password should contain min. 6 char";
            validationClassUp("invalid-field", "valid-field", passwordInput);
            return false;
        } else {
            document.getElementById("password-feedback").innerHTML = "";
            validationClassUp("valid-field", "invalid-field", passwordInput);
            return true;
        }
    }

    function isValidPassword(password) {
        return password.length >= 6;
    }

}

//Password Visibility Toggle
function togglePassWord() {
    let passField = document.getElementById("password");
    if (passField.type === "password") {
        passField.type = "text";
        this.class = "fa fa-eye-slash password-icon";
    } else {
        passField.type = "password";
        this.class = "fa fa-eye password-icon";
    }
}

//Action status display using Toast - Insert/Update/Delete message
function actionConfirmationToast(msg) {
    document.getElementById("toast").style.display = "block";
    document.getElementById("toast-header").innerHTML = '<strong class="me-auto">' + msg + ' operation</strong><button type="button" class="btn-close" onclick="toastClose()" data-bs-dismiss="toast" aria-label="Close"></button>';
    document.getElementById("toast-body").innerHTML = 'Record ' + msg + 'd successfully!!!';
    const toastTimeOut = setTimeout(removeActionMsg, 1500);
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
};



