document.addEventListener('DOMContentLoaded', () => {
  fetch('/tasks')
    .then(response => response.json())
    .then(tasks => {
      const taskList = document.getElementById('task-list');
      tasks.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.task} 
          <form action="/update-task/${task.id}" method="POST" style="display:inline;">
            <button type="submit">Güncelle</button>
          </form>
          <form action="/delete-task/${task.id}" method="POST" style="display:inline;">
            <button type="submit">Sil</button>
          </form>`;
        taskList.appendChild(li);
      });
    });
});
