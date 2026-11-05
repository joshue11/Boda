
/* =========================================
   ANA & JOSHUE
   FUNCIONES DE LA WEB DE BODA
   ========================================= */


/* =========================================
   1. CUENTA ATRÁS
   ========================================= */

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


/* =========================================
   2. FUNCIÓN GENERAL PARA COPIAR TEXTO
   ========================================= */

async function copyText(text) {

  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (error) {
      // Intentar método alternativo.
    }
  }

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


/* =========================================
   3. COPIAR NÚMERO DE BIZUM
   ========================================= */

const copyBizumButton =
  document.getElementById("copy-bizum");

const bizumNumberElement =
  document.getElementById("bizum-number");

const bizumFeedback =
  document.getElementById("bizum-feedback");

if (
  copyBizumButton &&
  bizumNumberElement &&
  bizumFeedback
) {

  const rawNumber =
    bizumNumberElement.getAttribute("data-number") || "";

  const phoneNumber =
    rawNumber.replace(/[^\d+]/g, "");

  copyBizumButton.disabled = !phoneNumber;

  if (phoneNumber) {
    bizumNumberElement.textContent = rawNumber;
  }

  copyBizumButton.addEventListener("click", async () => {

    const currentNumber =
      (bizumNumberElement.getAttribute("data-number") || "")
        .replace(/[^\d+]/g, "");

    if (!currentNumber) {
      bizumFeedback.textContent =
        "El número de Bizum estará disponible próximamente.";
      return;
    }

    copyBizumButton.disabled = true;
    bizumFeedback.textContent = "Copiando número…";

    try {
      const copied = await copyText(currentNumber);

      if (copied) {
        bizumFeedback.textContent =
          "¡Número copiado correctamente! ♡";

        copyBizumButton.textContent =
          "¡Número copiado! ♡";
      } else {
        bizumFeedback.textContent =
          "No se pudo copiar. Número: " + currentNumber;
      }

    } catch (error) {

      bizumFeedback.textContent =
        "Error al copiar el número. Inténtalo manualmente.";

    } finally {

      copyBizumButton.disabled = false;

      window.setTimeout(() => {
        copyBizumButton.textContent =
          "Copiar número de Bizum";
      }, 2500);
    }
  });
}


/* =========================================
   4. COPIAR IBAN
   ========================================= */

const copyIbanButton =
  document.getElementById("copy-iban");

const ibanElement =
  document.getElementById("bank-iban");

const ibanFeedback =
  document.getElementById("iban-feedback");

if (
  copyIbanButton &&
  ibanElement &&
  ibanFeedback
) {

  const initialIban =
    (ibanElement.dataset.iban || "")
      .replace(/\s+/g, "")
      .trim();

  copyIbanButton.disabled = !initialIban;

  if (initialIban) {
    copyIbanButton.textContent = "Copiar IBAN";
    ibanElement.textContent = initialIban;
  }

  copyIbanButton.addEventListener("click", async () => {

    const currentIban =
      (ibanElement.dataset.iban || "")
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

        copyIbanButton.textContent =
          "¡IBAN copiado! ♡";
      } else {
        ibanFeedback.textContent =
          "No se pudo copiar automáticamente. " +
          "Puedes copiarlo manualmente: " + currentIban;
      }

    } catch (error) {

      ibanFeedback.textContent =
        "No se pudo copiar el IBAN. Inténtalo manualmente.";

    } finally {

      copyIbanButton.disabled = false;

      window.setTimeout(() => {
        copyIbanButton.textContent = "Copiar IBAN";
      }, 2500);
    }
  });
}


/* =========================================
   5. HORARIO DE LA BODA
   ZONA HORARIA: EUROPE/MADRID
   ========================================= */

(function initWeddingSchedule() {

  const schedule =
    document.getElementById("horario");

  const status =
    document.getElementById("schedule-status");

  if (!schedule || !status) return;

  const items = Array.from(
    schedule.querySelectorAll(".schedule-item")
  );

  const madridDateFormatter =
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Madrid",
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    });

  const madridTimeFormatter =
    new Intl.DateTimeFormat("en-GB", {
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

    items.forEach(item => {
      item.classList.remove("is-current");
    });

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

      return (
        currentMinutes >= start &&
        currentMinutes < end
      );
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

  window.setInterval(updateSchedule, 60 * 1000);

})();
