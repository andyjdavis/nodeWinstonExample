export default {};

var winston = require('winston');
winston.remove(winston.transports.Console);

//winston.add(winston.transports.File, { filename: 'winston.log', level: 'debug'  });
const logger = new (winston.Logger)({
  transports: [
    new (winston.transports.File)({ filename: 'winston.log' })
  ] 
});
 
logger.log('info', 'log() call with level == info, a message and nothing else');
logger.log('info', 'info() call with a mesage that contains a token for substitution --> %d', 123);
logger.info('info() call with a message and nothing else');
logger.info('info() call with a json parameter containing timestamp and pid', {timestamp: Date.now(), pid: process.pid});
logger.info('info() call with a json parameter containing favColor', {favColor: 'green'});


var options = {
	from: new Date - 24 * 60 * 60 * 1000,
	until: new Date,
	limit: 10,
	start: 0,
	order: 'desc',
	fields: ['message']
};
logger.query(options, function (err, results) {
	if (err) {
	  throw err;
	}

	console.log(results);
});

logger.transports.file.level = 'error';

logger.info('info() called after setting level to error. Should not be logged.');
logger.error('error() called after setting level to error. Should be logged.');