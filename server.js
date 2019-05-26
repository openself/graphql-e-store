const { ApolloServer, gql } = require('apollo-server-express')
const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const port = 3000
const { connectToDB } = require('./database')

const startServer = async () => {
    const { TestTask } = require('./database/models')

    // GraphQL Types
    const typeDefs = gql`
    type TestTask {
        _id: ID!
        task: String,
        isDone: Boolean,
    }

    type Query {
      tasks: [TestTask]
    }

    type Mutation {
      addTask(input: TaskInput): TestTask
    }

    input TaskInput {
      task: String!
      isDone: Boolean
    }
  `

    // GraphQL resolvers
    const resolvers = {
        Query: {
            tasks: async () => {
                const res = await TestTask.find()
                return res
            },
        },

        Mutation: {
            addTask: async(root, args) => {
                const res = await TestTask.create(args.input)
                return res
            },
        },
    }

    // Define a schema
    // const schema = makeExecutableSchema({
    //     typeDefs,
    //     resolvers,
    // })


    // const app = express()
    // app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }))
    // app.use('/', graphiqlExpress({ endpointURL: '/graphql' }))

    // Initiate the server
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        introspection: true,
        playground: true,
    })
    // Initiate express and define routes
    const app = express()
    server.applyMiddleware({ app })
    app.use(
        '/graphql',
        cors(),
        bodyParser.json()
    )
    app.listen(process.env.PORT || port, () => {
        console.log(`Server started on port: ${process.env.PORT || port}${server.graphqlPath}`)
    })

    // app.listen(process.env.PORT || 3000, () => {
    //     console.log(`Server started on port: ${process.env.PORT || 3000}`)
    // })
}

// const typeDefs = gql`
//     type Query {
//         greeting: String
//     }
// `
// const resolvers = {
//     Query: {
//         greeting: () => 'Welcome!'
//     }
// }
// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     introspection: true,
//     playground: true,
// })

// const app = express()
//
// server.applyMiddleware({ app })

// app.use(
//     cors(),
//     bodyParser.json()
// )
// app.listen(process.env.PORT || port, () => {
//     console.log(`Server started on port: ${process.env.PORT || port}${server.graphqlPath}`)
// })

// Connecting to DB and then start the server
const dbConnectAndStartServer = async () => {
    try {
        await connectToDB()
        console.log('Connected to Mongo successfully')
        startServer()
    } catch (err) {
        console.error(`Error connecting to mongo - ${err.message}`)
        process.exit(1)
    }
}

// Entry point
dbConnectAndStartServer()
