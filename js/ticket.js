/* ===================================
   TICKET DATA LOADING
   =================================== */
window.addEventListener('DOMContentLoaded', function() {
  // Get data from localStorage
  const ticketData = JSON.parse(localStorage.getItem('ticketData'));
  const avatarData = localStorage.getItem('ticketAvatar');

  // Check if ticket data exists
  if (ticketData) {
    populateTicketData(ticketData, avatarData);
  }
  
  // Generate random ticket number
  generateTicketNumber();
});

/* ===================================
   POPULATE TICKET INFORMATION
   =================================== */
function populateTicketData(ticketData, avatarData) {
  // Insert full name in title
  const titleName = document.getElementById('title-name');
  if (titleName) {
    titleName.textContent = ticketData.fullName + '!';
  }
  
  // Insert email address
  const emailDisplay = document.getElementById('email-display');
  if (emailDisplay) {
    emailDisplay.textContent = ticketData.email;
  }
  
  // Insert GitHub username
  const githubDisplay = document.getElementById('github-display');
  if (githubDisplay) {
    githubDisplay.textContent = '@' + ticketData.githubUsername;
  }
  
  // Insert full name on ticket
  const ticketName = document.getElementById('ticket-name');
  if (ticketName) {
    ticketName.textContent = ticketData.fullName;
  }
  
  // Insert avatar image if available
  if (avatarData) {
    const avatarImg = document.getElementById('avatar-img');
    if (avatarImg) {
      avatarImg.src = avatarData;
    }
  }
}

/* ===================================
   GENERATE RANDOM TICKET NUMBER
   =================================== */
function generateTicketNumber() {
  const ticketNumberElement = document.getElementById('ticket-number');
  
  if (ticketNumberElement) {
    // Generate 5-digit random number (10000-99999)
    const randomTicketNumber = Math.floor(10000 + Math.random() * 90000);
    ticketNumberElement.textContent = `#${randomTicketNumber}`;
  }
}