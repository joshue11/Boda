/* ========================================
   BODA DE ANA Y JOSHUE
   10 de abril de 2027, a las 17:00
   Hora de Madrid
   ======================================== */

// Fecha de la boda.
// El 10 de abril de 2027, Madrid estará en UTC+02:00.
const weddingDate = new Date(
  "2027-04-10T17:00:00+02:00"
).getTime();

// Elementos del contador
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const headingElement =
  document.getElementById("countdown-heading");

const loveNoteElement =
  document.getElementById("love-note");

let countdownInterval = null;

function updateCountdown() {
  // Si faltan elementos, no iniciar el contador.
  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
    }
    return;
  }

  const now = Date.now();
  const difference = weddingDate - now;

  // La boda ya ha llegado.
  if (difference <= 0) {
    daysElement.textContent = "0";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    if (headingElement) {
      headingElement.textContent =
        "¡HA LLEGADO EL GRAN DÍA!";
    }

    if (loveNoteElement) {
      loveNoteElement.textContent =
        "¡Hoy celebramos nuestro amor! ♡";
    }

    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }

    return;
  }

  // Calcular el tiempo restante.
  const secondsTotal = Math.floor(difference / 1000);

  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  // Mostrar los resultados.
  daysElement.textContent = String(days);
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

// Actualizar inmediatamente.
updateCountdown();

// Actualizar cada segundo, salvo que la boda ya haya llegado.
if (Date.now() < weddingDate) {
  countdownInterval = setInterval(updateCountdown, 1000);
}
