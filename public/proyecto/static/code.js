function logged() {
    return window.localStorage.getItem("authHeader") != null
}

function validate() {
    if (!logged()) {
        var message = "Por favor ingrese al sistema primero";
        display_error(message);
    } else {
        validarInfoUsuario();
    }
}

function validarInfoUsuario() {
    var user = getUser()["user"];
    if (user.username == user.email) {
        if (location.pathname != '/proyecto/endSignup.html')
            location = "endSignup.html";
    } else {
        verificarAprovado(user);
    }

}

function verificarAprovado(user) {
    if (!user.approved) {
        var message = "Lo sentimos pero su cuenta aun no ha sido aprovada";
        display_error(message);
    } else {
        verificarEstado(user);
    }
}

function verificarEstado(user) {
    if (!user.status) {
        var message = "Lo sentimos pero su cuenta ha sido desactivada"
        display_error(message);
    }
}

function display_error(messageToShow) {
    var body = document.getElementsByTagName("body")[0];
    body.innerHTML = "";
    var message = document.createElement("h4");
    body.appendChild(message);
    message.innerHTML = "<br><br><br><br><center><a href='#' onclick=\"logout();\">" + messageToShow + "</center>";
}

function getUser() {
    authHeader = window.localStorage.getItem('authHeader');
    id = window.localStorage.getItem('id');
    user = null;
    $.ajax({
        type: "GET",
        url: '/api/v1/users/' + id,
        headers: {
            "Authorization": authHeader
        },
        dataType: 'json',
        async: false,
        success: function (data) {
            user = data;
        }
    });
    return user;
}

function printUser() {
    var title = document.getElementById("title");
    var user = getUser();
    user = user["user"];

    var div1 = document.createElement("div");
    title.appendChild(div1);
    div1.setAttribute("class", "container");

    var div2 = document.createElement("div");
    div1.appendChild(div2)
    div2.setAttribute("class", "row");

    var divHome = document.createElement("div");
    div2.appendChild(divHome);
    divHome.setAttribute("class", "col-sm");
    var homeButton = document.createElement("button");
    divHome.appendChild(homeButton);
    homeButton.innerHTML = "Inicio";
    homeButton.setAttribute("class", "btn btn-secondary")
    if (user != null) {
        if (logged()) {
            homeButton.setAttribute("onclick", "location.href=\"reader.html\"")
        } else {
            homeButton.setAttribute("onclick", "location.href=\"index.html\"")
        }

        var divWelcome = document.createElement("div");
        div2.appendChild(divWelcome);
        divWelcome.setAttribute("class", "col-sm");

        var username = user.username;
        var welcomeMessage = document.createElement("h5");
        divWelcome.appendChild(welcomeMessage);

        welcomeMessage.innerHTML = "<b><center>Bienvenido </b>" + username + " <button class='btn btn-circle btn-lg' onclick='location.href=\"myProfile.html\"'><i class='fa fa-user-circle-o' aria-hidden='true'></i></button>";



        var divButton = document.createElement("div");
        div2.appendChild(divButton);
        divButton.setAttribute("class", "col-sm");
        var form = document.createElement("form")
        divButton.appendChild(form);
        form.setAttribute("onsubmit", "return logout();");
        var logOutButton = document.createElement("button");
        form.appendChild(logOutButton);
        logOutButton.setAttribute("class", "btn btn-secondary float-right");
        logOutButton.innerHTML = "Salir";
    } else {
        location = "proyecto"
    }
}


function logout() {
    location = "index.html";
    window.localStorage.removeItem("authHeader");
    window.localStorage.removeItem("id");
    return false;
}


