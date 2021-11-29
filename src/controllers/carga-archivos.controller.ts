import {inject} from '@loopback/core';
import {repository} from '@loopback/repository';
import {
  HttpErrors,
  param,
  post,
  Request,
  requestBody,
  Response,
  RestBindings,
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {Keys as llaves} from '../config/keys';
import {
  DocumentoResultadoSolicitud,
  DocumentoSolicitud,
  DocumentoTipoSolicitud,
  FotoProponenteTrabajo,
} from '../models';
import {
  DocumentoResultadoSolicitudRepository,
  DocumentoSolicitudRepository,
} from '../repositories';

export class CargaArchivosController {
  constructor(
    @repository(FotoProponenteTrabajo)
    private fotoProponenteRepository: FotoProponenteTrabajo,
    @repository(DocumentoTipoSolicitud)
    private documentTipoSolicitudRepository: DocumentoTipoSolicitud,
    @repository(DocumentoSolicitudRepository)
    private documentSolicitudRepository: DocumentoSolicitudRepository,
    @repository(DocumentoResultadoSolicitudRepository)
    private documentResultadoEvaluacionRepository: DocumentoResultadoSolicitudRepository,
  ) {}

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarImagenProponenteTrabajo/{id}', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen de la persona.',
      },
    },
  })
  async cargarImagenDelProponenteTrabajo(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number('id') id: number,
  ): Promise<object | false> {
    const rutaImagenProponenteTrabajo = path.join(
      __dirname,
      llaves.carpetaImagenProponenteTrabajo,
    );
    let res = await this.StoreFileToPath(
      rutaImagenProponenteTrabajo,
      llaves.nombreCampoImagenProponenteTrabajo,
      request,
      response,
      llaves.extensionesPermitidasIMG,
    );
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let foto = new FotoProponenteTrabajo();
        foto.id = id;
        foto.nombre = nombre_archivo;
        await this.fotoProponenteRepository.save(foto);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarDocumentoTipoSolicitud', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de documentos del tipo de solicitud.',
      },
    },
  })
  async DocumentosTipoSolicitud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number('id') id: number,
  ): Promise<object | false> {
    const rutaDocumentoTipoSolicitud = path.join(
      __dirname,
      llaves.carpetaDocumentoTipoSolicitud,
    );
    let res = await this.StoreFileToPath(
      rutaDocumentoTipoSolicitud,
      llaves.nombreCampoDocumento,
      request,
      response,
      llaves.extensionesPermitidasDOC,
    );
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let documento = new DocumentoTipoSolicitud();
        documento.id = id;
        documento.name = nombre_archivo;
        //await this.documentTipoSolicitudRepository.save(documento);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }

  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarDocumentoSolicitud', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de documentos de solicitud.',
      },
    },
  })
  async DocumentosSolicitud(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number('id') id: number,
  ): Promise<object | false> {
    const rutaDocumentoSolicitud = path.join(
      __dirname,
      llaves.carpetaDocumentoSolicitud,
    );
    let res = await this.StoreFileToPath(
      rutaDocumentoSolicitud,
      llaves.nombreCampoDocumento,
      request,
      response,
      llaves.extensionesPermitidasDOCSolicitud,
    );
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let comprimido = new DocumentoSolicitud();
        comprimido.id = id;
        comprimido.name = nombre_archivo;
        await this.documentSolicitudRepository.save(comprimido);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }
  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarDocumentoResultadoEvaluacion', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description:
          'Función de carga de documentos del resultado de la evaluacion.',
      },
    },
  })
  async ResultadoEvaluacion(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
    @param.path.number('id') id: number,
  ): Promise<object | false> {
    const rutaDocumentoResultadoEvaluacion = path.join(
      __dirname,
      llaves.carpetaDocumentoResultadoEvaluacion,
    );
    let res = await this.StoreFileToPath(
      rutaDocumentoResultadoEvaluacion,
      llaves.nombreCampoDocumento,
      request,
      response,
      llaves.extensionesPermitidasDOCSolicitud,
    );
    if (res) {
      const nombre_archivo = response.req?.file?.filename;
      if (nombre_archivo) {
        let documento = new DocumentoResultadoSolicitud();
        documento.id = id;
        documento.name = nombre_archivo;
        await this.documentResultadoEvaluacionRepository.save(documento);
        return {filename: nombre_archivo};
      }
    }
    return res;
  }
  /**
   *
   * @param response
   * @param request
   */
  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path);
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`;
        cb(null, filename);
      },
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(
    storePath: string,
    fieldname: string,
    request: Request,
    response: Response,
    acceptedExt: string[],
  ): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(
            new HttpErrors[400]('El formato del archivo no es permitido.'),
          );
        },
        limits: {
          fileSize: llaves.tamMaxImagenProponenteTrabajo,
        },
      }).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }
}
