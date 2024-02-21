const express = require('express')
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')



const app = express();


mongoose.connect('mongodb+srv://gpavankalyan:password@cluster.vegobpk.mongodb.net/')
mongoose.connection.once('open',()=>{
    console.log("connected to mongo database")
})
app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql:true
}))

app.listen(4000,()=>{
    console.log("now listening for request on port 4000")
})
