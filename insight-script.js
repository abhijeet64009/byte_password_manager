/**
 * Auto-load screenshots into gallery
 * Naming pattern: shot1.jpg, shot2.jpg, ...
 */

const gallery = document.getElementById("gallery");

const loader = document.getElementById("loader");

const BASE_PATH = "assets/screenshots/";
const MAX_SHOTS = 30;
const MAX_VARIANTS = 5;

const groups = [];
let processed = 0;

for (let i = 1; i <= MAX_SHOTS; i++) {
  loadShotGroup(i);
}

function loadShotGroup(index) {
  const baseImg = `${BASE_PATH}shot${index}.jpg`;

  checkImage(baseImg, exists => {
    if (!exists) {
      processed++;
      checkDone();
      return;
    }

    const variants = [baseImg];
    let checked = 0;

    for (let v = 1; v <= MAX_VARIANTS; v++) {
      const variant = `${BASE_PATH}shot${index}_${v}.jpg`;

      checkImage(variant, ok => {
        checked++;
        if (ok) variants.push(variant);

        if (checked === MAX_VARIANTS) {
          groups.push({ index, variants });
          processed++;
          checkDone();
        }
      });
    }
  });
}

function checkDone() {
  if (processed === MAX_SHOTS) {
    renderGallery();
  }
}

function renderGallery() {
  groups
    .sort((a, b) => a.index - b.index)
    .forEach(g => gallery.appendChild(createShotBlock(g.variants)));

  loader.style.display = "none";
}

function createShotBlock(images) {
  const container = document.createElement("div");
  container.className = "gitem";

  if (images.length === 1) {
    container.appendChild(createImg(images[0]));
    return container;
  }

  const slider = document.createElement("div");
  slider.className = "slider";

  const track = document.createElement("div");
  track.className = "slider-track";

  const dots = document.createElement("div");
  dots.className = "slider-dots";

  images.forEach((src, idx) => {
    track.appendChild(createImg(src));

    const dot = document.createElement("span");
    if (idx === 0) dot.classList.add("active");
    dots.appendChild(dot);
  });

  track.addEventListener("scroll", () => {
    const i = Math.round(track.scrollLeft / track.clientWidth);
    dots.querySelectorAll("span").forEach((d, idx) =>
      d.classList.toggle("active", idx === i)
    );
  });

  slider.appendChild(track);
  slider.appendChild(dots);
  container.appendChild(slider);

  return container;
}

function createImg(src) {
  const img = new Image();
  img.src = src;
  img.alt = "App Screenshot";
  img.loading = "lazy";
  return img;
}

function checkImage(src, cb) {
  const img = new Image();
  img.onload = () => cb(true);
  img.onerror = () => cb(false);
  img.src = src;
}
