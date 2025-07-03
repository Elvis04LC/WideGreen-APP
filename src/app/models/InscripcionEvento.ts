export interface InscripcionEventoDTO {
  idUsuario?: number;          // opcional, ya que lo resuelve el backend por JWT
  idEvento: number;
  fechaInscripcion?: string;     // opcional, ya que puede ser generado en backend
}