import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingFeedbackService {
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  public isLoading$: Observable<boolean> = this.isLoadingSubject.asObservable();

  // Configuración del tiempo mínimo de renderizado del spinner para evitar parpadeos y mejorar UX
  private readonly minDisplayTime = 3000;
  private loadingStartTime: number = 0;

  constructor() {}

  /**
   * Método para renderizar el spinner
   * - Inicia el temporizador de carga
   * - Muestra el spinner
   * @returns {void}
   */
  show(): void {
    this.loadingStartTime = Date.now();
    this.isLoadingSubject.next(true);
  }

  /**
   * Método para ocultar el spinner
   * - Detiene el temporizador de carga
   * - Oculta el spinner
   * - Respeta el tiempo mínimo de visualización
   * @returns {void}
   */
  hide(): void {
    const elapsedTime = Date.now() - this.loadingStartTime;
    const remainingTime = Math.max(0, this.minDisplayTime - elapsedTime);
    if (remainingTime > 0) {
      setTimeout(() => {
        this.isLoadingSubject.next(false);
      }, remainingTime);
    } else {
      this.isLoadingSubject.next(false);
    }
  }
}
