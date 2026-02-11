// =======================
// Hamburger
// =======================
function toggleMenu() {
  document.querySelector(".menu-links").classList.toggle("open");
  document.querySelector(".hamburger-icon").classList.toggle("open");
}

const track = document.querySelector(".carousel-track");

if (track) {
  let isDragging = false;
  let startX;
  let scrollStart;
  let animationId;
  const speed = 0.5;

  // 🔹 Store original items BEFORE duplication
  const originalItems = Array.from(track.children);

  // 🔹 Duplicate once
  originalItems.forEach(item => {
    const clone = item.cloneNode(true);
    track.appendChild(clone);
  });

  // 🔹 Calculate real original width AFTER images load
  function getOriginalWidth() {
    let width = 0;
    originalItems.forEach(item => {
      width += item.offsetWidth;
    });
    return width;
  }

  let originalWidth;

  // Wait for images to fully load
 window.addEventListener("load", () => {
  originalWidth = getOriginalWidth();

  // Start from clean left edge
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

  // 🖱 Drag Support
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

  // 📱 Touch Support
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


document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("landing-video-modal");
  const video = document.getElementById("landing-video");
  const closeBtn = document.getElementById("close-landing-video");

  // Show modal on page load
  modal.classList.add("show");

  // Attempt to play video with sound
  video.play().catch(() => {
    console.log("Autoplay with sound may be blocked. User interaction may be required.");
  });

  // Function to close modal
  const closeModal = () => {
    modal.classList.remove("show");
    video.pause();
    video.currentTime = 0;
  };

  // Close on close button click
  closeBtn.addEventListener("click", closeModal);

  // Close when clicking outside video content
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  // Close on ESC key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Auto-close when video ends
  video.addEventListener("ended", closeModal);
});
 // Animate video card on scroll
const videoCard = document.querySelector(".video-card");

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85
  );
}

function scrollAnimate() {
  if (isInViewport(videoCard)) {
    videoCard.classList.add("show");
    window.removeEventListener("scroll", scrollAnimate);
  }
}

window.addEventListener("scroll", scrollAnimate);
scrollAnimate(); // check immediately in case already visible

function animateVotes() {
  const voteElements = document.querySelectorAll("#past-election .votes");

  voteElements.forEach(el => {
    const target = +el.getAttribute("data-votes");
    let count = 0;
    const increment = Math.ceil(target / 150);
    const interval = setInterval(() => {
      count += increment;
      if(count >= target) {
        count = target;
        clearInterval(interval);
      }
      el.textContent = count.toLocaleString();
    }, 20);
  });
}

function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.85;
}

function triggerVoteAnimation() {
  const section = document.getElementById("past-election");
  if (isInViewport(section)) {
    animateVotes();
    window.removeEventListener("scroll", triggerVoteAnimation);
  }
}

window.addEventListener("scroll", triggerVoteAnimation);
triggerVoteAnimation(); // check on load
