import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import Promise from 'bluebird';
import { database } from './config';

global.Promise = Promise;

mongoose.connect(database, { useMongoClient: true });
mongoose.Promise = global.Promise;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next)=> {
  res.status(404);
  res.send('Not Found!');
  next();
});

export default app;
