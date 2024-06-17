// Function to navigate to different pages
function navigateTo(page) {
    window.location.href = page;
}

// Function to get all diary entries from localStorage
function getEntries() {
    return JSON.parse(localStorage.getItem("diaryEntries")) || [];
}

// Function to save entries to localStorage
function saveEntries(entries) {
    localStorage.setItem("diaryEntries", JSON.stringify(entries));
}

// Function to render diary entries on the list page
function renderEntries() {
    const entries = getEntries();
    const listContainer = document.querySelector(".list__container");
    listContainer.innerHTML = "";

    entries.forEach((entry, index) => {
        const diaryItem = document.createElement("div");
        diaryItem.classList.add("diary__item");

        diaryItem.innerHTML = `
      <h2 class="diary__title">${entry.title}</h2>
      <p class="diary__content" onclick="viewEntry(${index})">${
            entry.content
        }</p>
      <div class="diary__footer">
        <h4 class="diary__date">${formatDate(entry.date)}</h4>
        <div class="diary__icons">
          <button class="edit__icon" onclick="editEntry(${index})">
            <img class="icon" src="./assets/icons/edit-icon.svg" alt="Edit" />
          </button>
          <button class="delete__icon" onclick="deleteEntry(${index})">
            <img class="icon" src="./assets/icons/delete-icon.svg" alt="Delete" />
          </button>
        </div>
      </div>
    `;

        listContainer.appendChild(diaryItem);
    });
}

// Function to create a new diary entry
function createEntry(title, content, date) {
    const entries = getEntries();
    entries.push({ title, content, date });
    saveEntries(entries);
    navigateTo("index.html");
}

// Function to update an existing diary entry
function updateEntry(index, title, content, date) {
    const entries = getEntries();
    entries[index] = { title, content, date };
    saveEntries(entries);
    navigateTo("index.html");
}

// Function to delete an entry
function deleteEntry(index) {
    const entries = getEntries();
    entries.splice(index, 1);
    saveEntries(entries);
    renderEntries();
}

// Function to view a diary entry
function viewEntry(index) {
    const entries = getEntries();
    const entry = entries[index];
    localStorage.setItem("viewEntry", JSON.stringify(entry));
    navigateTo("view-page.html");
}

// Function to edit a diary entry
function editEntry(index) {
    localStorage.setItem("editIndex", index);
    navigateTo("edit-page.html");
}

// Function to format dates
function formatDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
}

// Handling form submission for creating and editing entries
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("diary__form");
    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const title = document.getElementById("title").value;
            const content = document.querySelector("textarea").value;
            const date = document.getElementById("date").value;

            if (window.location.href.includes("create-page.html")) {
                createEntry(title, content, date);
            } else if (window.location.href.includes("edit-page.html")) {
                const index = localStorage.getItem("editIndex");
                updateEntry(index, title, content, date);
            }
        });
    }

    if (window.location.href.includes("view-page.html")) {
        const entry = JSON.parse(localStorage.getItem("viewEntry"));
        document.querySelector(".diary__title").textContent = entry.title;
        document.querySelector(".diary__content").textContent = entry.content;
        document.querySelector(".diary__date").textContent = formatDate(
            entry.date
        );
        document
            .querySelector(".delete__btn")
            .addEventListener("click", function () {
                const entries = getEntries();
                const index = entries.findIndex(
                    (e) =>
                        e.title === entry.title &&
                        e.content === entry.content &&
                        e.date === entry.date
                );
                deleteEntry(index);
                navigateTo("index.html");
            });
    }

    if (window.location.href.includes("edit-page.html")) {
        const index = localStorage.getItem("editIndex");
        const entry = getEntries()[index];
        document.getElementById("title").value = entry.title;
        document.querySelector("textarea").value = entry.content;
        document.getElementById("date").value = entry.date;
    }

    if (window.location.href.includes("index.html")) {
        renderEntries();
    }
});
