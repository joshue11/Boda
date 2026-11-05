
/* =========================================
   ANA & JOSHUE — FUNCIONES DE LA WEB
   ========================================= */

/* FECHA DE LA BODA */
const weddingDate = new Date("2027-04-10T17:00:00+02:00");


/* =========================================
   CUENTA ATRÁS
   ========================================= */

function updateCountdown() {
  const now = new Date();
  const difference = weddingDate.getTime() - now.getTime();

  const daysElement = document.getElementById("days");
  const hoursElement = document.getElementById("hours");
  const minutesElement = document.getElementById("minutes");
  const secondsElement = document.getElementById("seconds");
  const headingElement = document.getElementById("countdown-heading");
  const noteElement = document.getElementById("love-note");

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return;
  }

  if (difference <= 0) {
    daysElement.textContent = "♡";
    hoursElement.textContent = "♡";
    minutesElement.textContent = "♡";
    secondsElement.textContent = "♡";

    if (headingElement) {
      headingElement.textContent = "¡HOY ES EL GRAN DÍA!";
    }

    if (noteElement) {
      noteElement.textContent = "¡Gracias por compartirlo con nosotros! ♡";
    }

    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference / (1000 * 60 * 60)) % 24
  );
  const minutes = Math.floor(
    (difference / (1000 * 60)) % 60
  );
  const seconds = Math.floor(
    (difference / 1000) % 60
  );

  daysElement.textContent = String(days);
  hoursElement.textContent = String(hours).padStart(2, "0");
  minutesElement.textContent = String(minutes).padStart(2, "0");
  secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);


/* =========================================
   COPIAR TEXTO
   ========================================= */

async function copyText(text) {
  if (!text) {
    throw new Error("No hay datos para copiar.");
  }

  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const temporaryInput = document.createElement("textarea");

  temporaryInput.value = text;
  temporaryInput.style.position = "fixed";
  temporaryInput.style.opacity = "0";
  temporaryInput.style.pointerEvents = "none";

  document.body.appendChild(temporaryInput);
  temporaryInput.focus();
  temporaryInput.select();

  const copied = document.execCommand("copy");
  temporaryInput.remove();

  if (!copied) {
    throw new Error("No se pudo copiar el texto.");
  }
}


/* =========================================
   BIZUM
   ========================================= */

const copyBizumButton = document.getElementById("copy-bizum");
const bizumNumberElement = document.getElementById("bizum-number");
const bizumFeedback = document.getElementById("bizum-feedback");

if (copyBizumButton && bizumNumberElement) {
  copyBizumButton.addEventListener("click", async () => {
    const number = bizumNumberElement.dataset.number;

    try {
      await copyText(number);

      if (bizumFeedback) {
        bizumFeedback.textContent = "¡Número de Bizum copiado! ♡";
      }
    } catch (error) {
      if (bizumFeedback) {
        bizumFeedback.textContent =
          "No se pudo copiar. Puedes seleccionar el número manualmente.";
      }
    }
  });
}


/* =========================================
   TRANSFERENCIA BANCARIA
   ========================================= */

const copyIbanButton = document.getElementById("copy-iban");
const ibanElement = document.getElementById("bank-iban");
const ibanFeedback = document.getElementById("iban-feedback");

if (copyIbanButton && ibanElement) {
  const iban = (ibanElement.dataset.iban || "").replace(/\s+/g, "");

  if (iban) {
    copyIbanButton.disabled = false;
  } else {
    copyIbanButton.disabled = true;
  }

  copyIbanButton.addEventListener("click", async () => {
    const currentIban = (ibanElement.dataset.iban || "").replace(/\s+/g, "");

    if (!currentIban) {
      if (ibanFeedback) {
        ibanFeedback.textContent = "Los datos bancarios estarán disponibles próximamente.";
      }
      return;
    }

    try {
      await copyText(currentIban);

      if (ibanFeedback) {
        ibanFeedback.textContent = "¡IBAN copiado correctamente! ♡";
      }
    } catch (error) {
      if (ibanFeedback) {
        ibanFeedback.textContent =
          "No se pudo copiar. Puedes seleccionar el IBAN manualmente.";
      }
    }
  });
}


/* =========================================
   HORARIO DINÁMICO
   ========================================= */

const scheduleItems = document.querySelectorAll(".schedule-item");
const scheduleStatus = document.getElementById("schedule-status");

function getMadridDateParts(date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(date);

  return Object.fromEntries(
    parts
      .filter(part => part.type !== "literal")
      .map(part => [part.type, Number(part.value)])
  );
}

function updateSchedule() {
  if (!scheduleItems.length || !scheduleStatus) {
    return;
  }

  const now = new Date();
  const madrid = getMadridDateParts(now);

  const weddingIsToday =
    madrid.year === 2027 &&
    madrid.month === 4 &&
    madrid.day === 10;

  const currentMinutes = madrid.hour * 60 + madrid.minute;

  scheduleItems.forEach(item => {
    item.classList.remove("is-current");
  });

  if (!weddingIsToday) {
    if (now.getTime() < weddingDate.getTime()) {
      scheduleStatus.textContent =
        "¡Ya queda menos! Nos hace mucha ilusión compartir este día con vosotros ♡";
    } else {
      scheduleStatus.textContent =
        "Gracias por acompañarnos y formar parte de este día tan especial ♡";
    }

    return;
  }

  let currentItem = null;

  scheduleItems.forEach(item => {
    const start = Number(item.dataset.start);
    const end = Number(item.dataset.end);

    if (currentMinutes >= start && currentMinutes < end) {
      currentItem = item;
      item.classList.add("is-current");
    }
  });

  if (currentItem) {
    const title = currentItem.querySelector("h3");

    scheduleStatus.textContent = title
      ? `¡Ahora estamos disfrutando de: ${title.textContent}! ♡`
      : "¡Estamos celebrando nuestro gran día! ♡";
  } else if (currentMinutes < 660) {
    scheduleStatus.textContent =
      "¡Enseguida comienza nuestro gran día! ♡";
  } else {
    scheduleStatus.textContent =
      "¡Gracias por compartir esta celebración con nosotros! ♡";
  }
}

updateSchedule();
setInterval(updateSchedule, 30000);
