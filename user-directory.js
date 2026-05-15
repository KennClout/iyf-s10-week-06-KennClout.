const loading = document.getElementById("loading");
const errorDiv = document.getElementById("error");
const container = document.getElementById("users-container");
const searchInput = document.getElementById("search");

let allUsers = [];

async function fetchUsers() {
    try {
        loading.classList.remove("hidden");

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        if (!response.ok) {
            throw new Error("Failed to fetch users");
        }

        const users = await response.json();

        allUsers = users;

        displayUsers(users);

    } catch (error) {
        errorDiv.textContent = error.message;
        errorDiv.classList.remove("hidden");
    } finally {
        loading.classList.add("hidden");
    }
}

function displayUsers(users) {
    container.innerHTML = users.map(user => `
        <div class="user-card">
            <h2>${user.name}</h2>
            <p>Email: ${user.email}</p>
            <p>City: ${user.address.city}</p>
            <p>Company: ${user.company.name}</p>
        </div>
    `).join("");
}

searchInput.addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();

    const filtered = allUsers.filter(user =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );

    displayUsers(filtered);
});

fetchUsers();
