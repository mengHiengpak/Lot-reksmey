const CONFIG = {
  name: "Lot Raksmey",
  passcode: "201004",
};

const flowers = [
  {
    name: "Tulip",
    message: "អូនពិតជាស្អាតខ្លាំងណាស់ ហើយអូនតែងតែធ្វើឱ្យបងរំភើbជានិច្ច។",
    svg: tulipSvg("#ff8ab5"),
  },
  {
    name: "Rose",
    message: "បងស្រឡាញ់អ្វីៗគ្រប់យ៉ាងដែរអូនមាន។",
    svg: roseSvg(),
  },
  {
    name: "Sunflower",
    message: "អូនគឺជាពន្លឺព្រះអាទិត្យរបស់បង។ ទោះបីជាថ្ងៃប្រែទៅយ៉ាងណាក៏ដោយ ក៏បងតែងតែទន្ទឹងរង់ចាំបាននៅក្បែរអូនជានិច្ច។",
    svg: sunflowerSvg(),
  },
  {
    name: "Daisy",
    message: "ប្រសិនបើអូនសួរបងថាស្រឡាញ់អូនឬអត់។ ចម្លើយរបស់បងចំពោះអូនគឺ 'ស្រឡាញ់ហើយស្រឡាញ់ខ្លាំងណាស់' ជានិច្ច។",
    svg: daisySvg(),
  },
  {
    name: "Peony",
    message: "អរគុណដែលបានក្លាយជាកន្លែងដ៏មានសុវត្ថិភាពរបស់បង និងធ្វើឱ្យជីវិតបងមានន័យ និងរំភើបជានិច្ច។",
    svg: peonySvg(),
  },
  {
    name: "Lily",
    message: "បងមានមោទនភាពចំពោះអូនខ្លាំងណាស់។",
    svg: lilySvg(),
  },
  {
    name: "Cherry",
    message: "ប្រសិនបើបងបានរៀបការជាមួយអូននៅថ្ងៃខាងមុខ វាគឺរឿងល្អហើយជាស្នាមញញឹមដែលបងទទួលបាននៅពេលបងគិតដល់រឿងនេះ។",
    svg: cherrySvg(),
  },
  {
    name: "Orchid",
    message: "អូនគឺជាមនុស្សតែម្នាក់គត់របស់បងជារៀងរហូត។ ទាំងថ្ងៃនេះ ថ្ងៃស្អែក និងជារៀងរហូត។",
    svg: orchidSvg(),
  },
];

const notes = [
  "បងស្រឡាញ់សំឡេងសើចរបស់អូន — វាធ្វើឱ្យថ្ងៃរបស់បងល្អភ្លាមៗ។",
  "បងស្រឡាញ់របៀបដែលអូនយកចិត្តទុកដាក់ស្តាប់បងយ៉ាងពិតប្រាកដនៅពេលបងនិយាយ។",
  "បងស្រឡាញ់អារម្មណ៍ដែលបាននៅជាមួយអូន វាមានអារម្មណ៍កក់ក្តៅដូចជានៅផ្ទះ។",
  "បងស្រឡាញ់ភាពចិត្តល្អរបស់អូន។ ពិភពលោកនេះកាន់តែស្រស់ស្អាតនៅពេលមានអូននៅក្នុងជីវិតបង។",
  "បងស្រឡាញ់ការសន្ទនាយប់ជ្រៅរបស់យើង និងការអង្គុយជាមួយគ្នាយ៉ាងមានសុខសាន្ត។",
  "បងពិតជាសប្បាយចិត្តដែលអូនជ្រើសរើសបង។",
  "បងស្រឡាញ់ភាពរឹងមាំរបស់អូន។ អូនតែងតែផ្តល់នៅកម្លាំងចិត្តឱ្យបង",
  "បងស្រឡាញ់រឿងតូចតាចទាំងឡាយ៖ សាររបស់អូន ខ្សែភ្នែករបស់អូន និងកាយវិការបស់អូន។",
];
const songs = [
  {
    title: "About you",
    artist: "The 1975",
    src: "assets/music/aboutyou.mp3?v=3",
  },
  {
    title: "hate that i made you love me",
    artist: "Ariana Grande",
    src: "assets/music/hatethat.mp3?v=3",
  },
  {
    title: "I Think They Call This Love ",
    artist: "Elliot James Reay",
    src: "assets/music/theysay.mp3?v=3",
  },
];

