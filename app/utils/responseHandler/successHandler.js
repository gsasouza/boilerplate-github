import Response from './response';

function loaded(res, type, data) {
  res.status(200);
  const message = `${type} successfully loaded `;
  return res.send(new Response(200, message, data));
}

function created(res, type) {
  res.status(201);
  const message = `${type} successfully created`;
  return res.send(new Response(201, message));
}

function updated(res, type) {
  res.status(200);
  const message = `${type} successfully updated`;
  return res.send(new Response(200, message));
}

function removed(res, type) {
  res.status(200);
  const message = `${type} successfully removed`;
  return res.send(new Response(200, message));
}

function success(res, type, data) {
  res.status(200);
  const message = `Successfully ${type}`;
  return res.send(new Response(200, message, data));
}

export default { success, removed, created, loaded, updated };
