import React, {Component} from 'react';
import Task from "./Task";

class TasksList extends Component {

    render() {
        return (
            <div className="tasks">{
                this.props.tasks.map((task, _id) => {
                    console.log('________task______ task', task);
                    return <Task task={task}
                                 updateCallback={this.props.onUpdate}
                                 deleteCallback={this.props.onDelete}
                                 key={task._id}/>
                })
            }
            </div>
        );
    }
}

export default TasksList;