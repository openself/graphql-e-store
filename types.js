// GraphQL Types
const typeDefs = `
    scalar Date

    # Category
    type Category {
        # The ID of this entry
        id: ID!
        # The name of the category
        name: String!
        # The description of the category
        description: String
    }
    
    # Category new input
        input NewCategoryInput {
        # The name of the category
        name: String!
        # The description of the category
        description: String
    }
    
    # Category update input
        input UpdateCategoryInput {
        # The ID of this entry
        id: ID!
        # The name of the category
        name: String
        # The description of the category
        description: String
    }
    
    # User
    type User {
        # The ID of this entry
        id: ID!
        # User's name
        name: String!
        # User's e-mail
        email: String
    }
    
    # User new input
        input NewUserInput {
        # The name 
        name: String!
        # The e-mail 
        email: String
    }
    
    # User update input
        input UpdateUserInput {
        # The ID of this entry
        id: ID!
        # The name 
        name: String!
        # The e-mail 
        email: String
    }
    
    # Product
    type Product {
        # The ID of this entry
        id: ID!
        name: String!
        price: Int!
        description: String,
        category: String
    }
    
    # Product new input
        input NewProductInput {
        name: String!
        price: Int!
        description: String,
        category: String
    }
    
    # Product update input
        input UpdateProductInput {
        # The ID of this entry
        id: ID!
        name: String!
        price: Int!
        description: String,
        category: String
    }
    
    # Order
    type Order {
        # The ID of this entry
        id: ID!
        orderDate: String!,
        orderNum: String!,
        status: Int,
        user: String!,
        comment: String,
        product: String!,
        quantity: Int!
    }
    
    # Order new input
        input NewOrderInput {
        orderDate: String!,
        orderNum: String!,
        status: Int,
        user: String!,
        comment: String,
        product: String!,
        quantity: Int!
    }
    
    # Order update input
        input UpdateOrderInput {
        # The ID of this entry
        id: ID!
        orderDate: String,
        orderNum: String,
        status: Int,
        user: String,
        comment: String,
        product: String,
        quantity: Int
    }

    type Query {
        categories: [Category]
        users: [User]
        products: [Product]
        orders: [Order]
    }

    type Mutation {
        # Category add
        addCategory(
            # The new category input
            category: NewCategoryInput!
        ): Category
        # Category update
        updateCategory(
            # The existed category input
            category: UpdateCategoryInput!
        ): Category
        
        # User add
        addUser(
            # The new user input
            user: NewUserInput!
        ): User
        # User update
        updateUser(
            # The existed category input
            user: UpdateUserInput!
        ): User
        
        # Product add
        addProduct(
            # The new product input
            product: NewProductInput!
        ): Product
        # Product update
        updateProduct(
            # The existed product input
            product: UpdateProductInput!
        ): Product
        
        # Order add
        addOrder(
            # The new order input
            order: NewOrderInput!
        ): Order
        # Order update
        updateOrder(
            # The existed order input
            order: UpdateOrderInput!
        ): Order
    }
`
module.exports = {typeDefs}
