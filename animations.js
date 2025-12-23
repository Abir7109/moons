// ===== IMAGE DATA =====
const images = {
  hero: "images/1000106636.jpg",
  about: [
    "images/1000106638.jpg",
    "images/1000106640.jpg",
    "images/1000106642.jpg"
  ],
  gallery: [
    "images/1000106644.jpg",
    "images/1000106646.jpg",
    "images/1000106648.jpg",
    "images/1000106650.jpg",
    "images/1000106652.jpg",
    "images/1000106654.jpg",
    "images/1000106656.jpg",
    "images/1000106658.jpg"
  ],
  facts: [
    { text: "She always picks the softest color on the palette.", img: "images/1000106660.jpg" },
    { text: "Will stop to photograph the sky every single time.", img: "images/1000106662.jpg" },
    { text: "Laughs with her whole face. No half-smiles allowed.", img: "images/1000106664.jpg" }
  ],
  contact: "images/1000106667.jpg",
  polaroids: [
    { img: "images/1000106669.jpg", caption: "golden hour magic ✨" },
    { img: "images/1000106672.jpg", caption: "just vibing 🌸" },
    { img: "images/1000106675.jpg", caption: "main character moment 💫" },
    { img: "images/1000106678.jpg", caption: "soft & dreamy 🌙" },
    { img: "images/1000106681.jpg", caption: "pure sunshine ☀️" }
  ],
  carousel: [
    "images/1000106684.jpg",
    "images/1000106687.jpg",
    "images/1000106690.jpg",
    "images/1000106693.jpg",
    "images/1000106696.jpg",
    "images/1000106699.jpg"
  ]
};

// ===== HELPERS =====
function createImg(src, alt = "") {
  const img = document.createElement("img");
  img.src = src;
  img.alt = alt;
  img.loading = "lazy";
  return img;
}

// ===== POPULATE SECTIONS =====
function populateHero() {
  const slot = document.querySelector('[data-slot="hero"]');
  if (!slot) return;
  slot.appendChild(createImg(images.hero, "Moon"));
}

function populateAbout() {
  images.about.forEach((src, i) => {
    const slot = document.querySelector(`[data-slot="about-${i + 1}"]`);
    if (slot) slot.appendChild(createImg(src, "Moon"));
  });
}

function populateGallery() {
  const grid = document.querySelector('[data-slot="gallery"]');
  if (!grid) return;
  
  images.gallery.forEach((src, i) => {
    const item = document.createElement("div");
    item.className = "gallery-item";
    item.appendChild(createImg(src, `Photo ${i + 1}`));
    item.addEventListener("click", () => openLightbox(src));
    grid.appendChild(item);
  });
}

function populateFacts() {
  const container = document.querySelector('[data-slot="facts"]');
  if (!container) return;
  
  images.facts.forEach(fact => {
    const card = document.createElement("div");
    card.className = "fact-card";
    
    const photo = document.createElement("div");
    photo.className = "fact-photo";
    photo.appendChild(createImg(fact.img, "Moon"));
    
    const text = document.createElement("p");
    text.className = "fact-text";
    text.textContent = fact.text;
    
    card.appendChild(photo);
    card.appendChild(text);
    container.appendChild(card);
  });
}

function populateContact() {
  const slot = document.querySelector('[data-slot="contact"]');
  if (!slot) return;
  slot.appendChild(createImg(images.contact, "Moon"));
}

// ===== LIGHTBOX =====
let lightbox = null;

function createLightbox() {
  lightbox = document.createElement("div");
  lightbox.className = "lightbox";
  lightbox.innerHTML = `
    <div class="lightbox-close">×</div>
    <div class="lightbox-content">
      <img src="" alt="Full size">
    </div>
  `;
  document.body.appendChild(lightbox);
  
  lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
}

function openLightbox(src) {
  if (!lightbox) createLightbox();
  lightbox.querySelector("img").src = src;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

// ===== SCROLL ANIMATIONS =====
function setupScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll(".about-photo, .gallery-item, .fact-card").forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = `all 0.6s ease ${i * 0.1}s`;
    observer.observe(el);
  });
}

