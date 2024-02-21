const graphql = require('graphql')
const { GraphQLSchema } = require('graphql');

const _ = require('lodash')

const Book = require('../models/book')
const Author = require('../models/author')
const {GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLList} = graphql


// dummy data 

var books =[
    {name:'Name of the Wind', genre:'Fantasy', id:'1',authodId:"1"},
    {name:'The Final Empire', genre:'Fantasy', id:'2',authodId:"2"},
    {name:'The Long Earth', genre:'Sci-Fi', id:'3',authodId:"3"},
    {name:'Dune', genre:'Sci-Fi', id:'4', authorId:"2"},
    {name:'A Game of Thrones', genre:'Fantasy', id:'5', authorId:"2"},
    {name:'The Martian', genre:'Sci-Fi', id:'6', authorId:"3"},
    {name:'The Catcher in the Rye', genre:'Classic', id:'7', authorId:"3"},
    {name:'Brave New World', genre:'Dystopian', id:'8', authorId:"1"}
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
        genre:{type:GraphQLString},
        author:{
            type:AuthorType,
            resolve(parent,args){
                console.log(parent)
                //return _.find(authors,{id:parent.authodId})
            }
        }
    })
})

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:()=>({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        age:{type:GraphQLInt},
        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
               // return _.filter(books,{authorId:parent.id})
            }
        }
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
               // return _.find(books,{id:args.id})
            }
        },
        author:{
            type:AuthorType,
            args:{id:{type:GraphQLString}},
            resolve(parent,args){
                //return _.find(authors,{id:args.id})
            }
        },
        books:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                //return books
            }
        },
        authors:{
            type: new GraphQLList(AuthorType),
            resolve(parent,args){
               // return authors
            }
        }
    }
})

const Mutation = new GraphQLObjectType({
    name:'Mutation',
    fields:{
        addAuthor:{
            type:AuthorType,
            args:{
                name:{type:GraphQLString},
                age:{type:GraphQLInt}
            },
            resolve(parent,args){
                let author = new Author({
                    name:args.name,
                    age:args.age
                })
                return author.save()
            }
        },
        addBook:{
            type:BookType,
            args:{
                name:{type:GraphQLString},
                genre:{type:GraphQLString},
                authorId:{type:GraphQLString}
            },
            resolve(parent,args){
                let book = new Book({
                    name:args.name,
                    genre:args.genre,
                    authorId:args.authorId
                })
                return book.save()
            }
        }
    }
})
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
})