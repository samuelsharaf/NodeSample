var express = require('express');
var fs = require('fs');
var pg = require('pg');
var app = express();
app.set('port', process.env.PORT || 3000);

app.get('/', function(request, response) {
   //read the file
   var buffer = new Buffer(fs.readFileSync('index.html'));
   response.send(buffer.toString('utf-8'));
});
// custom 404 page
app.use(function(req, res){
        res.type('text/plain');
        res.status(404);
        res.send('404 - Not Found');
});

// custom 500 page
app.use(function(err, req, res, next){
        console.error(err.stack);
        res.type('text/plain');
        res.status(500);
        res.send('500 - Server Error');
});


app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
