// jest.config.js
module.exports = {
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Ignorar archivos de estilo
    '^axios$': require.resolve('axios'), // Permitir Axios en Jest
  },
  transformIgnorePatterns: [
    '/node_modules/(?!axios/.*)', // Transformar Axios para que Jest lo interprete
  ],
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Procesa JSX con Babel
  },
};
