import { GraphQLScalarType } from 'graphql';

const parse = (input: string) => {
  let value: Buffer;
  try {
    value = Buffer.from(input, 'base64');
  } catch (err) {
    throw new Error('Not a valid base64 encoded string.');
  }

  return value;
};

export default {
  Binary: new GraphQLScalarType({
    name: 'Binary',
    description: 'Base64 encoded binary string.',
    serialize(value: Buffer | string) {
      if (value instanceof Buffer) {
        return value.toString('base64');
      }
      return value;
    },
    parseValue(value: string) {
      return parse(value);
    },
    parseLiteral(ast) {
      if (ast.kind !== 'StringValue') {
        throw new Error('Value must be a string.');
      }

      return parse(ast.value);
    },
  }),
};
