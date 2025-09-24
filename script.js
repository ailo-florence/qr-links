// script.js
document.addEventListener('DOMContentLoaded', () => {
  const el = {
    days:    document.getElementById('cd-days'),
    hours:   document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds'),
    message: document.getElementById('cd-message'),
    root:    document.getElementById('countdown')
  };

  const now = new Date();
  const year = now.getFullYear();

  // ⚠️ Mesi in JS sono 0-based: 10 = Novembre.
  // Mezzanotte che apre il 21 novembre (00:00 del 21/11)
  let target = new Date(year, 10, 21, 0, 0, 0, 0);

  // Se volessi "fino a fine 21" (cioè 23:59:59 del 21/11), usa la mezzanotte del 22:
  // let target = new Date(year, 10, 22, 0, 0, 0, 0);

  function two(n) {
    return String(n).padStart(2, '0');
  }

  function renderFinished() {
    el.days.textContent    = '00';
    el.hours.textContent   = '00';
    el.minutes.textContent = '00';
    el.seconds.textContent = '00';
    if (el.root) el.root.classList.add('finished');
    if (el.message) el.message.textContent = 'È arrivato il 21 novembre! 🎉';
  }

  function update() {
    const n = new Date();
    const diff = target - n;

    if (diff <= 0) {
      clearInterval(timer);
      renderFinished();
      return;
    }

    const MS = 1000, MIN = 60 * MS, H = 60 * MIN, D = 24 * H;
    let remain = diff;

    const d = Math.floor(remain / D);   remain -= d * D;
    const h = Math.floor(remain / H);   remain -= h * H;
    const m = Math.floor(remain / MIN); remain -= m * MIN;
    const s = Math.floor(remain / MS);

    el.days.textContent    = two(d);
    el.hours.textContent   = two(h);
    el.minutes.textContent = two(m);
    el.seconds.textContent = two(s);

    if (el.message) {
      const parts = [];
      if (d > 0) parts.push(`${d}g`);
      if (h > 0 || d > 0) parts.push(`${h}h`);
      parts.push(`${m}m`, `${s}s`);
      el.message.textContent = `Manca${d === 1 ? '' : 'no'}: ${parts.join(' ')}`;
    }
  }

  // Se la data è già passata oggi ma vuoi contare all'anno prossimo, scommenta:
  // if (now > target) target = new Date(year + 1, 10, 21, 0, 0, 0, 0);

  update(); // primo render immediato
  const timer = setInterval(update, 1000);
});
