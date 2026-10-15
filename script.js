/* ========================================
   BODA DE ANA Y JOSHUE
   10 de abril de 2027, a las 17:00
   Hora de Madrid
   ======================================== */

// ========================================
// CUENTA ATRÁS
// ========================================

const weddingDate = new Date(
  "2027-04-10T17:00:00+02:00"
).getTime();

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
  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    if (countdownInterval !== null) {
      clearInterval(countdownInterval);
      countdownInterval = null;
    }

    return;
  }

  const difference = weddingDate - Date.now();

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

  const secondsTotal = Math.floor(difference / 1000);

  const days = Math.floor(secondsTotal / 86400);
  const hours = Math.floor((secondsTotal % 86400) / 3600);
  const minutes = Math.floor((secondsTotal % 3600) / 60);
  const seconds = secondsTotal % 60;

  daysElement.textContent = String(days);
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

if (Date.now() < weddingDate) {
  countdownInterval = setInterval(updateCountdown, 1000);
}

// ========================================
// COPIAR TEXTO
// ========================================

async function copyText(text) {
  // Método preferido: API del portapapeles.
  // Normalmente requiere HTTPS o localhost.
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Si falla, intentamos el método alternativo.
    }
  }

  // Alternativa para navegadores compatibles.
  const temporaryInput = document.createElement("textarea");

  temporaryInput.value = text;
  temporaryInput.setAttribute("readonly", "");
  temporaryInput.style.position = "fixed";
  temporaryInput.style.left = "-9999px";
  temporaryInput.style.top = "0";

  document.body.appendChild(temporaryInput);
  temporaryInput.select();
  temporaryInput.setSelectionRange(0, text.length);

  let copied = false;

  try {
    copied = document.execCommand("copy");
  } catch (error) {
    copied = false;
  }

  temporaryInput.remove();

  return copied;
}

// ========================================
// COPIAR NÚMERO DE BIZUM
// ========================================

const copyBizumButton = document.getElementById("copy-bizum");
const bizumNumberElement = document.getElementById("bizum-number");
const bizumFeedback = document.getElementById("bizum-feedback");

if (copyBizumButton && bizumNumberElement && bizumFeedback) {
  copyBizumButton.addEventListener("click", async () => {
    // Leemos el número del atributo data-number,
    // no el nombre que aparece en pantalla.
    const phoneNumber = (
      bizumNumberElement.dataset.number || ""
    ).replace(/[^\d+]/g, "");

    if (!phoneNumber) {
      bizumFeedback.textContent =
        "No se ha encontrado el número de Bizum.";
      return;
    }

    copyBizumButton.disabled = true;
    bizumFeedback.textContent = "Copiando número…";

    try {
      const copied = await copyText(phoneNumber);

      if (copied) {
        bizumFeedback.textContent =
          "¡Número copiado! ♡ Ya puedes pegarlo en tu banco.";

        copyBizumButton.textContent = "¡Número copiado! ♡";
      } else {
        bizumFeedback.textContent =
          "No se ha podido copiar automáticamente. " +
          "Puedes copiar el número manualmente.";
      }
    } catch (error) {
      bizumFeedback.textContent =
        "No se ha podido copiar el número. Inténtalo manualmente.";
    } finally {
      copyBizumButton.disabled = false;

      window.setTimeout(() => {
        copyBizumButton.textContent = "Copiar número de Bizum";
      }, 2500);
    }
  });
}
// ========================================
// COPIAR IBAN
// ========================================

const copyIbanButton = document.getElementById("copy-iban");
const ibanElement = document.getElementById("bank-iban");
const ibanFeedback = document.getElementById("iban-feedback");

if (copyIbanButton && ibanElement && ibanFeedback) {
  // El botón solo se activa cuando se ha añadido un IBAN.
  const iban = (ibanElement.dataset.iban || "")
    .replace(/\s+/g, "")
    .trim();

  copyIbanButton.disabled = !iban;

  if (iban) {
    copyIbanButton.textContent = "Copiar IBAN";
    ibanFeedback.textContent = "";
  }

  copyIbanButton.addEventListener("click", async () => {
    const currentIban = (ibanElement.dataset.iban || "")
      .replace(/\s+/g, "")
      .trim();

    if (!currentIban) {
      ibanFeedback.textContent =
        "Los datos bancarios estarán disponibles próximamente.";

      return;
    }

    copyIbanButton.disabled = true;
    ibanFeedback.textContent = "Copiando IBAN…";

    try {
      const copied = await copyText(currentIban);

      if (copied) {
        ibanFeedback.textContent =
          "¡IBAN copiado! ♡ Ya puedes pegarlo en tu banco.";

        copyIbanButton.textContent = "¡IBAN copiado! ♡";
      } else {
        ibanFeedback.textContent =
          "No se ha podido copiar automáticamente. " +
          "Puedes seleccionar el IBAN y copiarlo manualmente.";
      }
    } catch (error) {
      ibanFeedback.textContent =
        "No se ha podido copiar el IBAN. Inténtalo manualmente.";
    } finally {
      copyIbanButton.disabled = false;

      window.setTimeout(() => {
        copyIbanButton.textContent = "Copiar IBAN";
      }, 2500);
    }
  });
}
/* ========================================
   HORARIO DE LA BODA
   Fecha: 10 de abril de 2027
   Zona horaria: Madrid
   ======================================== */

(function initWeddingSchedule() {
  const schedule = document.getElementById("horario");
  const status = document.getElementById("schedule-status");

  if (!schedule || !status) return;

  const items = Array.from(
    schedule.querySelectorAll(".schedule-item")
  );

  const madridDateFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  });

  const madridTimeFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  });

  function updateSchedule() {
    const now = new Date();

    const dateParts = Object.fromEntries(
      madridDateFormatter
        .formatToParts(now)
        .filter(part => part.type !== "literal")
        .map(part => [part.type, part.value])
    );

    const isWeddingDay =
      dateParts.year === "2027" &&
      dateParts.month === "04" &&
      dateParts.day === "10";

    // Fuera del día de la boda, no hay actividades en curso.
    items.forEach(item => item.classList.remove("is-current"));

    if (!isWeddingDay) {
      status.textContent =
        "Nos hace mucha ilusión compartir este día con vosotros ♡";
      return;
    }

    const timeParts = Object.fromEntries(
      madridTimeFormatter
        .formatToParts(now)
        .filter(part => part.type !== "literal")
        .map(part => [part.type, part.value])
    );

    const currentMinutes =
      Number(timeParts.hour) * 60 +
      Number(timeParts.minute);

    const currentItem = items.find(item => {
      const start = Number(item.dataset.start);
      const end = Number(item.dataset.end);

      return currentMinutes >= start && currentMinutes < end;
    });

    if (currentItem) {
      currentItem.classList.add("is-current");

      const title = currentItem.querySelector("h3");

      status.textContent =
        "♡ En este momento: " + title.textContent;
    } else if (currentMinutes < 660) {
      status.textContent =
        "¡Hoy es el gran día! Nos vemos muy pronto ♡";
    } else if (currentMinutes >= 1200) {
      status.textContent =
        "¡Gracias por compartir este día con nosotros! ♡";
    } else {
      status.textContent =
        "Estamos entre actividades. ¡Seguimos disfrutando juntos! ♡";
    }
  }

  updateSchedule();

  // Actualiza el estado cada minuto.
  window.setInterval(updateSchedule, 60 * 1000);
})();
