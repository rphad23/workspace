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

        addTaskButton.addEventListener('click', () => {
            openTaskModal();
        });

        function addTaskEdit() {
            // Get the current user, due date, and status values
            const currentUser = document.getElementById('assignee-edit').value;

            // Create a new task input field in the edit modal with the current user, due date, and status
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

            // Set the user dropdown to the current user
            taskItem.querySelector('.task-status').value = currentUser;

            taskListEdit.appendChild(taskItem);
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
            const editModal = document.getElementById('edit-modal');
            editModal.style.display = 'block';
        }

        function populateEditModalFields(card) {
            const title = card.querySelector('h3').textContent;
            const date = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
            const assignee = card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];

            document.getElementById('title-edit').value = title;
            document.getElementById('date-edit').value = date;
            document.getElementById('assignee-edit').value = assignee;

            const tasks = Array.from(card.querySelector('.task-list-card').children).map(task => task.textContent);

            // Clear the current task list in the edit modal
            taskListEdit.innerHTML = '';

            // Populate the task list in the edit modal
            tasks.forEach(task => {
                const taskItem = document.createElement('div');
                taskItem.innerHTML = `
            <input type="text" class="task-input" value="${task}">
            <input type="date" class="due-date" value="">
            <select class="task-status">
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>
        `;
                taskListEdit.appendChild(taskItem);
            });
        }



        editCardButton.addEventListener('click', () => {
            openEditModal();
            populateEditModalFields(editingCard);
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

        function saveCard() {
            const title = document.getElementById('title').value;
            const date = document.getElementById('date').value;
            const assignee = document.getElementById('assignee').value;
            const taskItems = Array.from(taskList.querySelectorAll('.task-input')).map(input => input.value);
            const dueDates = Array.from(taskList.querySelectorAll('.due-date')).map(input => input.value);
            const statuses = Array.from(taskList.querySelectorAll('.task-status')).map(select => select.value);

            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h3>${title}</h3>
                <p>Date: ${date}</p>
                <p>Assignee: ${assignee}</p>
                <div class="task-list-card">
                    <!-- Task items will be displayed here dynamically -->
                </div>
            `;
            const taskListCard = card.querySelector('.task-list-card');

            for (let i = 0; i < taskItems.length; i++) {
                const taskItem = document.createElement('div');
                taskItem.innerHTML = `
                    <p>Task: ${taskItems[i]}</p>
                    <p>Due Date: ${dueDates[i]}</p>
                    <p>Status: ${statuses[i]}</p>
                `;
                taskListCard.appendChild(taskItem);
            }

            cardsContainer.appendChild(card);
            closeCardModal();
        }
        function viewCardDetails(card) {
            const title = card.querySelector('h3').textContent;
            const date = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];
            const assignee = card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];
            const taskItems = Array.from(card.querySelectorAll('.task-list-card > div'));

            document.getElementById('title-view').textContent = `Title: ${title}`;
            document.getElementById('date-view').textContent = `Date: ${date}`;
            document.getElementById('assignee-view').textContent = `Assignee: ${assignee}`;
            taskListView.innerHTML = '';

            for (const taskItem of taskItems) {
                taskListView.appendChild(taskItem.cloneNode(true));
            }

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

        function populateEditModalFields(card) {
            const title = card.querySelector('h3').textContent;
            const assignee = card.querySelector('p:nth-of-type(3)').textContent.split(': ')[1];
            const date = card.querySelector('p:nth-of-type(2)').textContent.split(': ')[1];

            document.getElementById('title-edit').value = title;
            document.getElementById('assignee-edit').value = assignee;
            document.getElementById('date-edit').value = date;

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
            <input type="date" class="due-date" value="${dueDate}">
            <select class="task-status">
                <option value="Not Started" ${status === 'Not Started' ? 'selected' : ''}>Not Started</option>
                <option value="In Progress" ${status === 'In Progress' ? 'selected' : ''}>In Progress</option>
                <option value="Completed" ${status === 'Completed' ? 'selected' : ''}>Completed</option>
            `;
                taskListEdit.appendChild(taskItem);
            });
        }

        function saveChanges() {
            const title = document.getElementById('title-edit').value;
            const date = document.getElementById('date-edit').value;
            const assignee = document.getElementById('assignee-edit').value;
            const taskItems = Array.from(taskListEdit.querySelectorAll('.task-input')).map(input => input.value);
            const dueDates = Array.from(taskListEdit.querySelectorAll('.due-date')).map(input => input.value);
            const statuses = Array.from(taskListEdit.querySelectorAll('.task-status')).map(select => select.value);

            if (editingCard) {
                editingCard.querySelector('h3').textContent = title;
                editingCard.querySelector('p:nth-of-type(2)').textContent = `Date: ${date}`;
                editingCard.querySelector('p:nth-of-type(3)').textContent = `Assignee: ${assignee}`;

                const taskListCard = editingCard.querySelector('.task-list-card');
                const existingTasks = Array.from(taskListCard.children);

                for (let i = 0; i < taskItems.length; i++) {
                    const taskItem = existingTasks[i] || document.createElement('div');
                    taskItem.innerHTML = `
                <p>Task: ${taskItems[i]}</p>
                <p>Due Date: ${dueDates[i]}</p>
                <p>Status: ${statuses[i]}</p>
            `;
                    taskListCard.appendChild(taskItem);
                }

                document.getElementById('title-view').textContent = `Title: ${title}`;
                document.getElementById('date-view').textContent = `Date: ${date}`;
                document.getElementById('assignee-view').textContent = `Assignee: ${assignee}`;

                const taskListView = document.getElementById('task-list-view');
                taskListView.innerHTML = '';
                taskItems.forEach((task, index) => {
                    const taskItem = document.createElement('div');
                    taskItem.innerHTML = `
                <p>Task: ${task}</p>
                <p>Due Date: ${dueDates[index]}</p>
                <p>Status: ${statuses[index]}</p>
            `;
                    taskListView.appendChild(taskItem);
                });
                closemodalEdit();
            }
        }