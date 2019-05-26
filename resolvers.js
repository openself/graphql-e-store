const {GraphQLScalarType} = require('graphql')
const {Kind} = require('graphql/language')
const {
    Category,
    Order,
    Product,
    User
} = require('./database/models')

// GraphQL resolvers
const resolvers = {
    Date: new GraphQLScalarType({
        name: 'Date',
        description: 'Date custom scalar type',
        parseValue(value) {
            return new Date(value) // value from the client
        },
        serialize(value) {
            return value.getTime() // value sent to the client
        },
        parseLiteral(ast) {
            if (ast.kind === Kind.INT) {
                return parseInt(ast.value, 10) // ast value is always in string format
            }
            return null
        },
    }),

    Query: {
        categories: findItems(Category),
        users: findItems(User),
        products: findItems(Product),
        orders: findItems(Order),
    },

    Mutation: {
        // Categories
        addCategory: async (root, {category}) => {
            return await Category.create(category)
        },

        updateCategory: async (root, {category}) => {
            const categoryId = category.id
            return await Category.findByIdAndUpdate(categoryId, category,
                {new: true, useFindAndModify: false})
        },

        // Users
        addUser: async (root, {user}) => {
            return await User.create(user)
        },

        updateUser: async (root, {user}) => {
            const userId = user.id
            return await User.findByIdAndUpdate(userId, user,
                {new: true, useFindAndModify: false})
        },

        // Products
        addProduct: async (root, {product}) => {
            return await Product.create(product)
        },

        updateProduct: async (root, {product}) => {
            const productId = user.id
            return await Product.findByIdAndUpdate(productId, product,
                {new: true, useFindAndModify: false})
        },

        // Orders
        addOrder: async (root, {order}) => {
            return await Order.create(order)
        },

        updateOrder: async (root, {order}) => {
            const orderId = order.id
            return await Order.findByIdAndUpdate(orderId, order,
                {new: true, useFindAndModify: false})
        },
    },
}

function findItems(typeObj){
    return async () => {
        return await typeObj.find()
    }
}

module.exports = {resolvers}
