import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LocalstorageService } from './localstorage.service';
import { UserData } from '../models';

/**
 * Opciones de ordenación disponibles
 */
export type SortOption = 'none' | 'nameAsc' | 'nameDesc' | 'country';

/**
 * Interfaz para las preferencias de ordenación
 */
export interface SortPreferences {
  option: SortOption;
  lastUsedTimestamp: number;
}

@Injectable({
  providedIn: 'root'
})
export class SortingService {
  // Clave para almacenar las preferencias de ordenación
  private readonly SORT_PREFERENCES_KEY = 'sort_preferences';

  // Subject para emitir cambios en la opción de ordenación actual
  private currentSortOptionSubject = new BehaviorSubject<SortOption>('none');

  // Observable público para que los componentes se suscriban a los cambios
  public currentSortOption$: Observable<SortOption> = this.currentSortOptionSubject.asObservable();

  constructor(private localstorageService: LocalstorageService) {
    // Cargar las preferencias guardadas al inicializar el servicio
    this.loadSavedPreferences();
  }

  /**
   * Obtiene la opción de ordenación actual
   * @returns {SortOption} La opción de ordenación actual
   */
  getCurrentSortOption(): SortOption {
    return this.currentSortOptionSubject.getValue();
  }

  /**
   * Establece una nueva opción de ordenación y guarda la preferencia
   * @param option - La nueva opción de ordenación
   */
  setSortOption(option: SortOption): void {
    this.currentSortOptionSubject.next(option);
    this.savePreferences(option);
  }

  /**
   * Ordena un array de UserData según la opción de ordenación especificada
   * @param users - El array de usuarios a ordenar
   * @param sortOption - La opción de ordenación (opcional, usa la actual por defecto)
   * @returns {UserData[]} El array ordenado
   */
  sortUsers(users: UserData[], sortOption?: SortOption): UserData[] {
    const option = sortOption || this.getCurrentSortOption();

    if (users.length === 0) {
      return [];
    }

    const sortedUsers = [...users];

    switch (option) {
      case 'nameAsc':
        return sortedUsers.sort((a, b) => a.fullName.localeCompare(b.fullName));
      case 'nameDesc':
        return sortedUsers.sort((a, b) => b.fullName.localeCompare(a.fullName));
      case 'country':
        return sortedUsers.sort((a, b) => a.country.localeCompare(b.country));
      case 'none':
      default:
        return sortedUsers;
    }
  }

  /**
   * Guarda las preferencias de ordenación en localStorage
   * @param option - La opción de ordenación a guardar
   */
  private savePreferences(option: SortOption): void {
    const preferences: SortPreferences = {
      option,
      lastUsedTimestamp: Date.now()
    };

    this.localstorageService.saveData(this.SORT_PREFERENCES_KEY, preferences);
  }

  /**
   * Carga las preferencias de ordenación desde localStorage
   */
  private loadSavedPreferences(): void {
    const savedPreferences = this.localstorageService.getData<SortPreferences>(this.SORT_PREFERENCES_KEY);

    if (savedPreferences) {
      this.currentSortOptionSubject.next(savedPreferences.option);
    }
  }

  /**
   * Reinicia la opción de ordenación al valor por defecto
   */
  resetSortOption(): void {
    this.setSortOption('none');
  }
}
