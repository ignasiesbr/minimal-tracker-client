import React, {useEffect, useState} from 'react'
import {fetchTodos, updateTodo,getVisibleTodos, deleteTodo, addTodo} from '../../../actions/todos';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

const TodoContainer = ({fetchTodos, updateTodo, deleteTodo, getVisibleTodos, addTodo, todos}) => {

    const [formData, setFormData] = useState({
        text:"",
    });
    const [currentFilter, setFilter] = useState("ALL");
    
    const fetchData = async () => {
        await fetchTodos();
        await getVisibleTodos();
    }
    useEffect(() => {
        fetchData();
      }, []);
    
    const handleClick = (e, id, status) => {
        updateTodo(id, status);
    }

    const handleDeleteTodo = async (e, id) => {
        console.log(id);
        await deleteTodo(id);
        await getVisibleTodos(currentFilter);
    }

    const generateTodoElements = todos => {
        if (!todos) {
            return null
        }
        return todos.map(todo => 
            <div key={todo._id}>
                <li 
                     className="todo-item" value={todo.text} onClick={(e) => handleClick(e,todo._id,todo.status)}>
                        {todo.text} - {todo.status} 
                </li>
                <span style={{display:"inline"}} onClick={e => handleDeleteTodo(e, todo._id)}>x</span>
            </div>)
    }

    const handleFilter = e => {
         setFilter(e.target.getAttribute('value'));
         getVisibleTodos(e.target.getAttribute('value'));
    }

    const handleAddTodo = async e => {
        e.preventDefault();
        console.log(currentFilter);
        await addTodo(formData);
        setFormData({
            text:"",
            deadline:""
        });
        await getVisibleTodos(currentFilter);
    }
    const handleChangeInput = e => {
        setFormData({...formData, [e.target.name]:e.target.value})
    }

    return (
        todos.loading ? (
        <h1>Loading. . .</h1>
    ) : 
    (
        <div className="todo-container">
        <h2 className="subtitle">Personal Tasks</h2>
        <ul className="todos">
            {generateTodoElements(todos.visibleTodos)}
        </ul>
        <div className="active-filter">
            <ul className="filter">
            <li className="filter-item" value="ALL" onClick={e => handleFilter(e)}>All</li>
            <li className="filter-item" value="COMPLETED" onClick={e => handleFilter(e)}>Completed</li>
            <li className="filter-item" value="ACTIVE" onClick={e => handleFilter(e)}>Active</li>
            </ul>
        </div>
        <div className="addtodo-container">
            <form onSubmit={e => handleAddTodo(e)}>
                <input type="text" name="text"  onChange={e => handleChangeInput(e)} />
                <input type="date" name="deadline"  onChange={e => handleChangeInput(e)} />
                <input type="submit" value="Add todo" />
            </form>
        </div>
        </div>
    )
    )
}
TodoContainer.propTypes = ({
    fetchTodos: PropTypes.func.isRequired,
    updateTodo: PropTypes.func.isRequired,
    getVisibleTodos: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    addTodo: PropTypes.func.isRequired,
    todos: PropTypes.object.isRequired,
  });

const mapStateToProps = state => ({
todos: state.todos
});


export default connect(mapStateToProps, {fetchTodos, getVisibleTodos, addTodo, deleteTodo, updateTodo})(TodoContainer)