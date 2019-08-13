import axios from 'axios'


const uploadUrl = axios.create({
    baseURL: 'http://localhost:3001/upload',
    
})

export const doUpload = () => {

}

const uploadFile = {
    doUpload
}


export default uploadFile