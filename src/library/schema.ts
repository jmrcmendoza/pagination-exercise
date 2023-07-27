import { makeExecutableSchema } from '@graphql-tools/schema';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';
import path from 'path';

export default makeExecutableSchema({
  typeDefs: mergeTypeDefs(
    loadFilesSync(path.join(__dirname, '../type'), {
      recursive: true,
    }),
  ),
  resolvers: mergeResolvers<any, any>(
    loadFilesSync<any>(path.join(__dirname, '../resolvers'), {
      recursive: true,
    }),
  ) as any,
});
