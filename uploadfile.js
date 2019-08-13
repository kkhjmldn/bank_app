var http  = require('http');
var formidable = require('formidable');

http.createServer(function (req, res) {
    if (req.url == '/uploadfile') {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            res.write('File Uploaded');
            res.end();
        })
    }else{
        res.end(req.url);
    }
}).listen(8080);