function loadReader() {
    user = getUser();
    if (user["user"].role == "reader") {
        $.ajax({
            type: "GET",
            url: '/api/v1/products',
            headers: {
                "Authorization": authHeader
            },
            dataType: 'json',
            success: function (data) {
                displayItemsReader(data, 'products');
            }
        });
        $.ajax({
            type: "GET",
            url: '/api/v1/persons',
            headers: {
                "Authorization": authHeader
            },
            dataType: 'json',
            success: function (data) {
                displayItemsReader(data, 'people');
            }
        });
        $.ajax({
            type: "GET",
            url: '/api/v1/entities',
            headers: {
                "Authorization": authHeader
            },
            dataType: 'json',
            success: function (data) {
                displayItemsReader(data, 'entities');
            }
        });
    } else {
        $.ajax({
            type: "GET",
            url: '/api/v1/products',
            headers: {
                "Authorization": authHeader
            },
            dataType: 'json',
            success: function (data) {
                displayItemsWriter(data, 'products');
            }
        });
        $.ajax({
            type: "GET",
            url: '/api/v1/persons',
            headers: {
                "Authorization": authHeader
            },
            dataType: 'json',
            success: function (data) {
                displayItemsWriter(data, 'people');
            }
        });
        $.ajax({
            type: "GET",
            url: '/api/v1/entities',
            headers: {
                "Authorization": authHeader
            },
            dataType: 'json',
            success: function (data) {
                displayItemsWriter(data, 'entities');
            }
        });

        var container = document.getElementById("container");
        var center = document.createElement("center");
        container.appendChild(center);

        var button = document.createElement("button");
        center.appendChild(button);

        var i = document.createElement("i");
        button.appendChild(i);

        button.setAttribute("type", "button");
        button.setAttribute("class", "btn btn-success btn-circle btn-lg");

        i.setAttribute("class", "fa fa-plus fa-lg");

        button.setAttribute("onclick", "location.href=\"newItem.html\"")

        var tab = document.createElement("p");
        center.appendChild(tab);
        tab.innerHTML = "___";
        tab.setAttribute("style", "display:inline;color:white;");

        var usersBtn = document.createElement("button");

        center.appendChild(usersBtn);
        var logo = document.createElement("i");
        usersBtn.appendChild(logo);

        logo.setAttribute("class", "fa fa-users ");

        usersBtn.setAttribute("type", "button");
        usersBtn.setAttribute("class", "btn btn-info btn-circle btn-lg");
        usersBtn.setAttribute("onclick", "location.href=\"users.html\"")


    }


}

function displayItemsReader(collection, type) {
    var column = document.getElementById(type + "Column");
    var table = document.createElement("table");
    table.setAttribute("id", type + "Table");
    table.setAttribute("class", "table");
    column.appendChild(table);
    var tableHeader = document.createElement("thead");
    table.appendChild(tableHeader);
    tableHeader.setAttribute("class", "thead-dark");
    var tableRow = document.createElement("tr");
    tableHeader.appendChild(tableRow);
    var header = document.createElement("th");
    tableRow.appendChild(header);
    header.setAttribute("scope", "col");

    if (type == "people") {
        var title = "Personas";
        var inside = "person";
        type = "persons";
    } else if (type == "entities") {
        var title = "Entidades";
        var inside = "entity";
    } else {
        var title = "Productos";
        var inside = "product";
    }
    collection = collection[type];
    header.innerHTML = title;
    var tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    for (item of collection) {
        var tableRow = document.createElement("tr")
        tableBody.appendChild(tableRow);
        var tableData = document.createElement("td");
        tableRow.appendChild(tableData);
        var link = document.createElement("a");
        tableData.appendChild(link);
        link.setAttribute("href", "/proyecto/displayItem.html?id=" + inside + item[inside].id);
        link.innerHTML = item[inside].name;
    }
}


function displayItemsWriter(collection, type) {
    var column = document.getElementById(type + "Column");
    var table = document.createElement("table");
    table.setAttribute("id", type + "Table");
    table.setAttribute("class", "table");
    column.appendChild(table);
    var tableHeader = document.createElement("thead");
    table.appendChild(tableHeader);
    tableHeader.setAttribute("class", "thead-dark");
    var tableRow = document.createElement("tr");
    tableHeader.appendChild(tableRow);
    var header = document.createElement("th");
    header.setAttribute("colspan", "3");
    tableRow.appendChild(header);
    header.setAttribute("scope", "col");
    if (type == "people") {
        var title = "Personas";
        var inside = "person";
        type = "persons";
    } else if (type == "entities") {
        var title = "Entidades";
        var inside = "entity";
    } else {
        var title = "Productos";
        var inside = "product";
    }
    collection = collection[type];
    header.innerHTML = title;
    var tableBody = document.createElement("tbody");
    table.appendChild(tableBody);
    for (item of collection) {
        var tableRow = document.createElement("tr")
        tableBody.appendChild(tableRow);


        var tableData = document.createElement("td");
        tableRow.appendChild(tableData);
        var link = document.createElement("a");
        tableData.appendChild(link);
        link.setAttribute("href", "/proyecto/displayItem.html?id=" + inside + item[inside].id);
        link.innerHTML = item[inside].name;

        var updateData = document.createElement("td");
        tableRow.appendChild(updateData);
        var updateButton = document.createElement("img");
        updateData.appendChild(updateButton);
        updateButton.setAttribute("src", "https://image.flaticon.com/icons/png/512/84/84380.png");
        updateButton.setAttribute("width", "20");
        updateButton.setAttribute("class", "btn-img");
        updateButton.setAttribute("onclick", "location.href=\"edit.html?id=" + inside + item[inside].id + "\"")

        var deleteData = document.createElement("td");
        tableRow.appendChild(deleteData);
        var deleteButton = document.createElement("img");
        deleteData.appendChild(deleteButton);
        deleteButton.setAttribute("src", "https://vectorified.com/images/delete-icon-png-1.png");
        deleteButton.setAttribute("width", "20");
        deleteButton.setAttribute("class", "btn-img");
        deleteButton.setAttribute("onclick", "location.href=\"delete.html?id=" + inside + item[inside].id + "\"")
    }
}



