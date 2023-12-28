import swaggerAutogen from "swagger-autogen";

const outputFile = './swagger/swagger.json';
const endpointsFiles = ['./routes/*.js'];

const config = {
    info: {
        title: 'Blog API Documentation',
        description: '',
    },
    tags: [],
    host: 'localhost:5000',
    schemes: ['http', 'https'],
};

swaggerAutogen(outputFile, endpointsFiles, config);