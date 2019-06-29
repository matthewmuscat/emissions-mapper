'use strict';

module.exports.hello = async (event, context) => {
  const { name } = event.pathParameters
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `Go Serverless v1.0! Your function executed successfully! Hello ${name}`,
      input: event,
    }),
  };
};
