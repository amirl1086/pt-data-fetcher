
const https = require("https")
const axios = require("axios")
// const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const sendRequest = async (url, method, body) => {
    let response = null;
    if(method === "post") {
        response = await axios[method](url, body);
    }
    else if(method === "get") {
        response = await axios[method](url);
    }

    if(response.status === 200 && response.data) {
        return response.data.Table;
    }
    else {
        console.error(`Error fetching ${url}, status: ${response.status}\nData received: ${response.data}`)
        return [];
    }
}

module.exports = {
    sendRequest
}