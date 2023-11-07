const cardsContainer = document.getElementById('cards');
const addCardButton = document.getElementById('add-card');

const cardModal = document.getElementById('card-modal');
const editModal = document.getElementById('edit-modal');

const viewCardModal = document.getElementById('view-card-modal');
const modalContent = document.getElementById('modal-content');
const viewContent = document.getElementById('view-content');

const saveCardButton = document.getElementById('save-card');

const saveChangesButton = document.getElementById('save-changes-edit');

const closeCardButton = document.getElementById('close-card-modal');
const closeEditModal = document.getElementById('close-edit-modal');
const closeEdit = document.getElementById('edit-modal');

const addTaskButton = document.getElementById('add-task');
const addTaskButtonEdit = document.getElementById('add-task-edit');

const taskList = document.getElementById('task-list');
const taskListEdit = document.getElementById('task-list-edit');

const taskListView = document.getElementById('task-list-view');
const editCardButton = document.getElementById('edit-card');
const closeViewCardButton = document.getElementById('close-view-card-modal');
let editingCard = null;

addCardButton.addEventListener('click', () => {
    openCardModal();
    clearCardModalFields();
});

saveCardButton.addEventListener('click', () => {
    saveCard();
});

saveChangesButton.addEventListener('click', () => {
    saveChanges();
});

closeCardButton.addEventListener('click', () => {
    closeCardModal();
});

closeEditModal.addEventListener('click', () => {
    closemodalEdit();
});

// Create Card Modal
addTaskButton.addEventListener('click', () => {
    // Add a new task input field in the card modal
    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item'); // Add a class to identify task items
    taskItem.innerHTML = `
<input type="text" class="task-input" placeholder="Task">
<input type="date" class="due-date" placeholder="Due Date">
<select class="task-status">
    <option value="Not Started">Not Started</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
</select>
<button class="delete-task-edit">Delete</button>
`;
    taskList.appendChild(taskItem);

    // Attach a click event listener to the "Delete" button for this task
    const deleteTaskButton = taskItem.querySelector('.delete-task-edit');
    deleteTaskButton.addEventListener('click', () => {
        taskList.removeChild(taskItem); // Remove the task when the "Delete" button is clicked
    });
});


function addTaskEdit() {
    const currentUser = document.getElementById('assignee-edit').value;

    const taskItem = document.createElement('div');
    taskItem.classList.add('task-item'); // Add a class to the task item
    taskItem.innerHTML = `
<input type="text" class="task-input" placeholder="Task">
<input type="date" class="due-date" placeholder="Due Date">
<select class="task-status">
    <option value="Not Started">Not Started</option>
    <option value="In Progress">In Progress</option>
    <option value="Completed">Completed</option>
</select>
<button class="delete-task-edit">Delete</button>
`;
    taskListEdit.appendChild(taskItem);
    // Attach a click event listener to the "Delete" button for this task
    const deleteTaskButton = taskItem.querySelector('.delete-task-edit');
    deleteTaskButton.addEventListener('click', () => {
        taskList.removeChild(taskItem); // Remove the task when the "Delete" button is clicked
    });


}




addTaskButtonEdit.addEventListener('click', () => {
    addTaskEdit();
});


cardsContainer.addEventListener('click', (event) => {
    const card = event.target.closest('.card');
    if (card) {
        editingCard = card;
        viewCardDetails(editingCard);
    }
});

function openEditModal() {
    editModal.style.display = 'block';
    populateEditModalFields(editingCard); // Populate fields in the edit modal
    const taskListCard = editingCard.querySelector('.task-list-card');
    const tasks = Array.from(taskListCard.children);

    taskListEdit.innerHTML = '';

    tasks.forEach(task => {
        const taskText = task.querySelector('p:nth-of-type(1)').textContent.split(': ')[1];
        const dueDate = task.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
        const status = task.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];

        // Create a task item container
        const taskItem = document.createElement('div');
        taskItem.classList.add('task-item-edit');
        taskItem.innerHTML = `
    <input type="text" class="task-input" value="${taskText}">
    <input type="date" class="due-date" value="${formatDateForEdit(dueDate)}">
    <select class="task-status">
        <option value="Not Started" ${status === 'Not Started' ? 'selected' : ''}>Not Started</option>
        <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
        <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
        </select>
    `;
    });
}



function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');

    // Set the notification message
    notificationText.textContent = message;

    // Slide the notification in from the right
    notification.style.right = '0';

    // Automatically hide the notification after 20 seconds
    setTimeout(function () {
        hideNotification();
    }, 10000); // 20 seconds
}

function hideNotification() {
    const notification = document.getElementById('notification');

    // Slide the notification out to the right
    notification.style.right = '-100%';
    notification.style.overflow = 'hidden'; // Hide completely off-screen
}

