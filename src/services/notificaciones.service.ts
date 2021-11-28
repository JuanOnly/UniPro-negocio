import {/* inject, */ BindingScope, injectable} from '@loopback/core';
import {Keys} from '../config/keys';
import {NotificacionCorreo} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionesService {
  constructor(/* Add @inject to inject parameters */) {}

  EnviarCorreo(datos: NotificacionCorreo) {
    let url = `${Keys.urlCorreo}?destino=${datos.destinatario}&asunto=${datos.asunto}&mensaje=${datos.mensaje}&hash=${Keys.hashNotificacion}`;
    console.log(url);

    fetch(url).then((res: any) => {
      console.log(res.text());
    });
  }
}
