var express = require('express'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        path = require('path'),
        port = 8000;

//Create express app
var app = express();

//Use bodyParser to parse form data sent via HTTP POST
app.use(bodyParser.urlencoded({ extended: true }));

//Tell server where views are and what templating engine I'm using
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/quotingdojo1-234');

//QUOTE
var QuoteSchema = new mongoose.Schema({
    quote: { type: String, required: true, minlength: 1},
    user: {type: String, required: true, minlength: 1},
}, {timestamps: true });
mongoose.model('Quote', QuoteSchema);
var Quote = mongoose.model('Quote', 'QuoteSchema')

// const options = {
//   hostname: 'localhost',
//   port: 8000,
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded',
//   }
// };
//
// const req = http.request(options, (res) => {
//   console.log(`STATUS: ${res.statusCode}`);
//   console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
//   res.setEncoding('utf8');
//   res.on('data', (chunk) => {
//     console.log(`BODY: ${chunk}`);
//   });
//   res.on('end', () => {
//     console.log('No more data in response.');
//   });
// });
//
// req.on('error', (e) => {
//   console.error(`problem with request: ${e.message}`);
// });
//USER


// UserSchema.post('save', function(doc){
//     console.log('%s has been saved', doc._id);
// });



// UserSchema.post('save', function(doc){
//     console.log('%s has been saved', doc._id);



//ROUTES


app.get('/', function(req, res){
    Quote.find({},function(err, results){
        if(err) {console.log('err');}
        res.render('index', {quotes: results });
    })
});

app.post('/quotes', function(req, res){
    console.log("POST DATA", req.body);
    var quote = new Quote({quote: req.body.quote, user: req.body.user});
    Quote.create(req.body, function(err, result){
            if(err) {console.log(err);}
            res.redirect('/quotes')
    });
})


app.get('/quotes', function(req, res){
    Quote.find({},function(err, results){
        if(err) {console.log('err');}
        res.render('quotes', {quotes: results });
    })
});


app.listen(port, function(){
        console.log("Running on: ", port)
})
