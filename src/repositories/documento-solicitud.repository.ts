import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {DocumentoSolicitud, DocumentoSolicitudRelations} from '../models';

export class DocumentoSolicitudRepository extends DefaultCrudRepository<
  DocumentoSolicitud,
  typeof DocumentoSolicitud.prototype.id,
  DocumentoSolicitudRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(DocumentoSolicitud, dataSource);
  }
}
