import {Entity, model, property, hasMany} from '@loopback/repository';
import {Roles} from './roles.model';
import {UsuarioRoles} from './usuario-roles.model';

@model()
export class Usuario extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  apellido: string;

  @property({
    type: 'string',
  })
  contrasena?: string;

  @property({
    type: 'string',
    required: true,
  })
  correo_electronico: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @hasMany(() => Roles, {through: {model: () => UsuarioRoles, keyFrom: 'id_usuario', keyTo: 'id_rol'}})
  usuarioRoles: Roles[];

  constructor(data?: Partial<Usuario>) {
    super(data);
  }
}

export interface UsuarioRelations {
  // describe navigational properties here
}

export type UsuarioWithRelations = Usuario & UsuarioRelations;
