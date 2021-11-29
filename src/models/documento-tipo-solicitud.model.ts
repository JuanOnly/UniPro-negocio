import {Entity, model, property} from '@loopback/repository';

@model()
export class DocumentoTipoSolicitud extends Entity {
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
  id_tipo_solicitud?: number;

  constructor(data?: Partial<DocumentoTipoSolicitud>) {
    super(data);
  }
}

export interface DocumentoTipoSolicitudRelations {
  // describe navigational properties here
}

export type DocumentoTipoSolicitudWithRelations = DocumentoTipoSolicitud &
  DocumentoTipoSolicitudRelations;
