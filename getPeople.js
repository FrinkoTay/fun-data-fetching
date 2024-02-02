const https = require('https')
const fs = require('fs')

function requestInstructions() {
    const options = {
        hostname: 'nc-leaks.herokuapp.com',
        path: '/api/people',
        method: 'GET',
      };
    const request = https.request(options, (response) => {
        let body = ""
        response.on('data', (packet) => {
            body += packet.toString()
        })
        response.on("end", () => {
            const parsedBody = JSON.parse(body)
            const arrNC = parsedBody.people.filter((person) => {
                return person.job.workplace === "northcoders"
            })
            fs.writeFileSync("northcoders.json", JSON.stringify(arrNC))
        })
    })
    request.end()
}

requestInstructions()