import { Options } from 'swagger-jsdoc';

const swaggerOptions: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Biz Nation docs api courses',
      version: '1.0.0',
      description: 'This is a simple api of courses with authentication',
    },
    components: {
      securitySchemes: {
        BearerAuth: { 
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', 
        },
      },
    },
    
  },
  apis: ['src/modules/**/*.docs.ts'],
};

export default swaggerOptions;