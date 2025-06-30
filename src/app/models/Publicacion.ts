export interface Publicacion {
  idPublicacion: number;
  titulo: string;
  contenido: string;
  imagenUrl?: string | null; 
  fecha: string; // formato ISO 8601
  usuarioEmail?: string; // para mostrar quién la publicó
}
