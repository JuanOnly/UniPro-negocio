import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {FotoProponenteTrabajo, FotoProponenteTrabajoRelations} from '../models';

export class FotoProponenteTrabajoRepository extends DefaultCrudRepository<
  FotoProponenteTrabajo,
  typeof FotoProponenteTrabajo.prototype.id,
  FotoProponenteTrabajoRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(FotoProponenteTrabajo, dataSource);
  }
}
