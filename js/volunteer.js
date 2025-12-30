// CONFIGURATION: You will replace this URL after doing the Google Sheets setup step
const GOOGLE_SCRIPT_URL = "REPLACE_THIS_WITH_YOUR_DEPLOYMENT_ID_URL"; 

document.addEventListener("DOMContentLoaded", function() {
    // Check if user already registered for the event
    if (localStorage.getItem('event-joined-001')) {
        updateUIAsRegistered();
    }
});

window.submitVolunteer = function(e) {
    e.preventDefault();
    
    const btn = document.querySelector('#volunteer-form button[type="submit"]');
    const originalText = btn.innerHTML;
    
    // 1. Get Values
    const name = document.getElementById('volunteer-name').value;
    const email = document.getElementById('volunteer-email').value;
    const fb = document.getElementById('volunteer-fb').value || "N/A";
    
    if (!name || !email) {
        showToast("Please fill in all required fields.", "error");
        return;
    }

    // 2. Loading State
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Registering...';

    // 3. Prepare Data for Google Sheets
    // Note: We use 'no-cors' mode which means we can't read the response, 
    // but it allows the data to reach Google from a static site.
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('facebook', fb);
    formData.append('timestamp', new Date().toISOString());

    if (GOOGLE_SCRIPT_URL === "REPLACE_THIS_WITH_YOUR_DEPLOYMENT_ID_URL") {
        console.warn("Google Script URL not set. Simulating success.");
        simulateSuccess(name, btn, originalText);
        return;
    }

    fetch(GOOGLE_SCRIPT_URL, { method: 'POST', body: formData, mode: 'no-cors'})
    .then(() => {
        simulateSuccess(name, btn, originalText);
    })
    .catch(error => {
        console.error('Error!', error.message);
        showToast("Connection Error. Please try again.", "error");
        btn.disabled = false;
        btn.innerHTML = originalText;
    });
}

function simulateSuccess(name, btn, originalText) {
    // Close Modal
    document.getElementById('volunteer-modal').classList.add('hidden');
    
    // Save Local State
    localStorage.setItem('event-joined-001', 'registered');
    localStorage.setItem('volunteer-name', name);
    
    // Update UI
    updateUIAsRegistered();
    
    // Show Success Toast
    showToast(`Welcome aboard, ${name}! Registration successful.`);
    
    // Reset Button (hidden anyway)
    btn.disabled = false;
    btn.innerHTML = originalText;
    
    // Clear Form
    document.getElementById('volunteer-form').reset();
}

function updateUIAsRegistered() {
    const joinBtn = document.getElementById('join-btn');
    if (joinBtn) {
        joinBtn.classList.remove('bg-[#064e3b]', 'hover:bg-emerald-800'); // Removes custom colors if they were inline or tailwind
        joinBtn.className = "bg-emerald-700 text-white font-heading font-bold py-3 px-8 rounded-full shadow-lg w-full sm:w-auto flex justify-center items-center gap-2 cursor-default opacity-80";
        joinBtn.innerHTML = '<i class="fas fa-check-circle"></i> <span>Registered</span>';
        joinBtn.onclick = null; // Disable click
    }
}