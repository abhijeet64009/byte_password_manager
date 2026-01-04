/**
 * Auto-load screenshots into gallery
 * Naming pattern: shot1.jpg, shot2.jpg, ...
 */

const gallery = document.getElementById("gallery");

// maximum number of screenshots to try
const MAX_SHOTS = 50;

// base path
const BASE_PATH = "assets/screenshots/";

for (let i = 1; i <= MAX_SHOTS; i++) {
  const img = new Image();
  img.src = `${BASE_PATH}shot${i}.jpg`;
  img.alt = `App Screenshot ${i}`;
  img.loading = "lazy";

  img.onload = () => {
    const wrapper = document.createElement("div");
    wrapper.className = "gitem";
    wrapper.appendChild(img);
    gallery.appendChild(wrapper);
  };

  // silently ignore missing images
  img.onerror = () => {};
}

