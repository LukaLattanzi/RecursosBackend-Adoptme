import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const router = Router();

const specs = {
    openapi: '3.0.0',
    info: {
        title: 'Adoptme API',
        version: '1.0.0',
        description: 'Documentación de la API - Sessions, Pets, Adoptions y Users'
    },
    servers: [{ url: 'http://localhost:8080' }],
    components: {
        schemas: {
            UserRegister: {
                type: 'object',
                properties: {
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            },
            User: {
                type: 'object',
                properties: {
                    _id: { type: 'string' },
                    first_name: { type: 'string' },
                    last_name: { type: 'string' },
                    email: { type: 'string' },
                    role: { type: 'string' },
                    pets: { type: 'array', items: { type: 'string' } },
                    documents: { type: 'array', items: { $ref: '#/components/schemas/Document' } },
                    last_connection: { type: 'string', format: 'date-time' }
                }
            },
            Document: {
                type: 'object',
                properties: {
                    name: { type: 'string' },
                    reference: { type: 'string' }
                }
            },
            LoginCredentials: { type: 'object', properties: { email: { type: 'string' }, password: { type: 'string' } } },
            PetInput: { type: 'object', properties: { name: { type: 'string' }, specie: { type: 'string' }, birthDate: { type: 'string' } } },
            Pet: { type: 'object', properties: { _id: { type: 'string' }, name: { type: 'string' }, specie: { type: 'string' }, adopted: { type: 'boolean' } } },
            Adoption: { type: 'object', properties: { _id: { type: 'string' }, owner: { type: 'string' }, pet: { type: 'string' } } }
        }
    },
    paths: {
        '/api/sessions/register': {
            post: {
                tags: ['Sessions'],
                summary: 'Registrar usuario',
                requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/UserRegister' } } } },
                responses: { '200': { description: 'Usuario creado' } }
            }
        },
        '/api/sessions/login': {
            post: {
                tags: ['Sessions'],
                summary: 'Login',
                requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/LoginCredentials' } } } },
                responses: { '200': { description: 'Login OK' } }
            }
        },
        '/api/pets': {
            get: { tags: ['Pets'], summary: 'Listar mascotas', responses: { '200': { description: 'Lista' } } },
            post: { tags: ['Pets'], summary: 'Crear mascota', requestBody: { content: { 'application/json': { schema: { $ref: '#/components/schemas/PetInput' } } } }, responses: { '200': { description: 'Creada' } } }
        },
        '/api/users': {
            get: {
                tags: ['Users'],
                summary: 'Listar todos los usuarios',
                description: 'Obtiene la lista completa de usuarios registrados en el sistema',
                responses: {
                    '200': {
                        description: 'Lista de usuarios obtenida exitosamente',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        results: { type: 'number', example: 10 },
                                        payload: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/User' }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Error interno del servidor',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'error' },
                                        message: { type: 'string' }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        '/api/users/{uid}': {
            get: {
                tags: ['Users'],
                summary: 'Obtener un usuario por ID',
                description: 'Obtiene la información detallada de un usuario específico mediante su ID',
                parameters: [{
                    name: 'uid',
                    in: 'path',
                    required: true,
                    description: 'ID único del usuario',
                    schema: { type: 'string' },
                    example: '507f1f77bcf86cd799439011'
                }],
                responses: {
                    '200': {
                        description: 'Usuario encontrado exitosamente',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        payload: { $ref: '#/components/schemas/User' }
                                    }
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Usuario no encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'error' },
                                        message: { type: 'string', example: 'Usuario no encontrado' }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Error interno del servidor'
                    }
                }
            },
            put: {
                tags: ['Users'],
                summary: 'Actualizar un usuario',
                description: 'Actualiza la información de un usuario existente',
                parameters: [{
                    name: 'uid',
                    in: 'path',
                    required: true,
                    description: 'ID único del usuario a actualizar',
                    schema: { type: 'string' },
                    example: '507f1f77bcf86cd799439011'
                }],
                requestBody: {
                    required: true,
                    description: 'Datos del usuario a actualizar (campos opcionales)',
                    content: {
                        'application/json': {
                            schema: {
                                type: 'object',
                                properties: {
                                    first_name: { type: 'string', example: 'Juan' },
                                    last_name: { type: 'string', example: 'Pérez' },
                                    email: { type: 'string', example: 'juan.perez@example.com' },
                                    role: { type: 'string', enum: ['user', 'admin'], example: 'user' }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Usuario actualizado exitosamente',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        message: { type: 'string', example: 'Usuario actualizado exitosamente' }
                                    }
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Usuario no encontrado'
                    },
                    '500': {
                        description: 'Error interno del servidor'
                    }
                }
            },
            delete: {
                tags: ['Users'],
                summary: 'Eliminar un usuario',
                description: 'Elimina permanentemente un usuario del sistema',
                parameters: [{
                    name: 'uid',
                    in: 'path',
                    required: true,
                    description: 'ID único del usuario a eliminar',
                    schema: { type: 'string' },
                    example: '507f1f77bcf86cd799439011'
                }],
                responses: {
                    '200': {
                        description: 'Usuario eliminado exitosamente',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        message: { type: 'string', example: 'Usuario eliminado exitosamente' }
                                    }
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Usuario no encontrado',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'error' },
                                        message: { type: 'string', example: 'Usuario no encontrado' }
                                    }
                                }
                            }
                        }
                    },
                    '500': {
                        description: 'Error interno del servidor'
                    }
                }
            }
        },
        '/api/users/{uid}/documents': {
            post: {
                tags: ['Users'],
                summary: 'Subir documentos para un usuario',
                description: 'Permite subir uno o múltiples documentos (archivos) asociados a un usuario específico. Los archivos se almacenan en el servidor y sus referencias se guardan en el perfil del usuario.',
                parameters: [{
                    name: 'uid',
                    in: 'path',
                    required: true,
                    description: 'ID único del usuario al que se le subirán los documentos',
                    schema: { type: 'string' },
                    example: '507f1f77bcf86cd799439011'
                }],
                requestBody: {
                    required: true,
                    description: 'Archivos a subir (máximo 10 documentos)',
                    content: {
                        'multipart/form-data': {
                            schema: {
                                type: 'object',
                                required: ['documents'],
                                properties: {
                                    documents: {
                                        type: 'array',
                                        description: 'Array de archivos a subir',
                                        items: { type: 'string', format: 'binary' },
                                        maxItems: 10
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    '200': {
                        description: 'Documentos subidos exitosamente',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'success' },
                                        payload: {
                                            type: 'array',
                                            items: { $ref: '#/components/schemas/Document' }
                                        }
                                    }
                                }
                            }
                        }
                    },
                    '400': {
                        description: 'No se subieron archivos',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'object',
                                    properties: {
                                        status: { type: 'string', example: 'error' },
                                        error: { type: 'string', example: 'No files uploaded' }
                                    }
                                }
                            }
                        }
                    },
                    '404': {
                        description: 'Usuario no encontrado'
                    },
                    '500': {
                        description: 'Error interno del servidor'
                    }
                }
            }
        },
        '/api/pets/withimage': { post: { tags: ['Pets'], summary: 'Crear mascota con imagen', responses: { '200': { description: 'Creada con imagen' } } } },
        '/api/pets/{pid}': {
            put: {
                tags: ['Pets'],
                summary: 'Actualizar mascota',
                parameters: [{ name: 'pid', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Actualizada' } }
            },
            delete: {
                tags: ['Pets'],
                summary: 'Eliminar mascota',
                parameters: [{ name: 'pid', in: 'path', required: true, schema: { type: 'string' } }],
                responses: { '200': { description: 'Eliminada' } }
            }
        },
        '/api/adoptions': { get: { tags: ['Adoptions'], summary: 'Listar adopciones', responses: { '200': { description: 'Lista' } } } },
        '/api/adoptions/{aid}': { get: { tags: ['Adoptions'], summary: 'Obtener adopción', parameters: [{ name: 'aid', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Encontrada' } } } },
        '/api/adoptions/{uid}/{pid}': { post: { tags: ['Adoptions'], summary: 'Crear adopción', parameters: [{ name: 'uid', in: 'path', required: true, schema: { type: 'string' } }, { name: 'pid', in: 'path', required: true, schema: { type: 'string' } }], responses: { '200': { description: 'Adoptado' } } } }
    }
};

router.use('/', swaggerUi.serve, swaggerUi.setup(specs));

export default router;