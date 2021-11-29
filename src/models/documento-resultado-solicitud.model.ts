import {Entity, model, property} from '@loopback/repository';

@model()
export class DocumentoResultadoSolicitud extends Entity {
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
  id_resultado_solicitud?: number;

  constructor(data?: Partial<DocumentoResultadoSolicitud>) {
    super(data);
  }
}

export interface DocumentoResultadoSolicitudRelations {
  // describe navigational properties here
}

export type DocumentoResultadoSolicitudWithRelations =
  DocumentoResultadoSolicitud & DocumentoResultadoSolicitudRelations;
