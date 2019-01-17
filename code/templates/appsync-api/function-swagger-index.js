import { getResponse } from '../../helper/RestHelper';

const AWS = require('aws-sdk'); // eslint-disable-line import/no-unresolved

AWS.config.update({ region: process.env.REGION });
const apigateway = new AWS.APIGateway();

const possibleExtensions = ['integrations', 'apigateway', 'authorizers', 'postman'];

async function main(e, ctx, cb) {
  try {
    // Get parameters
    const { extensions } = e.queryStringParameters || {};
    const params = {
      exportType: 'swagger',
      restApiId: process.env.API_ID,
      stageName: process.env.STAGE,
      accepts: 'application/json',
      parameters: {
      },
    };
    if (extensions != null && possibleExtensions.indexOf(extensions) > -1) {
      params.parameters.extensions = extensions;
    }
    const result = await apigateway.getExport(params).promise();
    const swaggerFile = JSON.parse(result.body);

    // Return
    cb(null, getResponse(null, swaggerFile));
  } catch (err) {
    cb(null, getResponse(err));
  }
}

module.exports = {
  default: main,
};
