import { fastify } from 'fastify'
import { DatabaseMemory } from './database/database-memory.js'
import { DatabasePostgres } from './database/database-postgres.js'
import 'dotenv/config'


const server = fastify()

let database
const environment = process.env.ENVIRONMENT

console.log("ENVIRONMENT: " + environment);

if (environment == 'DEVELOPMENT') {
    database = new DatabaseMemory()
    console.log("DATABASE: Memory");
} else if (environment == 'PRODUCTION') {
    console.log("DATABASE: PostgreSQL");
    database = new DatabasePostgres()
} else {
    console.log(`Ambiente desconhecido: ${environment}. Usando banco de dados de memória como fallback.`);
    console.log("DATABASE: Memory");
    database = new DatabaseMemory();
}

server.get('/', async (request, reply) => {
    return reply.send({
        message: '🌟 Bem-vindo à API de Vídeos! 🎥',
        routes: {
            'GET /videos': '📄 Lista todos os vídeos, com opção de pesquisa por título',
            'POST /videos': '➕ Cria um novo vídeo (campos: title, description, duration)',
            'PUT /videos/:id': '✏️ Atualiza um vídeo existente (campos: title, description, duration)',
            'DELETE /videos/:id': '🗑️ Deleta um vídeo existente pelo ID'
        }
    })
})

server.post('/videos', async (request, replay) => {
    const { title, description, duration } = request.body

    await database.create({
        title,
        description,
        duration
    })

    return replay.status(201).send()
})

server.get('/videos', async (request, replay) => {
    const search = request.query.search

    return await database.list(search)
})

server.put('/videos/:id', async (request, replay) => {
    const videoId = request.params.id
    const { title, description, duration } = request.body

    await database.update(videoId, {
        title,
        description,
        duration
    })

    return replay.status(204).send()
})

server.delete('/videos/:id', async (request, replay) => {
    const videoId = request.params.id
    await database.delete(videoId)
    return replay.status(204).send()
})

server.listen({
    host: "0.0.0.0",
    port: process.env.PORT ?? 3000
})