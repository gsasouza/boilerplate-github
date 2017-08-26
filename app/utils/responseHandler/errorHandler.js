import Response from './response';

function unexpected(res, type, error) {
  console.log(error);
  res.status(500);
  const message = 'Unexpected Error';
  return res.send(new Response(500, message));
}

function alreadyRegistered(res, type) {
  res.status(409);
  const message = {
    type: `Already registered ${type}`
  };
  return res.send(new Response(409, message));
}

function mongoError(res, type, error) {
  if (error.code === 11000) return alreadyRegistered(res, type);
  return unexpected(res, type, error);
}

function notFound(res, type) {
  res.status(404);
  const message = {
    type: `Not found ${type}`
  };
  return res.send(new Response(404, message));
}

function validation(res, type, error) {
  const errors = error.errors;
  const message = {
    type: `${type} Validation Error`,
    description: []
  };
  Object.entries(errors).forEach(([value]) => {
    message.description.push(value.message);
  });
  res.status(401);
  return res.send(new Response(401, message));
}

function invalidPassword(res, type) {
  res.status(400);
  const message = {
    type: 'Invalid Password',
    description: type
  };
  return res.send(new Response(400, message));
}

function notAuthorized(res, type) {
  res.status(401);
  const message = {
    type: 'Not Authorized',
    description: type
  };
  return res.send(new Response(401, message));
}
export default function handler(res, type, error) {
  switch (error.name) {
    case 'MongoError':
      return mongoError(res, type, error);
    case 'NotFound':
      return notFound(res, type);
    case 'ValidationError':
      return validation(res, type, error);
    case 'InvalidCnpj':
      Object.assing(error.errors, { InvalidCnpj: { message: 'cnpj filled in form is invalid' } });
      return validation(res, type, error);
    case 'InvalidCa':
      Object.assing(error.errors, { InvalidCa: { message: 'caNumber filled in form is invalid' } });
      return validation(res, type, error);
    case 'InvalidPassword':
      return invalidPassword(res, type);
    case 'NotAuthorized':
      return notAuthorized(res, type);
    default:
      return unexpected(res, type, error);
  }
}

