// ==========================================
// TASK 11.1 - Understanding Async
// ==========================================

console.log("A");

setTimeout(() => console.log("B"), 0);

console.log("C");

setTimeout(() => console.log("D"), 100);

console.log("E");

// Output:
// A
// C
// E
// B
// D


// ==========================================
// Callback Pattern
// ==========================================

function loadUser(userId, callback) {
    setTimeout(() => {
        const user = {
            id: userId,
            name: "Kenneth",
            age: 20
        };

        callback(user);
    }, 1500);
}

loadUser(1, function(user) {
    console.log("Loaded User:", user);
});


// ==========================================
// TASK 11.2 - Callback Hell
// ==========================================

function getUserData(userId, callback) {
    setTimeout(() => {
        callback({ id: userId, name: "Kenneth" });
    }, 1000);
}

function getUserPosts(userId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, title: "JavaScript Basics" },
            { id: 2, title: "Async JS" }
        ]);
    }, 1000);
}

function getPostComments(postId, callback) {
    setTimeout(() => {
        callback([
            { id: 1, text: "Great post!" },
            { id: 2, text: "Very helpful!" }
        ]);
    }, 1000);
}

getUserData(1, function(user) {
    console.log("User:", user);

    getUserPosts(user.id, function(posts) {
        console.log("Posts:", posts);

        getPostComments(posts[0].id, function(comments) {
            console.log("Comments:", comments);
        });
    });
});


// ==========================================
// Promises
// ==========================================

function getUserDataPromise(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (userId > 0) {
                resolve({ id: userId, name: "Kenneth" });
            } else {
                reject("Invalid User ID");
            }
        }, 1000);
    });
}

function getUserPostsPromise(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, title: "Post One" },
                { id: 2, title: "Post Two" }
            ]);
        }, 1000);
    });
}

function getPostCommentsPromise(postId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, text: "Awesome!" },
                { id: 2, text: "Nice work!" }
            ]);
        }, 1000);
    });
}


// ==========================================
// Promise Chaining
// ==========================================

getUserDataPromise(1)
    .then(user => {
        console.log("User:", user);
        return getUserPostsPromise(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts);
        return getPostCommentsPromise(posts[0].id);
    })
    .then(comments => {
        console.log("Comments:", comments);
    })
    .catch(error => {
        console.log("Error:", error);
    });


// ==========================================
// Promise.all
// ==========================================

Promise.all([
    getUserDataPromise(1),
    getUserDataPromise(2),
    getUserDataPromise(3)
])
.then(users => {
    console.log("All Users:", users);
})
.catch(error => {
    console.log(error);
});


// ==========================================
// Promise.race
// ==========================================

const fast = new Promise(resolve =>
    setTimeout(() => resolve("Fast!"), 100)
);

const slow = new Promise(resolve =>
    setTimeout(() => resolve("Slow!"), 500)
);

Promise.race([fast, slow])
    .then(result => {
        console.log("Winner:", result);
    });


// ==========================================
// Async / Await
// ==========================================

async function getDataWithAsync() {
    try {
        const user = await getUserDataPromise(1);
        console.log(user);

        const posts = await getUserPostsPromise(user.id);
        console.log(posts);

        const comments = await getPostCommentsPromise(posts[0].id);
        console.log(comments);

    } catch (error) {
        console.log(error);
    }
}

getDataWithAsync();


// ==========================================
// Daily Challenge - delay(ms)
// ==========================================

function delay(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    });
}

async function runDelay() {
    await delay(2000);
    console.log("This prints after 2 seconds");
}

runDelay();
