import { GraphQLFloat, GraphQLInputObjectType, GraphQLString } from "graphql";

export const CreateUserInput = new GraphQLInputObjectType({
    name: 'CreateUserInput',
    description: 'Create User Data for input',
    fields: ()=>({
        name: { type: GraphQLString },
        balance: { type: GraphQLFloat},
    }),
});