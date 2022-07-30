import { Trash } from 'phosphor-react'
import { useState } from 'react'

import styles from './Task.module.css'


interface ITask {
  id: string,
  description: string,
  concluided: boolean

}

interface IData {
  taskToDo: ITask
  index: number
  handleDeleteTask: (id: string) => void
  onChangeValueConcluedTask: (id: string) => void
}



export function Task({ taskToDo, index, handleDeleteTask, onChangeValueConcluedTask }: IData) {


  const [isChecked, setIsChecked] = useState<boolean>(false)


  function handleCompleteTask() {
    setIsChecked(!isChecked)
    onChangeValueConcluedTask(taskToDo.id)
  }


  function onDelete() {
    handleDeleteTask(taskToDo.id)
  }

  return (
    <div className={styles.task}>
      <div className={styles.contentTask}>

        <input
          type="checkbox"
          id={`checked-${index}`}
          checked={isChecked}
          onChange={handleCompleteTask}


        />
        <span className={styles.checkmark}></span>

        <label
          htmlFor={`checked-${index}`}
          className={taskToDo.concluided ? styles.taskConclued : styles.taskNotConclued}
        >
          {taskToDo.description}
        </label>
      </div>

      <button
        onClick={onDelete}
      >
        <Trash size={20} />
      </button>

    </div>
  )
}