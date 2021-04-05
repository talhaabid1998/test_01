import express from 'express';
import path from 'path'
import authRouter from './routes/auth';
import homePageRouter from './routes/protected';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app=express()


const statisPath = path.join(__dirname, 'Public');

app.use(express.static(statisPath));

app.use(express.static(path.join(__dirname, '..', 'node_modules')));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/auth', authRouter)

app.use('/',homePageRouter)


const PORT= process.env.PORT||7777

// app.listen(PORT, () => {console.log(`server strated on port ${PORT}`)});


// const client = new MongoClient(process.env.Url);

mongoose.connect(process.env.Url!, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
})
  .then(_ => {
    app.listen(PORT, () => {
      console.log(`Server Running on port: ${PORT}`);
      // console.log(__dirname)
    });
  })
  .catch(err => {
    console.error('Could not connect to DB')
    console.log(err)
    
  })