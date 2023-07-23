import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getUserQuery } from './users/userQuery.js';
import { getMemberQuery } from './memberType/memberQuery.js';
import { getPostQuery } from './post/postQuery.js';
import { getProfileQuery } from './profile/profileQuery.js';
// import { UserMutation } from './users/userMutation.js';
import { PostMutation } from './post/postMutation.js';
import { UserMutation } from './users/userMutation.js';






export const gqlResponseSchema = Type.Partial(
  Type.Object({
    data: Type.Any(),
    errors: Type.Any(),
  }),
);

export const createGqlResponseSchema = {
  body: Type.Object(
    {
      query: Type.String(),
      variables: Type.Optional(Type.Record(Type.String(), Type.Any())),
    },
    {
      additionalProperties: false,
    },
  ),
};
const query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...getUserQuery,
    ...getMemberQuery,
    ...getPostQuery,
    ...getProfileQuery,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...PostMutation,
    ...UserMutation
    // Добавьте другие мутации здесь, если они есть
  }),
});


export const graphQLSchema = new GraphQLSchema({ query, mutation });