import React from 'react'
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'

import {NavBar} from '../components'

import {MovieList,MovieInsert,MovieUpdate,UploadForm,ToDo} from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function  App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/" exact component={MovieList} />
                <Route path="/uploadfile" exact component={UploadForm} />
                <Route path="/todo" exact component={ToDo} />
                <Route path="/movies/list" exact component={MovieList} />
                <Route path="/movies/create" exact component={MovieInsert} />
                <Route 
                    path="/movies/update/:id" exact component={MovieUpdate} />
            </Switch>
        </Router>
    )
}

export default App