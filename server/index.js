const mysql = require('mysql');
const {ApolloServer, gql} = require('apollo-server');
const util = require('util');

const connection = mysql.createConnection({
    host: 'localhost',
    user: '<your_username>',
    password: '<your_password>',
    database: 'sample_webapp'
});

connection.connect(err => {
    if(err) throw err;
    console.log("Database Connected!");
})

const query = util.promisify(connection.query).bind(connection);

const typeDefs = gql`
    type Message {
        Name: String!
        Email: String!
        Message: String!
    }
    type Query {
        _dummy: String
    }
    type Mutation {
        sendMessage(name: String!, email: String!, message: String!): Message
    }
`;

const resolvers = {
    Mutation: {
        sendMessage: async (parent, args) => {
            const {name, email, message} = args;
            const QUERY = "INSERT INTO `messages` (Name, Email, Message) VALUES " + `('${name}', '${email}', '${message}');`;
            await query(QUERY);
            return {"Name": name, "Email": email, "Message": message};
        }
    }
};

const server = new ApolloServer({typeDefs, resolvers});
server.listen().then(({url}) => console.log(`Graphql server running on ${url}`));

