const { getDB } = require('./index')
const DB = getDB()

//#region schemas
const TEST_SCHEMA = DB.Schema({
    task: String,
    isDone: Boolean,
});
//#endregion schemas

//#region models
const TestTask = DB.model('TestTask', TEST_SCHEMA)
//#endregion models

module.exports = {
    TestTask,
}
