module.exports = {
  modulePathIgnorePatterns: ['/node_modules/(?!api-login).+.js$', '/src/'],
  preset: 'ts-jest',
  setupFiles: ['dotenv/config'],
  testEnvironment: 'node'
}
