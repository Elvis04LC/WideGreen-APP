export interface PerfilUsuario {
  id: number;      // ID único del perfil del usuario
  idUsuario: number;     // ID del usuario asociado
  nombre: string;        // Nombre del usuario
  apellido: string;      // Apellido del usuario
  foto: string;          // URL de la foto de perfil
  bio: string;           // Biografía o descripción del usuario
}