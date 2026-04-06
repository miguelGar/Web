import { useCallback } from 'react';
import { toastService } from '../services/toastService';

/**
 * Hook para mostrar notificaciones tipo toast
 * Usa el servicio centralizado de toast
 * 
 * @example
 * const { notify, notifySuccess, notifyError, notifyWarning } = useToast();
 * notify('Producto agregado al carrito');
 * notifySuccess('Compra exitosa!');
 * notifyError('Error al procesar pago');
 */
export function useToast() {
  /**
   * Mostrar notificación genérica
   */
  const notify = useCallback((message: string, duration = 3000) => {
    toastService.notify(message, { duration });
  }, []);

  /**
   * Mostrar notificación de éxito (verde)
   */
  const notifySuccess = useCallback((message: string, duration = 3000) => {
    toastService.success(message, { duration });
  }, []);

  /**
   * Mostrar notificación de error (rojo)
   */
  const notifyError = useCallback((message: string, duration = 3000) => {
    toastService.error(message, { duration });
  }, []);

  /**
   * Mostrar notificación de advertencia (amarillo)
   */
  const notifyWarning = useCallback((message: string, duration = 3000) => {
    toastService.warning(message, { duration });
  }, []);

  return {
    notify,
    notifySuccess,
    notifyError,
    notifyWarning
  };
}
