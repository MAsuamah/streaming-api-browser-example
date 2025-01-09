const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

//This whole function is just to get the token
app.get('/', async (req, res) => {
  try {
    const response = await axios.post('https://api.assemblyai.com/v2/realtime/token', // use account token to get a temp user token
      { expires_in: 3600 }, // can set a TTL timer in seconds.
      { headers: { authorization: "6c9f7099dccb4fb48126da36ddf63ebf" } }); // AssemblyAI API Key goes here
    const { data } = response; // the response here is the token
    res.json(data); //Sends a JSON response composed of the specified data basically returning the data
  } catch (error) {
    const {response: {status, data}} = error;    
    res.status(status).json(data);//Sends a status and JSON response of the error basically returning a status and the error data
    //Another way to write the destructerd code above for understanding purpose
    //const status = error.response.status
    //const data = error.repsonse.data.error
    //JSON Example
    /* Error: Request failed with status code 401 
        ...
        request: {

        },
        response: {
          status:400,
          data:{
            error:''
          }
        }
    */
  }
});

app.set('port', 8000);
const server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${server.address().port}`);
});