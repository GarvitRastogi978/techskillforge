// =============================
// DARK / LIGHT MODE TOGGLE
// =============================
const toggleBtn = document.getElementById('themeToggle');
const body = document.body;

// Load saved theme
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  body.classList.add('dark');
  toggleBtn.textContent = '☀️';
}

// Toggle theme
toggleBtn.addEventListener('click', () => {
  body.classList.toggle('dark');

  if (body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
    toggleBtn.textContent = '☀️';
  } else {
    localStorage.setItem('theme', 'light');
    toggleBtn.textContent = '🌙';
  }
});

// =============================
// SIMPLE NAVIGATION ENHANCEMENTS
// =============================
const navLinks = document.querySelectorAll('.nav a');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navLinks.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

// =============================
// SEARCH FUNCTIONALITY FOR QUESTIONS PAGE NEW UPDATE
// =============================
const searchInput = document.getElementById('questionSearch');
if (searchInput) {
  searchInput.addEventListener('input', () => {
    const filter = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.cards .card');
    cards.forEach(card => {
      const text = card.textContent.toLowerCase();
      if (text.includes(filter)) {
        card.style.display = '';
      } else {
        card.style.display = 'none';
      }
    });
  });
}
