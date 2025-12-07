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
        // Download resume file
        const link = document.createElement('a');
        link.href = 'Assets/Resume/LIGHTING Shalaev, Lumi_resume.pdf';
        link.download = 'LIGHTING Shalaev, Lumi_resume.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else if (page === 'home' || page === 'index') {
        window.location.href = './index.html';
      } else {
        window.location.href = `./${page}.html`;
      }
    });
  });
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

// Initialize scramble effect on loading text
const scrambleEl = document.getElementById('scrambleText');
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

// Morphing text effect
const elts = {
    text1: document.getElementById("text1"),
    text2: document.getElementById("text2")
};

console.log("elts.text1:", elts.text1);
console.log("elts.text2:", elts.text2);

const texts = [
    "Production Manager",
    "Lighting Designer",
    "Lighting Technician",
    "Sound Technician",
    "Projections Designer",
    "A/V Operator",
    "Photographer"
];

const morphTime = 1.5;
const cooldownTime = 1;

let textIndex = texts.length - 1;
let time = new Date();
let morph = 0;
let cooldown = cooldownTime;

elts.text1.textContent = texts[textIndex % texts.length];
elts.text2.textContent = texts[(textIndex + 1) % texts.length];

function doMorph() {
    morph -= cooldown;
    cooldown = 0;

    let fraction = morph / morphTime;

    if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
    }

    setMorph(fraction);
}

function setMorph(fraction) {
    elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    fraction = 1 - fraction;
    elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
    elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

    elts.text1.textContent = texts[textIndex % texts.length];
    elts.text2.textContent = texts[(textIndex + 1) % texts.length];
}

function doCooldown() {
    morph = 0;

    elts.text2.style.filter = "";
    elts.text2.style.opacity = "100%";

    elts.text1.style.filter = "";
    elts.text1.style.opacity = "0%";
}

function animate() {
    requestAnimationFrame(animate);

    let newTime = new Date();
    let shouldIncrementIndex = cooldown > 0;
    let dt = (newTime - time) / 1000;
    time = newTime;

    cooldown -= dt;

    if (cooldown <= 0) {
        if (shouldIncrementIndex) {
            textIndex++;
        }

        doMorph();
    } else {
        doCooldown();
    }
}

// Start morphing animation after loading screen is done (2.5 seconds)
setTimeout(() => {
  animate();
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
  console.log('openVideoModal called');
  const videoSrc = element.getAttribute('data-video-src');
  console.log('Video src:', videoSrc);
  
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
    document.body.style.overflow = 'hidden';
    console.log('Modal opened');
  } else {
    console.error('Failed to open modal - missing elements or src');
  }
}

function closeVideoModal() {
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
  const modal = document.getElementById('video-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalVideo = document.getElementById('modal-video');
  const modalImage = document.getElementById('modal-image');
  const modalYoutube = document.getElementById('modal-youtube');
  const modalPdf = document.getElementById('modal-pdf');
  
  if (modal && carouselData[currentSlide]) {
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
  console.log('carouselNext called');
  currentSlide = (currentSlide + 1) % carouselData.length;
  updateCarousel(carouselData);
}

function carouselPrev(carouselData = videos) {
  console.log('carouselPrev called');
  currentSlide = (currentSlide - 1 + carouselData.length) % carouselData.length;
  updateCarousel(carouselData);
}

function goToSlide(index, carouselData = videos) {
  console.log('goToSlide called with index:', index);
  if (index >= 0 && index < carouselData.length) {
    currentSlide = index;
    updateCarousel(carouselData);
  }
}
