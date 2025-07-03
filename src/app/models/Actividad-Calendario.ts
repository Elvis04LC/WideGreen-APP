import { Calendario } from "./Calendario";
import { Evento } from "./Eventos";

export interface ActividadCalendario {
    id: number;
    idCalendario: Calendario;
    idEvento: Evento;
    fechaEvento: string;
    titulo: string;
    fecha: string;
    hora: string;
    descripcion: string;
}