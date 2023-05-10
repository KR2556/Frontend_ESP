import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProhibitionCodeToCheck, deleteCheck, deleteProhibitionCode, getChecks, setProhibitonCodes } from "../../../features/Process/processSlice";
import CheckBlock from "./CheckBlock";



const CheckBlockContainer = ({formik}) => {
    
    const state = useSelector(state => state.process);
    const dispatch = useDispatch();

    function getChecksHandler(data) {
        dispatch(getChecks(data));
    }
  
    
    function deleteCheckHandler(id) {
        
        for (const prohibitionCodeToCheck of state.prohibitionCodesToCheck.filter(x => x.checkId === id)) {
            dispatch(deleteProhibitionCode(prohibitionCodeToCheck.id));
        }
        dispatch(deleteCheck(id));
    }

    function getProhibitionCodes(checkCodeId,setFieldValue) {
        dispatch(setProhibitonCodes(checkCodeId));
    }

    function addProhibitionCodeToCheckHandler(prohibitionCode) {
        dispatch(addProhibitionCodeToCheck(prohibitionCode))
    }

    function deleteProhibitionCodeToCheckHandler(id) {
        dispatch(deleteProhibitionCode(id))
    }


    if(state.isLoading) return null;

    return <CheckBlock 
            state={state} 
            getCheckskHandler={getChecksHandler}
            deleteCheckHandler={deleteCheckHandler}
            getProhibitionCodes={getProhibitionCodes}
            addProhibitionCodeToCheckHandler={addProhibitionCodeToCheckHandler}
            deleteProhibitionCodeToCheckHandler={deleteProhibitionCodeToCheckHandler}
            form={formik}
            />
}

export default CheckBlockContainer;