document.getElementById("gate-name").textContent = CONFIG.name;
document.getElementById("hero-name").textContent = CONFIG.name.toUpperCase();
document.querySelectorAll(".letter-name").forEach((el) => {
  el.textContent = CONFIG.name;
});
document.title = `For You, ${CONFIG.name}`;

const dotsEl = document.getElementById("code-dots");
const keypadEl = document.getElementById("keypad");
const errorEl = document.getElementById("error-msg");
let code = "";

for (let i = 0; i < 6; i += 1) {
  const d = document.createElement("span");
  d.className = "dot";
  dotsEl.appendChild(d);
}

["1", "2", "3", "4", "5", "6", "7", "8", "9", "⌫", "0", "↵"].forEach((label) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = label === "⌫" || label === "↵" ? "key action" : "key";
  btn.textContent = label;
  btn.addEventListener("click", () => onKey(label));
  keypadEl.appendChild(btn);
});

function renderDots() {
  [...dotsEl.children].forEach((dot, i) => {
    dot.classList.toggle("filled", i < code.length);
  });
}

function onKey(label) {
  errorEl.classList.remove("show");
  if (label === "⌫") {
    code = code.slice(0, -1);
    renderDots();
    return;
  }
  if (label === "↵") {
    submitCode();
    return;
  }
  if (code.length >= 6) return;
  code += label;
  renderDots();
  if (code.length === 6) submitCode();
}

function submitCode() {
  if (code === CONFIG.passcode) {
    showScreen("loading-screen");
    setTimeout(() => showScreen("gift-screen"), 1700);
    return;
  }
  errorEl.classList.add("show");
  dotsEl.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 320 }
  );
  code = "";
  renderDots();
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => {
    s.classList.remove("active");
    s.hidden = s.id !== id;
  });
  const next = document.getElementById(id);
  next.hidden = false;
  next.classList.add("active");
  if (id === "main-screen") {
    bits = [];
    cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }
}

document.querySelectorAll(".screen").forEach((s) => {
  s.hidden = !s.classList.contains("active");
});

const gift = document.getElementById("gift-box");
gift.addEventListener("click", () => {
  gift.querySelector(".gift").classList.add("open");
  burstConfetti();
  loadTrack(0, true);
  setTimeout(() => {
    showScreen("main-screen");
    birthdayAlert.hidden = false;
  }, 900);
});

const birthdayAlert = document.getElementById("birthday-alert");
const birthdayClose = document.getElementById("birthday-close");
birthdayClose.addEventListener("click", () => {
  birthdayAlert.hidden = true;
});
birthdayAlert.addEventListener("click", (e) => {
  if (e.target === birthdayAlert) birthdayAlert.hidden = true;
});

const bouquet = document.getElementById("bouquet");
const flowerMsg = document.getElementById("flower-msg");
const flowerPositions = [
  { left: 50, top: 12 },
  { left: 28, top: 21 },
  { left: 72, top: 21 },
  { left: 16, top: 34 },
  { left: 84, top: 34 },
  { left: 32, top: 44 },
  { left: 68, top: 44 },
  { left: 50, top: 36 },
];
flowers.forEach((flower, index) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.className = "flower";
  btn.style.left = `${flowerPositions[index].left}%`;
  btn.style.top = `${flowerPositions[index].top}%`;
  btn.innerHTML = `${flower.svg}<span>${flower.name}</span>`;
  btn.addEventListener("click", () => {
    document.querySelectorAll(".flower").forEach((f) => f.classList.remove("active"));
    btn.classList.add("active");
    flowerMsg.hidden = false;
    flowerMsg.textContent = flower.message;
    const rect = btn.getBoundingClientRect();
    dropFlowerPetals(rect.left + rect.width / 2, rect.top + rect.height / 2);
  });
  bouquet.appendChild(btn);
  if (index === 0) {
    btn.classList.add("active");
    flowerMsg.hidden = false;
    flowerMsg.textContent = flower.message;
  }
});

const polaroid = document.getElementById("polaroid");
const lightbox = document.getElementById("lightbox");
polaroid.addEventListener("click", () => {
  document.getElementById("lightbox-img").src = document.getElementById("memory-photo").src;
  lightbox.hidden = false;
});
document.getElementById("lightbox-close").addEventListener("click", () => {
  lightbox.hidden = true;
});
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) lightbox.hidden = true;
});

