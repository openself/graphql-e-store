const {gql, ApolloServer} = require('apollo-server-express')
const bodyParser = require('body-parser')
const express = require('express')
const port = 3000
const {connectToDB} = require('./database')


const startServer = async (typeDefs, resolvers) => {
    // Initiate the server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        playground: true,
    })
    // Initiate express and define routes
    const app = express()
    server.applyMiddleware({
        app: app,
        path: '/',
        bodyParserConfig: bodyParser.json()
    })
    app.listen(process.env.PORT || port, () => {
        console.log(`Server started on port: ${process.env.PORT || port}${server.graphqlPath}`)
    })
}

// Connecting to DB and then start the server
const dbConnectAndStartServer = async () => {
    try {
        await connectToDB()
        console.log('Connected to Mongo successfully')

        const {resolvers} = require('./resolvers')
        const {typeDefs} = require('./types')

        startServer(typeDefs, resolvers)
    } catch (err) {
        console.error(`Error connecting to mongo - ${err.message}`)
        process.exit(1)
    }
}

// Entry point
dbConnectAndStartServer()
