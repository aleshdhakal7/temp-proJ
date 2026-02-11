// =======================
// Hamburger
// =======================
function toggleMenu() {
  document.querySelector(".menu-links").classList.toggle("open");
  document.querySelector(".hamburger-icon").classList.toggle("open");
}

// =======================
// Carousel
// =======================
const track = document.querySelector(".carousel-track");

if (track) {
  let isDragging = false;
  let startX;
  let scrollStart;
  let animationId;
  const speed = 0.5;

  const originalItems = Array.from(track.children);

  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  function getOriginalWidth() {
    let width = 0;
    originalItems.forEach(item => {
      width += item.offsetWidth;
    });
    return width;
  }

  let originalWidth;

  window.addEventListener("load", () => {
    originalWidth = getOriginalWidth();
    track.scrollLeft = 0;
    autoScroll();
  });

  function autoScroll() {
    if (!isDragging) {
      track.scrollLeft += speed;
      if (track.scrollLeft >= originalWidth) {
        track.scrollLeft -= originalWidth;
      }
    }
    animationId = requestAnimationFrame(autoScroll);
  }

  track.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.pageX;
    scrollStart = track.scrollLeft;
    cancelAnimationFrame(animationId);
    track.style.cursor = "grabbing";
  });

  track.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const walk = (e.pageX - startX) * 1.2;
    track.scrollLeft = scrollStart - walk;
  });

  track.addEventListener("mouseup", () => {
    isDragging = false;
    track.style.cursor = "grab";
    autoScroll();
  });

  track.addEventListener("mouseleave", () => {
    isDragging = false;
    track.style.cursor = "grab";
    autoScroll();
  });

  track.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].pageX;
    scrollStart = track.scrollLeft;
    cancelAnimationFrame(animationId);
  });

  track.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const walk = (e.touches[0].pageX - startX) * 1.2;
    track.scrollLeft = scrollStart - walk;
  });

  track.addEventListener("touchend", () => {
    isDragging = false;
    autoScroll();
  });

  track.style.cursor = "grab";
}



// =======================
// Scroll Animations
// =======================

// Single isInViewport function
function isInViewport(element, offset = 0.85) {
  const rect = element.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * offset;
}

// Video Card Animation
const videoCard = document.querySelector(".video-card");
function scrollAnimate() {
  if (videoCard && isInViewport(videoCard)) {
    videoCard.classList.add("show");
    window.removeEventListener("scroll", scrollAnimate);
  }
}
window.addEventListener("scroll", scrollAnimate);
scrollAnimate();

// Votes Animation
function animateVotes() {
  const voteElements = document.querySelectorAll("#past-election .votes");

  voteElements.forEach(el => {
    const target = +el.getAttribute("data-votes");
    let count = 0;
    const increment = Math.ceil(target / 150);
    const interval = setInterval(() => {
      count += increment;
      if (count >= target) {
        count = target;
        clearInterval(interval);
      }
      el.textContent = count.toLocaleString();
    }, 20);
  });
}

function triggerVoteAnimation() {
  const section = document.getElementById("past-election");
  if (section && isInViewport(section)) {
    animateVotes();
    window.removeEventListener("scroll", triggerVoteAnimation);
  }
}

window.addEventListener("scroll", triggerVoteAnimation);
triggerVoteAnimation();
