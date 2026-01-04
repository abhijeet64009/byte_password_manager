/**
 * Auto-load screenshots into gallery
 * Naming pattern: shot1.jpg, shot2.jpg, ...
 */

const gallery = document.getElementById("gallery");

const BASE_PATH = "assets/screenshots/";
const MAX_SHOTS = 30;
const MAX_VARIANTS = 5;

for (let i = 1; i <= MAX_SHOTS; i++) {
  loadShotGroup(i);
}

function loadShotGroup(index) {
  const baseImg = `${BASE_PATH}shot${index}.jpg`;

  checkImage(baseImg, exists => {
    if (!exists) return;

    const variants = [baseImg];
    let checked = 0;

    for (let v = 1; v <= MAX_VARIANTS; v++) {
      const variant = `${BASE_PATH}shot${index}_${v}.jpg`;

      checkImage(variant, ok => {
        checked++;
        if (ok) variants.push(variant);

        if (checked === MAX_VARIANTS) {
          createShotBlock(variants);
        }
      });
    }
  });
}

function createShotBlock(images) {
  const container = document.createElement("div");
  container.className = "gitem";

  if (images.length === 1) {
    const img = createImg(images[0]);
    container.appendChild(img);
  } else {
    const slider = document.createElement("div");
    slider.className = "slider";

    const track = document.createElement("div");
    track.className = "slider-track";

    const dots = document.createElement("div");
    dots.className = "slider-dots";

    images.forEach((src, idx) => {
      const img = createImg(src);
      track.appendChild(img);

      const dot = document.createElement("span");
      if (idx === 0) dot.classList.add("active");
      dots.appendChild(dot);
    });

    track.addEventListener("scroll", () => {
      const index = Math.round(track.scrollLeft / track.clientWidth);
      dots.querySelectorAll("span").forEach((d, i) =>
        d.classList.toggle("active", i === index)
      );
    });

    slider.appendChild(track);
    slider.appendChild(dots);
    container.appendChild(slider);
  }

  gallery.appendChild(container);
}

function createImg(src) {
  const img = new Image();
  img.src = src;
  img.alt = "App Screenshot";
  img.loading = "lazy";
  return img;
}

function checkImage(src, callback) {
  const img = new Image();
  img.onload = () => callback(true);
  img.onerror = () => callback(false);
  img.src = src;
}
