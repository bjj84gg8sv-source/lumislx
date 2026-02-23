// Add delegated click event listeners for all .video-wrapper.clickable-video elements
document.addEventListener('DOMContentLoaded', () => {
  const clickableVideos = document.querySelectorAll('.video-wrapper.clickable-video');
  console.log('[DEBUG] Found', clickableVideos.length, '.video-wrapper.clickable-video elements');
  clickableVideos.forEach(el => {
    el.addEventListener('click', function() {
      console.log('[DEBUG] Clicked video-wrapper', this);
      openVideoModal(this);
    });
  });
  console.log('[DEBUG] Delegated click listeners attached to .video-wrapper.clickable-video');
});
console.log('[DEBUG] script.js loaded');
// Carousel state - MUST be at top before any functions use it
let currentSlide = 0;
const videos = [
  { type: 'video', src: 'Assets/Lighting/Lx portfolio/CCM.mp4' },
  { type: 'video', src: 'Assets/Lighting/Lx portfolio/RnB3.mp4' },
  { type: 'video', src: 'Assets/Lighting/Lx portfolio/Hair.mp4' },
  { type: 'video', src: 'Assets/Lighting/Lx portfolio/VG 2.mp4' }
];

// Custom cursor functionality
const customCursor = document.getElementById('custom-cursor');
let mouseX = 0;
let mouseY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  
  if (customCursor.classList.contains('active')) {
    customCursor.style.left = (mouseX - 13) + 'px';
    customCursor.style.top = (mouseY - 15) + 'px';
  }
});

// Show custom cursor on video hover
document.querySelectorAll('.video-wrapper.clickable-video').forEach(video => {
  video.addEventListener('mouseenter', () => {
    customCursor.classList.add('active');
    customCursor.style.left = (mouseX - 13) + 'px';
    customCursor.style.top = (mouseY - 15) + 'px';
  });
  
  video.addEventListener('mouseleave', () => {
    customCursor.classList.remove('active');
  });
});

// RnB carousel - video first, then image slides
const rnbCarousel = [
  { type: 'video', src: 'Assets/Lighting/Lx portfolio/RnB3.mp4', title: 'RnB Night' },
  { type: 'image', src: 'Assets/Lighting/Lx portfolio/rnb1.jpg', title: 'RnB Night' },
  { type: 'image', src: 'Assets/Lighting/Lx portfolio/rnb2.jpg', title: 'RnB Night' }
];

// VG carousel - images first, then video
const vgCarousel = [
  { type: 'image', src: 'Assets/Lighting/Lx portfolio/VG 1.jpeg', title: 'Video Game Concert', subtitle: 'Testing gel colors on stage colored wood' },
  { type: 'image', src: 'Assets/Lighting/Lx portfolio/VGC 3.jpeg', title: 'Video Game Concert', subtitle: '3D Stage Rendering' },
  { type: 'video', src: 'Assets/Lighting/Lx portfolio/VG 2.mp4', title: 'Video Game Concert', subtitle: 'Pre-Show Look' }
];

// CCM carousel - image, then video
const ccmCarousel = [
  { type: 'image', src: 'Assets/Lighting/Lx portfolio/CCM 2.JPG', title: 'Parkside Range and Mix Concert', subtitle: 'Pre-Show Look' },
  { type: 'video', src: 'Assets/Lighting/Lx portfolio/CCM3.mp4', title: 'Parkside Range and Mix Concert', subtitle: 'Tech Process' },
  { type: 'video', src: 'Assets/Lighting/Lx portfolio/CCM.mp4', title: 'Parkside Range and Mix Concert', subtitle: 'Lighting Design' }
];

// Tea carousel - tea design PDF first, then tea sculpture PDF
const teaCarousel = [
  { type: 'pdf', src: 'Assets/Lighting/Lx portfolio/Tea Design.pdf' },
  { type: 'pdf', src: 'Assets/Lighting/Lx portfolio/Tea Sculpture.pdf' }
];

// Hair carousel - video first, then PDF
const hairCarousel = [
  { type: 'video', src: 'Assets/Lighting/Lx portfolio/Hair.mp4', title: 'Hair', subtitle: 'Scenic and Lighting Design' },
  { type: 'pdf', src: 'Assets/Lighting/Lx portfolio/Hair.pdf' }
];

