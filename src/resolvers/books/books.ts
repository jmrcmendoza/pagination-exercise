import R from 'ramda';
import { Author, Book, authors } from '../../data';

export default {
  Book: {
    author(parent: Book) {
      const author = R.find((author: Author) => author._id === parent.author)(
        authors,
      );
      return author.name;
    },
  },
};
