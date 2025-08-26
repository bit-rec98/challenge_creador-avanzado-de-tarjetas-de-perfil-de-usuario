import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { UserData } from '../../core/models';
import { UserCardComponent, UserDetailModalComponent, SpinnerComponent } from '../shared';
import { LoadingFeedbackService, SortingService, SortOption, UserService } from '../../core/services';

@Component({
  selector: 'app-users-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    UserCardComponent,
    UserDetailModalComponent,
    SpinnerComponent,
  ],
  templateUrl: './users-dashboard.component.html',
  styleUrl: './users-dashboard.component.css',
})
export class UsersDashboardComponent implements OnInit, OnDestroy {
  // Lista de usuarios
  users: UserData[] = [];

  // Usuarios filtrados
  filteredUsers: UserData[] = [];

  // Usuario seleccionado
  selectedUser: UserData | null = null;

  // Término de búsqueda
  searchTerm: string = '';

  // Opción de ordenación
  sortOption: SortOption = 'none';

  // Estados de carga
  isLoading: boolean = false;
  isGeneratingSingle: boolean = false;

  // Mensaje de error
  error: string | null = null;

  // Configuración de paginación
  page: number = 1;
  usersPerPage: number = 3;

  // Suscripciones
  private sortSubscription?: Subscription;
  private loadingSubscription?: Subscription;

  /**
   * Constructor de UsersDashboardComponent
   */
  constructor(
    private userService: UserService,
    private sortingService: SortingService,
    private loadingFeedbackService: LoadingFeedbackService,
    private toastr: ToastrService
  ) {}

  /**
   * Método para inicializar el componente
   */
  ngOnInit(): void {
    // Suscribirse a los cambios en la opción de ordenación
    this.sortSubscription = this.sortingService.currentSortOption$.subscribe(
      (option) => {
        this.sortOption = option;
        this.applyFiltersAndSort();
      }
    );

    // Suscribirse al estado de carga
    this.loadingSubscription = this.loadingFeedbackService.isLoading$.subscribe(
      (isLoading) => {
        this.isLoading = isLoading;
      }
    );

    // Cargar los usuarios guardados o solicitar nuevos
    const savedUsers = this.userService.loadUsersFromLocalStorage();

    if (savedUsers && savedUsers.length > 0) {
      this.users = savedUsers;
      this.applyFiltersAndSort();
    } else {
      this.loadMoreUsers();
    }
  }

  /**
   * Método para limpiar las suscripciones al destruir el componente
   */
  ngOnDestroy(): void {
    if (this.sortSubscription) {
      this.sortSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  /**
   * Método para cargar más usuarios
   */
  loadMoreUsers(): void {
    this.error = null;
    this.loadingFeedbackService.show();

    this.userService.getRandomUsers(this.usersPerPage).subscribe({
      next: (newUsers) => {
        this.users = [...this.users, ...newUsers];
        this.applyFiltersAndSort();
        this.userService.saveUsersToLocalStorage(this.users);
        this.page++;
        this.loadingFeedbackService.hide();
      },
      error: (err) => {
        this.error = 'Error al cargar usuarios. Por favor, inténtalo de nuevo.';
        this.toastr.error('Error al cargar usuarios. Por favor, inténtalo de nuevo.');
        console.error('[UsersDashboard][loadMoreUsers] Error loading users:', err);
        this.loadingFeedbackService.hide();
      },
    });
  }

  /**
   * Método para generar un nuevo perfil de usuario
   */
  generateNewProfile(): void {
    if (this.isLoading) return; // Prevenir múltiples clics

    this.error = null;
    this.isGeneratingSingle = true;
    this.loadingFeedbackService.show();

    this.userService.getRandomSingleUser().subscribe({
      next: (newUser) => {
        this.users = [...this.users, newUser];
        this.applyFiltersAndSort();
        this.userService.saveUsersToLocalStorage(this.users);
        this.toastr.success('Nuevo perfil generado con éxito.', 'Éxito');
        this.loadingFeedbackService.hide();
        this.isGeneratingSingle = false;
      },
      error: (err) => {
        this.error = 'Error al generar nuevo perfil. Por favor, inténtalo de nuevo.';
        this.toastr.error(
          'Error al generar nuevo perfil. Por favor, inténtalo de nuevo.',
          'Error'
        );
        console.error('[UsersDashboard][generateNewProfile] Error generating new profile:', err);
        this.loadingFeedbackService.hide();
        this.isGeneratingSingle = false;
      },
    });
  }

  /**
   * Método para manejar la búsqueda de usuarios
   */
  onSearch(): void {
    this.applyFiltersAndSort();
  }

  /**
   * Método para manejar el cambio de opción de ordenación
   */
  onSortChange(): void {
    this.sortingService.setSortOption(this.sortOption);
  }

  /**
   * Método para aplicar filtros y ordenación a la lista de usuarios
   */
  applyFiltersAndSort(): void {
    // Aplicar filtro de búsqueda
    if (this.searchTerm.trim()) {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredUsers = this.users.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchTermLower) ||
          user.country.toLowerCase().includes(searchTermLower)
      );
    } else {
      this.filteredUsers = [...this.users];
    }

    // Aplicar ordenación usando el servicio
    this.filteredUsers = this.sortingService.sortUsers(this.filteredUsers);
  }

  /**
   * Método para abrir los detalles de un usuario
   */
  openUserDetails(user: UserData): void {
    this.selectedUser = user;
  }

  /**
   * Método para cerrar los detalles de un usuario
   */
  closeUserDetails(): void {
    this.selectedUser = null;
  }

  /**
   * Determina el mensaje de carga basado en la acción actual
   */
  get loadingMessage(): string {
    return this.isGeneratingSingle ? "Generando nuevo perfil..." : "Cargando perfiles...";
  }
}
