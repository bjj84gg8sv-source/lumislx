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
      } else if (page === 'home') {
        window.location.href = '/index.html';
      } else {
        window.location.href = `/${page}.html`;
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

// Hide loading screen after 3.4 seconds
setTimeout(() => {
  const loadingScreen = document.getElementById("loadingScreen");
  if (loadingScreen) {
    loadingScreen.classList.add("hidden");
  }
  
  // Play the video at the 3.4 second mark
  const bgVideo = document.getElementById("bg-video");
  if (bgVideo) {
    bgVideo.play();
  }
}, 3400);

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

// Start morphing animation after loading screen is done (3.4 seconds)
setTimeout(() => {
  animate();
}, 3400);

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