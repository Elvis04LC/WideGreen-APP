export interface Foro {
  id: number;
  titulo: string;
  descripcion: string;
  idUsuario: number; // ID del usuario que creó el foro
  fechaCreacion: string; // Fecha de creación en formato ISO string (yyyy-MM-dd)
  nombreUsuario: string; // ✅ Añadir este campo si no lo tienes aún
}