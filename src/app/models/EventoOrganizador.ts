import { Evento } from './Eventos';
import { OrganizadorEvento } from './Organizador';

export interface EventoOrganizador {
  id?: number;
  idEvento: number;
  idOrganizador: number;
}
