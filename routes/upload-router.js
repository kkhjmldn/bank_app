const express = require('express')
const IncomingForm = require('formidable').IncomingForm
const router = express.Router()


module.exports  = function upload (req,res ) {
    var form = new IncomingForm();
    form.on('file', (field, file) => {

    })
    form.on('end', () => {
        res.json()
    })
    form.parse(req)
};