// Close the notification when the close button is clicked
document.getElementById('notification-close').addEventListener('click', hideNotification);

function populateCardFields(card) {
    const title = card.querySelector('h3').textContent;
    const assignee = card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];
    const originalDate = card.querySelector('.card-date').getAttribute('data-original-date');

    document.getElementById('title-edit').value = title;
    document.getElementById('assignee-edit').value = assignee;

    // Set the date in the edit modal
    document.getElementById('date-edit').value = formatDateForEdit(originalDate);

    const taskListCard = card.querySelector('.task-list-card');
    const tasks = Array.from(taskListCard.children);

    // Clear the current task list in the edit modal
    taskListEdit.innerHTML = '';

    // Populate the task list in the edit modal
    tasks.forEach(task => {
        const taskText = task.querySelector('p:nth-of-type(1)').textContent.split(': ')[1];
        const dueDate = task.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
        const status = task.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];

        const taskItem = document.createElement('div');
        taskItem.innerHTML = `
        <input type="text" class="task-input" value="${taskText}">
        <input type="date" class="due-date" value="${originalDate}"> <!-- Use the edit format -->
        <select class="task-status">
            <option value="Not Started" ${status === 'Not Started' ? 'selected' : ''}>Not Started</option>
            <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
            </select>                    
        `;
        taskListEdit.appendChild(taskItem);
    });
}

function populateEditModalFields(card) {
    const title = card.querySelector('h3').textContent;
    const assignee = card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];
    const originalDate = card.querySelector('.card-date').getAttribute('data-original-date');

    // Populate the fields in the edit modal
    document.getElementById('title-edit').value = title;
    document.getElementById('assignee-edit').value = assignee; // Set the current assignee
    document.getElementById('date-edit').value = originalDate;
    document.getElementById('date-edit').textContent = formatDateInWords(originalDate);

    const taskListCard = card.querySelector('.task-list-card');
    const tasks = Array.from(taskListCard.children);

    // Clear the current task list in the edit modal
    taskListEdit.innerHTML = '';

    tasks.forEach(task => {
        const taskText = task.querySelector('p:nth-of-type(1)').textContent.split(': ')[1];
        const dueDate = task.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
        const status = task.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];

        const taskItem = document.createElement('div');
        taskItem.innerHTML = `
        <input type="text" class="task-input" value="${taskText}">
        <input type="date" class="due-date" value="${formatDateForEdit(dueDate)}">
        <select class="task-status">
            <option value="Not Started" ${status === 'Not Started' ? 'selected' : ''}>Not Started</option>
            <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
            </select>
        `;
        taskListEdit.appendChild(taskItem);
    });
}




editCardButton.addEventListener('click', () => {
    openEditModal();
    populateEditModalFields(editingCard);
    populateAssigneeDropdown(); // Populate assignee dropdown
});

closeViewCardButton.addEventListener('click', () => {
    closeViewCardModal();
});

function openCardModal() {
    cardModal.style.display = 'block';
}

function closeCardModal() {
    cardModal.style.display = 'none';
}

function closemodalEdit() {
    editModal.style.display = 'none';
}

function clearCardModalFields() {
    document.getElementById('title').value = '';
    document.getElementById('date').value = '';
    document.getElementById('assignee').selectedIndex = 0;
    taskList.innerHTML = '';
}

function openTaskModal() {
    // Add a new task input field in the card modal
    const taskItem = document.createElement('div');
    taskItem.innerHTML = `
        <input type="text" class="task-input" placeholder="Task">
        <input type="date" class="due-date" placeholder="Due Date">
        <select class="task-status">
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
    `;
    taskList.appendChild(taskItem);
}

function openTaskModalEdit() {
    // Add a new task input field in the card modal
    const taskItem = document.createElement('div');
    taskItem.innerHTML = `
        <input type="text" class="task-input" placeholder="Task">
        <input type="date" class="due-date" placeholder="Due Date">
        <select class="task-status">
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select>
        
    `;
    taskListEdit.appendChild(taskItem);
}

function formatDateForDisplay(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        return dateString;
    }

    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

function formatDateInWords(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        // If the date couldn't be parsed, return the original string
        return dateString;
    }

    return date.toLocaleDateString(undefined, options);
}

