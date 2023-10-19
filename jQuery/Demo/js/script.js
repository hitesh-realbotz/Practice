
$(document).ready(function () {

    let form = $("#form");
    var modal = document.getElementById("myModal");

    const list = [];

    {   //Initial Data insertion in list
        const person1 = {
            name: 'Mark',
            dob: '2000-01-01',
            address: 'USA',
            country: 'USA',
            hobbies: ["Cricket"],
            gender: 'Male',
            email: 'mark@gmail.com',
            password: 'mark@123',
        }

        const person2 = {
            name: 'ABC',
            dob: '2000-01-01',
            address: 'Surat',
            country: 'India',
            hobbies: ["Reading"],
            gender: 'Male',
            email: 'abc@gmail.com',
            password: 'abc123',
        }
        list.push(person1);
        list.push(person2);
    }
    dataToTable();

    //Data insertion in Table from list
    function dataToTable() {
        var tableBody = $("tbody");
        $("tbody").empty();
        var tableRow = '';
        list.forEach(listData);
        tableBody.append(tableRow);

        function listData(element, index) {
            tableRow += `<tr id="${index}">`;
            tableRow += '<td>' + element.name + "</td>";
            tableRow += '<td>' + element.dob + "</td>";
            tableRow += '<td>' + element.address + "</td>";
            tableRow += '<td>' + element.country + "</td>";
            tableRow += '<td>' + element.hobbies + "</td>";
            tableRow += `<td id="Gender${index}"><select data-index="${index}" name="" class="edit-gender"><option value="${element.gender}">${element.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>`;
            // tableRow += '<td>' + element.gender + "</td>";
            tableRow += '<td>' + element.email + "</td>>";
            tableRow += `<td> <button  data-index="${index}"  class='edit btn btn-secondary' >Edit</button> <button  data-index="${index}"   class='delete btn btn-danger'>Delete</button></td>`;
            tableRow += '</tr>';
        }
    }


    //Form Data Processing for adding or updating user 
    function formDataProcess(person, op) {

        var name = $("#name").val();
        var dob = $("#dob").val();
        var address = $("#address").val();
        var email = $("#email").val();
        var country = $("#country").val();
        var gender = $("#gender").val();
        var password = $("#password").val();

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
        person.hobbies = hobbiesArray;

        if (op === "new") {
            list.push(person);
            var tableBody = $("tbody");
            tableRow = `<tr id = "${list.length - 1}" >`;
            tableRow += '<td>' + person.name + "</td>";
            tableRow += '<td>' + person.dob + "</td>";
            tableRow += '<td>' + person.address + "</td>";
            tableRow += '<td>' + person.country + "</td>";
            tableRow += '<td>' + person.hobbies + "</td>";
            tableRow += `<td id="Gender${list.length - 1}"><select data-index="${list.length - 1}" name="" class="edit-gender"><option value="${person.gender}">${person.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td >`;

            tableRow += '<td>' + person.email + "</td>";
            tableRow += `<td> <button  data-index="${list.length - 1}"  class='edit btn btn-secondary' >Edit</button> <button   data-index="${list.length - 1}"  class='delete btn btn-danger' >Delete</button></td>`;
            tableRow += '</tr>';

            tableBody.append(tableRow);

        } else {
            list[op] = person;
            dataToTable();
            $(":reset").click();

        }

        return person;
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
    $("#add").on("click", function (event) {
        $("#submit").css("display", "inline-block");
        $("#update").css("display", "none");
        $(":reset").click();

    });


    //Shows User details in form on-click Edit button against respective user
    $("#tbody").on("click", ".edit", function () {

        var currIndexValue = $(this).data("index");

        //Getting user from list and Displaying user values in form
        const currPerson = list[currIndexValue];

        $("#name").val(currPerson.name);
        $("#dob").val(currPerson.dob);
        $("#address").val(currPerson.address);
        $("#email").val(currPerson.email);
        $("#country").val(currPerson.country);
        $("#gender").val(currPerson.gender);
        $("#password").val(currPerson.password);
        // $("#hobbies").val(currPerson.hobbies);

        var currHobbies = currPerson.hobbies;
        $("#hobby1").prop("checked", currHobbies.includes("Cricket"));
        $("#hobby2").prop("checked", currHobbies.includes("Reading"));
        $("#hobby3").prop("checked", currHobbies.includes("Writting"));

        $("#submit").css("display", "none");
        $("#update").css("display", "inline-block");
        $("#update").data("index", currIndexValue);
    });


    //Updating user details on-click Update button
    $("#update").on("click", function (event) {
        let updateIndex = $("#update").data("index");

        const person = list[updateIndex];

        formDataProcess(person, updateIndex);
    });


    //Gender Updation from DropDown
    $("#tbody").on("change", ".edit-gender", function () {
        console.log("button clicked");

        var updateIndex = $(this).data("index");
        var selectedOption = $(this).find(":selected").val();
        var genderBox = "Gender" + updateIndex;

        //Getting user from list, updating gender values, updating list and Table
        const existingPer = list[updateIndex];
        existingPer.gender = selectedOption;
        list[updateIndex] = existingPer;

        $(`#${genderBox}`).html(`<td id = "Gender${index}" > <select data-index="${index}" name="" class="edit-gender"><option value="${element.gender}">${element.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select></td>`);
    });

    //Model-PopUp for before deletion
    $("#tbody").on("click", ".delete", function () {
        console.log("button clicked");
        var currIndexValue = $(this).data("index");

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

            //     dataToTable();

            //     // console.log("next id is "+$(`tbody #${ currIndexValue } `).next().attr("id"));
            //     // var nextId = $(`tbody #${ currIndexValue } `).next().attr("id");
            //     // $(`tbody #${ currIndexValue } `).remove();

            //     // while(nextId != "undefined"){
            //     //     var preId = nextId;
            //     //     $(`tbody #${ preId } `).attr("id",currIndexValue);
            //     //     currIndexValue = nextId;

            //     //     nextId = $(`tbody #${ currIndexValue } `).next().attr("id");

            //     // }

            // } else {
            //     text = "You canceled!";
            // }
        }
    });

    //Deletes record
    $("#myModal").on("click", "#del-yes", function () {
        var currIndexValue = $(this).data("index");
        console.log(currIndexValue);

        list.splice(currIndexValue, 1);
        list.forEach(element => {
            console.log(element);
        });

        dataToTable();
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


    //New User entry on-click Submit button after filling input fields
    // $("#submit").on("click", function (event) {
    form.submit(function (event) {
        const person = {
            name: '', dob: '', address: '', country: '', hobbies: '', gender: '', email: '', password: '',
        }


        var name = $("#name").val();
        var dob = $("#dob").val();
        var address = $("#address").val();
        var email = $("#email").val();
        var country = $("#country").val();
        var gender = $("#gender").val();
        var password = $("#password").val();

        // validateNameField(name, event);
        var validFormState = validateNameField(name, event) && validatePasswordField(password, event) && validateAddressField(address, event);
        if (validFormState) {

            formDataProcess(person, "new");
            {//Cell wise data insertion in table
                // const $tableBody = $("#listTable tbody")
                // $tableBody.empty();
                // list.forEach(user => {
                //     const $row = $("<tr>");
                //     const $nameCell = $("<td>").text(user.name);
                //     const $dobCell = $("<td>").text(user.dob);
                //     const $addressCell = $("<td>").text(user.address);
                //     const $countryCell = $("<td>").text(user.country);
                //     const $hobbiesCell = $("<td>").text(user.hobbies);
                //     const $genderCell = $("<td>").text(user.gender);
                //     const $emailCell = $("<td>").text(user.email);

                //     $row.append($nameCell, $dobCell, $addressCell, $countryCell, $hobbiesCell, $genderCell, $emailCell);
                //     $tableBody.append($row);
                // });
            }
            event.preventDefault();
            $(":reset").click();
        }
    });


    enableFastFeedback(form);

    function enableFastFeedback(formElement) {

        var nameInput = formElement.find("#name");
        var addressInput = formElement.find("#address");
        var emailInput = formElement.find("#email");
        var countryInput = formElement.find("#country");
        var genderInput = formElement.find("#gender");
        var passwordInput = formElement.find("#password");





        nameInput.blur(function (event) {
            var name = $(this).val();

            validateNameField(name, event);

            if (!isValidName(name)) {
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


        function validateNameField(name, event) {
            if (!isValidName(name)) {
                $("#name-feedback").text("Name should be unique");
                event.preventDefault();
                return false;
            } else {
                $("#name-feedback").text("");
                return true;
            }
        }


        function isValidName(name) {
            var isValid = true;
            list.forEach(valid);

            function valid(element, index) {
                console.log(element.name);
                if (element.name == name) {
                    isValid = false;
                }
            }
            console.log(isValid);
            return isValid;
        }


        function validateEmailField(email, event) {
            if (!isValidEmail(email)) {
                $("#email-feedback").text("Password should contain min. 6 char");
                event.preventDefault();
                return false;
            } else {
                $("#email-feedback").text("");
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
                event.preventDefault();
                return false;
            } else {
                $("#password-feedback").text("");
                return true;
            }
        }

        function isValidPassword(password) {
            return password.length >= 6;
        }

        function validateAddressField(address, event) {
            if (!isValidAddress(address)) {
                $("#address-feedback").text("Address required");
                event.preventDefault();
                return false;
            } else {
                $("#address-feedback").text("");
                return true;
            }
        }


        function isValidAddress(address) {
            return address.trim() !== "";
        }

    }

});

