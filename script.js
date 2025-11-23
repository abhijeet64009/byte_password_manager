// Byte Password Manager - script.js

// Reveal features on scroll
const featureBoxes = document.querySelectorAll('.feature-box');

function revealFeatures() {
  const triggerBottom = window.innerHeight * 0.85;

  featureBoxes.forEach(box => {
    const boxTop = box.getBoundingClientRect().top;
    if (boxTop < triggerBottom) {
      box.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', revealFeatures);
window.addEventListener('load', revealFeatures);

// Smooth fade animation for hero text on load
document.addEventListener('DOMContentLoaded', () => {
  document.querySelector('.hero').style.opacity = '1';
});
