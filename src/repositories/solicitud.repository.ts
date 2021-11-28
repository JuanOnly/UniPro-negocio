import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, ProponenteTrabajo, SolicitudProponente} from '../models';
import {SolicitudProponenteRepository} from './solicitud-proponente.repository';
import {ProponenteTrabajoRepository} from './proponente-trabajo.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id_solicitud,
  SolicitudRelations
> {

  public readonly proponenteTrabajos: HasManyThroughRepositoryFactory<ProponenteTrabajo, typeof ProponenteTrabajo.prototype.id,
          SolicitudProponente,
          typeof Solicitud.prototype.id_solicitud
        >;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('SolicitudProponenteRepository') protected solicitudProponenteRepositoryGetter: Getter<SolicitudProponenteRepository>, @repository.getter('ProponenteTrabajoRepository') protected proponenteTrabajoRepositoryGetter: Getter<ProponenteTrabajoRepository>,
  ) {
    super(Solicitud, dataSource);
    this.proponenteTrabajos = this.createHasManyThroughRepositoryFactoryFor('proponenteTrabajos', proponenteTrabajoRepositoryGetter, solicitudProponenteRepositoryGetter,);
    this.registerInclusionResolver('proponenteTrabajos', this.proponenteTrabajos.inclusionResolver);
  }
}
