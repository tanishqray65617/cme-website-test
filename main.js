

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initNavigation();
  initCarousel();
  initFormValidation();
  initGalleryPage(); // <--- ADD THIS LINE
});

/* 1. Mobile Menu Logic */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenuBtn.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar-content')) {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      }
    });

    // Close menu when clicking a link
    const navItems = navLinks.querySelectorAll('.nav-link');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

/* 2. Navigation & Scroll Effect (THE FIX IS HERE) */
function initNavigation() {
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');

  // A. Scroll Listener for Transparent Navbar
  window.addEventListener('scroll', () => {
    // If we scroll down more than 50px, add the class
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // B. Active Link Highlighting
    const scrollPosition = window.scrollY;
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 150; // Offset for header height
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        navLinks.forEach(link => link.classList.remove('active'));
        const correspondingLink = document.querySelector(`.nav-link[href="#${section.id}"]`);
        if (correspondingLink) {
          correspondingLink.classList.add('active');
        }
      }
    });
  });

  // C. Smooth Scroll on Click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        // Close mobile menu if open
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const navLinksContainer = document.getElementById('navLinks');
        if(mobileMenuBtn) mobileMenuBtn.classList.remove('active');
        if(navLinksContainer) navLinksContainer.classList.remove('active');

        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* 3. Carousel (Optional - keep if you have testimonials) */
function initCarousel() {
  const carousel = document.getElementById('carouselTrack');
  // Only run if carousel exists on page
  if (!carousel) return; 

  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  // ... (You can keep the rest of your carousel logic here if needed) ...
}

/* 4. Form Validation */
function initFormValidation() {
  const form = document.getElementById('inquiryForm');
  const formMessage = document.getElementById('formMessage');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    // Simulate form submission
    formMessage.textContent = "Sending...";
    formMessage.style.display = "block";
    formMessage.style.color = "#fff";
    
    setTimeout(() => {
      formMessage.textContent = 'Thank you! We will contact you shortly.';
      formMessage.style.color = "#2dd4bf"; // Teal success color
      form.reset();
      
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }, 1500);
  });
}
/* --- GALLERY PAGE LOGIC --- */
/* Add this inside the DOMContentLoaded listener at the top of the file: 
   initGalleryPage(); 
*/

function initGalleryPage() {
  const galleryGrid = document.getElementById('galleryGrid');
  if (!galleryGrid) return; // Stop if not on gallery page

  // 1. Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');

      items.forEach(item => {
        if (filter === 'all' || item.getAttribute('data-category') === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // 2. Lightbox
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const caption = document.getElementById('caption');
  const closeBtn = document.querySelector('.close-lightbox');

  items.forEach(item => {
    item.addEventListener('click', () => {
      lightbox.style.display = "flex";
      lightboxImg.src = item.querySelector('img').src;
      caption.textContent = item.querySelector('.overlay span').textContent;
    });
  });

  closeBtn.addEventListener('click', () => lightbox.style.display = "none");
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.style.display = "none";
  });
}
/* --- GALLERY LOGIC (Add initGalleryPage() to DOMContentLoaded at top) --- */

function initGalleryPage() {
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return; // Exit if we are not on gallery page

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxVideo = document.getElementById('lightbox-video');
  const caption = document.getElementById('caption');
  const closeBtn = document.querySelector('.close-lightbox');
  const items = document.querySelectorAll('.gallery-item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      const isVideo = item.classList.contains('type-video');
      const text = item.querySelector('.overlay span').textContent;
      
      lightbox.style.display = "flex";
      caption.textContent = text;

      if (isVideo) {
        // Handle Video Click
        const videoSrc = item.querySelector('source').src;
        lightboxImg.style.display = "none";
        lightboxVideo.style.display = "block";
        lightboxVideo.src = videoSrc;
        lightboxVideo.play(); // Play with sound
      } else {
        // Handle Image Click
        const imgSrc = item.querySelector('img').src;
        lightboxVideo.style.display = "none";
        lightboxVideo.pause(); // Stop any playing video
        lightboxImg.style.display = "block";
        lightboxImg.src = imgSrc;
      }
    });
  });

  // Close Logic
  function closeBox() {
    lightbox.style.display = "none";
    lightboxVideo.pause(); // Important: Stop sound when closing
    lightboxVideo.src = ""; 
  }

  closeBtn.addEventListener('click', closeBox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeBox();
  });
}