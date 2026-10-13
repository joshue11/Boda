
/* ========================================
   BODA DE ANA Y JOSHUE
   Cuenta atrás hasta el 10/04/2027
   Hora prevista: 17:00, Madrid
   ======================================== */

// Fecha y hora de la boda en la zona horaria de Madrid.
// En abril, Madrid utiliza UTC+02:00.
const weddingDate = new Date(
  "2027-04-10T17:00:00+02:00"
).getTime();

// Elementos del contador
const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");

const headingElement = document.getElementById("countdown-heading");
const loveNoteElement = document.getElementById("love-note");

let countdownInterval;

function updateCountdown() {
  const now = Date.now();
  const difference = weddingDate - now;

  // Comprobar que existen los elementos necesarios
  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    clearInterval(countdownInterval);
    return;
  }

  // Cuando llegue el día de la boda
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

    clearInterval(countdownInterval);
    return;
  }

  // Calcular el tiempo restante
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

  // Mostrar los resultados
  daysElement.textContent = String(days);
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

// Actualizar el contador inmediatamente
updateCountdown();

// Actualizarlo cada segundo
countdownInterval = setInterval(updateCountdown, 1000);
