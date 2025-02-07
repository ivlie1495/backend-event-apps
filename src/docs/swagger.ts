import swaggerAutogen from 'swagger-autogen'

const swaggerGenerate = swaggerAutogen({ openapi: '3.0.0' })

const doc = {
  info: {
    version: '0.0.1',
    title: 'Backend Event Apps',
    description: 'Backend Event Apps',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
      description: 'Localhost',
    },
    {
      url: 'https://backend-event-apps-production.up.railway.app/api',
      description: 'Production',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
      },
    },
    schemas: {
      LoginRequest: {
        email: 'test@gmail.com',
        password: 'asdf1234',
      },
    },
  },
}
const outputFile = './swagger.json'
const endpointsFile = ['../routes/index.ts']

swaggerGenerate(outputFile, endpointsFile, doc)
  .then(() => console.log('Swagger documentation generated successfully!'))
  .catch((err) => console.error('Error generating Swagger documentation:', err))
