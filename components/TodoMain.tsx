import { useState, useEffect } from 'react';

const TodoMain = () => {
  const [tasks, setTasks] = useState<string[]>([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = e.currentTarget.elements.namedItem('newTask') as HTMLInputElement;
    if (newTask.value.trim() !== '') {
      setTasks([...tasks, newTask.value]);
      localStorage.setItem('tasks', JSON.stringify([...tasks, newTask.value]));
      newTask.value = '';
    } else {
      alert('Please do not enter an empty value!');
    }
  };

  const handleTaskCompletion = (task: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((prevTask) => {
        if (prevTask === task) {
          return `✔️ ${prevTask}`;
        }
        return prevTask;
      })
    );
  };

  const handleTaskRemoval = (task: string) => {
    if (confirm('Are you sure')) {
      setTasks((prevTasks) => prevTasks.filter((prevTask) => prevTask !== task));
      localStorage.setItem(
        'tasks',
        JSON.stringify(tasks.filter((prevTask) => prevTask !== task))
      );
    }
  };

  return (
    <div className="container">
      <form className="task-form" onSubmit={handleAddTask}>
        <input type="text" className="form-item input-task" name="newTask" placeholder="Enter the task" />
        <button type="submit" className="form-item btn-add-task">
          <i className="fa fa-plus" aria-hidden="true"></i>
        </button>
      </form>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <li className="task-item" key={index}>
            <span className="task-title" onClick={() => handleTaskCompletion(task)}>
              {task.startsWith('✔️') ? task.slice(2) : task}
            </span>
            <button className="task-btn btn-complete-task">
              <i className="fa fa-check" aria-hidden="true"></i>
            </button>
            <button className="task-btn btn-remove-task" onClick={() => handleTaskRemoval(task)}>
              <i className="fa fa-times" aria-hidden="true"></i>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoMain;