function printItem() {

    var title = document.getElementById("title");
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('id');
    var h1 = document.createElement("h1");
    title.appendChild(h1);
    var item = searchItemId(code);
    h1.innerHTML = item.name;

    var picture = document.getElementById("picture");
    picture.setAttribute("src", item.imageUrl);

    var date = document.getElementById("date");
    var dateInfo = document.createElement("h5");
    date.appendChild(dateInfo);
    dateInfo.innerHTML = "<b>Fecha de Creacion/Nacimiento:</b> <br>" + item.birthDate;

    if (item.deathDate != null) {
        var dateDeathInfo = document.createElement("h5");
        date.appendChild(dateDeathInfo);
        dateDeathInfo.innerHTML = "<b>Fecha de Terminación/Fallecimiento:</b> <br>" + item.deathDate;
    }

    var body = document.getElementById("wiki");
    var wikiTitle = document.createElement("h4");
    body.appendChild(wikiTitle);
    wikiTitle.innerHTML = "<br>Wiki";

    var divIframe = document.createElement("div");
    body.appendChild(divIframe);
    divIframe.setAttribute("class", "embed-responsive embed-responsive-16by9")

    var wiki = document.createElement("iframe");
    divIframe.appendChild(wiki);
    wiki.setAttribute("src", item.wikiUrl);
    wiki.setAttribute("class", "embed-responsive-item");

    var type = spliceId(code)[0];
    types = ["person", "entity", "product"];

    const index = types.indexOf(type);
    if (index > -1) {
        types.splice(index, 1);
    }
    cont = 1;
    for (i of types) {
        if (i == "entity") {
            i = "entitie";
        }
        i = i + "s";
        var column = document.getElementById("relation" + cont);
        if (item[i] != null || item[i] == "") {
            printRelations(column, item[i], i)
            cont = cont + 1;
        }
    }


}


function printRelations(column, relations, type) {
    if (type == "entities") {
        title = "Entidades";
        link = "entity";
    } else {
        if (type == "products") {
            title = "Productos";
            link = "product";
        } else {
            title = "Personas";
            link = "person";
        }
    }
    var h4 = document.createElement("h4");
    column.appendChild(h4);
    h4.innerHTML = title;


    for (r of relations) {
        $.ajax({
            type: "GET",
            url: '/api/v1/' + type + "/" + r,
            headers: {
                "Authorization": authHeader
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                var p = document.createElement("p")
                column.appendChild(p);
                item = data[link];
                var a = document.createElement("a");
                p.appendChild(a);

                a.innerHTML = item.name;
                a.setAttribute("href", "/proyecto/displayItem.html?id=" + link + item.id)

            }
        });

    }

}

function deleteItem() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('id');
    var authHeader = localStorage.getItem('authHeader');
    var data = spliceId(code);
    var type = data[0];
    var id = data[1];
    if (type == 'entity') {
        type = 'entitie'
    }
    $.ajax({
        type: "DELETE",
        url: '/api/v1/' + type + 's/' + id,
        headers: {
            "Authorization": authHeader
        },
        dataType: 'json',
        success: function (data) {
            user = data;
        }
    });

    location = "reader.html";
    return false;
}


