const loginView = document.getElementById('login-view');
const signupView = document.getElementById('signup-view');
const messageBox = document.getElementById('message-box');

function showView(view) {
    const loginTab = document.getElementById('login-tab');
    const signupTab = document.getElementById('signup-tab');
    
    if (view === 'login') {
        loginView.classList.remove('hidden');
        signupView.classList.add('hidden');
        loginTab.classList.add('active-tab');
        signupTab.classList.remove('active-tab');
    } else {
        loginView.classList.add('hidden');
        signupView.classList.remove('hidden');
        signupTab.classList.add('active-tab');
        loginTab.classList.remove('active-tab');
    }
}

function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const showIcon = document.getElementById(`${inputId}-toggle-show`);
    const hideIcon = document.getElementById(`${inputId}-toggle-hide`);

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

function handleFormSubmit(event, formName) {
    event.preventDefault();

    if (formName === 'Create Account') {
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-confirm-password').value;

        if (password !== confirmPassword) {
            showMessage('Error: Passwords do not match!', true);
            return;
        }
    }

    showMessage(`${formName} successful (Simulated). Data captured.`, false);
}

function showMessage(message, isError = false) {
    messageBox.textContent = message;
    messageBox.classList.remove('bg-gray-800', 'bg-red-600');
    messageBox.classList.add(isError ? 'bg-red-600' : 'bg-gray-800');

    messageBox.classList.remove('opacity-0', 'pointer-events-none');
    messageBox.classList.add('opacity-100');

    setTimeout(() => {
        messageBox.classList.remove('opacity-100');
        messageBox.classList.add('opacity-0');
        setTimeout(() => {
            messageBox.classList.add('pointer-events-none');
        }, 300);
    }, 3000);
}

window.onload = () => {
    showView('login');
};