const jarBtn = document.getElementById("jar-btn");
const jarNote = document.getElementById("jar-note");
let lastNote = -1;
jarBtn.addEventListener("click", () => {
  jarBtn.classList.remove("shake");
  void jarBtn.offsetWidth;
  jarBtn.classList.add("shake");
  let next = Math.floor(Math.random() * notes.length);
  if (next === lastNote) next = (next + 1) % notes.length;
  lastNote = next;
  jarNote.textContent = notes[next];
});

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play-btn");
const vinyl = document.getElementById("vinyl");
const fill = document.getElementById("progress-fill");
const songList = document.getElementById("song-list");
let track = 0;
let usingTone = false;
let toneStop = null;

songs.forEach((song, i) => {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.innerHTML = `<strong>${song.title}</strong><br><small>${song.artist}</small>`;
  btn.addEventListener("click", () => loadTrack(i, true));
  songList.appendChild(btn);
});

function loadTrack(i, autoplay = false) {
  track = i;
  const song = songs[i];
  document.getElementById("now-title").textContent = song.title;
  document.getElementById("now-artist").textContent = song.artist;
  [...songList.children].forEach((el, idx) => el.classList.toggle("active", idx === i));
  fill.style.width = "0%";
  document.getElementById("time-now").textContent = "0:00";
  document.getElementById("time-total").textContent = "0:00";
  audio.src = song.src;
  audio.load();
  if (autoplay) playCurrent();
}

loadTrack(0);

playBtn.addEventListener("click", () => {
  if (!audio.paused && !usingTone) {
    audio.pause();
    playBtn.textContent = "▶";
    vinyl.classList.remove("spin");
    return;
  }
  if (usingTone && toneStop) {
    toneStop();
    usingTone = false;
    playBtn.textContent = "▶";
    vinyl.classList.remove("spin");
    return;
  }
  playCurrent();
});

document.getElementById("prev-btn").addEventListener("click", () => {
  loadTrack((track + songs.length - 1) % songs.length, true);
});
document.getElementById("next-btn").addEventListener("click", () => {
  loadTrack((track + 1) % songs.length, true);
});

document.getElementById("progress").addEventListener("click", (e) => {
  if (!audio.duration) return;
  const ratio = e.offsetX / e.currentTarget.clientWidth;
  audio.currentTime = ratio * audio.duration;
});

audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;
  fill.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
  document.getElementById("time-now").textContent = fmt(audio.currentTime);
  document.getElementById("time-total").textContent = fmt(audio.duration);
});
audio.addEventListener("ended", () => loadTrack((track + 1) % songs.length, true));

function playCurrent() {
  usingTone = false;
  const attempt = audio.play();
  if (!attempt) return;
  attempt
    .then(() => {
      playBtn.textContent = "❚❚";
      vinyl.classList.add("spin");
    })
    .catch((err) => {
      if (err && err.name === "NotAllowedError") {
        playBtn.textContent = "▶";
        vinyl.classList.remove("spin");
        return;
      }
      playToneFallback();
    });
}

function playToneFallback() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const master = ctx.createGain();
  master.gain.value = 0.05;
  master.connect(ctx.destination);
  const scale = [
    [523, 659, 784, 659],
    [440, 554, 659, 880],
    [392, 523, 659, 784],
  ][track];
  let step = 0;
  const id = setInterval(() => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = scale[step % scale.length];
    g.gain.setValueAtTime(0.0001, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.2, ctx.currentTime + 0.04);
    g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.55);
    osc.connect(g);
    g.connect(master);
    osc.start();
    osc.stop(ctx.currentTime + 0.6);
    step += 1;
    fill.style.width = `${((step % 24) / 24) * 100}%`;
  }, 480);
  usingTone = true;
  playBtn.textContent = "❚❚";
  vinyl.classList.add("spin");
  toneStop = () => {
    clearInterval(id);
    ctx.close();
  };
}

function fmt(t) {
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}