function loadData() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('id');
    var item = searchItemId(code);

    var type = document.getElementById("type");
    type.value = code[0];
    //type.setAttribute("disabled", "true")

    var name = document.getElementById("name");
    name.value = item.name;

    var date = document.getElementById("birthDate");
    date.value = item.birthDate;

    var date1 = document.getElementById("deathDate");
    date1.value = item.deathDate;

    var picture = document.getElementById("imageUrl");
    picture.value = item.imageUrl;

    var wiki = document.getElementById("wikiUrl");
    wiki.value = item.wikiUrl;


}

function edit() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('id');

    info = spliceId(code);
    var type = info[0];
    var id = info[1];
    if (type == 'entity') {
        type = 'entitie'
    }

    var item = new Object();
    item.name = document.getElementById("name").value;
    item.birthDate = document.getElementById("birthDate").value;
    var deathDate = document.getElementById("deathDate").value;
    if (deathDate != "") {
        item.deathDate = deathDate;
    } else {
        item.deathDate = null;
    }
    item.imageUrl = document.getElementById("imageUrl").value;
    item.wikiUrl = document.getElementById("wikiUrl").value;

    content = JSON.stringify(item);
    console.log(content);
    $.ajax({
        type: "PUT",
        url: '/api/v1/' + type + 's/' + id,
        headers: {
            "Authorization": authHeader
        },
        contentType: 'application/json',
        data: content,
        dataType: 'json',
        success: function (data) {

        }
    });

    location = "reader.html";
    return false;
}

function saveNew() {
    var data = JSON.parse(window.localStorage.getItem("data"));

    var authHeader = localStorage.getItem("authHeader");

    var newItem = new Object;
    newItem.name = document.getElementById("name").value;
    newItem.birthDate = document.getElementById("birthDate").value;
    newItem.deathDate = document.getElementById("deathDate").value;
    newItem.imageUrl = document.getElementById("imageUrl").value;
    newItem.wikiUrl = document.getElementById("wikiUrl").value;

    var type = document.getElementById("type").value;


    content = JSON.stringify(newItem);

    $.ajax({
        type: "POST",
        url: '/api/v1/' + type,
        headers: {
            "Authorization": authHeader
        },
        contentType: 'application/json',
        data: content,
        dataType: 'json',
        success: function (data) {

        }
    });

    location = "reader.html"
    return true;
}

function getSelectedRelations() {
    var relations = [];
    var checkboxes = document.getElementsByClassName("relation");
    for (item of checkboxes) {
        if (item.checked) {
            relations.push(item.value);
        }
    }
    return relations;
}

function spliceId(data) {
    let str = data.match(/[a-z]+|[^a-z]+/gi);
    return str;
}

function searchItemId(data) {
    var str = spliceId(data);
    var type = str[0];
    var id = str[1];
    var info = null;
    if (type == "entity") {
        type = "entitie"
    }
    $.ajax({
        type: "GET",
        url: '/api/v1/' + type + "s/" + id,
        headers: {
            "Authorization": authHeader
        },
        dataType: 'json',
        async: false,
        success: function (data) {
            info = data[str[0]];
        }
    });
    return info;
}

function loadUserData() {
    var user = getUser()["user"];

    var name = document.getElementById("name")
    name.value = user.username;

    var email = document.getElementById("email");
    if (user.email != user.username) {
        email.value = user.email;
    }


    var birthdate = document.getElementById("birthDate");
    if (user.birthDate != null) {
        birthDate.value = user.birthDate.date.split(" ")[0];
    }

    var role = document.getElementById("role");
    role.value = user.role;

    var status = document.getElementById("status");

    if (user.approved) {
        status.value = "Aprovado";
    } else {
        status.value = "Falta Aprovacion";
    }
}


function editProfile() {
    var user = getUser()["user"];

    var newName = document.getElementById("name").value;


    if (newName != user.username) {
        $.ajax({
            type: "GET",
            url: '/api/v1/users/username/' + newName,
            headers: {
                "Authorization": authHeader
            },
            dataType: 'json',
            success: function () {
                alert("Este nombre ya esta tomado\nPor favor eliga otro");
            },
            error: function () {
                saveProfileData(true);
            }
        });
        return false;
    } else {
        saveProfileData(false);
    }

}

