// Premium site interactions - script.js

// --- Helpers ---
const q = s => document.querySelector(s);
const qa = s => Array.from(document.querySelectorAll(s));

/* 1) Reveal on scroll & reverse when scrolling up (disappear) */

// track last scroll to detect direction
let lastScroll = window.scrollY || 0;
const featureCards = qa('.feature-card');

function handleScrollReveal() {
  const viewportHeight = window.innerHeight;
  featureCards.forEach(card => {
    const r = card.getBoundingClientRect();
    const centerY = r.top + r.height / 2;
    // visible when top < 85% viewport
    const isVisible = (r.top < viewportHeight * 0.85) && (r.bottom > 0);
    if (isVisible) {
      card.classList.add('visible');
      // run icon animation once
      const svg = card.querySelector('.svg-icon');
      if (svg && !svg.dataset.animated) {
        svg.dataset.animated = '1';
        svg.style.transform = 'scale(1.12)';
        setTimeout(()=> svg.style.transform = '', 520);
      }
    } else {
      // if user scrolls up beyond card, remove visible so it disappears
      card.classList.remove('visible');
      card.classList.remove('focused');
    }
  });

  // detect center-focused card (visual focus)
  const centerY = viewportHeight / 2;
  let found = null;
  featureCards.forEach(card => {
    const r = card.getBoundingClientRect();
    if (r.top < centerY + r.height * 0.25 && r.bottom > centerY - r.height * 0.25) {
      found = card;
    }
  });
  featureCards.forEach(card => {
    if (card === found) card.classList.add('focused');
    else card.classList.remove('focused');
  });

  lastScroll = window.scrollY || 0;
}

window.addEventListener('scroll', handleScrollReveal, {passive:true});
window.addEventListener('resize', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);
document.addEventListener('DOMContentLoaded', handleScrollReveal);

/* 2) Hover / touch to focus & show arrow - for mobile, tap toggles focus */
featureCards.forEach(card=>{
  // desktop hover handled by CSS; add click/tap toggle for mobile
  card.addEventListener('click', (e)=>{
    // if clicking the more button, skip toggle
    if (e.target.closest('.feature-more')) return;
    // toggle focus
    const already = card.classList.contains('focused');
    featureCards.forEach(c => c.classList.remove('focused'));
    if (!already) card.classList.add('focused');
  });
});

// clicking "more" arrow can be wired to deep-dive later
qa('.feature-more').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const card = e.target.closest('.feature-card');
    const key = card?.dataset?.key || 'feature';
    // default action: scroll card to top (simulate reveal of details)
    card.scrollIntoView({behavior:'smooth', block:'center'});
    // ephemeral highlight
    card.classList.add('focused');
  });
});

/* 3) App icon placeholder behavior: click to instruct how to replace */
const appIcon = q('#appIconPlaceholder');
if (appIcon) {
  appIcon.addEventListener('click', ()=>{
    alert('Replace /assets/icon.png in your repository with your app icon (recommended sizes: 512x512 & 192x192).');
  });
}

/* 4) simple fallback: if no hero image present, slightly change layout */
const heroImg = q('.hero-illustration img');
if (!heroImg || heroImg.complete === false && window.getComputedStyle(q('.hero-illustration')).display !== 'none') {
  // small decorative effect (no-op safe)
}
