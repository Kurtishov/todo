import React from 'react';
import {Component} from 'react';
import FilterTasks from "./FilterTasks";
import ToDoListCreateTask from "./ToDoListCteateTask";
import TasksList from "./TasksList";
import axios from 'axios';

class ToDoList extends Component {
    constructor() {
        super();
        this.state = {
            tasks: [],
            filter: "all"
        }
    }

    clearCompleted = (e) => {
        console.log('______________ this.state.tasks', this.state.tasks);
        const clearCompleted = this.state.tasks;
        clearCompleted.forEach((c) => {
            if (c.isDone === true)
                axios.delete(`http://localhost:4016/Tasks/${c._id}`)
                    .then(res => {
                        this.setState({
                            tasks: this.state.tasks.filter((t) => !t.isDone)
                        })
                    })
                    .catch(function (err) {
                        console.log('______________ err', err);
                    })
        })
    };

    stateTasksIsDone = (e) => {
        axios.put('http://localhost:4016/tasks/all/update')
            .then(resp => {
                this.setState({
                    tasks: resp.data
                })
            })
            .catch(e => {
                console.log('______________ e', e);
            });
    };

    changeFilter = (filterValue) => {
        this.setState({filter: filterValue});
    };

    createNewTask = (e, task) => {
        this.setState({
            tasks: [...this.state.tasks, task]
        });
    };

    deleteTask = (taskId) => {
        const newTaskList = this.state.tasks.filter((t) => {
            return t._id !== taskId;
        });
        this.setState({
            tasks: newTaskList
        });
    };

    updateTask = (task) => {
        const newTaskList = this.state.tasks;
        newTaskList.forEach((t) => {
            if (t._id === task._id) {
                t.isDone = task.isDone;
                t.title = task.title;
            }
        });
        this.setState({
            tasks: newTaskList
        });
    };

    getVisibleTodos = (todos, filter) => {
        switch (filter) {
            case 'all':
                return todos;
            case 'completed':
                return todos.filter(t => t.isDone);
            case 'active':
                return todos.filter(t => !t.isDone);
            default:
                throw new Error('Unknown filter: ' + filter)
        }
    };

    componentWillMount() {
        axios.get('http://localhost:4016/tasks')
            .then((data) => {
                this.setState({
                    tasks: data.data
                })
            })
            .catch(function (error) {
                console.log('error', error);
            })
    }

    render() {
        let filteredTasks = this.getVisibleTodos(this.state.tasks, this.state.filter);
        return (
            <div className="todolist">
                <h1>TODO LIST</h1>
                <ToDoListCreateTask onCreate={this.createNewTask}/>

                <TasksList tasks={filteredTasks}
                           onDelete={this.deleteTask}
                           onUpdate={this.updateTask}
                />

                <section className="main">
                    <input
                        id="toggle-all"
                        className="toggle-all"
                        type="checkbox"
                        onChange={this.stateTasksIsDone}
                    />
                    <label
                        htmlFor="toggle-all"
                    />
                </section>

                <FilterTasks tasks={this.state.tasks}
                             filter={this.state.filter}
                             onFilterChanged={this.changeFilter}
                             onClearCompleted={this.clearCompleted}/>
            </div>
        );
    }
}

export default ToDoList;