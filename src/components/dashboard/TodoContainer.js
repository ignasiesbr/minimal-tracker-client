import React, {useEffect, useState} from 'react'
import {fetchTodos, updateTodo,getVisibleTodos, deleteTodo, addTodo} from '../../actions/todos';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import Spinner from '../layout/Spinner';

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
        await deleteTodo(id);
        await getVisibleTodos(currentFilter);
    }

    const generateTodoElements = todos => {
        if (!todos) {
            return null
        }
        return todos.map(todo => 
            <div className="todos-list__container" key={todo._id}>
                <li className={`todos-list__item todos-list__item--${todo.status}`} value={todo.text}>
                <span  onClick={(e) => handleClick(e,todo._id,todo.status)} className="todos-list__text">{todo.text}</span>
                <span className="todos-list__date">{!todo.deadline ? "N/D" : todo.deadline.split("T")[0]}</span>
                <span className={`todos-list__status todos-list__status--${todo.status}`}></span>
                <svg className="todos-list__delete" onClick={e => handleDeleteTodo(e, todo._id)}>
                    <use xlinkHref="/sprite.svg#icon-delete_outline"></use>
                </svg>
                </li>
            </div>)
    }

    const handleFilter = e => {
         setFilter(e.target.getAttribute('value'));
         getVisibleTodos(e.target.getAttribute('value'));
    }

    const handleAddTodo = async e => {
        e.preventDefault();
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
        <Spinner/>
    ) : 
    (
        <div className="todo-container">
            <h2 className="heading-secondary u-margin-bottom-small u-border-bottom-medium">Personal Tasks</h2>
            <ul className="todos-list">
                {generateTodoElements(todos.visibleTodos)}
            </ul>
            <div className="filter-container">
                <ul className="filter-list">
                    <li className={`filter-list__item ${todos.filter==='ALL' ? "filter-list__item--selected" : ""}`} value="ALL" onClick={e => handleFilter(e)}>All</li>
                    <li className={`filter-list__item ${todos.filter==='COMPLETED' ? "filter-list__item--selected" : ""}`} value="COMPLETED" onClick={e => handleFilter(e)}>Completed</li>
                    <li className={`filter-list__item ${todos.filter==='ACTIVE' ? "filter-list__item--selected" : ""}`} value="ACTIVE" onClick={e => handleFilter(e)}>Active</li>
                </ul>
            </div>
            <div className="addtodo-container">
                <form className="form2" onSubmit={e => handleAddTodo(e)}>
                    <input className="form2__input" placeholder="Write your task" type="text" name="text"  onChange={e => handleChangeInput(e)} />
                    <input className="form2__input u-margin-bottom-small" type="date" name="deadline"  onChange={e => handleChangeInput(e)} />
                    <input type="submit" className="btn2 u-center-text" value="Add todo" />
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