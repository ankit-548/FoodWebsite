const express = require('express');
const path = require('path');
const app = express();
const port = 80;
// const bodyparser = require('body-parser');// to store our data to database using express post request although we have not used it
const mongoose = require('mongoose'); // to connect nodejs to database

// using mongoose to use mongodb from node
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/foodcontact'); // we want foodcontact db
}

// define mongoose schema(its just which kind of data we want to store)
const contactSchema = new mongoose.Schema({
    Name: String,
    Number: String,
    Address: String,
    Note: String
  });
  const Contact = mongoose.model('Contact', contactSchema);// we are converting schema into model(class) and later we will save it



// express specific stuff
app.use('/public', express.static('public')); // serving static files express .static is a middleware function
app.use(express.urlencoded()) // middleware to get data of form to express

// template engine pug specific
app.set('view engine', 'pug'); // set the template engine as pug
app.set('views', path.join(__dirname, 'views')); // set the views directory

// End points
app.get('/', (req, res)=> {
    res.render('Index.pug');
})
app.get('/Contacts.pug', (req, res)=> {
    res.render('Contacts.pug');   // render a view template
})
app.post('/Contacts.pug', (req, res)=> {
    var mydata = new Contact(req.body);
    mydata.save().then(()=> {
      res.send('your data is saved')
    }).catch(() => {
       res.status(400).send('data was not saved')
    });

    // res.render('Contacts.pug');already hm response send kr chuke hai ab isko rkha to error dega
})

// start the server
app.listen(port, ()=> {
    console.log(`the app started succesfully on port ${port}`);
})