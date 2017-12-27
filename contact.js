const KEY = "MAGA0030";
let contacts = [];
let contact_to_set;
let selectedPerson;

const init = function() {
    if (localStorage.getItem(KEY) === "[]") {
        contacts = contactStarter;
        localStorage.setItem(KEY, JSON.stringify(contactStarter));
    } else {
        contacts = JSON.parse(localStorage.getItem(KEY));
    }
    
    updateList();
    document.querySelector(".fab").addEventListener("click", showForm);
    
    document.querySelector("#button-save").addEventListener("click", addContact);
    document.querySelector("#button-cancel").addEventListener("click", hideForm);
    
    document.querySelector("#edit-button-save").addEventListener("click", editClick);
    document.querySelector("#edit-button-cancel").addEventListener("click", hideEditForm);
}

const updateList = function() {
    let ul = document.querySelector("ul.contacts");
    ul.innerHTML = "";
    let df = new DocumentFragment();
    contacts.forEach((contact) => {
        df.appendChild(createItem(contact));
    });
    ul.appendChild(df);
}

const createItem = function(contact) {

    let li = document.createElement("li");
    li.className = "contact";
    
    let div = document.createElement("div");
    div.className = "buttons";
    
    let span_delete = document.createElement("span");
    span_delete.className = "delete";
    span_delete.setAttribute("data-key", contact.email);
    span_delete.addEventListener("click", removeContact);
    div.appendChild(span_delete);
    
    let span_edit = document.createElement("span");
    span_edit.className = "edit";
    span_edit.setAttribute("data-key", contact.email);
    span_edit.addEventListener("click", editContact);
    div.appendChild(span_edit);
    
    
    li.appendChild(div);
    
    let h3 = document.createElement("h3");
    h3.textContent = contact.fullname;
    li.appendChild(h3);
    
    let pe = document.createElement("p");
    pe.className = "email";
    pe.textContent = contact.email;
    li.appendChild(pe);
    
    let pp = document.createElement("p");
    pp.className = "phone";
    pp.textContent = contact.phone;
    li.appendChild(pp);
    return li;
}

const showForm = function(ev) {
    console.log("SHOW");
    ev.preventDefault();
    document.querySelector("main").style.opacity = "0";
    document.querySelector(".fab").style.opacity = "0'";
    document.querySelector(".contactform").style.display = "block";
    document.querySelector(".overlay").style.display = "block";
}

const showEditForm = function(ev) {
    console.log("SHOW EDIT");
    ev.preventDefault();
    document.querySelector("main").style.opacity = "0";
    document.querySelector(".fab").style.opacity = "0'";
    document.querySelector(".editform").style.display = "block";
    document.querySelector(".overlay").style.display = "block";
}

const hideEditForm = function(ev) {
    console.log("HIDE");
    ev.preventDefault();
    document.querySelector("main").style.opacity = "1";
    document.querySelector(".fab").style.opacity = "1'";
    document.querySelector(".editform").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".editform form").reset();
}

const hideForm = function(ev) {
    console.log("HIDE");
    ev.preventDefault();
    document.querySelector("main").style.opacity = "1";
    document.querySelector(".fab").style.opacity = "1'";
    document.querySelector(".contactform").style.display = "none";
    document.querySelector(".overlay").style.display = "none";
    document.querySelector(".contactform form").reset();
}

const addContact = function(ev) {
    console.log("ADD");
    ev.preventDefault();
    let obj = {};
    let fullname = document.getElementById("input-name").value.trim();
    let email = document.getElementById("input-email").value.trim();
    let phone = document.getElementById("input-phone").value.trim();
    
    if (fullname && email && phone) {
        obj = {fullname, email, phone};
        contacts.push(obj);
        localStorage.setItem(KEY, JSON.stringify(contacts));
        document.querySelector(".contactform form").reset();
        hideForm(new MouseEvent('click'));
        
        updateList();
    } else {
        alert("Form not filled in");
    }
}

const removeContact = function(ev) {
    ev.preventDefault();
    let email = ev.target.getAttribute("data-key");
    console.log(email);
    contacts = contacts.filter((contact) => {
        console.log(contact.email, email);
        return !(contact.email == email);
    });
    
    console.log(contacts);
    localStorage.setItem(KEY, JSON.stringify(contacts));
    
    updateList();
}

const editContact = function(ev) {
    ev.preventDefault();

    let li = ev.currentTarget;
    
    let id = li.getAttribute('data-key');
    //console.log(id);
    selectedPerson = null;
    let key_json = localStorage.getItem(KEY);

    let something = JSON.parse(key_json);
    console.log(something);
    contacts.forEach(person => {
//        console.log("hey");
        if (person.email == id) {
            //console.log("[:)]-<--<");
            selectedPerson = person;
            //selectedPerson = person;
            
        } else {
           // console.log(":(");
        }
    });
    
    if (selectedPerson != null) {
        // show form
        document.getElementById("edit-name").value = selectedPerson.fullname;
        document.getElementById("edit-email").value = selectedPerson.email;
        document.getElementById("edit-phone").value = selectedPerson.phone;
        showEditForm(new MouseEvent('click'));
    } else {
        //such bad. no person
    }
    
}

const editClick = function(ev) {
    console.log("EDIT");
    ev.preventDefault();
    
    let fullname = document.getElementById("edit-name").value.trim();
    let email = document.getElementById("edit-email").value.trim();
    let phone = document.getElementById("edit-phone").value.trim();
    
    //replace contact in localstorage
    contacts.forEach(person => {
//        console.log("hey");
        if (person.email == selectedPerson.email) {
            //console.log("[:)]-<--<");
            person.fullname = fullname;
            person.email = email;
            person.phone = phone;
            localStorage.removeItem(KEY);
            localStorage.setItem(KEY, JSON.stringify(contacts));
            hideEditForm(new MouseEvent('click'));
            updateList();
        } else {
            //console.log(":(");
        }
    });
    
    // take find index and switch
    
}



document.addEventListener("DOMContentLoaded", init);
