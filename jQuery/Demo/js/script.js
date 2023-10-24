
$(document).ready(function () {

    let form = $("#form");
    enableFastFeedback(form);

    var modal = document.getElementById("myModal");

    // localStorage.clear();

    if ((JSON.parse(localStorage.getItem('listOfUsers'))) == null) {
        var list = [];

    } else {
        var list = JSON.parse(localStorage.getItem('listOfUsers'));
        initialDataToTable(list);
    }

    //Initial Data insertion in Table from LocalStorage
    function initialDataToTable(list) {
        var tableBody = $("tbody");

        list.forEach(listData);

        function listData(element, index) {
            console.log("list iterating");

            tableRow = `<tr id="${index}">`;
            tableRow += '<td>' + element.name + "</td>";
            tableRow += '<td>' + element.dob + "</td>";
            tableRow += '<td>' + element.address + "</td>";
            tableRow += '<td>' + element.country + "</td>";
            tableRow += '<td>' + element.hobbies + "</td>";
            tableRow += `<td id="Gender${index}"><select data-index="${index}" name="" class="edit-gender"><option value="${element.gender}">${element.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>`;
            // tableRow += '<td>' + element.gender + "</td>";
            tableRow += '<td>' + element.email + "</td>>";
            tableRow += '<td>' + element.role + "</td>>";
            tableRow += `<td> <button  data-index="${index}"  class='edit' >Edit</button> <button  data-index="${index}"   class='delete'>Delete</button></td>`;
            // tableRow += `<td> <button  data-index="${index}"  class='row-no btn btn-secondary' >RowNo</button></td>`;
            tableRow += `</tr>`;

            tableBody.append(tableRow);
        }
    }


    //Form Data Processing for adding or updating user 
    function formDataProcess(person) {

        var name = $("#name").val();
        var dob = $("#dob").val();
        var address = $("#address").val();
        var email = $("#email").val();
        var country = $("#country").val();
        var gender = $("#gender").val();
        var password = $("#password").val();
        var role = $("#role").val();

        var hobbiesArray = [];
        ($("#hobby1").is(":checked") ? hobbiesArray.push($("#hobby1").data("hobby1")) : "");
        ($("#hobby2").is(":checked") ? hobbiesArray.push($("#hobby2").data("hobby2")) : "");
        ($("#hobby3").is(":checked") ? hobbiesArray.push($("#hobby3").data("hobby3")) : "");

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
    function DataToTable(person, tableRow, op) {
        tableRow += '<td>' + person.name + "</td>";
        tableRow += '<td>' + person.dob + "</td>";
        tableRow += '<td>' + person.address + "</td>";
        tableRow += '<td>' + person.country + "</td>";
        tableRow += '<td>' + person.hobbies + "</td>";
        tableRow += `<td id="Gender${op}"><select data-index="${op}" name="" class="edit-gender"><option value="${person.gender}">${person.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>`;
        tableRow += '<td>' + person.email + "</td>";
        tableRow += '<td>' + person.role + "</td>";
        tableRow += `<td> <button  data-index="${op}"  class="edit" >Edit</button> <button  data-index="${op}"   class="delete">Delete</button></td>`;
        
        return tableRow;
    }


    //Password Visibility Toggle
    $("#eye").on("click", function () {
        console.log("button clicked");
        var passField = $("#password");
        if (passField.attr("type") === "password") {
            passField.attr("type", "text");
            $(this).attr("class", "fa fa-eye-slash password-icon");
        } else {
            passField.attr("type", "password");
            $(this).attr("class", "fa fa-eye password-icon");
        }
    });


    //Blank form to add new user by clicking ADD @ navbar ---- as of now default values are attached to input fields
    $("#add").on("click", clearForm);

    //Clears form
    function clearForm() {

        $("#submit").css("display", "inline-block");
        $("#update").css("display", "none");
        $("#reset").data("index", "");
        $("#reset").attr("type", "reset");

        $("#form select").val("").css("box-shadow", "");
        $("#form .feedback").html("");
        $("#form input").val("").prop("checked", false).css("box-shadow", "");

    }

    //Reset button
    $("#form").on("click", "#reset", function (event) {

        if ($("#reset").attr("type") == "reset") {
            clearForm();
        } else {
            let currIndexValue = $("#reset").data("index");
            resetUpdateForm(currIndexValue);
        }
    });



    $("#tbody").on("click", ".row-no", function () {
        var rowNumber = $(this).closest("tr");
        console.log("Row no is " + rowNumber.index());
    })

    //Shows User details in form on-click Edit button against respective user
    $("#tbody").on("click", ".edit", function () {

        var curRow = $(this).closest("tr");
        console.log("Row no is " + curRow.index());

        var currIndexValue = curRow.index();
        console.log(currIndexValue);
        resetUpdateForm(currIndexValue);

    });


    //Getting user from list and Displaying user values in form
    function resetUpdateForm(currIndexValue) {
        //Getting user from list and Displaying user values in form
        const currPerson = list[currIndexValue];
        clearForm();

        $("#name").val(currPerson.name);
        $("#dob").val(currPerson.dob);
        $("#address").val(currPerson.address);
        $("#email").val(currPerson.email);
        $("#country").val(currPerson.country);
        $("#gender").val(currPerson.gender);
        $("#password").val(currPerson.password);
        $("#role").val(currPerson.role);
        // $("#hobbies").val(currPerson.hobbies);

        var currHobbies = currPerson.hobbies;
        $("#hobby1").prop("checked", currHobbies.includes("Cricket"));
        $("#hobby2").prop("checked", currHobbies.includes("Reading"));
        $("#hobby3").prop("checked", currHobbies.includes("Writting"));

        $("#submit").css("display", "none");
        $("#update").css("display", "inline-block");
        $("#update").data("index", currIndexValue);
        $("#reset").data("index", currIndexValue);
        $("#reset").attr("type", "button");
    }


    //Updating user details on-click Update button
    $("#update").on("click", function (event) {
        let updateIndex = $("#update").data("index");

        const person = formDataProcess(list[updateIndex]);
        var validFormState = validateFormFields(person, event, "update");
        if (validFormState == true) {

            list[updateIndex] = person;
            localStorage.setItem('listOfUsers', JSON.stringify(list));

            // var tableRowEle = $(`#tbody tr:eq("${op}")`);
            var tableBody = $("tbody");
            var tableRow = "";
            console.log(tableRow);

            tableRow = DataToTable(person, tableRow, updateIndex);
            $(`#tbody tr:eq("${updateIndex}")`).html(`${tableRow}`);

            clearForm();
        } else {
            event.preventDefault();
        }

    });


    //Gender Updation from DropDown
    $("#tbody").on("change", ".edit-gender", function () {
        console.log("button clicked");

        var curRow = $(this).closest("tr");
        console.log("Row no is " + curRow.index());

        var updateIndex = curRow.index();
        console.log(updateIndex);

        // var updateIndex = $(this).data("index");
        var selectedOption = $(this).find(":selected").val();
        var genderBox = "Gender" + updateIndex;

        //Getting user from list, updating gender values, updating list and Table
        const existingPer = list[updateIndex];
        existingPer.gender = selectedOption;
        list[updateIndex] = existingPer;
        localStorage.setItem('listOfUsers', JSON.stringify(list));

        $(`#${genderBox}`).html(`<td id = "Gender${updateIndex}" > <select data-index="${updateIndex}" name="" class="edit-gender"><option value="${existingPer.gender}">${existingPer.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>`);
    });

    //Model-PopUp for before deletion
    $("#tbody").on("click", ".delete", function () {
        console.log("button clicked");
        var curRow = $(this).closest("tr");
        console.log("Row no is " + curRow.index());

        var currIndexValue = curRow.index();
        console.log(currIndexValue);

        var modelBox = $(".modal-content");
        modal.style.display = "flex";
        // modal.style.display = "block";

        modelBox.append("<p>").html("<h2>Delete Record?</h2>");

        modelBox.append(`<div><button id="del-yes"  data-index="${currIndexValue}" class='mod-btn btn btn-danger'>Yes</button> 
        <button id="del-no" class="mod-btn btn btn-success" type="reset">No</button></div>`);


        {// if (confirm(text) == true) {

            //     var currIndexValue = $(this).data("index");
            //     console.log(currIndexValue);

            //     list.splice(currIndexValue, 1);
            //     list.forEach(element => {
            //         console.log(element);
            //     });

        }
    });

    //Deletes record
    $("#myModal").on("click", "#del-yes", function () {


        var remIndex = $(this).data("index");
        console.log(remIndex);

        list.splice(remIndex, 1);
        localStorage.setItem('listOfUsers', JSON.stringify(list));

        list.forEach(element => {
            console.log(element);
        });

        var tableRow = $(`#tbody tr:eq("${remIndex}")`).html();
        tableRow = "<tr>" + tableRow + "</tr>";
        console.log(tableRow);
        $(`#tbody tr:eq("${remIndex}")`).remove();
        clearForm();
        modal.style.display = "none";
    });

    //Aborts Delete operation & Removes PopUp
    $("#myModal").on("click", "#del-no", function () {
        modal.style.display = "none";
    });

    //Aborts Delete operation & Removes PopUp
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // localStorage.clear();
    //New User entry on-click Submit button after filling input fields
    // $("#submit").on("click", function (event) {
    form.submit(function (event) {
        console.log("IN SUBMIT");
        const person1 = {
            name: '', dob: '', address: '', country: '', hobbies: '', gender: '', email: '', password: '', role: ''
        }

        const person = formDataProcess(person1);
        // let checkedHobby = $("input[name='hobby']:checked");
        // let checkedHobby = person.hobbies;

        var validFormState = validateFormFields(person, event, "new");
        console.log("form status is " + validFormState);
        if (validFormState == true) {

            list.push(person);
            localStorage.setItem('listOfUsers', JSON.stringify(list));



            index = list.length - 1;
            list.forEach(element => {
                console.log(element);
            });
            var tableBody = $("tbody");
            var tableRow = '<tr>';
            tableRow = DataToTable(person, tableRow, index);
            tableRow += "</tr>";
            tableBody.append(tableRow);


            clearForm();
            event.preventDefault();

        } else {
            event.preventDefault();
        }
    });


    //Form Fields validation before submission
    function validateFormFields(person, event, purpose) {
        let validFormFieldsArray = [];

        if (purpose == "new") {
            validFormFieldsArray.push(validateNameField(person.name, event));
        }
        validFormFieldsArray.push(validatePasswordField(person.password, event));
        validFormFieldsArray.push(validateAddressField(person.address, event));
        validFormFieldsArray.push(validateEmailField(person.email, event));
        validFormFieldsArray.push(validateHobbies(person.hobbies, event));
        validFormFieldsArray.push(validateHobbies(person.hobbies, event));
        validFormFieldsArray.push(validateGender(person.gender, event));
        validFormFieldsArray.push(validateCountry(person.country, event));
        validFormFieldsArray.push(validateRole(person.role, event));
        validFormFieldsArray.push(validateDOBField(person.dob, event));
        console.log("Array include false value is ===== " + validFormFieldsArray.includes(false));

        return !validFormFieldsArray.includes(false);

    }

    //Validation while form filling
    function enableFastFeedback(formElement) {

        var nameInput = formElement.find("#name");
        var dobInput = formElement.find("#dob");
        var addressInput = formElement.find("#address");
        var emailInput = formElement.find("#email");

        var passwordInput = formElement.find("#password");
        var genderInput = formElement.find("#gender");
        var countryInput = formElement.find("#country");
        var roleInput = formElement.find("#role");
        var hobbyInput = $("input[name='hobby']");


        hobbyInput.change(function (event) {
            let checkedHobby = $("input[name='hobby']:checked");

            validateHobbies(checkedHobby, event)
            if (checkedHobby.length == 0) {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #811");
                hobbyInput.css("box-shadow", "0 0 4px #811");
            } else {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #181");
                hobbyInput.css("box-shadow", "0 0 4px #181");
            }
        });
        genderInput.change(function (event) {
            let selectedGender = $(this).val();
            console.log(selectedGender);

            validateGender(selectedGender, event);

            if (selectedGender == null) {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #811");
                genderInput.css("box-shadow", "0 0 4px #811");
            } else {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #181");
                genderInput.css("box-shadow", "0 0 4px #181");
            }
        });
        countryInput.change(function (event) {
            let selectedCountry = $(this).val();

            validateCountry(selectedCountry, event);
            if (selectedCountry == null) {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #811");
                countryInput.css("box-shadow", "0 0 4px #811");
            } else {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #181");
                countryInput.css("box-shadow", "0 0 4px #181");
            }
        });
        roleInput.change(function (event) {
            let selectedRole = $(this).val();

            validateRole(selectedRole, event);
            if (selectedRole == null) {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #811");
                roleInput.css("box-shadow", "0 0 4px #811");
            } else {
                //   $(this).add("label[for='checkbox2']").css("box-shadow", "0 0 4px #181");
                roleInput.css("box-shadow", "0 0 4px #181");
            }
        });


        nameInput.blur(function (event) {

            var name = $(this).val();

            validateNameField(name, event);

            if (!isValidName(name)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
            }
        });
        dobInput.blur(function (event) {
            // var dob = $("#dob").val();
            // console.log("DOB is " + dob);
            var dob = $(this).val();

            validateDOBField(dob, event);

            if (!isValidDOB(dob)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
            }
        });

        addressInput.blur(function (event) {
            var address = $(this).val();

            validateAddressField(address, event);

            if (!isValidAddress(address)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
            }
        });



        emailInput.blur(function (event) {
            var email = $(this).val();
            validateEmailField(email, event);

            if (!isValidEmail(email)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
                console.log("false");
            }
        });

        passwordInput.blur(function (event) {
            var password = $(this).val();
            validatePasswordField(password, event);

            if (!isValidPassword(password)) {
                $(this).css("box-shadow", "0 0 4px #811");

            } else {
                $(this).css("box-shadow", "0 0 4px #181");
                console.log("false");
            }
        });

    }


    function validateHobbies(checkedHobby, event) {
        if (checkedHobby.length === 0) {
            $("#hobby-feedback").text("Select atleast one hobby");
            // validFormState = false;
            //   event.preventDefault();
            return false;
        } else {
            $("#hobby-feedback").text("");
            // validFormState = true;
            return true;
        }
    }

    function validateGender(selectedGender, event) {
        if (selectedGender == null) {
            console.log("in validate gender");
            $("#gender-feedback").text("Select Gender");
            // validFormState = false;
            //   event.preventDefault();
            $("#gender").css("box-shadow", "0 0 4px #811");
            return false;
        } else {
            $("#gender-feedback").text("");
            // validFormState = true;
            $("#gender").css("box-shadow", "0 0 4px #181");
            return true;
        }
    }

    function validateCountry(selectedCountry, event) {
        if (selectedCountry == null) {
            $("#country-feedback").text("Select Country");
            // validFormState = false;
            //   event.preventDefault();
            $("#country").css("box-shadow", "0 0 4px #811");
            return false;
        } else {
            $("#country-feedback").text("");
            // validFormState = true;
            $("#country").css("box-shadow", "0 0 4px #181");
            return true;
        }
    }
    function validateRole(selectedRole, event) {
        if (selectedRole == null) {
            $("#role-feedback").text("Select Role");
            // validFormState = false;
            //   event.preventDefault();
            $("#role").css("box-shadow", "0 0 4px #811");
            return false;
        } else {
            $("#role-feedback").text("");
            // validFormState = true;
            $("#role").css("box-shadow", "0 0 4px #181");
            return true;
        }
    }


    function validateNameField(name, event) {
        if (!isValidName(name)) {
            $("#name-feedback").text("Name should be unique");
            // validFormState = false;
            return false;
        } else {
            $("#name-feedback").text("");
            // validFormState = true;
            return true;
        }
    }

    function isValidName(name) {
        let isValid = true;
        name = name.toLowerCase();
        list.forEach(valid);
        function valid(element) {
            console.log(name);

            if (name === "" || element.name.toLowerCase() === name) {
                isValid = false;
            }
        }
        console.log(isValid);
        return isValid;
    }
    function validateDOBField(dob, event) {
        if (!isValidDOB(dob)) {
            $("#dob-feedback").text("Select DOB");
            // validFormState = false;
            // $("#dob").css("box-shadow", "0 0 4px #811");
            return false;
        } else {
            $("#dob-feedback").text("");
            // validFormState = true;
            // $("#dob").css("box-shadow", "0 0 4px #181");
            return true;
        }
    }

    function isValidDOB(dob) {
        return dob !== "";
    }


    function validateEmailField(email, event) {
        if (!isValidEmail(email)) {
            $("#email-feedback").text("Password should contain min. 6 char");
            // validFormState = false;
            // event.preventDefault();
            return false;
        } else {
            $("#email-feedback").text("");
            // validFormState = true;
            return true;
        }
    }

    function isValidEmail(email) {
        var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(email)) {
            console.log("false");
            return false;
        } else {
            console.log("okay");
            return true;
        }
    }

    function validatePasswordField(password, event) {
        if (!isValidPassword(password)) {
            $("#password-feedback").text("Password should contain min. 6 char");
            // validFormState = false;
            // event.preventDefault();
            return false;
        } else {
            $("#password-feedback").text("");
            // validFormState = true;
            return true;
        }
    }

    function isValidPassword(password) {
        return password.length >= 6;
    }

    function validateAddressField(address, event) {
        if (!isValidAddress(address)) {
            $("#address-feedback").text("Address required");
            // validFormState = false;
            // event.preventDefault(); 
            return false;
        } else {
            $("#address-feedback").text("");
            // validFormState = true;
            return true;
        }
    }


    function isValidAddress(address) {
        return address.trim() !== "";
    }
    function validateHobbyField(address, event) {
        if (!isValidHobby(address)) {
            $("#address-feedback").text("Address required");
            // validFormState = false;
            // event.preventDefault(); 
            return false;
        } else {
            $("#address-feedback").text("");
            // validFormState = true;
            return true;
        }
    }


    function isValidHobby(address) {
        return address.trim() !== "";
    }

});

