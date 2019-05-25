const { ApolloServer, gql } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const port = 3000

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
const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true,
})

const app = express()

server.applyMiddleware({ app })

app.use(
    cors(),
    bodyParser.json()
)
app.listen(process.env.PORT || port, () => {
    console.log(`Server started on port: ${process.env.PORT || port}${server.graphqlPath}`)
})
