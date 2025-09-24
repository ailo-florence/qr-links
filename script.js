function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  const targetDate = new Date("2025-11-21T00:00:00");
  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownElement.textContent = "È arrivato il giorno!";
    countdownElement.style.color = "#009900";
    countdownElement.style.animation = "none";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days >= 1) {
    countdownElement.textContent = `Mancano ${days} giorno${days > 1 ? 'i' : ''}`;
    countdownElement.style.color = "#b30000";
  } else {
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    countdownElement.textContent = `Mancano ${hours}h ${minutes}m ${seconds}s`;
    countdownElement.style.color = "#ff0000";
  }
}

setInterval(updateCountdown, 1000);
updateCountdown();