// ===== FORM HANDLER =====
function setupForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    
    // Create heart burst
    const btn = form.querySelector(".submit-btn");
    const rect = btn.getBoundingClientRect();
    
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement("div");
      heart.textContent = "💖";
      heart.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 1000;
        animation: flyHeart 1s ease-out forwards;
        --angle: ${(i / 8) * 360}deg;
      `;
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 1000);
    }
    
    // Add animation keyframes if not exists
    if (!document.getElementById("heartStyles")) {
      const style = document.createElement("style");
      style.id = "heartStyles";
      style.textContent = `
        @keyframes flyHeart {
          to {
            transform: translate(
              calc(cos(var(--angle)) * 100px),
              calc(sin(var(--angle)) * 100px - 50px)
            );
            opacity: 0;
          }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Show success
    btn.innerHTML = "<span>Sent! ♡</span>";
    setTimeout(() => {
      btn.innerHTML = "<span>Send message</span><span class='btn-heart'>💌</span>";
      form.reset();
    }, 2000);
  });
}

// ===== FLOATING HEARTS =====
function setupFloatingHearts() {
  const container = document.getElementById('floatingHearts');
  if (!container) return;
  
  const hearts = ['💖', '💗', '💕', '✨', '🌸', '💫', '🦋'];
  
  function createHeart() {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (15 + Math.random() * 10) + 's';
    heart.style.animationDelay = Math.random() * 5 + 's';
    container.appendChild(heart);
    
    setTimeout(() => heart.remove(), 25000);
  }
  
  // Create initial hearts
  for (let i = 0; i < 10; i++) {
    setTimeout(createHeart, i * 500);
  }
  
  // Keep creating hearts
  setInterval(createHeart, 3000);
}

// ===== CUSTOM CURSOR =====
function setupCustomCursor() {
  const cursor = document.getElementById('cursor');
  const trail = document.getElementById('cursorTrail');
  
  if (!cursor || !trail) return;
  
  // Check for touch device
  if (window.matchMedia('(pointer: coarse)').matches) return;
  
  let mouseX = 0, mouseY = 0;
  let trailX = 0, trailY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });
  
  // Smooth trail follow
  function animateTrail() {
    trailX += (mouseX - trailX) * 0.15;
    trailY += (mouseY - trailY) * 0.15;
    trail.style.left = trailX + 'px';
    trail.style.top = trailY + 'px';
    requestAnimationFrame(animateTrail);
  }
  animateTrail();
  
  // Hover effects
  const hoverables = document.querySelectorAll('a, button, .gallery-item, .vibe-card, .fact-card, .badge');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
  });
  
  // Hide default cursor
  document.body.style.cursor = 'none';
  hoverables.forEach(el => el.style.cursor = 'none');
}

// ===== PARALLAX EFFECT =====
function setupParallax() {
  const heroGlow = document.querySelector('.hero-glow');
  const heroPhoto = document.querySelector('.hero-photo-wrapper');
  
  if (!heroGlow || !heroPhoto) return;
  
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    heroGlow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    heroPhoto.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
  });
}

// ===== TYPED EFFECT FOR TAGLINE =====
function setupTypedEffect() {
  const tagline = document.querySelector('.hero-tagline');
  if (!tagline) return;
  
  const text = tagline.textContent;
  tagline.textContent = '';
  tagline.style.borderRight = '2px solid var(--accent)';
  
  let i = 0;
  function type() {
    if (i < text.length) {
      tagline.textContent += text.charAt(i);
      i++;
      setTimeout(type, 40);
    } else {
      tagline.style.borderRight = 'none';
    }
  }
  
  // Start after a delay
  setTimeout(type, 1000);
}

// ===== VIBE CARDS TILT =====
function setupVibeCardsTilt() {
  const cards = document.querySelectorAll('.vibe-card');
  
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

// ===== LOADING SCREEN =====
function setupLoadingScreen() {
  const loader = document.getElementById('loadingScreen');
  if (!loader) return;
  
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1500);
  });
}

// ===== SCROLL PROGRESS =====
function setupScrollProgress() {
  const progress = document.getElementById('scrollProgress');
  if (!progress) return;
  
  window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const percentage = (scrollTop / scrollHeight) * 100;
    progress.style.width = percentage + '%';
  });
}

