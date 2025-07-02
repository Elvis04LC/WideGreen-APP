import { Calendario } from "./Calendario";
import { Evento } from "./Eventos";

export interface ActividadCalendario {
    id: number;
    titulo: string;
    descripcion: string;
    fecha: string;
    hora: string
    calendario: Calendario;
    evento: Evento;
}