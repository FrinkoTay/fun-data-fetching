const https = require('https')
const fs = require('fs')

function requestInstructions() {
    const options = {
        hostname: 'nc-leaks.herokuapp.com',
        path: '/api/confidential',
        method: 'GET',
      };
    const request = https.request(options, (response) => {
        let body = ""
        response.on('data', (packet) => {
            body += packet.toString()
        })
        response.on("end", () => {
            const parsedBody = JSON.parse(body)
            //console.log(parsedBody.instructions)
            //console.log(parsedBody.tips)
            fs.writeFileSync("instructions.md", parsedBody.instructions)
        })
    })
    request.end()
}

requestInstructions()