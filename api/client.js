import axios from "axios";

const client = axios.create({
    baseURL: "http://170.187.155.55:27041/",
    timeout: 5000,
});

export default client;