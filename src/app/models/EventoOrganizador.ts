import { Evento } from "./Eventos";
import { Organizador } from "./Organizador";

export interface EventoOrganizador {
    id: number;
    evento: Evento;
    organizador: Organizador;
}