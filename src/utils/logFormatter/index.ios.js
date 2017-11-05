import { padLeft, logFormatter } from './logFormatter';

export default function iosLogFormatter(logEntries) {
  var STYLES = Array();
  STYLES[1] = { backgroundColor:'white',color:'red' };
  STYLES[2] = { backgroundColor:'black',color:'yellow' };
  STYLES[4] = { backgroundColor:'white',color:'blue' };
  STYLES[8] = { backgroundColor:'white',color:'black' };
  STYLES[16] = { backgroundColor:'white',color:'black' };

  var logFormat = function(logEntry) {
    var d = new Date(Number(logEntry.timestamp) * 1000);
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
