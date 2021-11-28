import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class SolicitudProponente extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  id_solicitud: number;

  @property({
    type: 'number',
    required: true,
  })
  id_proponente: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<SolicitudProponente>) {
    super(data);
  }
}

export interface SolicitudProponenteRelations {
  // describe navigational properties here
}

export type SolicitudProponenteWithRelations = SolicitudProponente & SolicitudProponenteRelations;
