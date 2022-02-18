// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

export default async function handler(req, res) {
    let returnValue = "";
    let returnStatus = 200;
    await axios.get('https://api.flipsidecrypto.com/api/v2/queries/1d3eb78f-f38c-45dd-85f3-7c81dca56138/data/latest').then(reply => {
        returnValue = reply.data;
        
    }).catch(err => {
        returnValue = { error: err }
        returnStatus = 400;
    })

    res.status(returnStatus).json(returnValue)
  }
  