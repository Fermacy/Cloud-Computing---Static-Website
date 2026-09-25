document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('year').textContent = new Date().getFullYear();

  // --- Feature 1: Live time counter ---
  const clockEl = document.getElementById('live-clock');
  function tickClock() {
    clockEl.textContent = new Date().toLocaleTimeString('en-US', { hour12: true });
  }
  tickClock();
  setInterval(tickClock, 1000);

  // --- Feature 2: Countdown timer (to Lana's next birthday, June 21) ---
  const cdDays = document.getElementById('cd-days');
  const cdHours = document.getElementById('cd-hours');
  const cdMins = document.getElementById('cd-mins');
  const cdSecs = document.getElementById('cd-secs');
  function nextBirthday() {
    const now = new Date();
    let target = new Date(now.getFullYear(), 5, 21, 0, 0, 0);
    if (target <= now) target = new Date(now.getFullYear() + 1, 5, 21, 0, 0, 0);
    return target;
  }
  function pad(n) { return String(n).padStart(2, '0'); }
  function tickCountdown() {
    const diff = nextBirthday() - new Date();
    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    cdDays.textContent = pad(d);
    cdHours.textContent = pad(h);
    cdMins.textContent = pad(m);
    cdSecs.textContent = pad(s);
  }
  tickCountdown();
  setInterval(tickCountdown, 1000);

  // --- Feature 3: Interactive button (random mood generator) ---
  const moods = [
    'Sun-bleached and a little melancholy.',
    'Cruising down the coast with the top down.',
    'Old Hollywood glamour, dialed up to ten.',
    'Diner coffee at 2am, thinking about everything.',
    'Slow dancing in a kitchen that isn\u2019t yours.',
    'Summertime sadness, but make it aesthetic.',
  ];
  const moodBtn = document.getElementById('mood-btn');
  const moodOutput = document.getElementById('mood-output');
  moodBtn.addEventListener('click', () => {
    const pick = moods[Math.floor(Math.random() * moods.length)];
    moodOutput.textContent = pick;
  });

  const albums = {
    'born-to-die': ['Born to Die', '2012', 'A cinematic debut of doomed glamour and orchestral strings.', ['Born to Die', 'Off to the Races', 'Blue Jeans', 'Video Games']],
    paradise: ['Paradise', '2012', 'A lush extension of her early world.', ['Ride', 'American', 'Cola', 'Body Electric']],
    ultraviolence: ['Ultraviolence', '2014', 'A smokier, guitar-driven turn.', ['Cruel World', 'Ultraviolence', 'West Coast', 'Shades of Cool']],
    honeymoon: ['Honeymoon', '2015', 'Slow and jazz-tinged, like a car ride at dusk.', ['Honeymoon', 'Music to Watch Boys To', 'Salvatore', 'High by the Beach']],
    chemtrails: ['Chemtrails Over the Country Club', '2021', 'Hushed and folk-leaning Americana.', ['White Dress', 'Chemtrails Over the Country Club', 'Dark But Just a Game']],
    tunnel: ["Did You Know That There's a Tunnel Under Ocean Blvd", '2023', 'Spacious and genre-blurring, with gospel detours.', ['The Grants', 'Sweet', 'A&W', 'Kintsugi']],
  };

  const backdrop = document.getElementById('modal-backdrop');
  const closeButton = document.getElementById('modal-close');
  const title = document.getElementById('modal-title');
  const year = document.getElementById('modal-year');
  const description = document.getElementById('modal-desc');
  const tracks = document.getElementById('modal-tracklist');
  let lastFocused;

  function openAlbum(id) {
    const [albumTitle, albumYear, albumDescription, albumTracks] = albums[id];
    title.textContent = albumTitle;
    year.textContent = albumYear;
    description.textContent = albumDescription;
    tracks.innerHTML = albumTracks.map((track) => `<li>${track}</li>`).join('');
    lastFocused = document.activeElement;
    backdrop.hidden = false;
    closeButton.focus();
  }

  function closeAlbum() {
    backdrop.hidden = true;
    lastFocused?.focus();
  }

  document.querySelectorAll('.album-card').forEach((card) => {
    card.addEventListener('click', () => openAlbum(card.dataset.album));
  });
  closeButton.addEventListener('click', closeAlbum);
  backdrop.addEventListener('click', (event) => {
    if (event.target === backdrop) closeAlbum();
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !backdrop.hidden) closeAlbum();
  });
});
