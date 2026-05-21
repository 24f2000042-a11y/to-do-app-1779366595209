document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
  });

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
        if (navLinks.classList.contains('active')) {
          navLinks.classList.remove('active');
        }
      }
    });
  });

  // Todo app functionality
  const addBtn = document.getElementById('add-task');
  const taskInput = document.getElementById('new-task');
  const taskList = document.getElementById('task-list');

  function createTaskItem(text) {
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = text;
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '&times;';
    deleteBtn.className = 'delete-btn';
    li.appendChild(span);
    li.appendChild(deleteBtn);
    // Toggle complete
    span.addEventListener('click', () => {
      li.classList.toggle('completed');
    });
    // Delete task
    deleteBtn.addEventListener('click', () => {
      li.remove();
    });
    return li;
  }

  addBtn.addEventListener('click', () => {
    const text = taskInput.value.trim();
    if (text !== '') {
      const taskItem = createTaskItem(text);
      taskList.appendChild(taskItem);
      taskInput.value = '';
    }
  });

  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addBtn.click();
    }
  });

  // Contact form validation
  const contactForm = document.getElementById('contact-form');
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = this.name.value.trim();
    const email = this.email.value.trim();
    const message = this.message.value.trim();
    if (name && email && message) {
      alert('Thank you for your message!');
      this.reset();
    } else {
      alert('Please fill in all fields.');
    }
  });

  // Scroll fade-in using IntersectionObserver
  const faders = document.querySelectorAll('.fade-in');
  const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };
  const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add('visible');
        appearOnScroll.unobserve(entry.target);
      }
    });
  }, appearOptions);
  faders.forEach(fader => {
    appearOnScroll.observe(fader);
  });
});