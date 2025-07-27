import {Trash2} from 'lucide-react';
import './Task.css';
import {CheckCircle} from 'lucide-react'

export default function Task({ task, complete, deleteTask }) {
  return (
    <div>
      <button onClick={deleteTask} className='delete-btn' title = 'Delete task'>
        <Trash2 size={18} />
      </button>
      <label className="task-label" style={{textDecoration: task.done ? 'line-through' : 'none'}}>
        <button onClick={complete} className="complete-btn" title="Mark task as complete">
          <CheckCircle
            size={20}
            color={task.done? "#37964dff" : "#aaa"}
            />
        </button>
        {task.text}
      </label>
    </div>
  );
}
