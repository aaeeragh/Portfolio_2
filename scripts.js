function downloadCV() {
    // You can add your CV download functionality here
    alert("Download My CV functionality can be added here!");
}


// website counter 

// Function to get the current view count from local storage
function getViewCount() {
    let count = localStorage.getItem('viewCount');
    if (count === null) {
        count = 0; // Default to 0 if no count is stored
    }
    return parseInt(count, 10);
}

// Function to update the view count in local storage
function updateViewCount() {
    let count = getViewCount() + 1;
    localStorage.setItem('viewCount', count);
    return count;
}

// Update the view counter on page load
document.addEventListener('DOMContentLoaded', () => {
    const viewCounter = document.getElementById('viewCounter');
    const currentCount = updateViewCount();
    viewCounter.textContent = currentCount;
});


// chatroom

document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chatBox');
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');

    sendButton.addEventListener('click', () => {
        const message = messageInput.value.trim();
        if (message) {
            // Send message to server
            fetch('/send-message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message })
            })
            .then(response => response.json())
            .then(data => {
                // Display the new message
                chatBox.innerHTML += `<div>${data.message}</div>`;
                chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
                messageInput.value = ''; // Clear input field
            });
        }
    });

    // Load initial messages
    fetch('/get-messages')
        .then(response => response.json())
        .then(data => {
            chatBox.innerHTML = data.messages.map(msg => `<div>${msg}</div>`).join('');
        });
});


// this code is for the contact form i.e receiving mails 
const form = document.querySelector('form');

function sendMail(){
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "official.anuragpatel05@gmail.com",
        Password : "37E14C2450FC6C4623DD26962286D4E236F4",
        To : 'official.anuragpatel05@gmail.com',
        From : "official.anuragpatel05@gmail.com",
        Subject : "Aakage your website contact",
        Body : "And this is the body"
    }).then(
      message => alert(message)
    );
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    sendMail();
    alert('Email Sent Successfully');
    form.reset();
});