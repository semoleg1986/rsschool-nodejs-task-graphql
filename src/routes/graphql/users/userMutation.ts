// import { GraphQLFloat, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
// import { User } from '@prisma/client';
// import { UserType } from './typeUser.js';
// import { Context } from '../types/context.js';


// export const MutationType = new GraphQLObjectType({
//     name: 'Mutation',
//     description: 'Mutation operations',
//     fields: () => ({
//       createUser: {
//         type: UserType as GraphQLObjectType,
//         args: {data: {type: }},
//         resolve: async (_: unknown, args: Partial<User>, { prisma }: Context) => {
//           // В этом резолвере мы создаем нового пользователя
//           const createdUser = await prisma.user.create({
//             data: {
//               name: args.name,
//               balance: args.balance,
//               // Добавьте другие поля пользователя по необходимости
//             },
//           });
  
//           return createdUser;
//         },
//       },
//     }),
//   });