

import styles from './Tasks.module.css'

import { ChangeEvent, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { Task } from './Task';

interface ITask {
  id: string,
  description: string,
  concluided: boolean

}

export function Tasks() {

  const [tasks, setTasks] = useState<ITask[]>([])

  const [task, setTask] = useState('')

  const [tasksConclueds, setTasksConclueds] = useState<number>(0)



  useEffect(() => {
    handleReduceTask()
  }, [tasks])

  function handleReduceTask() {





    const tasksConcluedsNow = tasks.reduce((total, element) => element.concluided ? total + 1 : total + 0, 0)



    setTasksConclueds(tasksConcluedsNow)
  }




  function onChangeValueConcluedTask(id: string) {

    const tasksAfeterConclued = tasks.map(task => {
      if (task.id === id) {
        return {
          id: task.id,
          description: task.description,
          concluided: !task.concluided
        }

      }
      return task
    })



    setTasks(tasksAfeterConclued)






  }





  function handleCreateNewTaks() {


    if (task.length === 0) {
      return
    }

    const newTask: ITask = {
      id: uuidv4(),
      description: task,
      concluided: false

    }

    setTasks([...tasks, newTask])
    setTask('')


  }


  function handleNewTask(event: ChangeEvent<HTMLInputElement>) {

    setTask(task => event.target.value)
  }

  function handleDeleteTask(id: string) {

    const tasksWithoutDeleteOnse = tasks.filter(task => task.id !== id)
    setTasks(tasksWithoutDeleteOnse)

  }

  return (


    <>

      <div className={styles.containerInput}>
        <input
          name="input"
          className={styles.input}
          type="text"
          placeholder='Adicione uma nova tarefa'
          onChange={handleNewTask}
          value={task}
        />
        <button onClick={handleCreateNewTaks}>Criar </button>
      </div>

      <div className={styles.containerTasks}>

        <header className={styles.tasksInfo}>

          <div className={styles.created}>
            <strong>Tarefas criadas: </strong>
            <span> {tasks.length}</span>
          </div>

          <div className={styles.done}>
            <strong>Tarefas concluidas: </strong>
            <span> {tasksConclueds} de {tasks.length}</span>
          </div>

        </header>

        <div className={styles.taskList}>

          {
            tasks.map((task, index) => {
              return <Task
                key={task.id}
                taskToDo={task}
                index={index}
                handleDeleteTask={handleDeleteTask}
                onChangeValueConcluedTask={onChangeValueConcluedTask}


              />
            })
          }

        </div>

      </div >
    </>


  )

}