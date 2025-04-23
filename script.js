// Navigation and page transition logic
const links = document.querySelectorAll('[data-target]');
const thumbs = document.querySelectorAll('.project-thumb');
const container = document.querySelector('.container');
const pages = document.querySelectorAll('.page');
const logo = document.getElementById('logo-home');  // Get the logo element

// Event listener for logo (Back to Home behavior)
logo.addEventListener('click', (e) => {
  e.preventDefault();
  if (document.getElementById('projects').classList.contains('active')) {
    goToPage('home');
  }
});

// Navigation links (like "About", "Projects")
links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('data-target');
    goToPage(targetId);
  });
});


// Project thumbnails on the home page
thumbs.forEach(thumb => {
  thumb.addEventListener('click', () => {
    const projectId = thumb.getAttribute('data-project');
    goToPage('projects', projectId);
  });
});

// Function to go to a specific page and handle transitions
function goToPage(pageId, scrollToId = null) {
  const targetEl = document.getElementById(pageId);
  const index = Array.from(pages).indexOf(targetEl);
  container.style.transform = `translateX(-${index * 100}vw)`;

  // If we are navigating to the Projects page, change the logo text to "Back to Home"
  if (pageId === 'projects') {
    logo.textContent = 'Back to Home';
  } else {
    logo.textContent = 'Liliana Bito';
  }

  // Scroll to a specific project if provided
  if (scrollToId) {
    setTimeout(() => {
      const projectSection = document.getElementById(scrollToId);
      if (projectSection) {
        projectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 600);
  }
}

// Make cards follow cursor //

document.querySelectorAll('.project-thumb').forEach((thumb) => {
  const card = thumb.querySelector('.project-card');

  thumb.addEventListener('mousemove', (e) => {
    const rect = thumb.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / rect.height) * 2;
    const rotateY = (x / rect.width) * 2;
    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  thumb.addEventListener('mouseleave', () => {
    card.style.transform = `rotateX(0deg) rotateY(0deg)`;
  });
});


//scroll to next on projects//

function scrollToNext(currentButton) {
  const currentSection = currentButton.closest('.project-full');
  const nextSection = currentSection.nextElementSibling;
  if (nextSection && nextSection.classList.contains('project-full')) {
    nextSection.scrollIntoView({ behavior: 'smooth' });
  }
}
