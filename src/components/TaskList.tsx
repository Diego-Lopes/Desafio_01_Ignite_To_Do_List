import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    let id: number = tasks.length + 1; //não é um random mais gerador de id único previnindo erros futuros.

    console.log(id);

    if (newTaskTitle !== "") {
      const newTask: Task = {
        id,
        title: newTaskTitle,
        isComplete: false,
      };

      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
    } else {
      alert("O campo não pode ser vazio. 🤖");
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const checkedTask = tasks.map((item) =>
      item.id === id
        ? {
            ...item, //pagar o valor antigo
            isComplete: !item.isComplete, //sobreescrevendo o valor de isComplete
            //passamos exclamação para inverter seu tipo se é false se torna true e virce-versa.
          }
        : item
    );
    setTasks(checkedTask);
    console.log(tasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //O filter gera um novo array verificando os ids se são diferente do argumento. e retornamos um novo array sem ele.
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
      </main>
    </section>
  );
}
