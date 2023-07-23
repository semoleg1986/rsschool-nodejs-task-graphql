import { Type } from '@fastify/type-provider-typebox';
import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import { getUser } from './users/userQuery.js';
import { getMember} from './memberType/memberQuery.js';
import { getPost } from './post/postQuery.js';
import { getProfile } from './profile/profileQuery.js';
// import { UserMutation } from './users/userMutation.js';
import { PostMutation } from './post/postMutation.js';
import { UserMutation } from './users/userMutation.js';
import { ProfileMutation } from './profile/profileMutation.js';






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
    ...getUser,
    ...getMember,
    ...getPost,
    ...getProfile,
  },
});

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    ...PostMutation,
    ...UserMutation,
    ...ProfileMutation,
  }),
});


export const graphQLSchema = new GraphQLSchema({ query, mutation });