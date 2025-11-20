// Wait for the entire HTML document to be loaded before running script
document.addEventListener('DOMContentLoaded', () => {

    // --- Get All Elements ---
    const loginView = document.getElementById('login-view');
    const signupView = document.getElementById('signup-view');
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    const messageBox = document.getElementById('message-box');
    const modalContainer = document.getElementById('modal-container');
    const openAuthBtn = document.getElementById('open-auth-btn');

    // Simple Login validation
function validateLogin() {
    var username = document.getElementById("login-email").value;
    var password = document.getElementById("login-password").value;

    if (username === "jrenmasangkay@gmail.com" && password === "jren123") {
        $.mobile.changePage("#useraccount.html"); // Go to useraccount page
    } else {
        alert("Invalid login! Try again.");
    }
}

    // --- Modal Functions ---
    function openModal() {
        if (modalContainer) {
            modalContainer.classList.remove('hidden');
        }
        // Always default to login view when opening
        // We call window.showView because it's defined globally below
        if (window.showView) {
            window.showView('login');
        }
    }

    function closeModal() {
        if (modalContainer) {
            modalContainer.classList.add('hidden');
        }
    }

    // --- Attach Main Modal Listener ---
    // This is the most likely point of failure.
    // Check if the button was actually found in the HTML.
    if (openAuthBtn) {
        openAuthBtn.addEventListener('click', openModal);
    } else {
        // Log an error to the console so you can see what's wrong
        console.error('Error: Could not find element with id="open-auth-btn". Make sure your HTML is correct.');
    }

    // --- Define Functions for HTML onclicks ---
    // We must attach these to the `window` object
    // so the `onclick="..."` attributes in the HTML can find them.

    window.showView = function(view) {
        if (!loginView || !signupView || !loginTab || !signupTab) return;

        if (view === 'login') {
            loginView.classList.remove('hidden');
            signupView.classList.add('hidden');
            loginTab.classList.add('active-tab');
            signupTab.classList.remove('active-tab');
        } else if (view === 'signup') {
            signupView.classList.remove('hidden');
            loginView.classList.add('hidden');
            signupTab.classList.add('active-tab');
            loginTab.classList.remove('active-tab');
        }
    }

    window.togglePasswordVisibility = function(id) {
        const input = document.getElementById(id);
        if (!input) return; // Guard clause

        const showIcon = document.getElementById(`${id}-toggle-show`);
        const hideIcon = document.getElementById(`${id}-toggle-hide`);
        if (!showIcon || !hideIcon) return; // Guard clause

        if (input.type === 'password') {
            input.type = 'text';
            showIcon.classList.add('hidden');
            hideIcon.classList.remove('hidden');
        } else {
            input.type = 'password';
            showIcon.classList.remove('hidden');
            hideIcon.classList.add('hidden');
        }
    }

    window.handleFormSubmit = function(event, formName) {
        event.preventDefault();
        if (window.showMessage) {
            window.showMessage(`${formName} submitted!`);
        }
        
        // Use the internal closeModal function
        setTimeout(closeModal, 2000);
    }

    window.showMessage = function(message) {
        if (!messageBox) return; // Guard clause
        messageBox.textContent = message;
        messageBox.classList.remove('opacity-0', 'pointer-events-none');
        setTimeout(() => {
            messageBox.classList.add('opacity-0', 'pointer-events-none');
        }, 3000);
    }

    // Expose closeModal to window for the 'X' buttons in the HTML
    window.closeModal = closeModal;

});