function saveProfileData(save) {
    var id = localStorage.getItem("id");
    var authHeader = localStorage.getItem("authHeader")

    var newUser = new Object();

    var user = getUser()["user"];

    if (save) {
        newUser.username = document.getElementById("name").value;
    }
    var email = document.getElementById("email").value;
    if (user.email != email) {
        newUser.email = email;
    }

    var birthDate = document.getElementById("birthDate").value;
    if (user.birthDate != birthDate) {
        newUser.birthDate = birthDate;
    }

    content = JSON.stringify(newUser);

    $.ajax({
        type: "PUT",
        url: '/api/v1/users/' + id,
        headers: {
            "Authorization": authHeader
        },
        contentType: 'application/json',
        data: content,
        dataType: 'json',
        success: function (data) {
            location = 'reader.html';
            return false;
        },
        error: function (xhr, status) {
            alert("Este correo ya esta\nAsociado con otra Cuenta.");
        }
    });

}

function changePassword() {
    var id = localStorage.getItem("id");
    var authHeader = localStorage.getItem("authHeader");

    var pw1 = document.getElementById("pwd1").value;
    var pw2 = document.getElementById("pwd2").value;

    if (pw1 == pw2) {
        var user = new Object;
        user.password = pw1;
        content = JSON.stringify(user);


        $.ajax({
            type: "PUT",
            url: '/api/v1/users/' + id,
            headers: {
                "Authorization": authHeader
            },
            contentType: 'application/json',
            data: content,
            dataType: 'json',
            success: function (data) {
                location = 'reader.html';
                return false;
            }
        });

    } else {
        alert("Las contraseñas no coinciden");
    }
}

function loadUsers() {
    var authHeader = localStorage.getItem("authHeader");

    $.ajax({
        type: "GET",
        url: '/api/v1/users',
        headers: {
            "Authorization": authHeader
        },
        dataType: 'json',
        success: function (data) {
            printTableUsers(data);
        }
    });

}

function printTableUsers(data) {
    var tbody = document.getElementById("usersTable")
    for (user of data['users']) {
        user = user["user"];

        var tr = document.createElement("tr");
        tbody.appendChild(tr);

        var name = document.createElement("td");
        tr.appendChild(name);

        name.innerHTML = user.username;

        var email = document.createElement("td");
        tr.appendChild(email);
        if (user.email != user.username) {
            email.innerHTML = user.email;
        }

        var rol = document.createElement("td");
        tr.appendChild(rol);
        rol.appendChild(createRoleOptions(user));


        var state = document.createElement("td");
        tr.appendChild(state);
        state.appendChild(createStatusOptions(user));


        var approved = document.createElement("td");
        tr.appendChild(approved);
        approved.appendChild(createApproved(user));

        var deleteTD = document.createElement("td");
        tr.appendChild(deleteTD);
        var deleteButton = document.createElement("button");
        deleteTD.appendChild(deleteButton);
        deleteButton.setAttribute("class", "btn btn-outline-danger btn-circle btn-lg")
        deleteButton.setAttribute("onclick", "deleteUser(" + user.id + ");");

        var i = document.createElement("i");
        deleteButton.appendChild(i);

        i.setAttribute("class", "fas fa-times fa-lg");

    }
}

function createApproved(user) {
    var center = document.createElement("center");
    if (!user.approved) {
        var button = document.createElement("button");
        button.setAttribute("class", "btn btn-outline-success btn-circle btn-lg")
        button.setAttribute("onclick", "approve(" + user.id + ");")

        var i = document.createElement("i");
        button.appendChild(i);

        i.setAttribute("class", "fa fa-user-check");
        center.appendChild(button);
    } else {
        var i = document.createElement("i");

        i.setAttribute("class", "far fa-thumbs-up fa-2x");
        center.appendChild(i)
    }
    return center;

}

function approve(id) {
    var newStatus = new Object();

    newStatus.approved = true;

    content = JSON.stringify(newStatus);
    $.ajax({
        type: "PUT",
        url: '/api/v1/users/' + id,
        headers: {
            "Authorization": authHeader
        },
        contentType: 'application/json',
        data: content,
        dataType: 'json',
        success: function (data) {}
    });
    location = "users.html";
}

