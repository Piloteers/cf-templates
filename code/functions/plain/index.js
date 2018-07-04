import { getResponse, newError } from '../../helper/RestHelper';

async function main(e, ctx, cb) {
  try {
    // Get parameters

    // check if contentSubmission object exists

    // Example Error
    // throw (newError('ContentSubmission object not found', null, 400));

    // Return
    cb(null, getResponse(null, {}));
  } catch (err) {
    cb(null, getResponse(err));
  }
}

module.exports = {
  default: main,
};
