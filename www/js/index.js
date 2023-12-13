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

    $("#addTask").click(function () {
        var newTaskText = prompt("Enter the text for the new Task:");

        if (newTaskText) {
            var newItem = document.createElement("li");
            var newLink = document.createElement("a");

            var deleteButton = document.createElement("button");
            deleteButton.className = "deleteTask";
            deleteButton.appendChild(document.createTextNode("🗑️"));

            newLink.appendChild(deleteButton);
            newLink.appendChild(document.createTextNode(newTaskText));
            newLink.href = "#" + newTaskText.toLowerCase();

            newItem.appendChild(newLink);
            $("ul").append(newItem)
            $("ul").listview("refresh");
        }
    })

    document.body.addEventListener("click", function(event) {
        if (event.target.classList.contains("deleteTask")) {
            deleteTask(event.target);
        }
    });
}

function deleteTask(deleteButton) {
    // Remove the corresponding task from the list
    var taskItem = deleteButton.closest("li");
    if (taskItem) {
        taskItem.remove();
    }
}