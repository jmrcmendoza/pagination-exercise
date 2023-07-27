import R from 'ramda';

export type Author = {
  _id: string;
  name: string;
};

export type Book = {
  _id: string;
  title: string;
  author: string;
  dateTimeCreated: Date;
  cursor: Buffer;
};

export const books: Book[] = [];
export const authors: Author[] = [];
export const retrieveBooks = (
  after: string,
  limit: number,
  sortDirection: number,
  author?: string,
) => {
  let data = R.filter((item: Book) => {
    if (after) {
      return sortDirection === 1 && after
        ? item.cursor.toString() > after
        : item.cursor.toString() < after;
    }

    return true;
  })(books);

  if (author) {
    data = R.filter((item: Book) => item.author === author)(books);
  }

  const bufferCompare = (a, b) => {
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return sortDirection === 1 ? a[i] - b[i] : b[i] - a[i];
      }
    }
    return 0;
  };

  const sortedData = R.sort((a, b) => bufferCompare(a.cursor, b.cursor), data);

  const limitedData = R.take(limit, sortedData);

  const edges = R.map((item) => ({
    node: item,
    cursor: R.path(['cursor'], item),
  }))(limitedData);

  const endCursor =
    edges.length > 0
      ? R.prop('cursor')(R.last(edges) as unknown as { cursor: Buffer })
      : null;

  let hasNextPage = false;
  if (edges.length >= limit && endCursor) {
    hasNextPage =
      R.count((item: Book) =>
        sortDirection === 1
          ? item.cursor.toString() > after
          : item.cursor.toString() < after,
      ).length > 0;
  }

  return {
    totalCount: R.length(data),
    edges,
    pageInfo: {
      endCursor,
      hasNextPage,
    },
  };
};
