export interface Notificacion {
  id: number;
  idUsuario: number;
  contenido: string;
  fecha: string;
  visto: boolean;
  idPublicacion?: number;
  tituloPublicacion?: string;
}
