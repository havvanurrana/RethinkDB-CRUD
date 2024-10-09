const express = require('express');
const router = express.Router();
const r = require('rethinkdb');

// Görevleri listelemek için..
router.get('/tasks', (req, res) => {
  r.db('test').table('tasks').run(req.conn, (err, cursor) => {
    if (err) throw err;
    cursor.toArray((err, tasks) => {
      if (err) throw err;
      res.json(tasks); 
    });
  });
});

// Görev eklemek için
router.post('/add-task', (req, res) => {
  const { task } = req.body;
  r.db('test').table('tasks')
    .insert({ task, createdAt: r.now() })
    .run(req.conn, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

// Görev silmek için
router.post('/delete-task/:id', (req, res) => {
  const taskId = req.params.id;
  r.db('test').table('tasks')
    .get(taskId)
    .delete()
    .run(req.conn, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

// Görev güncellemek için 
router.post('/update-task/:id', (req, res) => {
  const taskId = req.params.id;
  const newTask = req.body.task;
  r.db('test').table('tasks')
    .get(taskId)
    .update({ task: newTask })
    .run(req.conn, (err, result) => {
      if (err) throw err;
      res.redirect('/');
    });
});

module.exports = router;
