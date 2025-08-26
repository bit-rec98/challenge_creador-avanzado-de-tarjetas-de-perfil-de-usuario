/**
 * @interface UserCardData
 * @description Interfaz simplificada que define la estructura de datos para mostrar en tarjetas de usuario.
 * Contiene solo la información necesaria para mostrar en la vista de tarjetas según los requisitos.
 *
 * @property {string} id - Identificador único del usuario
 * @property {string} picture - URL de la imagen de perfil del usuario
 * @property {string} fullName - Nombre completo del usuario
 * @property {string} country - País de residencia
 * @property {string} city - Ciudad de residencia
 * @property {string} email - Correo electrónico del usuario
 * @property {string} phone - Número telefónico
 */
export interface UserData {
  id: string;
  picture: string;
  fullName: string;
  country: string;
  city: string;
  email: string;
  phone: string;
}
