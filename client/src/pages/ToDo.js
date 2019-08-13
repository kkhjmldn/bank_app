import React, { Component} from 'react'


import Footer from './todo/components/Footer'
import AddTodo from './todo/containers/AddTodo'
import VisibleTodoList from './todo/containers/VisibleTodoList'


const Todo = () => (
    <div>
        <AddTodo />
        <VisibleTodoList />
        <Footer />
    </div>
)

class ToDo extends Component {

    render() {
        return (
          
                <Todo />
           
        );
    }
}

export default ToDo