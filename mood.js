// Selecció d'elements
const body = document.body;
const moodText = document.getElementById('moodText');
const moodImage = document.getElementById('moodImage');
const favicon = document.getElementById('favicon');
const resetBtn = document.getElementById('reset');

// Dades dels estats amb les teves imatges
const moods = {
  happy: {
    text: "Avui estic feliç i ple d'energia!",
    img: "img/felicitat.jpg",
    class: "happy",
  },
  sad: {
    text: "Avui em sento una mica trist.",
    img: "img/tristesa.jpg",
    class: "sad",
  },
  angry: {
    text: "Estic una mica enfadat, però passarà.",
    img: "img/enfadat.jpg",
    class: "angry",
  },
  chill: {
    text: "Tot tranquil. Avui vaig al meu ritme.",
    img: "img/relaxat.jpg",
    class: "chill",
  }
};

// Funció per canviar estat d’ànim
function changeMood(mood) {
  const data = moods[mood];
  if (!data) return;

  // Mostra la imatge si estava amagada
  moodImage.classList.remove('ocult');

  // Aplica la classe corresponent
  body.className = data.class;
  body.style.background = "";

  // Canvia text i imatge amb transició
  moodText.textContent = data.text;
  moodImage.style.opacity = 0;
  
  setTimeout(() => {
    moodImage.src = data.img;
    moodImage.style.opacity = 1;
  }, 300);

  // Canvia favicon
  favicon.href = data.favicon;

  // Desa estat al localStorage
  localStorage.setItem("lastMood", mood);
}

// 🔁 Funció per reiniciar (sense imatge)
function resetMood() {
  body.className = "neutral";
  body.style.background = "#ffffff";
  body.style.transition = "background 0.6s ease";

  moodText.textContent = "Avui em sento...";
  
  // Amaga la imatge
  moodImage.classList.add('ocult');
  moodImage.src = "";

  favicon.href = "img/felicitat.png";
  localStorage.removeItem("lastMood");
}

// Esdeveniments dels botons
document.querySelectorAll("[data-mood]").forEach(button => {
  button.addEventListener("click", () => changeMood(button.dataset.mood));
});

resetBtn.addEventListener("click", resetMood);

// Restaurar últim estat guardat
window.addEventListener("load", () => {
  const lastMood = localStorage.getItem("lastMood");
  if (lastMood) changeMood(lastMood);
});
