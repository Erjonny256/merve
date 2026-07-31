const screens = Array.from(document.querySelectorAll(".screen"));
const openGiftBtn = document.getElementById("openGiftBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const navControls = document.getElementById("navControls");
const progressDots = document.getElementById("progressDots");
const wishBtn = document.getElementById("wishBtn");
const hiddenMessage = document.getElementById("hiddenMessage");
const celebrationLayer = document.getElementById("celebration-layer");

let currentScreen = 0;

// Intro hariç ilerleme noktaları
const contentScreens = screens.slice(1);

contentScreens.forEach((_, index) => {
  const dot = document.createElement("button");
  dot.setAttribute("aria-label", `${index + 1}. sayfaya git`);
  dot.addEventListener("click", () => showScreen(index + 1));
  progressDots.appendChild(dot);
});

function updateDots() {
  const dots = progressDots.querySelectorAll("button");
  dots.forEach((dot, index) => {
    dot.classList.toggle("active", index === currentScreen - 1);
  });
}

function updateNav() {
  if (currentScreen === 0) {
    navControls.style.display = "none";
  } else {
    navControls.style.display = "flex";
  }

  prevBtn.disabled = currentScreen <= 1;

  if (currentScreen === screens.length - 1) {
    nextBtn.textContent = "Başa dön 🔁";
  } else {
    nextBtn.textContent = "Sonraki Sayfa →";
  }

  updateDots();
}

function showScreen(index) {
  screens.forEach((screen) => screen.classList.remove("active"));
  screens[index].classList.add("active");
  currentScreen = index;
  updateNav();
  createCelebration(index === 0 ? 18 : 32);
  window.scrollTo({ top: 0, behavior: "smooth" });
}

openGiftBtn.addEventListener("click", () => {
  showScreen(1);
});

prevBtn.addEventListener("click", () => {
  if (currentScreen > 1) {
    showScreen(currentScreen - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentScreen < screens.length - 1) {
    showScreen(currentScreen + 1);
  } else {
    showScreen(1);
  }
});

wishBtn.addEventListener("click", () => {
  hiddenMessage.classList.add("show");
  createCelebration(45);
});

function createCelebration(count = 28) {
  celebrationLayer.innerHTML = "";

  const symbols = ["🎉", "🎊", "💖", "💕", "💗", "💘", "❤️", "✨", "🎈", "💞"];

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("span");
    particle.className = "particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDuration = `${3 + Math.random() * 2.8}s`;
    particle.style.fontSize = `${18 + Math.random() * 18}px`;
    particle.style.setProperty("--drift", `${(Math.random() - 0.5) * 180}px`);
    particle.style.opacity = (0.7 + Math.random() * 0.3).toString();

    celebrationLayer.appendChild(particle);
  }

  setTimeout(() => {
    celebrationLayer.innerHTML = "";
  }, 6000);
}

// İlk açılışta minik efekt
createCelebration(14);
updateNav();