// ===== BACK TO TOP =====
function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  });
  
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ===== MUSIC PLAYER =====
function setupMusicPlayer() {
  const player = document.getElementById('musicPlayer');
  const disc = document.getElementById('musicDisc');
  const toggle = document.getElementById('musicToggle');
  const audio = document.getElementById('bgMusic');
  
  if (!player || !disc || !toggle) return;
  
  let isPlaying = false;
  
  // Show after scroll
  setTimeout(() => {
    player.classList.add('visible');
  }, 2000);
  
  toggle.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      disc.classList.add('playing');
      toggle.textContent = '⏸';
      if (audio) audio.play();
    } else {
      disc.classList.remove('playing');
      toggle.textContent = '▶';
      if (audio) audio.pause();
    }
  });
}

// ===== POLAROID STACK =====
function setupPolaroids() {
  const stack = document.getElementById('polaroidStack');
  if (!stack) return;
  
  images.polaroids.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'polaroid-card';
    
    const rotation = (Math.random() - 0.5) * 30;
    const offsetX = (Math.random() - 0.5) * 60;
    const offsetY = (Math.random() - 0.5) * 40;
    
    card.style.transform = `translate(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px)) rotate(${rotation}deg)`;
    card.style.zIndex = i;
    
    card.innerHTML = `
      <img src="${item.img}" alt="Moon" loading="lazy">
      <p>${item.caption}</p>
    `;
    
    // Drag to bring to front
    card.addEventListener('click', () => {
      // Bring to front
      document.querySelectorAll('.polaroid-card').forEach(c => c.style.zIndex = 0);
      card.style.zIndex = 10;
      
      // New random position
      const newRotation = (Math.random() - 0.5) * 20;
      card.style.transform = `translate(-50%, -50%) rotate(${newRotation}deg) scale(1.1)`;
      
      setTimeout(() => {
        card.style.transform = `translate(-50%, -50%) rotate(${newRotation}deg) scale(1)`;
      }, 200);
    });
    
    stack.appendChild(card);
  });
}

// ===== MOOD SELECTOR =====
function setupMoodSelector() {
  const btns = document.querySelectorAll('.mood-btn');
  const response = document.getElementById('moodResponse');
  
  if (!btns.length || !response) return;
  
  const responses = {
    happy: "Yay! Moon's happy vibes are contagious! 🌟",
    cozy: "Grab a blanket, it's cozy Moon hours ☕",
    dreamy: "Let's get lost in dreamland with Moon 💭",
    energetic: "Let's goooo! Moon energy activated! ⚡",
    romantic: "Aww, Moon sends you all the love 💕",
    chill: "Vibin' with Moon on easy mode 🌿"
  };
  
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active from all
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Show response
      const mood = btn.dataset.mood;
      response.textContent = responses[mood];
      response.classList.add('visible');
      
      // Create celebration
      createMoodCelebration(btn);
    });
  });
}

