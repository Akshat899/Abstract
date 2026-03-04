
// MOBILE NAV
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});


// LOGO MORPH SYSTEM
const floatingLogo = document.getElementById("floatingLogo");
const headerLogoWrapper = document.querySelector(".logo");
const hero = document.getElementById("hero");

let heroHeight = hero.offsetHeight;
window.addEventListener("resize", () => {
  heroHeight = hero.offsetHeight;
});
// On Load → Move to Center
window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    floatingLogo.classList.add("centered");
    headerLogoWrapper.classList.add("hidden");
  });
});

// On Scroll → Return to Header
window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  if (scrollY > heroHeight * 0.8) {
    floatingLogo.classList.remove("centered");
    headerLogoWrapper.classList.remove("hidden");
  } else {
    floatingLogo.classList.add("centered");
    headerLogoWrapper.classList.add("hidden");
  }
});


// COUNTER ANIMATION (unchanged logic)
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      const target = +counter.getAttribute("data-target");
      let current = 0;

      const update = () => {
        current += target / 100;
        if (current < target) {
          counter.innerText = Math.ceil(current);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
      counterObserver.unobserve(counter);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => counterObserver.observe(counter));


// SCROLL REVEAL
const reveals = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    } else {
      entry.target.classList.remove("active"); // reverse on scroll up
    }

  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObserver.observe(el));

// BAR GRAPH ANIMATION
const bars = document.querySelectorAll(".bar");
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {

    const bar = entry.target;
    const value = bar.getAttribute("data-value");
    const fill = bar.querySelector(".bar-fill");

    if (entry.isIntersecting) {
      fill.style.width = value + "%";
    } else {
      fill.style.width = "0%";
    }

  });
}, { threshold: 0.5 });

bars.forEach(bar => barObserver.observe(bar));
// CONTACT LEFT SLIDE-IN

const contactSection = document.getElementById("contact");
const contactLeft = document.querySelector(".contact-left");

const contactObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      contactLeft.classList.add("active");
    }
    else {
      contactLeft.classList.remove("active");
    }
  });
}, { 
  threshold: 0.25,
  rootMargin: "0px 0px -100px 0px"
});

contactObserver.observe(contactSection);
// Ensure reset state
window.addEventListener("DOMContentLoaded", () => {
  contactLeft.classList.remove("active");
});
// WORK SLIDER

// WORK SLIDER POLISHED

const slides = document.querySelectorAll(".slide");
const pagination = document.querySelector(".pagination");
const workSection = document.querySelector(".work-section");
const prevBtn = document.querySelector(".work-arrow.left");
const nextBtn = document.querySelector(".work-arrow.right");

let current = 0;

// Create pagination dots
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(i));
  pagination.appendChild(dot);
});

const dots = document.querySelectorAll(".pagination span");

function updateBackground(index) {
  if (index % 2 === 0) {
    workSection.classList.remove("alt-right");
    workSection.classList.add("alt-left");
  } else {
    workSection.classList.remove("alt-left");
    workSection.classList.add("alt-right");
  }
}

function goToSlide(index) {
  slides[current].classList.remove("active");
  dots[current].classList.remove("active");

  current = index;

  slides[current].classList.add("active");
  dots[current].classList.add("active");

  updateBackground(current);
}

nextBtn.addEventListener("click", () => {
  goToSlide((current + 1) % slides.length);
});

prevBtn.addEventListener("click", () => {
  goToSlide((current - 1 + slides.length) % slides.length);
});

// INITIAL STATE
updateBackground(0);

// =====================
// PARALLAX EFFECT
// =====================

window.addEventListener("mousemove", (e) => {
  const activeImage = document.querySelector(".slide.active img");
  if (!activeImage) return;

  const x = (e.clientX / window.innerWidth - 0.5) * 10;
  const y = (e.clientY / window.innerHeight - 0.5) * 10;

  activeImage.style.transform = `scale(1.05) translate(${x}px, ${y}px)`;
});

// =====================
// FIRST SLIDE SCROLL EFFECT
// =====================

const firstSlide = slides[0];

const firstSlideObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      firstSlide.style.transform = "scale(1)";
      firstSlide.style.opacity = "1";
    }
  });
}, { threshold: 0.4 });

firstSlideObserver.observe(workSection);
// =====================
// MOBILE TOUCH SWIPE
// =====================

let startX = 0;
let endX = 0;

const sliderArea = document.querySelector(".slides-wrapper");

sliderArea.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

sliderArea.addEventListener("touchmove", (e) => {
  endX = e.touches[0].clientX;
});

sliderArea.addEventListener("touchend", () => {
  let diff = startX - endX;

  if (Math.abs(diff) > 50) {
    if (diff > 0) {
      // swipe left
      goToSlide((current + 1) % slides.length);
    } else {
      // swipe right
      goToSlide((current - 1 + slides.length) % slides.length);
    }
  }
});

