import axios from 'axios';

const client = axios.create({
    baseURL: "https://dev-topstore.pantheonsite.io/wp-json/wc/v3",
    auth: {
        username: "ck_585f4a010018c5f8df53c6cb36d4dedcb83663ba",
        password: "cs_c581aa162f7857daa7bda08ba35eca19821dac0d"
    }
})

export default client