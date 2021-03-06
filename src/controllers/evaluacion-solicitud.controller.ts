import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response,
} from '@loopback/rest';
import {EvaluacionSolicitud, NotificacionCorreo} from '../models';
import {
  EvaluacionSolicitudRepository,
  JuradosRepository,
  SolicitudRepository,
} from '../repositories';
import {NotificacionesService} from '../services';

export class EvaluacionSolicitudController {
  constructor(
    @repository(EvaluacionSolicitudRepository)
    public evaluacionSolicitudRepository: EvaluacionSolicitudRepository,
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
    @repository(JuradosRepository)
    public juradosRepository: JuradosRepository,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
  ) {}

  @post('/evaluacion-solicitudes')
  @response(200, {
    description: 'EvaluacionSolicitud model instance',
    content: {
      'application/json': {schema: getModelSchemaRef(EvaluacionSolicitud)},
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {
            title: 'NewEvaluacionSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    evaluacionSolicitud: Omit<EvaluacionSolicitud, 'id'>,
  ): Promise<EvaluacionSolicitud> {
    let solicitud = await this.solicitudRepository.findById(
      evaluacionSolicitud.id_solicitud,
    );
    let jurado = await this.juradosRepository.findById(
      evaluacionSolicitud.id_jurado,
    );
    let evaluacionSolicitudCreada =
      await this.evaluacionSolicitudRepository.create(evaluacionSolicitud);

    console.log(jurado.correo_electronico);

    if (evaluacionSolicitudCreada) {
      let dato = new NotificacionCorreo();
      dato.destinatario = jurado.correo_electronico;
      dato.asunto = 'Invitacion evaluar una solicitud';
      dato.mensaje = `hola ${jurado.nombre_completo} fue invitado a ser una solicitud`;
      this.servicioNotificaciones.EnviarCorreo(dato);
    }
    return evaluacionSolicitudCreada;
  }

  @get('/evaluacion-solicitudes/count')
  @response(200, {
    description: 'EvaluacionSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EvaluacionSolicitud) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.count(where);
  }

  @get('/evaluacion-solicitudes')
  @response(200, {
    description: 'Array of EvaluacionSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EvaluacionSolicitud, {
            includeRelations: true,
          }),
        },
      },
    },
  })
  async find(
    @param.filter(EvaluacionSolicitud) filter?: Filter<EvaluacionSolicitud>,
  ): Promise<EvaluacionSolicitud[]> {
    return this.evaluacionSolicitudRepository.find(filter);
  }

  @patch('/evaluacion-solicitudes')
  @response(200, {
    description: 'EvaluacionSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: EvaluacionSolicitud,
    @param.where(EvaluacionSolicitud) where?: Where<EvaluacionSolicitud>,
  ): Promise<Count> {
    return this.evaluacionSolicitudRepository.updateAll(
      evaluacionSolicitud,
      where,
    );
  }

  @get('/evaluacion-solicitudes/{id}')
  @response(200, {
    description: 'EvaluacionSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EvaluacionSolicitud, {
          includeRelations: true,
        }),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(EvaluacionSolicitud, {exclude: 'where'})
    filter?: FilterExcludingWhere<EvaluacionSolicitud>,
  ): Promise<EvaluacionSolicitud> {
    return this.evaluacionSolicitudRepository.findById(id, filter);
  }

  @patch('/evaluacion-solicitudes/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EvaluacionSolicitud, {partial: true}),
        },
      },
    })
    evaluacionSolicitud: EvaluacionSolicitud,
  ): Promise<void> {
    await this.evaluacionSolicitudRepository.updateById(
      id,
      evaluacionSolicitud,
    );
  }

  @put('/evaluacion-solicitudes/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() evaluacionSolicitud: EvaluacionSolicitud,
  ): Promise<void> {
    await this.evaluacionSolicitudRepository.replaceById(
      id,
      evaluacionSolicitud,
    );
  }

  @del('/evaluacion-solicitudes/{id}')
  @response(204, {
    description: 'EvaluacionSolicitud DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.evaluacionSolicitudRepository.deleteById(id);
  }
}
