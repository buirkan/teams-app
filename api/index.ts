import { GraphQLServer } from 'graphql-yoga'
import { default as typeDefs } from './types'
import { default as resolvers } from './resolvers'
import { apiConfig } from '../config/config'

const options = { port: apiConfig.API_PORT }

const server = new GraphQLServer({ typeDefs, resolvers })

server
  .start(options, () => console.log(`Server running on localhost:${options.port}`))
  .catch(err => console.error('Error on connection', err))
