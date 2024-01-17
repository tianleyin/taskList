/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');
    var parseLocal = JSON.parse(localStorage.getItem("dades"));
    if (parseLocal == null) {
        var arrayTask = [];
    } else {
        var arrayTask = parseLocal;
    }

    if (arrayTask.length > 0) {
        for (var i = 0; i < arrayTask.length; i++) {
            var newItemLocal = document.createElement("li");
            var newLinkLocal = document.createElement("a");

            var deleteButtonLocal = createButton("deleteTask", "🗑️");
            var editButtonLocal = createButton("editTask", "✏️");

            newLinkLocal.appendChild(deleteButtonLocal);
            newLinkLocal.appendChild(editButtonLocal);
            newLinkLocal.appendChild(document.createTextNode(arrayTask[i]));
            newLinkLocal.href = "#" + arrayTask[i].toLowerCase();

            newItemLocal.appendChild(newLinkLocal);
            $("ul").append(newItemLocal);
            $("ul").listview("refresh");
        }
    } else {
        console.log("Dades está vacío");
    }

    $("#addTask").click(function () {
        var newTaskText = prompt("Enter the text for the new Task:");

        if (newTaskText) {
            var newItem = document.createElement("li");
            var newLink = document.createElement("a");

            var deleteButton = createButton("deleteTask", "🗑️");
            var editButton = createButton("editTask", "✏️");

            // var deleteButton = document.createElement("button");
            // deleteButton.className = "deleteTask";
            // deleteButton.appendChild(document.createTextNode("🗑️"));

            newLink.appendChild(deleteButton);
            newLink.appendChild(editButton);

            if (arrayTask == null) {
                arrayTask = [];
                arrayTask.push(newTaskText);
                localStorage.setItem("dades", JSON.stringify(arrayTask));
                console.log(arrayTask);
            } else {
                var arrayTasques = JSON.parse(localStorage.getItem("dades"));
                arrayTasques.push(newTaskText);
                localStorage.setItem("dades", JSON.stringify(arrayTasques));
                console.log(arrayTasques);
            }

            newLink.appendChild(document.createTextNode(newTaskText));
            newLink.href = "#" + newTaskText.toLowerCase();

            newItem.appendChild(newLink);
            $("ul").append(newItem)
            $("ul").listview("refresh");
        }
    })

    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("deleteTask")) {
            deleteTask(event.target);
        } else if (event.target.classList.contains("editTask")) {
            editTask(event.target);
        }
    });
}

function createButton(className, buttonText) {
    var button = document.createElement("button");
    button.className = className;
    button.appendChild(document.createTextNode(buttonText));
    return button;
}

function deleteTask(deleteButton) {
    var taskLink = deleteButton.closest("a");

    var taskText = taskLink.textContent.trim().substring(5);
    console.log("Tarea a eliminar:", taskText);

    var arrayTask = JSON.parse(localStorage.getItem("dades"));
    console.log("Array de tareas antes de la eliminación:", arrayTask);

    var index = arrayTask.indexOf(taskText);
    console.log("Índice de la tarea a eliminar:", index);

    // He hecho que elimine el primer objeto que coincida con el nombre de la tarea
    if (index !== -1) {
        arrayTask.splice(index, 1);

        localStorage.setItem("dades", JSON.stringify(arrayTask));
        console.log("Array de tareas después de la eliminación:", arrayTask);
        console.log("localStorage después de la eliminación:", localStorage.getItem("dades"));
    } else {
        console.log("La tarea no se encontró en el array.");
    }

    var taskItem = deleteButton.closest("li");
    if (taskItem) {
        taskItem.remove();
    }
}



function editTask(editButton) {
    var taskItem = editButton.closest("li");
    if (taskItem) {
        var taskLink = taskItem.querySelector("a");
        var originalTaskText = taskLink.lastChild.nodeValue.trim();

        var inputElement = document.createElement("input");
        inputElement.type = "text";
        inputElement.value = originalTaskText;

        taskLink.replaceChild(inputElement, taskLink.lastChild);

        inputElement.focus();

        inputElement.addEventListener("blur", function () {
            var newTaskText = inputElement.value;

            taskLink.replaceChild(document.createTextNode(newTaskText), inputElement);

            if (newTaskText !== originalTaskText) {
                updateTaskInLocalStorage(originalTaskText, newTaskText);
            }
        });
    }
}

function updateTaskInLocalStorage(originalTaskText, newTaskText) {
    var arrayTask = JSON.parse(localStorage.getItem("dades")) || [];

    var index = arrayTask.indexOf(originalTaskText);
    if (index !== -1) {
        arrayTask[index] = newTaskText;

        localStorage.setItem("dades", JSON.stringify(arrayTask));
    }
}