function saveCard() {
    const title = document.getElementById('title').value;
    const dateInput = document.getElementById('date');
    const assignee = document.getElementById('assignee').value;
    const taskItems = Array.from(taskList.querySelectorAll('.task-input')).map(input => input.value);
    const dueDates = Array.from(taskList.querySelectorAll('.due-date')).map(input => input.value);
    const statuses = Array.from(taskList.querySelectorAll('.task-status')).map(select => select.value);

    if (title === '' || dateInput.value === '' || assignee === '') {
        showNotification('Please fill out all required fields');
        return; // Prevent card creation
    }
    // Check if there is at least one task
    const hasMinimumTask = taskItems.some(task => task.trim() !== '');

    if (title === '' || dateInput.value === '' || assignee === '' || !hasMinimumTask) {
        showNotification('Please fill out all required fields and add at least one task.');
        return;
    }

    // Use the original format 'yyyy-MM-dd' for saving
    const formattedDate = dateInput.value;
    const card = document.createElement('div');
    card.className = 'card';

    // Display the date as words on the card
    const formattedDateForDisplay = formatDateInWords(formattedDate);

    card.innerHTML = `
<h3 class="card-title">${title}</h3>
<p class="card-date" data-original-date="${formattedDate}">Date: ${formattedDateForDisplay}</p>
<p>Assignee: ${assignee}</p>
<div class="task-list-card">
    <!-- Task items will be displayed here dynamically -->
</div>
`;

    const taskListCard = card.querySelector('.task-list-card');

    for (let i = 0; i < taskItems.length; i++) {
        const taskItem = document.createElement('div');
        const formattedDueDate = formatDateForEdit(dueDates[i]);
        taskItem.innerHTML = `
        <button class="collapsible">${taskItems[i]}</button>
            <div class="content">
                <p>Task: ${taskItems[i]}</p>
                <p>Due Date: ${formatDateInWords(formattedDueDate)}</p>
                <p>Status: ${statuses[i]}</p>
            </div>
`;
        taskListCard.appendChild(taskItem);
    }

    cardsContainer.appendChild(card);
    closeCardModal();
}

function viewCardDetails(card) {
    const title = card.querySelector('h3').textContent;
    const dateElement = card.querySelector('.card-date');
    const assignee = card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];
    const date = dateElement.getAttribute('data-original-date'); // Get the original format

    document.getElementById('title-view').textContent = `Title: ${title}`;
    document.getElementById('date-view').textContent = `Date: ${formatDateInWords(date)}`;
    document.getElementById('assignee-view').textContent = `Assignee: ${assignee}`;
    const taskListView = document.getElementById('task-list-view');
    taskListView.innerHTML = '';

    const taskItems = Array.from(card.querySelector('.task-list-card').children);
    for (const taskItem of taskItems) {
        taskListView.appendChild(taskItem.cloneNode(true));
    }

    // Open the view card modal
    openViewCardModal();
}

function openViewCardModal() {
    viewCardModal.style.display = 'block';
}


function openEditCardModal() {
    editCardButton.style.display = 'none';
    const taskItems = Array.from(taskListView.children);
    taskList.innerHTML = '';

    for (const taskItem of taskItems) {
        const inputFields = taskItem.querySelectorAll('input, select');
        const newTaskItem = document.createElement('div');
        newTaskItem.classList.add('task-item');

        for (const inputField of inputFields) {
            const newInput = document.createElement('input');
            newInput.setAttribute('value', inputField.textContent);
            newTaskItem.appendChild(newInput);
        }

        taskList.appendChild(newTaskItem);
    }

    editCardButton.style.display = 'block';
}

function closeViewCardModal() {
    viewCardModal.style.display = 'none';
}

// Function to format the date for edit mode (yyyy-MM-dd)
function formatDateForEdit(dateString) {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // If the date couldn't be parsed, return the original string
        return dateString;
    }

    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function formatDateInPST(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
        // If the date couldn't be parsed, return the original string
        return dateString;
    }
    // Adjust the date to PST (Pacific Standard Time, USA)
    date.setHours(date.getHours() - 8); // PST is UTC-8
    return date.toLocaleDateString(undefined, options);
}


function formatDateInWordsPST(dateString) {
    // Set the timezone to 'America/Los_Angeles' (PST)
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'America/Los_Angeles' };
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
        // If the date couldn't be parsed, return the original string
        return dateString;
    }

    return date.toLocaleDateString(undefined, options);
}

function populateEditModalFields(card) {
    const title = card.querySelector('h3').textContent;
    const assignee = card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];
    const originalDate = card.querySelector('.card-date').getAttribute('data-original-date');

    document.getElementById('title-edit').value = title;
    document.getElementById('assignee-edit').value = assignee;
    document.getElementById('date-edit').value = formatDateForEdit(originalDate);
    document.getElementById('date-edit').textContent = formatDateInPST(originalDate);

    const taskListCard = card.querySelector('.task-list-card');
    const tasks = Array.from(taskListCard.children);

    taskListEdit.innerHTML = '';

    tasks.forEach(task => {
        const taskText = task.querySelector('p:nth-of-type(1)').textContent.split(': ')[1];
        const dueDate = task.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
        const status = task.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];

        const taskItem = document.createElement('div');
        taskItem.innerHTML = `
        <input type="text" class="task-input" value="${taskText}">
        <input type="date" class="due-date" value="${formatDateForEdit(dueDate)}">
        <select class="task-status">
            <option value="Not Started" ${status === 'Not Started' ? 'selected' : ''}>Not Started</option>
            <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
            <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
            </select>
            <button class="delete-task-edit" >Delete</button>
        `;
        taskListEdit.appendChild(taskItem);
        // Attach a click event listener to the "Delete" button for this task
        const deleteTaskButton = taskItem.querySelector('.delete-task-edit');
        deleteTaskButton.addEventListener('click', () => {
            taskListEdit.removeChild(taskItem); // Remove the task from the correct list
        });

    });

}

