
export const outputFile = './swagger/swagger.json';
export const endpointsFiles = ['./routes/*.js'];

export const config = {
    info: {
        title: 'Blog API Documentation',
        description: '',
    },
    tags: [],
    host: 'localhost:5000',
    schemes: ['http', 'https'],
};
