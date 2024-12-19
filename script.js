// Get references to the input box and list container elements
const inputBox = document.getElementById("input-box"); // Input field where the user types tasks
const listContainer = document.getElementById("list-container"); // Container to display the list of tasks

// Function to add a new task
function addTask() {
    if (inputBox.value === '') {
        // Alert the user if the input box is empty
        alert("You must write something!");
    } else {
        // Create a new list item (li) for the task
        let li = document.createElement("li");
        li.innerHTML = inputBox.value; // Set the text of the task

        // Create a span element for the delete (×) button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Unicode for the × symbol
        li.appendChild(span); // Add the delete button to the task

        // Append the task (li) to the list container
        listContainer.appendChild(li);
    }

    // Clear the input box after adding the task
    inputBox.value = "";

    // Save the updated list to localStorage
    saveData();
}

// Event listener for user interactions with the list container
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        // If the user clicks on a task, toggle the "checked" class
        e.target.classList.toggle("checked");
        saveData(); // Save the updated list to localStorage
    } else if (e.target.tagName === "SPAN") {
        // If the user clicks on the × button, remove the task
        e.target.parentElement.remove();
        saveData(); // Save the updated list to localStorage after removing the task
    }
}, false);

// Function to save the list data to localStorage
function saveData() {
    // Store the current innerHTML of the list container in localStorage
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to display tasks stored in localStorage
function showTask() {
    // Retrieve the saved list from localStorage and display it in the list container
    listContainer.innerHTML = localStorage.getItem("data");

    // Ensure the delete functionality works after retrieving tasks from localStorage
    const spans = listContainer.querySelectorAll("span");
    spans.forEach(span => {
        span.addEventListener("click", function (e) {
            e.target.parentElement.remove();
            saveData();
        });
    });
}

// Call the showTask function to display saved tasks when the page loads
showTask();