function createMoodCelebration(btn) {
  const emojis = ['✨', '💖', '🌟', '💫', '🌸'];
  const rect = btn.getBoundingClientRect();
  
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      const emoji = document.createElement('div');
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top}px;
        font-size: 1.5rem;
        pointer-events: none;
        z-index: 1000;
        animation: float-away 1s ease-out forwards;
      `;
      document.body.appendChild(emoji);
      setTimeout(() => emoji.remove(), 1000);
    }, i * 100);
  }
  
  // Add animation if not exists
  if (!document.getElementById('moodStyles')) {
    const style = document.createElement('style');
    style.id = 'moodStyles';
    style.textContent = `
      @keyframes float-away {
        to {
          transform: translateY(-80px) rotate(360deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== COUNTER =====
function setupCounter() {
  const counter = document.getElementById('awesomeCounter');
  const btn = document.getElementById('counterBtn');
  
  if (!counter || !btn) return;
  
  // Get saved count or start at random
  let count = parseInt(localStorage.getItem('moonAwesomeCount')) || Math.floor(Math.random() * 5000) + 10000;
  counter.textContent = count.toLocaleString();
  
  btn.addEventListener('click', () => {
    count++;
    counter.textContent = count.toLocaleString();
    counter.classList.add('bump');
    localStorage.setItem('moonAwesomeCount', count);
    
    // Create heart burst
    createCounterHearts(btn);
    
    setTimeout(() => counter.classList.remove('bump'), 300);
  });
}

function createCounterHearts(btn) {
  const rect = btn.getBoundingClientRect();
  const hearts = ['💖', '💗', '💕', '❤️', '💓'];
  
  for (let i = 0; i < 3; i++) {
    const heart = document.createElement('div');
    heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.cssText = `
      position: fixed;
      left: ${rect.left + Math.random() * rect.width}px;
      top: ${rect.top}px;
      font-size: 1.5rem;
      pointer-events: none;
      z-index: 1000;
      animation: float-away 1s ease-out forwards;
    `;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1000);
  }
}

// ===== CAROUSEL =====
function setupCarousel() {
  const track = document.getElementById('carouselTrack');
  const dotsContainer = document.getElementById('carouselDots');
  const prevBtn = document.getElementById('carouselPrev');
  const nextBtn = document.getElementById('carouselNext');
  
  if (!track || !dotsContainer) return;
  
  let currentSlide = 0;
  const slides = images.carousel;
  
  // Create slides
  slides.forEach((src, i) => {
    const slide = document.createElement('div');
    slide.className = 'carousel-slide';
    slide.innerHTML = `<img src="${src}" alt="Moon ${i + 1}" loading="lazy">`;
    track.appendChild(slide);
    
    // Create dot
    const dot = document.createElement('div');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });
  
  function goToSlide(index) {
    currentSlide = index;
    track.querySelectorAll('.carousel-slide').forEach((slide, i) => {
      slide.style.transform = `translateX(${(i - currentSlide) * 100}%)`;
    });
    dotsContainer.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentSlide);
    });
  }
  
  // Initialize positions
  goToSlide(0);
  
  // Navigation
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      goToSlide(currentSlide);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide + 1) % slides.length;
      goToSlide(currentSlide);
    });
  }
  
  // Auto-play
  setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    goToSlide(currentSlide);
  }, 5000);
}

// ===== MOON EXTRA: NOTE, REASONS, COMPLIMENTS, ADVANCED PLAYLIST =====
function setupMoonNote() {
  const noteCard = document.getElementById('moonNoteCard');
  if (!noteCard) return;
  noteCard.addEventListener('click', () => {
    noteCard.classList.toggle('moon-note-card--flipped');
  });
}

function setupMoonReasonsCarousel() {
  const track = document.getElementById('moonReasonsTrack');
  const dotsContainer = document.getElementById('moonReasonDots');
  const prevBtn = document.getElementById('moonPrevReason');
  const nextBtn = document.getElementById('moonNextReason');
  const shell = document.getElementById('moonReasonsCarousel');
  if (!track || !dotsContainer || !prevBtn || !nextBtn || !shell) return;

  const reasons = [
    {
      text: "the way your eyes light up when you talk about things you love makes the whole room feel warmer.",
      doodle: "little universe in your eyes ✦"
    },
    {
      text: "you listen with your whole heart, even to the small, messy details I think no one notices.",
      doodle: "world's softest safe place ☁"
    },
    {
      text: "you make ordinary days feel like movie scenes - grocery runs, late calls, everything.",
      doodle: "main character energy 🎬"
    },
    {
      text: "you're gentle, but you're also strong, and I'm constantly in awe of both.",
      doodle: "soft & unstoppable ♡"
    },
    {
      text: "you care in ways you don't even realize - the texts, the reminders, the 'did you eat?'.",
      doodle: "proof that angels text 😌"
    },
    {
      text: "you make me want to be better, not because you ask me to, but because loving you feels like magic.",
      doodle: "you're my favorite spell ✶"
    }
  ];

  let currentIndex = 0;

  function render() {
    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    reasons.forEach((r, idx) => {
      const card = document.createElement('div');
      card.className = 'moon-reason-card';
      card.innerHTML = `
        <div class="moon-reason-main"><span>${r.text}</span></div>
        <div class="moon-reason-doodle">${r.doodle}</div>
      `;
      track.appendChild(card);

      const dot = document.createElement('div');
      dot.className = 'moon-dot' + (idx === 0 ? ' moon-dot--active' : '');
      dot.dataset.index = idx.toString();
      dotsContainer.appendChild(dot);
    });
  }

  function update() {
    const percentage = -currentIndex * 100;
    track.style.transform = `translateX(${percentage}%)`;
    Array.from(dotsContainer.children).forEach((dot, idx) => {
      dot.classList.toggle('moon-dot--active', idx === currentIndex);
    });
  }

  function goTo(index) {
    if (index < 0) index = reasons.length - 1;
    if (index >= reasons.length) index = 0;
    currentIndex = index;
    update();
  }

  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  dotsContainer.addEventListener('click', (e) => {
    const target = e.target;
    if (target instanceof HTMLElement && target.classList.contains('moon-dot')) {
      const idx = Number(target.dataset.index || '0');
      goTo(idx);
    }
  });

  let touchStartX = null;
  shell.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });
  shell.addEventListener('touchend', (e) => {
    if (touchStartX === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const threshold = 40;
    if (dx > threshold) goTo(currentIndex - 1);
    if (dx < -threshold) goTo(currentIndex + 1);
    touchStartX = null;
  });

  render();
  update();
}

