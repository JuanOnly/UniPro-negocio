import {Entity, model, property} from '@loopback/repository';

@model()
export class DocumentoSolicitud extends Entity {
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
  id_solicitud?: number;


  constructor(data?: Partial<DocumentoSolicitud>) {
    super(data);
  }
}

export interface DocumentoSolicitudRelations {
  // describe navigational properties here
}

export type DocumentoSolicitudWithRelations = DocumentoSolicitud & DocumentoSolicitudRelations;
