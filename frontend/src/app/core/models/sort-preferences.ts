import { SortOption } from "./sort-option";

/**
 * Interfaz para las preferencias de ordenación
 */
export interface SortPreferences {
  option: SortOption;
  lastUsedTimestamp: number;
}
