$(document).ready(function () {
    var list = [];
    var selectedRow = null;
    let form = document.getElementById("form");

    let formSubmitBtn = document.getElementById("submit");
    formSubmitBtn.addEventListener("click", formSubmit);

    function formSubmit(event) {
        event.preventDefault();
        const person1 = {
            name: '', dob: '', address: '', country: '', hobbies: '', gender: '', email: '', password: '', role: ''
        }

        const person = formDataProcess(person1);

        list.push(person);
        // localStorage.setItem('listOfUsers', JSON.stringify(list));

        let index = list.length - 1;
        list.forEach(element => {
            console.log(element);
        });

        let table = document.getElementById("listTable").getElementsByTagName('tbody')[0];
        let row = table.insertRow(table.length);

        DataToTable(person, row);

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
    function DataToTable(person, row) {

        cell1 = row.insertCell(0);
        cell2 = row.insertCell(1);
        cell3 = row.insertCell(2);
        cell4 = row.insertCell(3);
        cell5 = row.insertCell(4);
        cell6 = row.insertCell(5);
        cell7 = row.insertCell(6);
        cell8 = row.insertCell(7);
        cell9 = row.insertCell(8);

        cell1.innerHTML = person.name;
        cell2.innerHTML = person.dob;
        cell3.innerHTML = person.address;
        cell4.innerHTML = person.country;
        cell5.innerHTML = person.hobbies;
        cell6.innerHTML = `<select name="" class="edit-gender"><option value="${person.gender}">${person.gender}</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option></select>`;
        cell7.innerHTML = person.email;
        cell8.innerHTML = person.role;
        cell9.innerHTML = `<a onClick="edit(this)">Edit</a> / <a onClick="delete(this)">Delete</a>`;
    }

    function edit(actionCell) {
        selectedRow = actionCell.parentElement;
        console.log(selectedRow.innerHTML);
    }



});