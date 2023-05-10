import axios from "axios";

const instance = axios.create({
    baseURL:"https://localhost:7198/api/Check/",
    headers: {
        'Content-Type': 'application/json'
    },

});


export const checkAPI = {
    
    getCheckCodes(isOnlyFreeCheckCodes = false) {
        return instance.get(`GetCheckCodes?isOnlyFreeCheckCodes=${isOnlyFreeCheckCodes}`).then(response => response.data);
    },
    
    getCheckCodeById(id) {
        return instance.get(`GetCheckCodeById/${id}`).then(response => response.data);
    },

    addCheckCode(data) {
        return instance.post("AddCheckCode",data);
    },
    
    updateCheckCode(checkCodeToUpdate) {
        return instance.put("UpdateCheckCode",checkCodeToUpdate);
    },
    deleteCheckCode(id) {
        return instance.delete(`DeleteCheckCode/${id}`);
    },



    getCheckBlocks() {
        return instance.get('GetCheckBlocks').then(response => response.data);
    },
    getCheckBlockById(id) {
        return instance.get(`GetCheckBlockById/${id}`).then(response => response.data);
    },
    addCheckBlock(data) {
        return instance.post("AddCheckBlock",data);
    },
    updateCheckBlock(checkBlockToUpdate) {
        return instance.put("UpdateCheckBlock",checkBlockToUpdate);
    },
    deleteCheckBlock(id) {
        return instance.delete(`DeleteCheckBlock/${id}`);
    },



    getBlocks() {
        return instance.get('GetBlocks').then(response => response.data);
    },
    getBlockById(id) {
        return instance.get(`GetBlockById/${id}`).then(response => response.data);
    },
    addBlock(data) {
        return instance.post("AddBlock",data);
    },
    updateBlock(blockToUpdate) {
        return instance.put("UpdateBlock",blockToUpdate);
    },
    deleteBlock(id) {
        return instance.delete(`DeleteBlock/${id}`);
    },


    getSubjectTypeById(id) {
        return instance.get(`GetSubjectTypeById/${id}`).then(response => response.data);
    },
    getSubjectTypes() {
        return instance.get('GetSubjectTypes').then(response => response.data);
    },
    addSubjectType(data) {
        return instance.post("AddSubjectType",data);
    },
    updateSubjectType(subjectTypeToUpdate) {
        return instance.put("UpdateSubjectType",subjectTypeToUpdate);
    },
    deleteSubjectType(id) {
        return instance.delete(`DeleteSubjectType/${id}`);
    },
    getProhibitionCodes(prohibitionCodeName) {
        return prohibitionCodeName ? instance.get(`GetProhibitionCodes?filter=${prohibitionCodeName}`).then(response => response.data) : 
                                     instance.get('GetProhibitionCodes').then(response => response.data);
    },
    addProhibitionCode(data) {
        return instance.post("AddProhibitionCode",data).then(response => response.data);
    },
    updateProhiitonCode(data) {
        return instance.put("UpdateProhibitionCode",data).then(response => response.data);
    },
    deleteProbitionCode(id) {
        return instance.delete(`DeleteProhibitionCode/${id}`)
    },

   
    getClientTypeById(id) {
        return instance.get(`GetClientTypeById/${id}`).then(response => response.data);
    },
    getClientTypes() {
        return instance.get('GetClientTypes').then(response => response.data);
    },
    saveClientType(data) {
        return instance.post(`SaveClientType`,data).then(response => response.data);
    },
    deleteClientType(id) {
        return instance.delete(`DeleteClientType/${id}`);
    },

    getSystemTypeById(id) {
        return instance.get(`GetSystemTypeById/${id}`).then(response => response.data);
    },
    getSystemTypes() {
        return instance.get('GetSystemTypes').then(response => response.data);
    },
    saveSystemType(data) {
        return instance.post(`SaveSystemType`,data).then(response => response.data);
    },
    deleteSystemType(id) {
        return instance.delete(`DeleteSystemType/${id}`);
    },

    
    getSystemBlockById(id) {
        return instance.get(`GetSystemBlockById/${id}`).then(response => response.data);
    },
    getSystemBlocks() {
        return instance.get('GetSystemBlocks').then(response => response.data);
    },
    saveSystemBlock(data) {
        return instance.post(`SaveSystemBlock`,data).then(response => response.data);
    },
    deleteSystemBlock(id) {
        return instance.delete(`DeleteSystemBlock/${id}`);
    },

    getRouteById(id) {
        return instance.get(`GetRouteById/${id}`).then(response => response.data);
    },
    getRoutes() {
        return instance.get('GetRoutes').then(response => response.data);
    },
    saveRoute(data) {
        return instance.post(`SaveRoute`,data).then(response => response.data);
    },
    deleteRoute(id) {
        return instance.delete(`DeleteRoute/${id}`);
    }

}