import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {DocumentoTipoSolicitud, DocumentoTipoSolicitudRelations} from '../models';

export class DocumentoTipoSolicitudRepository extends DefaultCrudRepository<
  DocumentoTipoSolicitud,
  typeof DocumentoTipoSolicitud.prototype.id,
  DocumentoTipoSolicitudRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(DocumentoTipoSolicitud, dataSource);
  }
}
