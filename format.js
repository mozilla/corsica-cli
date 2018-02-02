function table(rows, formatters = []) {
  // size out the columns
  let columns = rows.reduce((cols, row) => {
    row.forEach((cell, i) => {
      let len = cell.toString().length;
      if (!cols[i]) {
        cols[i] = len;
      }
      if (len > cols[i]) {
        cols[i] = len;
      }
    });
    return cols;
  }, []);

  // draw it
  rows.forEach(row => {
    console.log(
      row.map(
        (cell, i) => ((formatters[i] || (_ => _))(pad(cell, columns[i])))
      ).join('  ')
    );
  });
}

function pad(s, n) {
  return s + Array((n - s.length) + 1).join(' ');
}

module.exports = {table, pad};
