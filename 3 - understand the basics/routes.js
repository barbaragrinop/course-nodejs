const fs = require('fs')

const requestHandler = (req, res) => {
    const url = req.url
    const method = req.method  

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<html>')
        res.write('<head><title>Enter messag</title></head>')
        res.write(
            '<body>' + 
                '<h1>Hello from my Node.js Server!</h1>' +
                '<form action="/message" method="POST">' + 
                    '<input type="text" name="msg"/>' + 
                    '<button type="submit">Send</button> '+ 
                '</form>'+ 
            '</body>'
        )
        return res.end()
    }
    
    if(url === '/message' && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log('chunk', chunk)
            body.push(chunk)
        })
    
        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            fs.writeFile('message.txt', message, (err) => {
                //only will be executed once the file creation is done
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })   
    }
    
    
    res.setHeader('Content-Type', 'text/html')
    res.write('<html>')
    res.write('<head><title>Out of if</title></head>')
    res.write(
        '<body>' + 
            '<h1>Hello from my Node.js Server!</h1>' +
        '</body>'
    )
    return res.end()
}

module.exports = requestHandler

/*

module.exports = { 
    requestHandler, 
    someText: 'Some hard coded text'
}

or

exports.someText = 'Some hard coded text'
exports.handler = requestHandler

*/