function saveChanges() {
    const title = document.getElementById('title-edit').value;
    const dateInput = document.getElementById('date-edit');
    const assignee = document.getElementById('assignee-edit').value;
    const taskItems = Array.from(taskListEdit.querySelectorAll('.task-input')).map(input => input.value);
    const dueDates = Array.from(taskListEdit.querySelectorAll('.due-date')).map(input => input.value);
    const statuses = Array.from(taskListEdit.querySelectorAll('.task-status')).map(select => select.value);

    if (title === '' || dateInput.value === '' || assignee === '') {
        showNotification('Please fill out all required fields.');
        return;
    }
    // Check if there is at least one task
    const hasMinimumTask = taskItems.some(task => task.trim() !== '');

    if (title === '' || dateInput.value === '' || assignee === '' || !hasMinimumTask) {
        showNotification('Please fill out all required fields and add at least one task.');
        return;
    }

    // Use the edit format for saving changes
    const editedDate = dateInput.value;

    if (editingCard) {
        editingCard.querySelector('h3').textContent = title;
        const dateElement = editingCard.querySelector('.card-date');
        dateElement.textContent = `Date: ${formatDateInWords(editedDate)}`;
        dateElement.setAttribute('data-original-date', editedDate);
        editingCard.querySelector('p:nth-of-type(3)').textContent = `Assignee: ${assignee}`;

        const taskListCard = editingCard.querySelector('.task-list-card');
        const existingTasks = Array.from(taskListCard.children);
        const deletedTasks = new Set();

        for (let i = 0; i < taskItems.length; i++) {
            const taskItem = existingTasks[i] || document.createElement('div');
            const formattedDueDate = formatDateForEdit(dueDates[i]);
            taskItem.innerHTML = `
            <button class="collapsible">${taskItems[i]}</button>
            <div class="content">
                <p>Task: ${taskItems[i]}</p>
                <p>Due Date: ${formatDateInWords(formattedDueDate)}</p>
                <p>Status: ${statuses[i]}</p>
            </div>
    `;

            if (existingTasks[i]) {
                existingTasks[i].innerHTML = taskItem.innerHTML;
            } else {
                taskListCard.appendChild(taskItem);
            }
        }

        // Collect deleted tasks
        for (let i = taskItems.length; i < existingTasks.length; i++) {
            deletedTasks.add(existingTasks[i]);
        }

        // Remove deleted tasks from the view card modal
        const viewTaskListCard = viewCardModal.querySelector('.task-list-card');
        for (const deletedTask of deletedTasks) {
            viewTaskListCard.removeChild(deletedTask);
        }

        // Update the view card modal immediately
        updateViewCardModal(title, editedDate, assignee, taskListCard.children);
    }
    closemodalEdit();
}




function populateAssigneeDropdown() {
    // Populate the assignee dropdown in the edit modal
    const assigneeEditDropdown = document.getElementById('assignee-edit');
    assigneeEditDropdown.innerHTML = '';
    const assigneeOptions = document.getElementById('assignee').options;
    for (let i = 0; i < assigneeOptions.length; i++) {
        const option = document.createElement('option');
        option.value = assigneeOptions[i].value;
        option.text = assigneeOptions[i].text;
        assigneeEditDropdown.appendChild(option);
    }
}

function updateViewCardModal(title, editedDate, assignee, taskItems) {
    const dateView = document.getElementById('date-view');
    dateView.textContent = `Date: ${formatDateInWords(editedDate)}`;

    const assigneeView = document.getElementById('assignee-view');
    assigneeView.textContent = `Assignee: ${assignee}`;

    const taskListView = document.getElementById('task-list-view');
    taskListView.innerHTML = '';

    for (const taskItem of taskItems) {
        taskListView.appendChild(taskItem.cloneNode(true));
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.body.addEventListener("click", function (event) {
        if (event.target.classList.contains("collapsible")) {
            console.log("Button clicked");
            event.target.classList.toggle("active");
            var content = event.target.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        }
    });
});
