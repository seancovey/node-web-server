const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname +'/views/partials');
app.set('view engine','hbs');

hbs.registerHelper('getCurrentYear', () =>
{
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) =>
{
    return text.toUpperCase();
});

app.use((req, res, next) => 
{
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log); 
    fs.appendFile('server.log ',log+'\n', (err) => {
        if(err)
        {
            console.log('Unable to append file.');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs',
    {
        pageTitle : 'HOME PAGE',
        welcomeMessage : 'Welcome to my Home page.'        
    });
});

app.get('/about', (req, res) =>
{
    res.render('about.hbs', {
        pageTitle : 'ABOUT PAGE'        
    });
});

app.get('/bad', (req, res) =>
{
    res.send({
        errorMessage : 'Unable to handle request.'
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle : 'PROJECTS'
    });
});

app.listen(port, () =>
{
    console.log('Server is up on port 3000.');
});