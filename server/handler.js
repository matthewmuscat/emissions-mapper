'use strict';

const hello = async (event, context) => {
  const { name } = event.pathParameters
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${name}`,
    }),
  };
};

const bye = async (event, context) => {
  const { name } = event.pathParameters
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Hello ${name}`,
    }),
  };
};

module.exports = {
  hello,
  bye
}