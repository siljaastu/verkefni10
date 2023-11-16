import React, { useState, useEffect } from 'react';

/**
 * @typedef {object} Task
 * @property {string}  id ID verks.
 * @property {string}  title Nafn á verki.
 * @property {boolean} isChecked Staða verks.
 */

export default function Todo() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  // Keyrir bara einu sinni þegar Todo component er búinn til
  useEffect(() => {
    const storedTasks = localStorage.getItem('localTasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  function addTask() {
    if (task) {
      const newTask = {
        id: new Date().getTime().toString(),
        title: task,
        isChecked: false,
      };
      // @ts-ignore
      setTasks([newTask, ...tasks]);
      localStorage.setItem('localTasks', JSON.stringify([...tasks, newTask]));
      setTask('');
    }
  }

  function handleCheck(checkedTask) {
    const currentTask = tasks.find((t) => t.id === checkedTask.id);
    const remaining = tasks.filter((t) => t.id !== checkedTask.id);

    const checked = remaining.filter((t) => t.isChecked);
    const unchecked = remaining.filter((t) => !t.isChecked);

    currentTask.isChecked = !currentTask.isChecked;

    if (currentTask.isChecked) {
      checked.push(currentTask)
    } else {
      unchecked.push(currentTask);
    }

    const updated = [...unchecked, ...checked];

    setTasks(updated);
    localStorage.setItem('localTasks', JSON.stringify(updated));
  }

  function handleDelete(deletedTask) {
    const deleted = tasks.filter((t) => t.id !== deletedTask.id);
    setTasks(deleted);
    localStorage.setItem('localTasks', JSON.stringify(deleted));
  }

  function handleClear() {
    setTasks([]);
    localStorage.removeItem('localTasks');
  }

  function getUnfinished() {
    return tasks.filter((t) => !t.isChecked);
  }

  function getInfoText() {
    const numUnfinished = getUnfinished().length;

    if (!numUnfinished) {
      return 'ekki með nein ókláruð verkefni';
    }
    
    if (numUnfinished === 1) {
      return `með ${getUnfinished().length} óklárað verkefni`
    }
    
    if (numUnfinished > 1) {
      return `með ${getUnfinished().length} ókláruð verkefni`
    }

    return '';
  }

  return (
    <div className="container row">
      <h1 className="mt-4 mb-4 text-white">gera.is</h1>
      <div className="col-10">
        <input
          name="task"
          type="text"
          value={task}
          placeholder="Hvað þarftu að gera...?"
          className="form-control"
          onChange={(e) => setTask(e.target.value)}
        />
      </div>
      <div className="col-1">
        <button className="btn btn-info form-control" onClick={addTask}>
          <i className="material-icons">add</i>
        </button>
      </div>
      <div className="badge text-secondary">
        Þú ert{' '}
        {getInfoText()}
      </div>
      {tasks.map((t) => (
        <React.Fragment key={t.id}>
          <div className="col-1">
            <button
              className={`m-2 btn ${
                t.isChecked ? 'btn-success' : 'btn-light'
              }`}
              onClick={() => handleCheck(t)}
            >
              <i className="material-icons">check</i>
            </button>
          </div>
          <div className="col-10">
            <span
              className={`form-control bg-white btn mt-2 ${
                t.isChecked ? 'text-success' : 'text-dark'
              }`}
              style={{ textAlign: 'left', fontWeight: 'Bold' }}
            >
              {t.title}
            </span>
          </div>
          <div className="col-1">
            <button className=" mt-2 btn" onClick={() => handleDelete(t)}>
              <i className="material-icons">delete</i>
            </button>
          </div>
        </React.Fragment>
      ))}
      {!tasks.length ? null : (
        <div>
          <button
            className="btn btn-light mt-4 mb-4"
            onClick={() => handleClear()}
          >
            Hreinsa lista
          </button>
        </div>
      )}
    </div>
  );
}
