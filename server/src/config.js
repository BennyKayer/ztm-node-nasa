require("dotenv").config()

const ENVS = {
    DB_URL: process.env.MONGO_URL
}

module.exports = {
    ENVS
}