function tulipSvg(c) {
  return `<svg viewBox="0 0 80 90"><path d="M40 86 C40 58 30 50 30 40" stroke="#7dcf8a" stroke-width="3" fill="none"/><path d="M40 44 C28 10 14 24 26 44 C34 56 40 50 40 44Z" fill="${c}"/><path d="M40 44 C52 10 66 24 54 44 C46 56 40 50 40 44Z" fill="#ff6b9d"/><path d="M40 44 C40 12 24 20 34 44 C38 54 40 50 40 44Z" fill="#ffc1d8"/></svg>`;
}
function roseSvg() {
  return `<svg viewBox="0 0 80 90"><path d="M40 86 C40 60 34 52 34 44" stroke="#7dcf8a" stroke-width="3" fill="none"/><circle cx="40" cy="36" r="16" fill="#c63d73"/><circle cx="40" cy="36" r="10" fill="#ff8ab5"/><circle cx="40" cy="36" r="5" fill="#ffd6ea"/></svg>`;
}
function sunflowerSvg() {
  return `<svg viewBox="0 0 80 90"><path d="M40 86 C40 62 36 54 36 46" stroke="#7dcf8a" stroke-width="3" fill="none"/>${Array.from({ length: 14 }, (_, i) => {
    const a = (i / 14) * Math.PI * 2;
    const x = 40 + Math.cos(a) * 18;
    const y = 34 + Math.sin(a) * 18;
    return `<ellipse cx="${x}" cy="${y}" rx="4" ry="12" fill="#f6d36a" transform="rotate(${(a * 180) / Math.PI} ${x} ${y})"/>`;
  }).join("")}<circle cx="40" cy="34" r="9" fill="#6a431c"/></svg>`;
}
function daisySvg() {
  return `<svg viewBox="0 0 80 90"><path d="M40 86 C40 60 34 52 34 44" stroke="#7dcf8a" stroke-width="3" fill="none"/>${Array.from({ length: 10 }, (_, i) => {
    const a = (i / 10) * Math.PI * 2;
    const x = 40 + Math.cos(a) * 14;
    const y = 34 + Math.sin(a) * 14;
    return `<ellipse cx="${x}" cy="${y}" rx="4.5" ry="9" fill="#fff6f0" transform="rotate(${(a * 180) / Math.PI} ${x} ${y})"/>`;
  }).join("")}<circle cx="40" cy="34" r="7" fill="#f4c95d"/></svg>`;
}
function peonySvg() {
  return `<svg viewBox="0 0 80 90"><path d="M40 86 C40 60 32 50 32 42" stroke="#7dcf8a" stroke-width="3" fill="none"/><circle cx="40" cy="36" r="18" fill="#f4a6c1"/><circle cx="32" cy="32" r="9" fill="#ffd6ea"/><circle cx="48" cy="32" r="9" fill="#e889b3"/><circle cx="40" cy="40" r="8" fill="#ff8ab5"/></svg>`;
}
function lilySvg() {
  return `<svg viewBox="0 0 80 90"><path d="M40 86 C40 58 38 50 38 42" stroke="#7dcf8a" stroke-width="3" fill="none"/><path d="M40 48 C22 18 18 40 40 48Z" fill="#f7d7ea"/><path d="M40 48 C58 18 62 40 40 48Z" fill="#eeb6d2"/><path d="M40 48 C40 14 28 28 40 48Z" fill="#fff"/><circle cx="40" cy="46" r="3" fill="#f3d5a5"/></svg>`;
}
function cherrySvg() {
  return `<svg viewBox="0 0 80 90"><path d="M40 70 C40 40 22 28 18 20" stroke="#7dcf8a" stroke-width="2" fill="none"/><circle cx="28" cy="58" r="12" fill="#ff6b9d"/><circle cx="50" cy="62" r="12" fill="#e85a90"/></svg>`;
}
function orchidSvg() {
  return `<svg viewBox="0 0 80 90"><path d="M40 86 C40 58 36 50 36 42" stroke="#7dcf8a" stroke-width="3" fill="none"/><ellipse cx="40" cy="28" rx="7" ry="12" fill="#c9a0ff"/><ellipse cx="26" cy="38" rx="10" ry="7" fill="#e0c4ff"/><ellipse cx="54" cy="38" rx="10" ry="7" fill="#e0c4ff"/><circle cx="40" cy="40" r="6" fill="#ff8ab5"/></svg>`;
}

const petalCanvas = document.getElementById("petal-canvas");
const pctx = petalCanvas.getContext("2d");
const dropCanvas = document.getElementById("drop-canvas");
const dctx = dropCanvas.getContext("2d");
let petals = [];

function resizePetals() {
  petalCanvas.width = dropCanvas.width = innerWidth;
  petalCanvas.height = dropCanvas.height = innerHeight;
}
resizePetals();
addEventListener("resize", resizePetals);

