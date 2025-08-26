import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalstorageService {
  /**
   * Constructor para el servicio de almacenamiento local
   */
  constructor() {}

  /**
   * Método para guardar datos en localStorage
   * - Guarda los datos en localStorage bajo la clave especificada
   * - Los datos se convertirán a JSON antes de ser almacenados
   * - Si ocurre un error, se registrará en la consola
   * @param key - La clave a utilizar para el almacenamiento
   * @param data - Los datos a almacenar (se convertirán a JSON)
   * @returns {void}
   */
  saveData<T>(key: string, data: T): void {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data to localStorage:', error);
    }
  }

  /**
   * Método para obtener datos de localStorage
   * - Recupera los datos almacenados bajo la clave especificada
   * - Los datos se analizarán desde JSON después de ser recuperados
   * - Si ocurre un error, se registrará en la consola
   * @param key - La clave para recuperar datos
   * @returns {T | null} Los datos analizados o null si no se encuentra
   */
  getData<T>(key: string): T | null {
    try {
      const data = localStorage.getItem(key);
      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      console.error('Error retrieving data from localStorage:', error);
      return null;
    }
  }

  /**
   * Método para eliminar datos de localStorage
   * - Elimina los datos almacenados bajo la clave especificada
   * - Si ocurre un error, se registrará en la consola
   * @param key - La clave para eliminar datos
   * @returns {void}
   */
  removeData(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Error removing data from localStorage:', error);
    }
  }

  /**
   * Método para limpiar todos los datos de localStorage
   * - Elimina todos los datos almacenados en localStorage
   * - Si ocurre un error, se registrará en la consola
   * @returns {void}
   */
  clearAll(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  }
}
