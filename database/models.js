const {getDB} = require('./index')
const db = getDB()

//#region schemas
const CategorySchema = db.Schema({
    name: String,
    description: String
})

const OrderSchema = db.Schema({
    orderDate: String,
    orderNum: String,
    status: Number,
    user: String,
    comment: String,
    product: String,
    quantity: Number
})

const ProductSchema = db.Schema({
    name: String,
    price: Number,
    description: String,
    category: String
})

const UserSchema = db.Schema({
    name: String,
    email: String
})
//#endregion schemas

//#region models
const Category = db.model('Category', CategorySchema)
const Order = db.model('Order', OrderSchema)
const Product = db.model('Product', ProductSchema)
const User = db.model('User', UserSchema)
//#endregion models

module.exports = {
    Category,
    Order,
    Product,
    User
}
