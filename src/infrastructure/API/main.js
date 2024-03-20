import Server from './server'

const server = new Server()
await server.connect()
server.listen()
