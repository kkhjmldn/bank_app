import React , {Component} from 'react'
import api from '../api'

import styled from 'styled-components'

const Title = styled.h1.attrs({
    className:'h1'
})``

const Wrapper  = styled.div.attrs({
    className:'form-group'
})` margin:0 30px;`

const Label = styled.label`
    margin:5px;
`

const InputText = styled.input.attrs({
    className:'form-control'
})`margin:5px;`

const Button = styled.button.attrs({
    className:'btn btn-primary'
})`margin:15px 15px 15px 5px;`

const CancelButton = styled.a.attrs({
    className:'btn btn-default'
})`margin:15px 15px 15px 5px;`

class MovieInsert extends Component {
    constructor(props){
        super(props)
        this.state= {
            name:'',
            rating:'',
            time:'',
            imageUrl:''
        }
    }

    onChangeInputName = async e => {
        const name = e.target.value
        this.setState({name:name})
    }

    onChangeInputRating= async e => {
        const rating = e.target.validity.valid ? e.target.value : this.state.rating
        this.setState({rating})
    }

    onChangeInputTime = async e => {
        const time = e.target.value
        this.setState({time})
    }

    onFileUplad = async e =>{
        
    }

    onIncludeMovie = async () => {
        const {name,rating,time} = this.state
        const arrayTime = time.split('/')
        const payload = {name,rating,time:arrayTime}

        await api.insertMovie(payload).then(res => {
            window.alert(`Movie Inserted Successfully`)
            this.setState({
                name:'',
                rating:'',
                time:'',

            })
        })
    }

    render(){
        const {name,rating,time,imageUrl} = this.state
        return(
            <Wrapper>
                <Title>Add Movie</Title>

                <Label>Name :</Label>
                <InputText
                    type="text"
                    value={name}
                    onChange={this.onChangeInputName} />

                <Label>Rating :</Label>
                <InputText
                    type="number"
                    step="0.1"
                    lang="en-US"
                    min="0"
                    max="10"
                    pattern="[0-9]+([,\.]+[0-9]+)?"
                    value={rating}
                    onChange={this.onChangeInputRating} />
                
                <Label>Time :</Label>
                <InputText
                    type="text"
                    value={time}
                    onChange={this.onChangeInputTime} />
                
                <Label>Image :</Label>
                <InputText
                    type="file"
                    value={imageUrl}
                    onChange={this.onFileUplad} />

                <Button onClick={this.onIncludeMovie}>Add</Button>
                <CancelButton href={`/movies/list`}>Cancel</CancelButton>
            </Wrapper>
        );
    }
}

export default MovieInsert