import { Author, retrieveBooks } from '../../data';

export default {
  Author: {
    books(parent: Author, args: any) {
      const after = args.after?.toString() || '';
      const limit = args.first || 100;
      const sortDirection = args.sort?.direction === 'ASC' ? 1 : -1;

      const books = retrieveBooks(after, limit, sortDirection, parent._id);

      return books;
    },
  },
};
