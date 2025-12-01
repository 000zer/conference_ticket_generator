/* ===================================
   DOM ELEMENTS SELECTION
   =================================== */
const form = document.querySelector('.ticket-form');
const button = document.getElementById('generate-ticket');

// Form input fields
const fullNameInput = document.getElementById('full-name');
const emailInput = document.getElementById('email');
const githubInput = document.getElementById('github-username');

// Avatar upload elements
const avatarInput = document.getElementById('avatar');
const uploadArea = document.getElementById('upload-area');
const uploadPreview = document.getElementById('upload-preview');
const avatarPreview = document.getElementById('avatar-preview');
const removeImageButton = document.getElementById('remove-image');
const changeImageButton = document.getElementById('change-image');

/* ===================================
   VALIDATION ERROR FUNCTIONS
   =================================== */
// Show error message for input field
function showError(input, message) {
  const errorSpan = input.parentElement.querySelector('.input-error-msg');
  if (errorSpan) {
    // Add icon before error text
    errorSpan.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
        <path d="M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM8 11a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5A.75.75 0 018 11zm0-6a1 1 0 100 2 1 1 0 000-2z"/>
      </svg>
      <span>${message}</span>
    `;
    errorSpan.classList.add('show');
  }
  input.classList.add('input-error');
}

// Hide error message for input field
function hideError(input) {
  const errorSpan = input.parentElement.querySelector('.input-error-msg');
  if (errorSpan) {
    errorSpan.innerHTML = '';
    errorSpan.classList.remove('show');
  }
  input.classList.remove('input-error');
}

/* ===================================
   FORM FIELD VALIDATION
   =================================== */
// Full Name validation
fullNameInput.addEventListener('invalid', function(e) {
  e.preventDefault();
  if (this.validity.valueMissing) {
    showError(this, 'Please enter your full name.');
  }
});

fullNameInput.addEventListener('input', function() {
  hideError(this);
  this.setCustomValidity('');
});

// Email validation
emailInput.addEventListener('invalid', function(e) {
  e.preventDefault();
  if (this.validity.valueMissing) {
    showError(this, 'Please enter your email.');
  } else if (this.validity.typeMismatch) {
    showError(this, 'Please enter a valid email address.');
  }
});

emailInput.addEventListener('input', function() {
  hideError(this);
  this.setCustomValidity('');
});

// GitHub Username validation
githubInput.addEventListener('invalid', function(e) {
  e.preventDefault();
  if (this.validity.valueMissing) {
    showError(this, 'Please enter your GitHub username.');
  }
});

githubInput.addEventListener('input', function() {
  hideError(this);
  this.setCustomValidity('');
});

/* ===================================
   AVATAR UPLOAD FUNCTIONALITY
   =================================== */
// Display image preview
avatarInput.addEventListener('change', function() {
  const file = this.files[0];
  
  if (file.size <= 500 * 1024 && (file.type === 'image/jpeg'  || file.type === 'image/png')) {
    const reader = new FileReader();
    reader.onload = function(e) {
      avatarPreview.src = e.target.result;
      uploadPreview.style.display = 'flex';
      uploadArea.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }
});

// Remove uploaded image
removeImageButton.addEventListener('click', function() {
  avatarInput.value = '';
  avatarPreview.src = '';
  uploadPreview.style.display = 'none';
  uploadArea.style.display = 'flex';
  uploadArea.style.flexDirection = 'column';
});

// Change uploaded image
changeImageButton.addEventListener('click', function() {
  avatarInput.click();
});

/* ===================================
   AVATAR FILE SIZE VALIDATION
   =================================== */
avatarInput.addEventListener('change', function() {
  const file = avatarInput.files[0];
  const textError = document.getElementById('text-error');
  const infoIcon = document.getElementById('info-icon');
  
  if (file && file.size > 500 * 1024) {
    // File exceeds size limit
    textError.textContent = 'File too large. Please upload a photo under 500KB.';
    textError.style.color = 'var(--orange-500)';
    infoIcon.src = './assets/images/icon-info-error.svg';
    infoIcon.alt = 'Error Icon';
    avatarInput.value = '';
  } else if (file) {
    // File is valid, restore default state
    textError.textContent = 'Upload your photo (JPG or PNG, max size: 500KB).';
    textError.style.color = '';
    infoIcon.src = './assets/images/icon-info.svg';
    infoIcon.alt = 'Info Icon';
  }
});

/* ===================================
   FORM SUBMISSION
   =================================== */
form.addEventListener('submit', function(event) {
  event.preventDefault();

  // Get form values
  const fullName = fullNameInput.value;
  const email = emailInput.value;
  const githubUsername = githubInput.value;
  const avatarFile = avatarInput.files[0];

  // Prepare ticket data object
  const ticketData = {
    fullName: fullName,
    email: email,
    githubUsername: githubUsername
  };
  
  // Save ticket data to localStorage
  localStorage.setItem('ticketData', JSON.stringify(ticketData));

  // Save avatar if uploaded, then redirect
  if (avatarFile) {
    const reader = new FileReader();
    reader.onload = function(e) {
      localStorage.setItem('ticketAvatar', e.target.result);
      window.location.href = 'ticket.html';
    };
    reader.readAsDataURL(avatarFile);
  } else {
    window.location.href = 'ticket.html';
  }
});

/* ===================================
   SUBMIT BUTTON HANDLER
   =================================== */
button.addEventListener('click', function() {
  form.requestSubmit();
});