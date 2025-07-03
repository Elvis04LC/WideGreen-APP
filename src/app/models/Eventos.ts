export interface Evento {
  id: number;
  nombre: string;
  descripcion: string;
  fecha: string;        // ISO format (yyyy-MM-dd)
  hora: string;         // HH:mm:ss
  ubicacion: string;
  idTipoEvento: number;
}