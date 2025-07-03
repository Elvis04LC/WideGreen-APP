import { Calendario } from "./Calendario";
import { Evento } from "./Eventos";

export interface ActividadCalendario {
    id?: number;
  idCalendario: number;         // Solo el ID
  idEvento: number | null;
    fechaEvento: string;
    titulo: string;
    fecha: string;
    hora: string;
    descripcion: string;
}