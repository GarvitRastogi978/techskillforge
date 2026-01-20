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
// JOB LISTINGS FUNCTIONALITY
// =============================
document.addEventListener('DOMContentLoaded', () => {
    const jobsContainer = document.getElementById('jobsContainer');
    const searchInput = document.getElementById('jobSearch');
    const filterSelect = document.getElementById('jobFilter');

    let jobsData = [];

    // 1. Load jobs from JSON
    fetch('./jobs.json')
        .then(res => res.json())
        .then(data => {
            jobsData = data;
            renderJobs(jobsData);
        })
        .catch(err => console.error("Error loading JSON:", err));

    // 2. The Render Function
    function renderJobs(jobs) {
        if (!jobsContainer) return;
        jobsContainer.innerHTML = '';
        jobs.forEach(job => {
            const card = document.createElement('div');
            card.className = 'job-card';
            card.innerHTML = `
                <div class="job-header">
                    <h3>${job.role}</h3>
                    <span class="badge">${job.type}</span>
                </div>
                <p class="job-meta">Company: ${job.company} | Location: ${job.location} | Experience: ${job.experience}</p>
                <p>Skills Required: ${job.skills.join(', ')}</p>
                <a href="${job.applyLink}" target="_blank" class="apply-btn">Apply Now</a>
            `;
            jobsContainer.appendChild(card);
        });
    }

    // 3. The Filter Function
    function filterJobs() {
        const searchValue = searchInput.value.toLowerCase();
        const filterValue = filterSelect.value;

        const filtered = jobsData.filter(job => {
            const text = `${job.role} ${job.company} ${job.skills.join(' ')}`.toLowerCase();
            const matchesSearch = text.includes(searchValue);
            const matchesFilter = filterValue === 'all' || filterValue === '' || job.type === filterValue;
            return matchesSearch && matchesFilter;
        });

        renderJobs(filtered);
    }

    // 4. Attach Event Listeners
    if (searchInput) searchInput.addEventListener('input', filterJobs);
    if (filterSelect) filterSelect.addEventListener('change', filterJobs);
});