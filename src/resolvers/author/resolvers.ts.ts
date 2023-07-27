import R from 'ramda';
import { authors, Author } from '../../data';

export default {
  Query: {
    author: (_: {}, args: { _id: String }) => {
      const author = R.find((author: Author) => author._id === args._id)(
        authors,
      );
      return author;
    },
  },
  Mutation: {
    createAuthor: (
      _obj: {},
      args: {
        input: {
          name: string;
        };
      },
    ) => {
      const _id = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '');

      authors.push({
        ...args.input,
        _id,
      });

      return _id;
    },
  },
};
