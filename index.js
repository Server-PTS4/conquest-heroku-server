var express = require('express');
var app = express();
const server = require('http').createServer(app);
const {graphql, GraphQLSchema, GraphQLObjectType, GraphQLString} = require('graphql');

const fields = {
  hello: {
    type: GraphQLString,
    args: {
      name: {type: GraphQLString}
    },
    resolve: (_, args) => {
      return `Hello ${args.name} !`
    }
  }
};

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: 'RootQuery',
    fields
  })
});

const query = '{ hello (name: "Alan Turing") }';

graphql(schema, query)
  .then(res => console.log(JSON.stringify(res, null, 2)))
  .catch(err => console.error(err));

const port = process.env.PORT || 80;
server.listen(port, () => console.log('Server listening on port 80'));
