import React from 'react';
import {Component} from 'react';
import axios from 'axios';


class ToDoListCreateTask extends Component {

    constructor(props) {
        super(props);
        this.state = {
            task: ''
        };
        this.validateTask = this.validateTask.bind(this);
        this.onTaskChange = this.onTaskChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    validateTask(task) {
        const trimTask = task.trim();
        return trimTask.length > 0;
    }

    onTaskChange(e) {
        var val = e.target.value;
        this.setState({task: val})
    }

    handleSubmit(e) {
        e.preventDefault();
        const validationResult = this.validateTask(this.state.task);
        if (validationResult) {
            axios.post('http://localhost:4016/Tasks', {
                title: this.state.task.trim(),
                isDone: false,
            }).then(resp => {
                this.props.onCreate(e, resp.data);
                this.setState({
                    task: ''
                });
            })
        }
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <header className="header">
                        <h1>todos</h1>
                        <input
                            className='new-todo' type="text" min='1'
                            value={this.state.task}
                            onChange={this.onTaskChange}
                            placeholder='Add task and press Enter'
                            autoFocus={true}
                        />
                    </header>
                </div>
            </form>
        );
    }
}

export default ToDoListCreateTask;