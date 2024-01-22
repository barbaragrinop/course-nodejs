const http = require('http')
const fs = require('fs')

const server = http.createServer((req, res) => {
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

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]
            fs.writeFileSync('message.txt', message)
            
        })

        res.statusCode = 302
        res.setHeader('Location', '/')
        return res.end()
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
})

server.listen(3000);