function setupMoonCompliments() {
  const textEl = document.getElementById('moonComplimentText');
  const btn = document.getElementById('moonComplimentBtn');
  if (!textEl || !btn) return;

  const compliments = [
    "I hope you know that even on your quiet days, your presence still feels like sunlight.",
    "If you could see yourself the way I see you, you'd never doubt how beautiful you are again.",
    "You don't just enter a room, you change the whole mood of it without trying.",
    "Your laugh is my favorite sound, and your name is my favorite word.",
    "You make kindness look effortless and softness look powerful.",
    "Some people are lucky to meet you once in their life. I get to call you mine.",
    "You're not just 'pretty' or 'cute' - you're the feeling of coming home after a long day."
  ];

  let lastIndex = -1;

  function pickCompliment() {
    if (compliments.length === 1) return compliments[0];
    let idx;
    do {
      idx = Math.floor(Math.random() * compliments.length);
    } while (idx === lastIndex);
    lastIndex = idx;
    return compliments[idx];
  }

  btn.addEventListener('click', () => {
    const msg = pickCompliment();
    textEl.innerHTML = `<span>${msg}</span>`;
  });
}

function setupMoonPlaylist() {
  const audio = document.getElementById('moonAudio');
  const playPauseBtn = document.getElementById('moonPlayPauseBtn');
  const songTitleEl = document.getElementById('moonSongTitle');
  const progressTrack = document.getElementById('moonProgressTrack');
  const progressFill = document.getElementById('moonProgressFill');
  const progressThumb = document.getElementById('moonProgressThumb');
  const currentTimeEl = document.getElementById('moonCurrentTime');
  const totalTimeEl = document.getElementById('moonTotalTime');
  const holdOverlay = document.getElementById('moonHoldOverlay');
  const prevSongHint = document.getElementById('moonPrevSongHint');
  const nextSongHint = document.getElementById('moonNextSongHint');

  if (!audio || !playPauseBtn || !songTitleEl || !progressTrack || !progressFill || !progressThumb || !currentTimeEl || !totalTimeEl || !holdOverlay || !prevSongHint || !nextSongHint) return;

  // Replace src values with your real files inside the music/ folder
  const playlist = [
    { title: 'soft skies & your voice', src: 'music/song1.mp3' },
    { title: 'late night calls', src: 'music/song2.mp3' },
    { title: 'walking under the same moon', src: 'music/song3.mp3' },
    { title: 'when you smile, I forget the rest', src: 'music/song4.mp3' }
  ];

  let currentIndex = 0;
  let isPlaying = false;

  let isPointerDown = false;
  let pointerStartY = 0;
  let holdTimer = null;
  let holdActive = false;
  let swipeTriggered = false;
  const HOLD_TIME = 2000;
  const SWIPE_THRESHOLD = 40;

  function formatTime(sec) {
    if (!sec || isNaN(sec)) return '0:00';
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  }

  function updateOverlayHints() {
    if (!playlist.length) return;
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    const nextIndex = (currentIndex + 1) % playlist.length;
    prevSongHint.textContent = playlist[prevIndex].title;
    nextSongHint.textContent = playlist[nextIndex].title;
  }

  function loadTrack(index) {
    if (!playlist.length) return;
    if (index < 0) index = playlist.length - 1;
    if (index >= playlist.length) index = 0;
    currentIndex = index;

    const trackData = playlist[currentIndex];
    audio.src = trackData.src;
    songTitleEl.textContent = trackData.title;

    audio.addEventListener('loadedmetadata', () => {
      totalTimeEl.textContent = formatTime(audio.duration);
    }, { once: true });

    updateOverlayHints();
  }

  function updateProgress() {
    if (!audio.duration) return;
    const ratio = audio.currentTime / audio.duration;
    const percent = ratio * 100;
    progressFill.style.width = `${percent}%`;
    progressThumb.style.left = `${percent}%`;
    currentTimeEl.textContent = formatTime(audio.currentTime);
  }

  function changeSong(delta) {
    if (!playlist.length) return;
    let nextIndex = currentIndex + delta;
    if (nextIndex < 0) nextIndex = playlist.length - 1;
    if (nextIndex >= playlist.length) nextIndex = 0;
    loadTrack(nextIndex);
    if (isPlaying) {
      audio.play().catch(() => {});
    }
  }

  function togglePlay() {
    if (!audio.src) {
      loadTrack(0);
    }
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch(() => {});
    }
  }

  function seekFromX(clientX) {
    const rect = progressTrack.getBoundingClientRect();
    let ratio = (clientX - rect.left) / rect.width;
    ratio = Math.min(1, Math.max(0, ratio));
    if (audio.duration) {
      audio.currentTime = ratio * audio.duration;
      updateProgress();
    }
  }

  function showOverlay() {
    holdOverlay.classList.add('moon-hold-overlay--visible');
  }

  function hideOverlay() {
    holdOverlay.classList.remove('moon-hold-overlay--visible');
  }

  function resetHoldState() {
    holdActive = false;
    swipeTriggered = false;
    if (holdTimer) {
      clearTimeout(holdTimer);
      holdTimer = null;
    }
    hideOverlay();
  }

  function onPointerDown(e) {
    isPointerDown = true;
    swipeTriggered = false;
    holdActive = false;

    const isTouch = e.type === 'touchstart';
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;
    pointerStartY = clientY;

    holdTimer = setTimeout(() => {
      holdActive = true;
      showOverlay();
    }, HOLD_TIME);

    if (!isTouch) {
      e.preventDefault();
    }
  }

  function onPointerMove(e) {
    if (!isPointerDown) return;

    const isTouch = e.type === 'touchmove';
    const clientY = isTouch ? e.touches[0].clientY : e.clientY;

    if (holdActive) {
      const dy = clientY - pointerStartY;
      if (!swipeTriggered) {
        if (dy <= -SWIPE_THRESHOLD) {
          swipeTriggered = true;
          changeSong(1);
          resetHoldState();
        } else if (dy >= SWIPE_THRESHOLD) {
          swipeTriggered = true;
          changeSong(-1);
          resetHoldState();
        }
      }
    }
  }

  function onPointerUp(e) {
    if (!isPointerDown) return;
    isPointerDown = false;

    const isTouch = e.type === 'touchend';
    const clientX = isTouch ? e.changedTouches[0].clientX : e.clientX;

    if (!holdActive && !swipeTriggered) {
      seekFromX(clientX);
    }

    resetHoldState();
  }

  function onPointerCancel() {
    isPointerDown = false;
    resetHoldState();
  }

  playPauseBtn.addEventListener('click', togglePlay);

  audio.addEventListener('play', () => {
    isPlaying = true;
    playPauseBtn.textContent = '⏸';
  });

  audio.addEventListener('pause', () => {
    isPlaying = false;
    playPauseBtn.textContent = '▶';
  });

  audio.addEventListener('timeupdate', updateProgress);

  audio.addEventListener('ended', () => {
    changeSong(1);
  });

  progressTrack.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);
  window.addEventListener('mouseleave', onPointerUp);

  progressTrack.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp);
  window.addEventListener('touchcancel', onPointerCancel);

  loadTrack(0);
}

