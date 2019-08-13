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


class MovieUpdate extends Component {
    constructor(props){
        super(props)
        this.state= {
            id:this.props.match.params.id,
            name:'',
            rating:'',
            time:'',
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

    onUpdateMovie = async () => {
        const {id,name,rating,time} = this.state
        const arrayTime = time.split('/')
        const payload = {name,rating,time:arrayTime}

        await api.updatetMovieById(id,payload).then(res => {
            window.alert(`Movie Updated Successfully`)
            this.setState({
                name:'',
                rating:'',
                time:'',

            })
        })
    }

    componentDidMount = async () => {
        const {id} = this.state
        const movie = await api.getMovieById(id)
        this.setState({
            name:movie.data.data.name,
            rating:movie.data.data.rating,
            time:movie.data.data.time.join('/')

        })
    }

    render(){
        const {name,rating,time} = this.state

        return(
            <Wrapper>
                <Title>Update Movie</Title>

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

                <Button onClick={this.onUpdateMovie}>Update</Button>
                <CancelButton href={`/movies/list`}>Cancel</CancelButton>
            </Wrapper>
        );
    }
}

export default MovieUpdate