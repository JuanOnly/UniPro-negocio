import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class DepartamentoProponente extends Entity {
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
  id_departamento: number;

  @property({
    type: 'number',
    required: true,
  })
  id_proponente: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<DepartamentoProponente>) {
    super(data);
  }
}

export interface DepartamentoProponenteRelations {
  // describe navigational properties here
}

export type DepartamentoProponenteWithRelations = DepartamentoProponente &
  DepartamentoProponenteRelations;
