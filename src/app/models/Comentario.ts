export interface Comentario {
  idComentario?: number;
  idPublicacion: number;
  contenido: string;
  fecha?: string;
  autorEmail?: string;
}