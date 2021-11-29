import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {DocumentoResultadoSolicitud, DocumentoResultadoSolicitudRelations} from '../models';

export class DocumentoResultadoSolicitudRepository extends DefaultCrudRepository<
  DocumentoResultadoSolicitud,
  typeof DocumentoResultadoSolicitud.prototype.id,
  DocumentoResultadoSolicitudRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(DocumentoResultadoSolicitud, dataSource);
  }
}
