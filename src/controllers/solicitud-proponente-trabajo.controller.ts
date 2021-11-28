import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Solicitud,
SolicitudProponente,
ProponenteTrabajo,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudProponenteTrabajoController {
  constructor(
    @repository(SolicitudRepository) protected solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/proponente-trabajos', {
    responses: {
      '200': {
        description: 'Array of Solicitud has many ProponenteTrabajo through SolicitudProponente',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(ProponenteTrabajo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.number('id') id: number,
    @param.query.object('filter') filter?: Filter<ProponenteTrabajo>,
  ): Promise<ProponenteTrabajo[]> {
    return this.solicitudRepository.proponenteTrabajos(id).find(filter);
  }

  @post('/solicituds/{id}/proponente-trabajos', {
    responses: {
      '200': {
        description: 'create a ProponenteTrabajo model instance',
        content: {'application/json': {schema: getModelSchemaRef(ProponenteTrabajo)}},
      },
    },
  })
  async create(
    @param.path.number('id') id: typeof Solicitud.prototype.id_solicitud,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProponenteTrabajo, {
            title: 'NewProponenteTrabajoInSolicitud',
            exclude: ['id'],
          }),
        },
      },
    }) proponenteTrabajo: Omit<ProponenteTrabajo, 'id'>,
  ): Promise<ProponenteTrabajo> {
    return this.solicitudRepository.proponenteTrabajos(id).create(proponenteTrabajo);
  }

  @patch('/solicituds/{id}/proponente-trabajos', {
    responses: {
      '200': {
        description: 'Solicitud.ProponenteTrabajo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ProponenteTrabajo, {partial: true}),
        },
      },
    })
    proponenteTrabajo: Partial<ProponenteTrabajo>,
    @param.query.object('where', getWhereSchemaFor(ProponenteTrabajo)) where?: Where<ProponenteTrabajo>,
  ): Promise<Count> {
    return this.solicitudRepository.proponenteTrabajos(id).patch(proponenteTrabajo, where);
  }

  @del('/solicituds/{id}/proponente-trabajos', {
    responses: {
      '200': {
        description: 'Solicitud.ProponenteTrabajo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.number('id') id: number,
    @param.query.object('where', getWhereSchemaFor(ProponenteTrabajo)) where?: Where<ProponenteTrabajo>,
  ): Promise<Count> {
    return this.solicitudRepository.proponenteTrabajos(id).delete(where);
  }
}
