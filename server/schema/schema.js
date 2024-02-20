const graphql = require('graphql')
const { GraphQLSchema } = require('graphql');

const _ = require('lodash')

const {GraphQLObjectType,GraphQLString,GraphQLInt} = graphql


// dummy data 

var books =[
    {name:'Name of the Wind', genre:'Fantasy', id:'1'},
    {name:'The Final Empire', genre:'Fantasy', id:'2'},
    {name:'The Long Earth', genre:'Sci-Fi', id:'3'}
]

var authors =[
    {name:'Pavan', age:25, id:'1'},
    {name:'Kalyan', age:26, id:'2'},
    {name:'Nayak', age:27, id:'3'}
]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        genre:{type:GraphQLString}
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
        book:{
            type:BookType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                //code to get the data from database
                return _.find(books,{id:args.id})
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                return _.find(authors,{id:args.id})
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})