function spawnPetal() {
  const kind = Math.random();
  petals.push({
    x: Math.random() * innerWidth,
    y: -20,
    r: 4 + Math.random() * 7,
    s: 0.6 + Math.random() * 1.4,
    a: Math.random() * Math.PI,
    kind,
    rot: Math.random() * 360,
  });
}

for (let i = 0; i < 28; i += 1) spawnPetal();

let drops = [];

function dropFlowerPetals(x, y, count = 16) {
  for (let i = 0; i < count; i += 1) {
    drops.push({
      x: x + (Math.random() - 0.5) * 26,
      y: y + (Math.random() - 0.5) * 26,
      r: 4 + Math.random() * 6,
      vx: (Math.random() - 0.5) * 3.5,
      vy: Math.random() * -2.5 - 0.5,
      g: 0.14 + Math.random() * 0.1,
      a: Math.random() * Math.PI,
      kind: Math.random(),
      rot: Math.random() * 360,
      vr: (Math.random() - 0.5) * 7,
      life: 80 + Math.random() * 50,
    });
  }
}

function paintPetal(ctx, p, alpha = 1) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(p.x, p.y);
  ctx.rotate((p.rot * Math.PI) / 180);
  if (p.kind < 0.45) {
    ctx.fillStyle = "rgba(255,138,184,0.9)";
    ctx.beginPath();
    ctx.ellipse(0, 0, p.r * 0.6, p.r, 0, 0, Math.PI * 2);
    ctx.fill();
  } else if (p.kind < 0.75) {
    ctx.fillStyle = "rgba(255,214,234,0.95)";
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(p.r * 0.35, 1.5), 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.fillStyle = "rgba(255,107,157,0.95)";
    ctx.font = `${p.r * 1.8}px serif`;
    ctx.fillText("♥", -p.r, p.r * 0.6);
  }
  ctx.restore();
}

function drawPetals() {
  pctx.clearRect(0, 0, petalCanvas.width, petalCanvas.height);
  petals.forEach((p) => {
    p.y += p.s;
    p.x += Math.sin(p.a) * 0.6;
    p.a += 0.01;
    p.rot += 0.8;
    paintPetal(pctx, p, 1);
    if (p.y > innerHeight + 20) {
      p.y = -20;
      p.x = Math.random() * innerWidth;
    }
  });
  dctx.clearRect(0, 0, dropCanvas.width, dropCanvas.height);
  drops.forEach((d) => {
    d.vy += d.g;
    d.x += d.vx;
    d.y += d.vy;
    d.rot += d.vr;
    d.life -= 1;
    paintPetal(dctx, d, Math.max(d.life / 70, 0));
  });
  drops = drops.filter((d) => d.life > 0 && d.y < innerHeight + 60);
  requestAnimationFrame(drawPetals);
}
drawPetals();

const confettiCanvas = document.getElementById("confetti-canvas");
const cctx = confettiCanvas.getContext("2d");
let bits = [];
let confettiGen = 0;

function burstConfetti() {
  const gen = ++confettiGen;
  confettiCanvas.width = innerWidth;
  confettiCanvas.height = innerHeight;
  bits = Array.from({ length: 120 }, () => ({
    x: innerWidth / 2,
    y: innerHeight / 2,
    vx: (Math.random() - 0.5) * 14,
    vy: Math.random() * -12 - 2,
    g: 0.18 + Math.random() * 0.12,
    s: 3 + Math.random() * 5,
    c: ["#ff8ab5", "#fff", "#f3d5a5", "#c9a0ff", "#ffd6ea"][Math.floor(Math.random() * 5)],
    life: 90 + Math.random() * 40,
  }));
  tickConfetti();
}

function tickConfetti() {
  if (confettiGen === 0) return;
  cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  bits.forEach((b) => {
    b.vy += b.g;
    b.x += b.vx;
    b.y += b.vy;
    b.life -= 1;
    cctx.globalAlpha = Math.max(b.life / 80, 0);
    cctx.fillStyle = b.c;
    cctx.fillRect(b.x, b.y, b.s, b.s * 0.6);
  });
  bits = bits.filter((b) => b.life > 0);
  cctx.globalAlpha = 1;
  if (bits.length) requestAnimationFrame(tickConfetti);
  else cctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
}

document.addEventListener("keydown", (e) => {
  if (!document.getElementById("gate-screen").classList.contains("active")) return;
  if (/^\d$/.test(e.key)) onKey(e.key);
  if (e.key === "Backspace") onKey("⌫");
  if (e.key === "Enter") onKey("↵");
});
