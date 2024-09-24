import { Express } from 'express';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { join } from 'path';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'UokPQs API',
      description: 'API for managing University of Kigali past academic papers',
      version: '1.0.0',
      contact: {
        name: 'Abubakar Balogun',
        email: 'contact@abubalo.com',
      },
      servers: [{ url: 'http://localhost:5000/api/v1' }],
    },
  },
  apis: [
    join(__dirname, './docs/*.yaml'),
  ],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};

export default setupSwagger;
