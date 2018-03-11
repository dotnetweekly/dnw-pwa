const app = require('./server/app');

app.set('port', process.env.PORT || 5000);

const server = app.listen(app.get('port'), function() {
	console.log('Express server listening on port ' + server.address().port);
});