// Hamburger Menu Toggle for Mobile
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const navButtonsContainer = document.querySelector('.nav-buttons-container');
  const navButtons = document.querySelectorAll('.nav-button');

  if (!hamburger || !navButtonsContainer) {
    console.warn('Hamburger menu or nav container not found');
    return;
  }

  // Toggle menu on hamburger click
  hamburger.addEventListener('click', (e) => {
    e.stopPropagation();
    hamburger.classList.toggle('active');
    navButtonsContainer.classList.toggle('active');
  });

  // Close menu when clicking a nav button
  navButtons.forEach(button => {
    button.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navButtonsContainer.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    const isClickInsideNav = e.target.closest('.nav-bar');
    if (!isClickInsideNav) {
      hamburger.classList.remove('active');
      navButtonsContainer.classList.remove('active');
    }
  });

  console.log('Hamburger menu initialized');
});

// Shimmer Wave Effect for Navigation Buttons
class TextShimmerWave {
  constructor(element) {
    this.element = element;
    this.isHovering = false;
    this.hasAnimated = false;
  }

  init() {
    this.element.addEventListener('mouseenter', () => {
      this.isHovering = true;
      this.hasAnimated = false;
      this.animate();
    });

    this.element.addEventListener('mouseleave', () => {
      this.isHovering = false;
      this.element.style.backgroundImage = 'none';
    });
  }

  animate() {
    if (!this.isHovering || this.hasAnimated) return;

    const duration = 400;
    const startTime = Date.now();

    const updateShimmer = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      this.element.style.backgroundImage = `linear-gradient(90deg, transparent -100%, rgba(240, 0, 240, 0.08) 10%, rgba(240, 0, 240, 0.12) 50%, rgba(240, 0, 240, 0.08) 90%, transparent 200%)`;
      this.element.style.backgroundSize = `${500 + progress * 600}% 100%`;
      this.element.style.backgroundPosition = `${-100 + progress * 200}% 0%`;

      if (progress < 1 && this.isHovering) {
        requestAnimationFrame(updateShimmer);
      } else {
        this.hasAnimated = true;
        if (!this.isHovering) {
          this.element.style.backgroundImage = 'none';
        }
      }
    };

    updateShimmer();
  }
}

// Initialize shimmer effect for all nav buttons
document.addEventListener('DOMContentLoaded', () => {
  const navButtons = document.querySelectorAll('.nav-button');
  navButtons.forEach(button => {
    const shimmer = new TextShimmerWave(button);
    shimmer.init();
  });

  // Navigation button click handlers
  document.querySelectorAll('.nav-button').forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      const page = button.getAttribute('data-page');
      if (page === 'resume') {
        // Open resume modal instead of immediate download
        openResumeModal();
      } else if (page === 'home' || page === 'index') {
        window.location.href = './index.html';
      } else {
        window.location.href = `./${page}.html`;
      }
    });
  });

