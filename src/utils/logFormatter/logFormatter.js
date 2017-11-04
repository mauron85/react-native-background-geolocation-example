export function padLeft(nr, n, str) {
  return Array(n - String(nr).length + 1).join(str || '0') + nr;
}

export function logFormatter(logEntries, logFormat) {
  var logEntriesCount = logEntries.length;
  var logLines = Array(logEntriesCount); //preallocate memory prevents GC
  for (var i = 0; i < logEntriesCount; i++) {
    logLines[i] = logFormat(logEntries[i]);
  }
  return logLines;
}
