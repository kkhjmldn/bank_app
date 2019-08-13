import {connect} from 'react-redux'
import {setVisibilityFilter} from '../actions'
import Link from '../components/Link'

const mapStateToProps = (state, ownProps) => ({
    active : ownProps.filter === state.setVisibilityFilter
})

const mapDispacthToProps = (dispacth, ownProps) => ({
    onClick: () => dispacth(setVisibilityFilter(ownProps.filter))
})

export default connect(
    mapStateToProps,
    mapDispacthToProps
)(Link)