// minimal privacy page script - privacy-script.js
document.addEventListener('DOMContentLoaded', ()=>{
  // nothing heavy here — but keep the file to add future behavior if needed
  const links = Array.from(document.querySelectorAll('a[href^="mailto:"]'));
  links.forEach(a=>a.addEventListener('click', ()=> {
    // small analytics-free console message for debugging
    console.log('Mailto clicked');
  }));
});
