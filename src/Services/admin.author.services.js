import axios from 'axios';
import BaseUrl from './baseUrl';
const baseUrl = BaseUrl();

export default new(class Admin_Service{
    // getAllAuthors({ pageSize, pageNumber }){
    //     return axios.get(`${baseUrl}/author/allauthors?pageSize=${pageSize}&pageNumber=${pageNumber}`)
    // }
    getAllAuthors(){
        console.log("baseurl", baseUrl);
        return axios.get(`${baseUrl}/author/allauthors`)
    }
    getAnAuthor(id){
        return axios.get(`${baseUrl}/author/${id}`)
    }
    createAuthor(data) {
        return axios.post(`${baseUrl}/author/register`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
    }
    editAuthor({ data, id }) {
        return axios.put(`${baseUrl}/author/edit/${id}`, data, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        })
    }
    
    activeAuthor(id) {
        return axios.put(`${baseUrl}/author/active/${id}`)
    }

    softDeleteAuthor(id) {
        return axios.put(`${baseUrl}/author/remove/${id}`)
    }

    deleteAuthor(id){
        return axios.delete(`${baseUrl}/author/delete/${id}`)
    }
})