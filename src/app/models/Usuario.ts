export interface UsuarioRegistro {
  username: string;
  email: string;
  password: string;
}

export interface UsuarioLogin {
  email: string;
  password: string;
}
export interface Usuario {
  idUsuario: number;  // Representa el ID único del usuario
  username: string;   // Nombre de usuario (único)
  password: string;   // Contraseña del usuario
  email: string;      // Correo electrónico del usuario
  fechaRegistro: string;  // Fecha de registro del usuario en formato ISO 8601
  role: string;       // Rol del usuario, por ejemplo: ADMIN o USER
}