import app from './app/app';

const port = 8000;

app.listen(port, (err)=>{
  if (err) return console.log(err); // eslint-disable-line no-console
  return console.log(`Server runnig on ${port}`); // eslint-disable-line no-console
});

export default app;
