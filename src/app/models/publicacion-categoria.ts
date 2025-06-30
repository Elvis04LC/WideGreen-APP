import { CategoriaPublicacion } from "./CategoriaPublicacion";
import { Publicacion } from "./Publicacion";

export interface PublicacionCategoria {
  id: number;
  publicacion: Publicacion;
  categoria: CategoriaPublicacion;
}