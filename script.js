
/*
  BODA DE ANA Y JOSHUE
  Fecha: 10 de abril de 2027
  Hora: 17:00, Madrid
*/

const weddingDate = new Date("2027-04-10T17:00:00+02:00").getTime();

function updateCountdown() {
  const now = Date.now();
  const difference = weddingDate - now;

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");

  if (difference <= 0) {
    daysElement.textContent = "0";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    document.querySelector(".countdown-heading").textContent =
      "¡HA LLEGADO EL GRAN DÍA!";

    document.querySelector(".love-note").textContent =
      "¡Hoy celebramos nuestro amor! ♡";

    clearInterval(countdownInterval);
    return;
  }

  const days = Math.floor(
    difference / (1000 * 60 * 60 * 24)
  );

  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );

  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );

  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysElement.textContent = days;
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

// Actualizar inmediatamente y después cada segundo.
updateCountdown();

const countdownInterval = setInterval(updateCountdown, 1000);
