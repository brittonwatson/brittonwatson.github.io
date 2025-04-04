document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll behavior
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Refined logo interaction with subtle animation
  const logoImg = document.querySelector('.foundation-logo-img');
  if (logoImg) {
    // Add a subtle animation on page load
    setTimeout(() => {
      logoImg.style.transform = 'scale(1.04)';
      setTimeout(() => {
        logoImg.style.transform = 'scale(1)';
        logoImg.style.transition = 'transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }, 350);
    }, 600);
  }

  // Enhanced fade-in animation for elements
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -30px 0px'
  };

  const fadeElements = document.querySelectorAll('.fade-in');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Apply a staggered delay based on the element's position
          const index = Array.from(fadeElements).indexOf(entry.target);
          const delay = 0.1 + (index * 0.08); // More subtle staggering
          
          entry.target.style.transitionDelay = `${delay}s`;
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          
          // Unobserve after animation is complete
          setTimeout(() => {
            observer.unobserve(entry.target);
          }, (delay + 0.8) * 1000);
        }
      });
    }, observerOptions);

    fadeElements.forEach(element => observer.observe(element));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    fadeElements.forEach((element, index) => {
      const delay = 0.1 + (index * 0.08);
      element.style.transitionDelay = `${delay}s`;
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    });
  }

  // Subtle parallax effect for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const rate = scrolled * 0.08; // Very subtle parallax
      if (rate < 60) { // More limited effect
        hero.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    });
  }
  
  // Add staggered animation delay for slogan and mission statement
  const slogan = document.querySelector('.slogan');
  const missionStatement = document.querySelector('.mission-statement');
  
  if (slogan) {
    slogan.style.animationDelay = '0.15s';
    slogan.style.opacity = '0';
  }
  
  if (missionStatement) {
    missionStatement.style.animationDelay = '0.35s';
    missionStatement.style.opacity = '0';
  }

  // Mobile menu toggle with smooth animation
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInside = navLinks.contains(event.target) || mobileMenuToggle.contains(event.target);
    if (!isClickInside && navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      mobileMenuToggle.classList.remove('active');
    }
  });

  // Toggle mobile menu
  mobileMenuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    this.classList.toggle('active');
  });
  
  // Animate nav links with staggered delay
  if (navLinks.classList.contains('active')) {
    const rightNavLinks = document.querySelectorAll('.right-nav .nav-link');
    
    // Animate right nav links
    rightNavLinks.forEach((link, index) => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        link.style.transition = 'all 0.4s ease';
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, 100 + (index * 80));
    });
  }
  
  // Special handling for about page large logo
  const aboutLogo = document.querySelector('.about-logo');
  if (aboutLogo) {
    setTimeout(() => {
      aboutLogo.style.transform = 'scale(1.08)';
      setTimeout(() => {
        aboutLogo.style.transform = 'scale(1)';
        aboutLogo.style.transition = 'transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
      }, 450);
    }, 800);
  }
  
  // Fix relative paths for subpages
  const currentPath = window.location.pathname;
  if (currentPath.includes('/about/')) {
    // No need for any navigation button adjustments now
  }
  
  // More subtle animation for content cards
  const cards = document.querySelectorAll('.product-card, .solution-card, .resource-card, .news-card');
  cards.forEach((card) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(15px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 300);
  });
  
  // Fetch latest Substack post
  const latestPostContainer = document.getElementById('latest-substack-post');
  if (latestPostContainer) {
    fetchLatestSubstackPost();
  }
}); 

// Function to fetch and display the latest Substack post
function fetchLatestSubstackPost() {
  const substackUsername = 'brittonwatson';
  const container = document.getElementById('latest-substack-post');
  
  // Fetch the RSS feed from Substack
  fetch(`https://cors-anywhere.herokuapp.com/https://${substackUsername}.substack.com/feed`)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
      // Get the first (latest) item from the feed
      const items = data.querySelectorAll('item');
      if (items.length > 0) {
        const latestPost = items[0];
        
        // Extract post details
        const title = latestPost.querySelector('title').textContent;
        const link = latestPost.querySelector('link').textContent;
        const description = latestPost.querySelector('description').textContent;
        
        // Create HTML for the post
        const postHTML = `
          <div class="substack-post-embed">
            <h3>${title}</h3>
            <div class="post-excerpt">${description.substring(0, 200)}...</div>
            <a href="${link}" target="_blank" rel="noopener noreferrer">Read on Substack</a>
          </div>
        `;
        
        // Insert the post HTML
        container.innerHTML = postHTML;
      } else {
        container.innerHTML = '<p>No posts found. Please check back later.</p>';
      }
    })
    .catch(error => {
      console.error('Error fetching Substack posts:', error);
      container.innerHTML = `
        <div class="substack-post-embed">
          <p>The Understanding Media Project by Britton Watson</p>
          <p>An introduction to the Marshall McLuhan's 'Understanding Media: The Extensions of Man' Project</p>
          <a data-post-link href="https://brittonwatson.substack.com/p/the-understanding-media-project">Read on Substack</a>
        </div>
        <script async src="https://substack.com/embedjs/embed.js" charset="utf-8"></script>
      `;
    });
}

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply the saved theme
document.documentElement.setAttribute('data-theme', currentTheme);

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
});

// Listen for system theme changes
prefersDarkScheme.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
    }
});