// ===== CLICK SPARKLES =====
function setupClickSparkles() {
  const container = document.getElementById('clickEffects');
  if (!container) return;
  
  const sparkles = ['✨', '💖', '⭐', '💫', '🌟', '💕'];
  
  document.addEventListener('click', (e) => {
    // Don't sparkle on interactive elements
    if (e.target.closest('button, a, input, textarea')) return;
    
    for (let i = 0; i < 6; i++) {
      const sparkle = document.createElement('div');
      sparkle.className = 'click-sparkle';
      sparkle.textContent = sparkles[Math.floor(Math.random() * sparkles.length)];
      
      const angle = (i / 6) * Math.PI * 2;
      const distance = 30 + Math.random() * 30;
      
      sparkle.style.left = e.clientX + 'px';
      sparkle.style.top = e.clientY + 'px';
      sparkle.style.setProperty('--tx', Math.cos(angle) * distance + 'px');
      sparkle.style.setProperty('--ty', Math.sin(angle) * distance + 'px');
      
      container.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 800);
    }
  });
}

// ===== EASTER EGG (Konami Code) =====
function setupEasterEgg() {
  const popup = document.getElementById('easterEgg');
  const closeBtn = document.getElementById('easterClose');
  
  if (!popup || !closeBtn) return;
  
  // Konami code: up up down down left right left right b a
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
  let konamiIndex = 0;
  
  // Also trigger on triple-click on Moon name
  let clickCount = 0;
  let clickTimer;
  
  const logo = document.querySelector('.nav-logo');
  if (logo) {
    logo.addEventListener('click', (e) => {
      e.preventDefault();
      clickCount++;
      
      clearTimeout(clickTimer);
      clickTimer = setTimeout(() => clickCount = 0, 500);
      
      if (clickCount >= 3) {
        showEasterEgg();
        clickCount = 0;
      }
    });
  }
  
  document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiCode.length) {
        showEasterEgg();
        konamiIndex = 0;
      }
    } else {
      konamiIndex = 0;
    }
  });
  
  function showEasterEgg() {
    popup.classList.add('active');
    // Confetti burst
    createConfetti();
  }
  
  closeBtn.addEventListener('click', () => {
    popup.classList.remove('active');
  });
}

