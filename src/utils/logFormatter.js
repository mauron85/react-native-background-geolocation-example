function padLeft(nr, n, str) {
  return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

function formatLogs(logEntries, logFormatter) {
  var logEntriesCount = logEntries.length;
  var logLines = Array(logEntriesCount); //preallocate memory prevents GC
  for (var i = 0; i < logEntriesCount; i++) {
    logLines[i] = logFormatter(logEntries[i]);
  }
  return logLines;
}

export function formatAndroidLogs(logEntries) {
  var STYLES = Object();
  STYLES['ERROR'] = { backgroundColor:'white',color:'red' };
  STYLES['WARN'] = { backgroundColor:'black',color:'yellow' };
  STYLES['INFO'] = { backgroundColor:'white',color:'blue' };
  STYLES['TRACE'] = { backgroundColor:'white',color:'black' };
  STYLES['DEBUG'] = { backgroundColor:'white',color:'black' };

  var logFormatter = function(logEntry) {
    var d = new Date(Number(logEntry.timestamp));
    var dateStr = [d.getFullYear(), padLeft(d.getMonth()+1,2), padLeft(d.getDate(),2)].join('/');
    var timeStr = [padLeft(d.getHours(),2), padLeft(d.getMinutes(),2), padLeft(d.getSeconds(),2)].join(':');
    return {
      style: STYLES[logEntry.level],
      text: ['[', dateStr, ' ', timeStr, ']\t', logEntry.message].join('')
    };
  }

  return formatLogs(logEntries, logFormatter, STYLES);
}

export function formatIosLogs(logEntries) {
  var STYLES = Array();
  STYLES[1] = { backgroundColor:'white',color:'red' };
  STYLES[2] = { backgroundColor:'black',color:'yellow' };
  STYLES[4] = { backgroundColor:'white',color:'blue' };
  STYLES[8] = { backgroundColor:'white',color:'black' };
  STYLES[16] = { backgroundColor:'white',color:'black' };

  var logFormatter = function(logEntry) {
    var d = new Date(Number(logEntry.timestamp) * 1000);
    var dateStr = [d.getFullYear(), padLeft(d.getMonth()+1,2), padLeft(d.getDate(),2)].join('/');
    var timeStr = [padLeft(d.getHours(),2), padLeft(d.getMinutes(),2), padLeft(d.getSeconds(),2)].join(':');
    return {
      style: STYLES[logEntry.level],
      text: ['[', dateStr, ' ', timeStr, ']\t', logEntry.message].join('')
    };
  }

  return formatLogs(logEntries, logFormatter, STYLES);
}
