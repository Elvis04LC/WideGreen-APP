export interface Noticia {
  id: number;
  titulo: string;
  contenido: string;
  fecha: string; // Formato ISO 8601 (yyyy-MM-dd)
  imagenUrl?: string;
  link?: string;
}