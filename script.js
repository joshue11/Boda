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
    // Quitamos espacios y otros caracteres de formato.
    // Se conserva el prefijo internacional +34.
    const phoneNumber = bizumNumberElement.textContent
      .trim()
      .replace(/[^\d+]/g, "");

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
          "Puedes seleccionar el número y copiarlo manualmente.";
      }
    } catch (error) {
      bizumFeedback.textContent =
        "No se ha podido copiar el número. Inténtalo manualmente.";
    } finally {
      copyBizumButton.disabled = false;

      // Restauramos el texto del botón.
      // El mensaje de confirmación permanece visible.
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
