import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router";
import { addCheckBlock, addSelectedCode, deleteSelectedCode, getCheckBlockById, InitCheckBlock,updateCheckBlock } from "../../../features/CheckBlock/checkBlockSlice";
import CheckBlockForm from "./CheckBlockForm";

const CheckBlockContainerForm = function({edit}) {
   
    const params =  useParams();
    const state = useSelector(state => state.checkBlock)

    const dispatch = useDispatch(); 
    useEffect(() => {
       
        dispatch(InitCheckBlock());
        
        if(edit) {
           dispatch(getCheckBlockById(params.id));
        }

   },[])

    const formik = useFormik({
        initialValues:{
            id:0,
            block:'',
            shortName:'',
            subjects:'',
            code:'',
        }
    });

    if(edit) {
        setValues();
    }

    function addCheckCode(data) {
        dispatch(addSelectedCode(data));

    }
    function deleteCheckCode(data) {
        dispatch(deleteSelectedCode(data));
    }

    function setValues() {
        formik.initialValues.id = state.id;
        formik.initialValues.block = state.block;
        formik.initialValues.shortName = state.shortName;
        formik.initialValues.subjects = state.subjects;
    }
  
    function sendData(data) {
        
        const request = {
            id:state.id,
            blockId:data.block,
            shortName:data.shortName,
            subjects:data.subjects,
            CheckCodeIds:state.selectedCodes.map(x=> x.id)
        }
    
        if(edit) {
            dispatch(updateCheckBlock(request))
        }
        else {
            dispatch(addCheckBlock(request));
        }        
    }


    if(state.redirectFlag) {
        return <Navigate to={"/checkBlocks"}/>
    }

    return state.isLoading ?
    (<div>Загрузка...</div>) :
    ( <CheckBlockForm 
        state={state} 
        sendData={sendData} 
        addCheckCode={addCheckCode} 
        deleteCheckCode={deleteCheckCode} 
        formik={formik}
        />)
}

export default CheckBlockContainerForm;