/**
 * @interface UserData
 * @description Interfaz simplificada que define la estructura de datos para mostrar en tarjetas de usuario y detalles adicionales en modal.
 * Contiene la información necesaria para mostrar en la vista de tarjetas según los requisitos y campos adicionales para el modal de detalle.
 *
 * @property {string} id - Identificador único del usuario
 * @property {string} picture - URL de la imagen de perfil del usuario
 * @property {string} fullName - Nombre completo del usuario
 * @property {string} country - País de residencia
 * @property {string} city - Ciudad de residencia
 * @property {string} email - Correo electrónico del usuario
 * @property {string} phone - Número telefónico
 *
 * // Campos adicionales para el modal
 * @property {string} street - Dirección completa (calle y número)
 * @property {string} postcode - Código postal
 * @property {string} dateOfBirth - Fecha de nacimiento
 * @property {number} age - Edad del usuario
 * @property {string} registeredDate - Fecha de registro
 * @property {string} timezone - Zona horaria
 * @property {string} timezoneOffset - Desplazamiento de zona horaria
 * @property {string} nationality - Nacionalidad
 */
export interface UserData {
  id: string;
  picture: string;
  fullName: string;
  country: string;
  city: string;
  email: string;
  phone: string;

  // Campos adicionales para el modal
  street: string;
  postcode: string;
  dateOfBirth: string;
  age: number;
  registeredDate: string;
  timezone: string;
  timezoneOffset: string;
  nationality: string;
}
