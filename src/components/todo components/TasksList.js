import React, {Component} from 'react';
import Task from "./Task";

class TasksList extends Component {

    render() {
        return (
            <div className="tasks">{
                this.props.tasks.map((task, _id) => {
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