import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

const router = Router();

const specs = {
    openapi: '3.0.0',
    info: {
        title: 'Adoptme API',
        version: '1.0.0',
        description: 'Documentación de la API - Sessions, Pets y Adoptions'
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