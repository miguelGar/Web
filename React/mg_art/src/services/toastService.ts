/**
 * Servicio centralizado de notificaciones Toast
 * Patrón CLOSURE del código original JS adaptado a React
 */

const TOAST_ELEMENT_ID = 'toast';
const TOAST_VISIBLE_CLASS = 'toast--visible';
const DEFAULT_DURATION = 3000;

interface ToastOptions {
  duration?: number;
}

/**
 * Inicializar el elemento DOM del toast si es necesario
 */
function getToastElement(): HTMLElement {
  let toastEl = document.getElementById(TOAST_ELEMENT_ID);

  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.id = TOAST_ELEMENT_ID;
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }

  return toastEl;
}

/**
 * Mostrar notificación genérica
 */
function notify(message: string, options: ToastOptions = {}): void {
  const { duration = DEFAULT_DURATION } = options;
  const toastEl = getToastElement();

  toastEl.textContent = message;
  toastEl.classList.add(TOAST_VISIBLE_CLASS);
  toastEl.dataset.type = 'info';

  setTimeout(() => {
    toastEl.classList.remove(TOAST_VISIBLE_CLASS);
  }, duration);
}

/**
 * Mostrar notificación de éxito
 */
function success(message: string, options: ToastOptions = {}): void {
  const toastEl = getToastElement();
  toastEl.dataset.type = 'success';
  notify(message, options);
}

/**
 * Mostrar notificación de error
 */
function error(message: string, options: ToastOptions = {}): void {
  const toastEl = getToastElement();
  toastEl.dataset.type = 'error';
  notify(message, options);
}

/**
 * Mostrar notificación de advertencia
 */
function warning(message: string, options: ToastOptions = {}): void {
  const toastEl = getToastElement();
  toastEl.dataset.type = 'warning';
  notify(message, options);
}

export const toastService = {
  notify,
  success,
  error,
  warning
};