// Resume modal functions
function openResumeModal() {
  if (document.getElementById('resume-modal')) {
    document.getElementById('resume-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    return;
  }

  // Backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'resume-modal-backdrop';
  backdrop.id = 'resume-modal-backdrop';

  // Modal container
  const modal = document.createElement('div');
  modal.className = 'resume-modal';
  modal.id = 'resume-modal';

  // Close button (X)
  const closeBtn = document.createElement('button');
  closeBtn.className = 'resume-modal-close';
  closeBtn.setAttribute('aria-label', 'Close');
  closeBtn.innerHTML = '✕';
  closeBtn.addEventListener('click', closeResumeModal);

  // Modal content
  const content = document.createElement('div');
  content.className = 'resume-modal-content';
  content.innerHTML = `<p style="margin:0 0 12px 0; font-weight:600;">Choose resume version</p>`;

  // Lighting button (opens the lighting resume in a new tab)
  const lightingBtn = document.createElement('button');
  lightingBtn.className = 'resume-action-btn';
  lightingBtn.textContent = 'Lighting';
  lightingBtn.addEventListener('click', () => {
    window.open('Assets/Resume/LIGHTING Shalaev, Lumi_resume.pdf', '_blank');
    closeResumeModal();
  });

  // Sound button (opens the sound resume in a new tab)
  const soundBtn = document.createElement('button');
  soundBtn.className = 'resume-action-btn';
  soundBtn.textContent = 'Sound';
  soundBtn.addEventListener('click', () => {
    window.open('Assets/Resume/SOUND Shalaev, Lumi_resume.pdf', '_blank');
    closeResumeModal();
  });

  // Video button (opens the video resume in a new tab)
  const videoBtn = document.createElement('button');
  videoBtn.className = 'resume-action-btn';
  videoBtn.textContent = 'Video';
  videoBtn.addEventListener('click', () => {
    window.open('Assets/Resume/VIDEO Shalaev, Lumi_resume.pdf', '_blank');
    closeResumeModal();
  });

  content.appendChild(lightingBtn);
  content.appendChild(soundBtn);
  content.appendChild(videoBtn);
  modal.appendChild(closeBtn);
  modal.appendChild(content);

  document.body.appendChild(backdrop);
  document.body.appendChild(modal);
  // show
  setTimeout(() => modal.classList.add('active'), 10);
  backdrop.addEventListener('click', closeResumeModal);
  document.body.style.overflow = 'hidden';

  // ESC to close
  function onKey(e) {
    if (e.key === 'Escape') closeResumeModal();
  }
  document.addEventListener('keydown', onKey);

  // store reference for cleanup
  modal._cleanup = () => {
    document.removeEventListener('keydown', onKey);
  };
}

function closeResumeModal() {
  const modal = document.getElementById('resume-modal');
  const backdrop = document.getElementById('resume-modal-backdrop');
  if (modal) {
    modal.classList.remove('active');
    if (modal._cleanup) modal._cleanup();
    setTimeout(() => {
      if (modal.parentNode) modal.parentNode.removeChild(modal);
    }, 220);
  }
  if (backdrop && backdrop.parentNode) backdrop.parentNode.removeChild(backdrop);
  document.body.style.overflow = 'auto';
}
});

