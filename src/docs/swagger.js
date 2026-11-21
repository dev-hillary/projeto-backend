const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API da Loja Virtual',
            version: '1.0.0',
            description: 'Documentação da API da loja virtual'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Servidor de desenvolvimento'
            }
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        },
        paths: {
            '/': {
                get: {
                    summary: 'Verificar funcionamento da API',
                    responses: {
                        200: {
                            description: 'API funcionando'
                        }
                    }
                }
            },
            '/users': {
                get: {
                    summary: 'Listar usuários',
                    responses: {
                        200: { description: 'Lista de usuários' }
                    }
                },
                post: {
                    summary: 'Cadastrar usuário',
                    responses: {
                        201: { description: 'Usuário cadastrado' }
                    }
                }
            },
            '/users/{id}': {
                get: {
                    summary: 'Buscar usuário',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 200: { description: 'Usuário encontrado' }, 404: { description: 'Não encontrado' } }
                },
                put: {
                    summary: 'Atualizar usuário',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 200: { description: 'Usuário atualizado' } }
                },
                delete: {
                    summary: 'Excluir usuário',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 204: { description: 'Usuário excluído' } }
                }
            },
            '/auth/login': {
                post: {
                    summary: 'Realizar login',
                    responses: {
                        200: { description: 'Login realizado e token gerado' },
                        401: { description: 'Credenciais inválidas' }
                    }
                }
            },
            '/categories': {
                get: {
                    summary: 'Listar categorias',
                    responses: { 200: { description: 'Lista de categorias' } }
                },
                post: {
                    summary: 'Cadastrar categoria',
                    responses: { 201: { description: 'Categoria cadastrada' } }
                }
            },
            '/categories/{id}': {
                get: {
                    summary: 'Buscar categoria',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 200: { description: 'Categoria encontrada' } }
                },
                put: {
                    summary: 'Atualizar categoria',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 200: { description: 'Categoria atualizada' } }
                },
                delete: {
                    summary: 'Excluir categoria',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 204: { description: 'Categoria excluída' } }
                }
            },
            '/products': {
                get: {
                    summary: 'Listar produtos',
                    responses: { 200: { description: 'Lista de produtos' } }
                },
                post: {
                    summary: 'Cadastrar produto',
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: 'Produto cadastrado' }, 401: { description: 'Não autorizado' } }
                }
            },
            '/products/{id}': {
                get: {
                    summary: 'Buscar produto',
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 200: { description: 'Produto encontrado' } }
                },
                put: {
                    summary: 'Atualizar produto',
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 200: { description: 'Produto atualizado' } }
                },
                delete: {
                    summary: 'Excluir produto',
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 204: { description: 'Produto excluído' } }
                }
            },
            '/product-images': {
                post: {
                    summary: 'Cadastrar imagem de produto',
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: 'Imagem cadastrada' } }
                }
            },
            '/product-images/{productId}': {
                get: {
                    summary: 'Listar imagens de um produto',
                    parameters: [{ name: 'productId', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 200: { description: 'Lista de imagens' } }
                }
            },
            '/product-images/{id}': {
                delete: {
                    summary: 'Excluir imagem',
                    security: [{ bearerAuth: [] }],
                    parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 204: { description: 'Imagem excluída' } }
                }
            },
            '/product-options': {
                post: {
                    summary: 'Cadastrar opção de produto',
                    security: [{ bearerAuth: [] }],
                    responses: { 201: { description: 'Opção cadastrada' } }
                }
            },
            '/product-options/{productId}': {
                get: {
                    summary: 'Listar opções de um produto',
                    parameters: [{ name: 'productId', in: 'path', required: true, schema: { type: 'integer' } }],
                    responses: { 200: { description: 'Lista de opções' } }
                }
            }
        }
    },
    apis: []
};

module.exports = swaggerJsdoc(options);