function createConfetti() {
  const colors = ['#ff6b9d', '#ffd700', '#ff8fb3', '#fff', '#ff69b4'];
  
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      const confetti = document.createElement('div');
      confetti.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}vw;
        top: -20px;
        width: 10px;
        height: 10px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
        pointer-events: none;
        z-index: 1000;
        animation: confetti-fall 3s ease-out forwards;
        transform: rotate(${Math.random() * 360}deg);
      `;
      document.body.appendChild(confetti);
      setTimeout(() => confetti.remove(), 3000);
    }, i * 30);
  }
  
  // Add confetti animation if not exists
  if (!document.getElementById('confettiStyles')) {
    const style = document.createElement('style');
    style.id = 'confettiStyles';
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(720deg);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
}

// ===== SMOOTH SECTION REVEAL =====
function setupSectionReveal() {
  const sections = document.querySelectorAll('section');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });
  
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    observer.observe(section);
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  // Loading screen first
  setupLoadingScreen();
  
  // Populate content
  populateHero();
  populateAbout();
  populateGallery();
  populateFacts();
  populateContact();
  
  // Original features
  setupScrollAnimations();
  setupForm();
  setupFloatingHearts();
  setupCustomCursor();
  setupParallax();
  setupTypedEffect();
  setupVibeCardsTilt();
  
  // New addictive features
  setupScrollProgress();
  setupBackToTop();
  setupMusicPlayer();
  setupPolaroids();
  setupMoodSelector();
  setupCounter();
  setupCarousel();
  setupMoonNote();
  setupMoonReasonsCarousel();
  setupMoonCompliments();
  setupMoonPlaylist();
  setupClickSparkles();
  setupEasterEgg();
  setupSectionReveal();
});
