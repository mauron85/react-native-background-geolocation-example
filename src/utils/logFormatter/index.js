import { padLeft, logFormatter } from './logFormatter';

export default function androidLogFormatter(logEntries) {
  var STYLES = Object();
  STYLES['ERROR'] = { backgroundColor:'white',color:'red' };
  STYLES['WARN'] = { backgroundColor:'black',color:'yellow' };
  STYLES['INFO'] = { backgroundColor:'white',color:'blue' };
  STYLES['TRACE'] = { backgroundColor:'white',color:'black' };
  STYLES['DEBUG'] = { backgroundColor:'white',color:'black' };

  var logFormat = function(logEntry) {
    var d = new Date(Number(logEntry.timestamp));
    var dateStr = [d.getFullYear(), padLeft(d.getMonth()+1,2), padLeft(d.getDate(),2)].join('/');
    var timeStr = [padLeft(d.getHours(),2), padLeft(d.getMinutes(),2), padLeft(d.getSeconds(),2)].join(':');
    return {
      id: logEntry.timestamp,
      style: STYLES[logEntry.level],
      text: ['[', dateStr, ' ', timeStr, ']\t', logEntry.message].join('')
    };
  }

  return logFormatter(logEntries, logFormat, STYLES);
}
