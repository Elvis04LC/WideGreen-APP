export interface Calendario {
  id: number;               // ID único del calendario
  descripcion?: string;     // Descripción del calendario (opcional)
  fechaCreacion: string;    // Fecha de creación del calendario (formato ISO 8601)
  usuarioId: number;       // ID del usuario al que pertenece el calendario
}