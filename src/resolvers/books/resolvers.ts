import { books, retrieveBooks } from '../../data';

type Dictionary<T> = {
  [key: string]: T;
};

type PaganationParameters = {
  first?: number;
  after?: Buffer;
  filter?: Dictionary<any>;
  sort?: {
    key: String;
    direction: 'ASC' | 'DESC';
  };
};

function generateCursor({
  id,
  dateTimeCreated,
}: {
  id: string;
  dateTimeCreated: Date;
}) {
  const buffer = Buffer.alloc(8, 0);
  buffer.writeBigInt64BE(BigInt(dateTimeCreated.getTime()));

  const idBigInt = BigInt(`0x${Buffer.from(id).toString('hex')}`);
  buffer.writeBigInt64BE(idBigInt, 0);

  return buffer;
}

export default {
  Query: {
    books: (_: {}, args: PaganationParameters) => {
      const after = args.after?.toString() || '';
      const limit = args.first || 100;
      const sortDirection = args.sort?.direction === 'ASC' ? 1 : -1;

      // database calls

      const books = retrieveBooks(after, limit, sortDirection);

      return books;
    },
  },
  Mutation: {
    createBook: (
      _obj: {},
      args: {
        input: {
          title: string;
          author: string;
        };
      },
    ) => {
      const now = new Date();
      const _id = Math.random()
        .toString(36)
        .replace(/[^a-z]+/g, '');

      const cursor = generateCursor({ id: _id, dateTimeCreated: now });

      // database calls

      books.push({
        ...args.input,
        _id,
        dateTimeCreated: new Date(),
        cursor,
      });

      return _id;
    },
  },
};
