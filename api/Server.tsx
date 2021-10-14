import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Server = axios.create({
    baseURL: "https://ubycohub-server.herokuapp.com/" 
    // baseURL:"https://dfb0-105-112-45-19.ngrok.io/"
})


Server.interceptors.request.use(async (config) => {
    const token = await AsyncStorage.getItem('token')
    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config
})

export default Server;