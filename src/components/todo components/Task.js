import React, {Component} from 'react'
import axios from "axios";


class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            title: this.props.task.title
        };
        this.deleteTask = this.deleteTask.bind(this);
        this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    deleteTask(e) {
        axios.delete(`http://localhost:4016/Tasks/${this.props.task._id}`)
            .then(res => {
                this.props.deleteCallback(this.props.task._id);
            })
            .catch(function (error) {
                console.log('error', error);
            });
    };

    toggleTaskStatus = (e) => {
        axios({
            method: 'PUT',
            url: `http://localhost:4016/tasks/${this.props.task._id}`,
            data: {
                isDone: !this.props.task.isDone,
            }
        })
            .then(res => {
                this.props.task.isDone = !this.props.task.isDone;
                this.props.updateCallback(this.props.task);
            })
            .catch(function (error) {
                console.log('error', error);
            })
    };

    changeEdit() {
        this.setState({
            edit: true
        })
    }

    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }

    validateTask() {
        const trimTask = this.state.title.trim();
        return trimTask.length > 0;
    }

    handleSubmit(e) {
        e.preventDefault();
        const validationResult = this.validateTask(this.state.task);
        if (validationResult) {
            axios({
                method: 'PUT',
                url: `http://localhost:4016/tasks/${this.props.task._id}`,
                data: {
                    title: this.state.title.trim(),
                }
            }).then(res => {
                const newTitle = e.persist.value;
                const task = {...this.props.task};
                task.title = newTitle;
                this.setState({
                    edit: false
                });
                this.props.updateCallback(this.props.task);
            })
                .catch(function (error) {
                    console.log('error', error);
                })
        }
    }

    render() {
        let updateTextTask = '';
        if (this.state.edit) {
            updateTextTask = <input
                className='edit_text'
                value={this.state.title}
                autoFocus={true}
                onChange={this.changeTitle}
                onBlur={this.handleSubmit}/>

        } else {
            updateTextTask = <span className='text' onDoubleClick={this.changeEdit.bind(this)}>
                <p className='text_tasks'>{this.state.title}
                    <span className="delete"
                          onClick={this.deleteTask}/>
                </p>
            </span>
        }

        return (
           <form onSubmit={this.handleSubmit}>
            <div className={this.props.task.isDone ? 'task done' : 'task'}>
                <input className='checkbox testaaa'
                       type="checkbox"
                       checked={!!this.props.task.isDone}
                       onChange={this.toggleTaskStatus}/>
                {updateTextTask}
            </div>
           </form>
        );
    }
}

export default Task;