import {Entity, model, property} from '@loopback/repository';

@model()
export class FotoProponenteTrabajo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  id_proponente_trabajo?: number;


  constructor(data?: Partial<FotoProponenteTrabajo>) {
    super(data);
  }
}

export interface FotoProponenteTrabajoRelations {
  // describe navigational properties here
}

export type FotoProponenteTrabajoWithRelations = FotoProponenteTrabajo & FotoProponenteTrabajoRelations;
