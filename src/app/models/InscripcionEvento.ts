import { Evento } from "./Eventos";
import { Usuario } from "./Usuario";

export interface InscripcionEvento {
    idInscripcion: number;
    fechaInscripcion: string | undefined;
    usuario: Usuario;
    evento: Evento
}