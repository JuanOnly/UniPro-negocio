import {Entity, hasMany, model, property} from '@loopback/repository';
import {ProponenteTrabajo} from './proponente-trabajo.model';
import {SolicitudProponente} from './solicitud-proponente.model';

@model({settings: {strict: false}})
export class Solicitud extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id_solicitud?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_solicitud_proponente: number;

  @property({
    type: 'date',
    required: true,
  })
  fecha_radicacion: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_trabajo: string;

  @hasMany(() => ProponenteTrabajo, {
    through: {
      model: () => SolicitudProponente,
      keyFrom: 'id_solicitud',
      keyTo: 'id_proponente',
    },
  })
  proponenteTrabajos: ProponenteTrabajo[];
  @property({
    type: 'number',
    required: true,
  })
  id_modalidad: number;

  @property({
    type: 'number',
    required: true,
  })
  id_area_investigacion: number;

  @property({
    type: 'string',
  })
  archivo_comprimido?: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'number',
    required: true,
  })
  id_tipo_solicitud: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
