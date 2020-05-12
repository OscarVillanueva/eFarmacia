import axios from 'axios';

const client = axios.create({
    baseURL: process.env.COMMERCE_API,
    auth: {
        username: process.env.COMSUMER_KEY,
        password: process.env.CONSUMER_SECRET
    }
})

export default client