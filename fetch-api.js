// ==========================================
// Fetch Single User
// ==========================================

fetch("https://jsonplaceholder.typicode.com/users/1")
    .then(response => response.json())
    .then(data => {
        console.log("Single User:", data);
    })
    .catch(error => {
        console.log(error);
    });


// ==========================================
// Fetch All Users
// ==========================================

async function fetchUsers() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users"
        );

        const users = await response.json();

        console.log("All Users:", users);

    } catch (error) {
        console.log(error);
    }
}

fetchUsers();


// ==========================================
// Fetch Posts
// ==========================================

async function fetchPosts() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1/posts"
        );

        const posts = await response.json();

        console.log("Posts:", posts);

    } catch (error) {
        console.log(error);
    }
}

fetchPosts();


// ==========================================
// POST Request
// ==========================================

async function createPost() {
    try {
        const response = await fetch(
            "https://jsonplaceholder.typicode.com/posts",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    title: "My First Post",
                    body: "This is my content",
                    userId: 1
                })
            }
        );

        const data = await response.json();

        console.log("Created Post:", data);

    } catch (error) {
        console.log(error);
    }
}

createPost();
