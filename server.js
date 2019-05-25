const { ApolloServer, gql } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const port = 9900

const typeDefs = gql`
    type Query {
        greeting: String
    }
`
const resolvers = {
    Query: {
        greeting: () => 'Welcome!'
    }
}
const server = new ApolloServer({ typeDefs, resolvers })

const app = express()
server.applyMiddleware({ app })
app.use(cors(), bodyParser.json())
app.listen(port, () => console.info(`🚀Server ready at http://localhost:${port}${server.graphqlPath}`))
