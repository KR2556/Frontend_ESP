import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { addProcess, deleteProcess, getBlocksToProcess, getProcessById, getSubjects } from "../../features/Process/processSlice";
import Process from "./Process";

const ProcessContainer = () => {

        const state = useSelector(state => state.process);
        const params = useParams();

        const dispatch = useDispatch();
        
        function sendData(values) {
                let checkBlockIds = [];
                let checkCodeIds = [];
                let subjectIds = [];
                
                
                let prohibitionCodeIds = [];

                for (const check of state.checks) {
                        
                        checkBlockIds.push(check.id);

                        for (const checkCode of check.checkCodes) {
                             checkCodeIds.push(checkCode.id);
                        }

                        for (const subject of check.subjectTypes) {
                             subjectIds.push(subject.id);
                        }

                        for (const prohibitionCode of state.prohibitionCodesToCheck.filter(x => x.checkId === check.id)) {
                             prohibitionCodeIds.push(prohibitionCode.id);
                        }
                }
                const request = {
                        name:values.name,
                        prohibitionCodeIds,
                        checkBlockIds,
                        checkCodeIds,
                        subjectIds
                }

                dispatch(addProcess(request));
        }

        useEffect(() => {
                dispatch(getBlocksToProcess());
                dispatch(getSubjects());
                if(params.id) {
                        dispatch(getProcessById(params.id));
                }
        },[])

        function deleteProcessHandler() {
                dispatch(deleteProcess(params.id));
        }
        return state.isLoading ? <div>Загрузка...</div> : <Process state={state} sendData={sendData} deleteProcessHandler={deleteProcessHandler}  />
}

export default ProcessContainer;