// Text Scramble Effect for Loading Screen
class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 10);
      const end = start + Math.floor(Math.random() * 10);
      this.queue.push({ from, to, start, end, char: '' });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.chars[Math.floor(Math.random() * this.chars.length)];
          this.queue[i].char = char;
        }
        output += `<span style="color:#f0f">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
}

// Initialize scramble effect on loading text, but only if scrambleText exists
const scrambleEl = document.getElementById('scrambleText');
if (scrambleEl) {
  const fxScramble = new TextScramble(scrambleEl);
  // Animate the loading text
  const textSequence = ['L.', 'LO', 'LOA', 'LOAD', 'LOADI', 'LOADIN', 'LOADING'];
  let sequenceIndex = 0;
  const animateSequence = () => {
    if (sequenceIndex < textSequence.length) {
      fxScramble.setText(textSequence[sequenceIndex]).then(() => {
        sequenceIndex++;
        setTimeout(animateSequence, 50);
      });
    }
  };
  animateSequence();
}
// Hide loading screen after 2.5 seconds
setTimeout(() => {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.classList.add("hidden");
  }
  // Play the video at the 2.5 second mark
  const bgVideo = document.getElementById("bg-video");
  if (bgVideo) {
    bgVideo.play();
  }
}, 2500);



// Fade out subtitle as gallery section becomes visible
const subtitle = document.getElementById("subtitle");
const gallery = document.getElementById("gallery");

const subtitleObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      subtitle.style.opacity = "0";
      subtitle.style.pointerEvents = "none";
    } else {
      subtitle.style.opacity = "1";
      subtitle.style.pointerEvents = "auto";
    }
  });
}, { threshold: 0.15 });

if (gallery) {
  subtitleObserver.observe(gallery);
}

// Parallax scrolling effect for gallery image
const galleryImage = document.getElementById("galleryImage");
let galleryStartOffset = null;

if (galleryImage) {
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && galleryStartOffset === null) {
        galleryStartOffset = window.scrollY;
      }
    });
  }, { threshold: 0 });

  galleryObserver.observe(gallery);

  window.addEventListener("scroll", () => {
    if (galleryStartOffset !== null) {
      const scrolled = window.scrollY - galleryStartOffset;
      // Start parallax after scrolling 400px, and use 0.25 speed (half of 0.5)
      if (scrolled > 400) {
        const parallaxOffset = (scrolled - 400) * -0.25;
        galleryImage.style.transform = `translateY(${parallaxOffset}px)`;
      }
    }
  });
}

// Grid toggle removed - functionality not working as expected

// Simple global video modal functions
function openVideoModal(element) {
  // Ensure global access for inline onclick
  window.openVideoModal = openVideoModal;
  console.log('[DEBUG] openVideoModal called', element);
  const videoSrc = element.getAttribute('data-video-src');
  console.log('[DEBUG] Video src:', videoSrc);
  
  currentSlide = 0; // Reset to first slide
  let activeCarousel = videos;
  
  // Check which carousel to use based on video source
  if (videoSrc.includes('RnB3')) {
    activeCarousel = rnbCarousel;
    currentSlide = 0; // RnB starts with video (index 0)
  } else if (videoSrc.includes('VG 2')) {
    activeCarousel = vgCarousel;
    currentSlide = 0; // VG starts with VG 1 image (index 0)
  } else if (videoSrc.includes('CCM.mp4')) {
    activeCarousel = ccmCarousel;
    currentSlide = 0; // CCM starts with image (index 0)
  } else if (videoSrc.includes('Tea Cover')) {
    activeCarousel = teaCarousel;
    currentSlide = 0; // Tea starts with tea design PDF (index 0)
  } else if (videoSrc.includes('Hair.mp4')) {
    activeCarousel = hairCarousel;
    currentSlide = 0; // Hair starts with video (index 0)
  } else {
    // For default carousel, find which index the clicked video is
    for (let i = 0; i < activeCarousel.length; i++) {
      if (activeCarousel[i].src === videoSrc) {
        currentSlide = i;
        break;
      }
    }
  }
  
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  
  console.log('Modal element:', modal);
  console.log('Modal video element:', modalVideo);
  console.log('Active carousel length:', activeCarousel.length);
  
  if (modal && videoSrc) {
    // Update indicators count based on carousel length
    const indicatorsContainer = document.querySelector('.carousel-indicators');
    if (indicatorsContainer) {
      indicatorsContainer.innerHTML = '';
      for (let i = 0; i < activeCarousel.length; i++) {
        const btn = document.createElement('button');
        btn.className = 'indicator' + (i === 0 ? ' active' : '');
        btn.onclick = () => goToSlide(i, activeCarousel);
        indicatorsContainer.appendChild(btn);
      }
    }
    
    // Store the active carousel for use by arrow buttons
    window.currentCarousel = activeCarousel;
    
    updateCarousel(activeCarousel);
    modal.classList.add('active');
    console.log('[DEBUG] Modal element after activation:', modal);
    console.log('[DEBUG] Modal classList:', modal.classList.value);
    document.body.style.overflow = 'hidden';
    console.log('Modal opened');
  } else {
    console.error('Failed to open modal - missing elements or src');
  }
}

function closeVideoModal() {
  // Ensure global access for inline onclick
  window.closeVideoModal = closeVideoModal;
  console.log('closeVideoModal called');
  const modal = document.getElementById('video-modal');
  const modalVideo = document.getElementById('modal-video');
  const modalImage = document.getElementById('modal-image');
  const modalYoutube = document.getElementById('modal-youtube');
  const modalPdf = document.getElementById('modal-pdf');
  
  if (modal) {
    modal.classList.remove('active');
  }
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.src = '';
  }
  if (modalImage) {
    modalImage.src = '';
  }
  if (modalYoutube) {
    modalYoutube.src = '';
  }
  if (modalPdf) {
    modalPdf.src = '';
  }
  document.body.style.overflow = 'auto';
  console.log('Modal closed');
}

// Initialize modal close handlers
document.addEventListener('DOMContentLoaded', () => {
  console.log('Initializing modal close handlers');
  
  const modal = document.getElementById('video-modal');
  const backdrop = document.querySelector('.video-modal-backdrop');
  const modalVideo = document.getElementById('modal-video');
  
  if (!modal) {
    console.warn('Modal not found');
    return;
  }
  
  // Backdrop click
  if (backdrop) {
    backdrop.addEventListener('click', () => {
      closeVideoModal();
    });
  }
  
  // Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeVideoModal();
    }
  });
  
  console.log('Modal close handlers initialized');
});

function updateCarousel(carouselData = videos) {
  window.updateCarousel = updateCarousel;
  const modal = document.getElementById('video-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalVideo = document.getElementById('modal-video');
  const modalImage = document.getElementById('modal-image');
  const modalYoutube = document.getElementById('modal-youtube');
  const modalPdf = document.getElementById('modal-pdf');
  
  if (modal && carouselData[currentSlide]) {
    // Always show carousel arrows
    const prevArrow = document.querySelector('.carousel-nav-prev');
    const nextArrow = document.querySelector('.carousel-nav-next');
    if (prevArrow) {
      prevArrow.style.display = 'flex';
      prevArrow.style.opacity = '1';
      prevArrow.style.visibility = 'visible';
    }
    if (nextArrow) {
      nextArrow.style.display = 'flex';
      nextArrow.style.opacity = '1';
      nextArrow.style.visibility = 'visible';
    }
    const slide = carouselData[currentSlide];
    
    // Hide all by default
    if (modalVideo) modalVideo.style.display = 'none';
    if (modalImage) modalImage.style.display = 'none';
    if (modalYoutube) modalYoutube.style.display = 'none';
    if (modalPdf) modalPdf.style.display = 'none';
    
    // Set title and subtitle (hide for PDFs)
    if (modalTitle) {
      if (slide.type === 'pdf') {
        modalTitle.style.display = 'none';
      } else {
        modalTitle.innerHTML = `<div>${slide.title || ''}</div>${slide.subtitle ? `<div style="font-size: 0.8em; color: #bbb; margin-top: 8px;">${slide.subtitle}</div>` : ''}`;
        modalTitle.style.display = 'block';
      }
    }
    
    if (slide.type === 'video' && modalVideo) {
      modalVideo.src = slide.src;
      modalVideo.style.display = 'block';
      modalVideo.autoplay = true;
      modalVideo.loop = true;
      modalVideo.muted = true;
      // Play the video
      modalVideo.play().catch(err => console.log('Autoplay prevented:', err));
    } else if (slide.type === 'image' && modalImage) {
      modalImage.src = slide.src;
      modalImage.style.display = 'block';
    } else if (slide.type === 'youtube' && modalYoutube) {
      // Convert YouTube URL to embed URL
      let embedUrl = slide.src;
      let startSeconds = '';
      
      if (embedUrl.includes('youtube.com/live/')) {
        const liveId = embedUrl.split('youtube.com/live/')[1].split('?')[0];
        // Extract start time from t parameter
        const tMatch = embedUrl.match(/[?&]t=(\d+)/);
        if (tMatch) {
          startSeconds = `&start=${tMatch[1]}`;
        }
        embedUrl = `https://www.youtube.com/embed/${liveId}?autoplay=1${startSeconds}`;
      } else if (embedUrl.includes('youtube.com/watch?v=')) {
        const videoId = embedUrl.split('v=')[1].split('&')[0];
        // Extract start time from t parameter
        const tMatch = embedUrl.match(/[?&]t=(\d+)/);
        if (tMatch) {
          startSeconds = `&start=${tMatch[1]}`;
        }
        embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1${startSeconds}`;
      }
      modalYoutube.src = embedUrl;
      modalYoutube.style.display = 'block';
    } else if (slide.type === 'pdf' && modalPdf) {
      modalPdf.src = slide.src;
      modalPdf.style.display = 'block';
    }
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((ind, index) => {
      if (index === currentSlide) {
        ind.classList.add('active');
      } else {
        ind.classList.remove('active');
      }
    });
  }
}

function carouselNext(carouselData = videos) {
  window.carouselNext = carouselNext;
  console.log('carouselNext called');
  currentSlide = (currentSlide + 1) % carouselData.length;
  updateCarousel(carouselData);
}

function carouselPrev(carouselData = videos) {
  window.carouselPrev = carouselPrev;
  console.log('carouselPrev called');
  currentSlide = (currentSlide - 1 + carouselData.length) % carouselData.length;
  updateCarousel(carouselData);
}

function goToSlide(index, carouselData = videos) {
  window.goToSlide = goToSlide;
  console.log('goToSlide called with index:', index);
  if (index >= 0 && index < carouselData.length) {
    currentSlide = index;
    updateCarousel(carouselData);
  }
}
