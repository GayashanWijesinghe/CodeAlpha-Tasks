let token = null;

document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
});

function fetchPosts() {
    fetch('http://localhost:4848/api/posts')
        .then(response => response.json())
        .then(posts => {
            const postContainer = document.getElementById('posts');
            postContainer.innerHTML = '';
            posts.forEach(post => {
                const postElement = document.createElement('div');
                postElement.classList.add('post');
                postElement.innerHTML = `
                    <p>${post.content}</p>
                    <small>By User ${post.user}</small>
                    <button onclick="likePost(${post._id})">Like</button>
                `;
                postContainer.appendChild(postElement);
            });
        });
}

function showLogin() {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    
    fetch('http://localhost:4848/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        token = data.token;
        alert('Login successful');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function showRegister() {
    const username = prompt('Enter username:');
    const password = prompt('Enter password:');
    
    fetch('http://localhost:4848/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        alert('Registration successful');
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function createPost() {
    const content = document.getElementById('post-content').value;
    if (!content) {
        alert('Post content cannot be empty');
        return;
    }

    fetch('http://localhost:4848/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ content })
    })
    .then(response => response.json())
    .then(post => {
        alert('Post created successfully');
        fetchPosts();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

function likePost(postId) {
    fetch(`http://localhost:4848/api/posts/${postId}/like`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            alert('Post liked successfully');
            fetchPosts();
        } else {
            response.text().then(text => alert(text));
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
}
