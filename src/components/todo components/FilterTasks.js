import React from 'react';


class FilterTasks extends React.Component {

    hendleFilterChanged = (e) => {
        this.props.onFilterChanged(e.currentTarget.dataset.value);
    };

    render() {
        return (
            <div className="filtersContainer">
                <span className="items">{this.props.tasks.filter((t) => !t.isDone).length} items left </span>
                <button className={`active ${this.props.filter === 'active' ? 'choose' : ''}`}
                        data-value="active"
                        onClick={this.hendleFilterChanged}>Active
                </button>
                <button className={`completed ${this.props.filter === 'all' ? 'choose' : ''}`}
                        data-value="completed"
                        onClick={this.hendleFilterChanged}>Completed
                </button>
                <button className={`all ${this.props.filter === 'all' ? 'choose' : ''}`}
                        data-value="all"
                        onClick={this.hendleFilterChanged}>All
                </button>
                <button className="clear-completed"
                        data-value="clear-completed"
                        onClick={this.props.onClearCompleted}>Clear Completed
                </button>
            </div>
        )
    }
}

export default FilterTasks