function createStatusOptions(user) {
    var select = document.createElement("select");

    select.setAttribute("id", "role");
    select.setAttribute("class", "custom-select custom-select");
    select.setAttribute("onchange", "changeStatus(" + user.id + "," + user.status + ");");

    var active = document.createElement("option");
    select.appendChild(active);

    active.setAttribute("class", "dropdown-item");
    active.setAttribute("value", true);
    active.innerHTML = "Activa";

    var inactive = document.createElement("option");
    select.appendChild(inactive);

    inactive.setAttribute("class", "dropdown-item");
    inactive.setAttribute("value", false);
    inactive.innerHTML = "Inactiva";

    select.value = user.status;

    return select;
}

function changeStatus(id, status) {
    var newStatus = new Object();

    if (status) {
        newStatus.status = false;
    } else {
        newStatus.status = true;
    }

    content = JSON.stringify(newStatus);

    $.ajax({
        type: "PUT",
        url: '/api/v1/users/' + id,
        headers: {
            "Authorization": authHeader
        },
        contentType: 'application/json',
        data: content,
        dataType: 'json',
        success: function (data) {}
    });
}


function createRoleOptions(user) {
    var select = document.createElement("select");

    select.setAttribute("id", "role");
    select.setAttribute("class", "custom-select custom-select");
    select.setAttribute("onchange", "changeRole(" + user.id + ",\"" + user.role + "\");");

    var writerOpt = document.createElement("option");
    select.appendChild(writerOpt);

    writerOpt.setAttribute("class", "dropdown-item");
    writerOpt.setAttribute("value", "writer");
    writerOpt.innerHTML = "Escritor";

    var readerOpt = document.createElement("option");
    select.appendChild(readerOpt);

    readerOpt.setAttribute("class", "dropdown-item");
    readerOpt.setAttribute("value", "reader");
    readerOpt.innerHTML = "Lector";

    select.value = user.role;

    return select;
}

function changeRole(id, role) {
    var newRole = new Object();

    if (role == "writer") {
        newRole.role = "reader";
    } else {
        newRole.role = "writer";
    }

    content = JSON.stringify(newRole);
    $.ajax({
        type: "PUT",
        url: '/api/v1/users/' + id,
        headers: {
            "Authorization": authHeader
        },
        contentType: 'application/json',
        data: content,
        dataType: 'json',
        success: function (data) {}
    });
}

function deleteUser(id) {
    var authHeader = localStorage.getItem("authHeader");
    $.ajax({
        type: "DELETE",
        url: '/api/v1/users/' + id,
        headers: {
            "Authorization": authHeader
        },
        dataType: 'json',
        success: function (data) {}
    });
}

function signUp() {
    var newUser = new Object();


    newUser.username = document.getElementById("usernameSU").value;
    newUser.password = document.getElementById("passwordSU").value;

    content = JSON.stringify(newUser);

    $.ajax({
        type: "POST",
        url: '/api/v1/users',
        contentType: 'application/json',
        data: content,
        dataType: 'json',
        success: function (data) {
            data = JSON.stringify(data);

            localStorage.setItem("user", newUser.username);
            localStorage.setItem("password", newUser.password);
            return true;
        },
        error: function (xhr, status) {
            alert("Este usuario ya existe");
        }
    });

}

function loginRequest() {

    var newUser = new Object();


    newUser.username = localStorage.getItem("user")
    newUser.password = localStorage.getItem("password")

    content = JSON.stringify(newUser);

    $.ajax({
        type: "POST",
        url: '/access_token',
        contentType: 'application/json',
        data: content,
        dataType: 'json',
        success: function (data, textStatus, request) {
            login(data.id, request.getResponseHeader('Authorization'));
        }
    });

    localStorage.removeItem("user");
    localStorage.removeItem("password");
}


function login(id, authHeader) {
    location = 'reader.html';
    localStorage.setItem('id', id);
    localStorage.setItem('authHeader', authHeader);
}

function loadRelOptions(){
    var authHeader = localStorage.getItem("authHeader");
    var div = document.getElementById("addRelations");

    var selected = document.getElementById("type").value;

    types = ["persons", "entities", "products"];

    const index = types.indexOf(selected);
    if (index > -1) {
        types.splice(index, 1);
    }

    for (i of types){
        $.ajax({
            type: "GET",
            url: '/api/v1/'+i,
            headers: {
                "Authorization": authHeader
            },
            dataType: 'json',
            success: function (data) {
                addOptions(data);
            }
        });
    }
}

function addOptions(data){
    console.log(JSON.stringify(data));

}