import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { UserData } from '../models';
import { LocalstorageService } from './localstorage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  // URL de la API
  private readonly apiUrl = 'https://randomuser.me/api/';

  // Clave para el almacenamiento de usuarios
  private readonly USERS_STORAGE_KEY = 'saved_users';

  /**
   * Constructor para el servicio de usuario
   * @param http El cliente HTTP para realizar solicitudes
   * @param localstorageService El servicio para manejar el almacenamiento local
   */
  constructor(
    private http: HttpClient,
    private localstorageService: LocalstorageService
  ) {}

  /**
   * Método para obtener usuarios aleatorios
   * - Realiza una llamada a la API de Random User
   * - Mapea la respuesta a un array de objetos UserData simplificados
   * @param count Cantidad de usuarios a obtener
   * @returns {Observable<UserData[]>}
   */
  getRandomUsers(count: number = 3): Observable<UserData[]> {
    return this.http.get<any>(`${this.apiUrl}?results=${count}`).pipe(
      map((response) => {
        return response.results.map((user: any) => ({
          id: user.login.uuid,
          picture: user.picture.large,
          fullName: `${user.name.first} ${user.name.last}`,
          country: user.location.country,
          city: user.location.city,
          email: user.email,
          phone: user.phone
        }));
      })
    );
  }

  /**
   * Método para obtener un solo usuario aleatorio
   * - Utiliza el mismo método getRandomUsers pero con count=1
   * - Extrae el primer usuario del array resultante
   * @returns {Observable<UserData>}
   */
  getRandomSingleUser(): Observable<UserData> {
    return this.getRandomUsers(1).pipe(
      map((users) => users[0])
    );
  }

  /**
   * Método para guardar usuarios en localStorage
   * - Guarda un array de usuarios en el almacenamiento local
   * - Utiliza el servicio de LocalstorageService para realizar la operación
   */
  saveUsersToLocalStorage(users: UserData[]): void {
    this.localstorageService.saveData(this.USERS_STORAGE_KEY, users);
  }

  /**
   * Método para cargar usuarios desde localStorage
   * - Carga un array de usuarios desde el almacenamiento local
   * - Utiliza el servicio de LocalstorageService para realizar la operación
   * @returns {UserData[] | null} Los usuarios guardados o null si no existen
   */
  loadUsersFromLocalStorage(): UserData[] | null {
    return this.localstorageService.getData<UserData[]>(this.USERS_STORAGE_KEY);
  }

  /**
   * Método para limpiar usuarios guardados en localStorage
   * - Elimina los usuarios guardados del almacenamiento local
   * - Utiliza el servicio de LocalstorageService para realizar la operación
   */
  clearSavedUsers(): void {
    this.localstorageService.removeData(this.USERS_STORAGE_KEY);
  }
}
