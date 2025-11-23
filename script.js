// script.js - premium theme behavior

const q = s => document.querySelector(s);
const qa = s => Array.from(document.querySelectorAll(s));

// Feature card logic
const featureCards = qa('.feature-card');

// Reveal & reverse (disappear) when out of view
function handleScrollReveal(){
  const vh = window.innerHeight;
  featureCards.forEach(card=>{
    const r = card.getBoundingClientRect();
    const visible = (r.top < vh * 0.85) && (r.bottom > 0);
    if(visible){
      if(!card.classList.contains('visible')) card.classList.add('visible');
      // animate icon once
      const svg = card.querySelector('.svg-icon');
      if(svg && !svg.dataset.animated){
        svg.dataset.animated = '1';
        svg.style.transform = 'scale(1.12)';
        setTimeout(()=> svg.style.transform = '', 520);
      }
    } else {
      // remove visible on scroll away (reverse)
      card.classList.remove('visible');
      card.classList.remove('focused');
    }
  });

  // highlight center card (focus) — also respond to hover (desktop)
  const centerY = window.innerHeight / 2;
  let centerCard = null;
  featureCards.forEach(card=>{
    const r = card.getBoundingClientRect();
    if(r.top < centerY + r.height*0.25 && r.bottom > centerY - r.height*0.25){
      centerCard = card;
    }
  });
  featureCards.forEach(card => {
    if(card === centerCard) card.classList.add('focused');
    else card.classList.remove('focused');
  });
}

window.addEventListener('scroll', handleScrollReveal, {passive:true});
window.addEventListener('resize', handleScrollReveal);
window.addEventListener('load', handleScrollReveal);
document.addEventListener('DOMContentLoaded', handleScrollReveal);

// Desktop hover: make hover trigger focus
featureCards.forEach(card=>{
  card.addEventListener('mouseenter', ()=>{
    // only on pointer devices
    if(window.matchMedia('(hover: hover)').matches){
      featureCards.forEach(c=>c.classList.remove('focused'));
      card.classList.add('focused');
    }
  });
  card.addEventListener('mouseleave', ()=>{
    if(window.matchMedia('(hover: hover)').matches){
      card.classList.remove('focused');
    }
  });

  // mobile tap toggles focus
  card.addEventListener('click', (e)=>{
    if(!window.matchMedia('(hover: hover)').matches){
      if(e.target.closest('.feature-more')) return;
      const was = card.classList.contains('focused');
      featureCards.forEach(c=>c.classList.remove('focused'));
      if(!was) card.classList.add('focused');
    }
  });
});

// More button scroll behavior
qa('.feature-more').forEach(btn=>{
  btn.addEventListener('click', (e)=>{
    const card = e.target.closest('.feature-card');
    if(!card) return;
    // scroll to center
    card.scrollIntoView({behavior:'smooth',block:'center'});
    card.classList.add('focused');
  });
});

// App icon placeholder instructions
const appIcon = q('#appIconPlaceholder');
if(appIcon){
  appIcon.addEventListener('click', ()=>{
    alert('To change the icon: upload /assets/icon.png (recommended 512x512). GitHub Pages serves it automatically.');
  });
}

// Screenshot placeholders: read files if hosted (future enhancement)
