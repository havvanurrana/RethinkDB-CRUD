const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const r = require('rethinkdb');
const tasksRouter = require('./routes/tasks'); // Rotaları dahil et

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let conn;
r.connect({ host: 'localhost', port: 28015 }, (err, connection) => {
  if (err) throw err;
  conn = connection;
  r.db('test').tableList().run(conn, (err, result) => {
    if (err) throw err;

    if (!result.includes('tasks')) {
      r.db('test').tableCreate('tasks').run(conn, (err) => {
        if (err) throw err;
        console.log('Tablo oluşturuldu.');
      });
    }
  });
  app.use((req, res, next) => {
    req.conn = conn;
    next();
  });
});

app.use('/', tasksRouter); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
