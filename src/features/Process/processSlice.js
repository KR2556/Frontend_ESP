import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { checkAPI } from "../../api/checkAPI"
import { processAPI } from "../../api/processAPI";


const initialState = {
    name:'',
    blocks:[],
    subjects:[],
    checks:[],
    checkCodes:[],
    prohibitionCodes:[],
    prohibitionCodesToCheck:[],
    processes:[],
    isLoading:false

}


export const getBlocksToProcess = createAsyncThunk('process/GetBlocks', async (_, { rejectWithValue, dispatch }) => {
    
    const response = await checkAPI.getBlocks();
    if(response.body == null) return; 
    
    dispatch(setBlocks(response.body));

}) 


export const getSubjects = createAsyncThunk('process/getSubjects', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(setSubjects([]));
    const response = await checkAPI.getSubjectTypes();
    if(response.body == null) return; 
    dispatch(setSubjects(response.body));
   

})

export const getChecks = createAsyncThunk('process/GetChecks', async (payload,{ rejectWithValue, dispatch,getState }) => {

    if(!payload) return;
    const response = await processAPI.getChecks(payload);

    const { process } = getState();
    
    const state = process;
 
    let checkCodes = [];

    if(state.checks.length === 0) {
        let checks = response.body
        dispatch(setChecks(checks));
        
        for (const check of checks) {
            for (const code of check.checkCodes) {
                checkCodes.push(code)
            }
        }
        dispatch(setCheckCodes(checkCodes));
    }
    else {

        let checks  = [...state.checks];
        for (const check of response.body) {
            if(!state.checks.find(x => x.id === check.id)){
                checks.push(check);
            }
            else {
                const index = checks.findIndex((value) => value.id === check.id)
                checks[index] = check;
            }
        }
        
        dispatch(setChecks(checks));
        
        for (const check of checks) {
            for (const code of check.checkCodes) {
                checkCodes.push(code)
            }
        }
        dispatch(setCheckCodes(checkCodes));

    }
})

export const getProcesses = createAsyncThunk('prcesses/GetProcesses', async (payload,{ rejectWithValue, dispatch }) => {

    dispatch(reset());
     const response = await processAPI.getProcesses();
     let body = response.body;

     if(body === null) return;

     dispatch(setProcesses(body));
});

export const addProcess = createAsyncThunk('process/AddProcess', async (payload,{ rejectWithValue, dispatch }) => {

    await processAPI.addProcess(payload);
    
});

export const getProcessById = createAsyncThunk('process/GetProcessById', async (payload, { rejectWithValue, dispatch }) => {

    dispatch(isLoading(true));
    const response = await processAPI.getProcessById(payload);
    const body = response.body;

    if(body == null) return;
    let process = body;
    
    dispatch(setProcess(process));

    for (const check of process.checks) {
        for (const checkCode of check.checkCodes) {
             for (const prohibitionCode of checkCode.prohibitionCodes) {
                    if(+process.prohibitionCodes === +prohibitionCode.id)  {
                    dispatch(addProhibitionCodeToCheck({...prohibitionCode,checkId:check.id}))
                }
             }
        }
    }
    
    dispatch(isLoading(false));
})



export const updateProcess = createAsyncThunk('process/UpdateProcess', async (payload, { rejectWithValue, dispatch } ) => {

    await processAPI.updateProcess(payload);
})


export const deleteProcess = createAsyncThunk('process/DeleteProcess', async (payload,{ rejectWithValue,dispatch }) => {

    await processAPI.deleteProcess(payload);
})



export const processSlice = createSlice({

    name:'process',
    initialState,
    
    reducers: {
        setBlocks(state,action) {
            state.blocks = action.payload;
        },
        setSubjects(state,action) {
            state.subjects = action.payload;
        },
        setChecks(state,action) {
            state.checks = action.payload;
        },
        
        setCheckCodes(state,action) {
            state.checkCodes = action.payload;
        },
        setProhibitonCodes(state,action) {
            
            let prohibitionCodes = [];
            for (const check of state.checks) {
                let checkCode = check.checkCodes.find(x => x.id === action.payload);
                if(checkCode) prohibitionCodes = checkCode.prohibitionCodes.map(x => ({...x,checkId:check.id}));
            }
            state.prohibitionCodes = prohibitionCodes;

        },
        deleteProhibitionCode(state,action) {
            state.prohibitionCodesToCheck = state.prohibitionCodesToCheck.filter(x => x.id !== action.payload);
        },
        deleteCheck(state,action) {
            state.checks = state.checks.filter(x => x.id !== action.payload);
        },
        addProhibitionCodeToCheck(state,action) {
            
            for (const item of state.prohibitionCodesToCheck) {
                if(item.id === action.payload.id) {
                    return;
                }
            }
            state.prohibitionCodesToCheck.push(action.payload);
        },
        setProcesses(state,action) {
            state.processes = action.payload;
        },
        setProcess(state,action) {
            state.checks = action.payload.checks;
            state.name = action.payload.name;
        },
        isLoading(state,action) {
            state.isLoading = action.payload
        },

        reset() {
            return initialState;
        }
    }
})

export const { setBlocks,setSubjects, setChecks,deleteCheck,setCheckCodes,setProhibitonCodes,addProhibitionCodeToCheck,deleteProhibitionCode,setProcesses,setProcess, isLoading, reset } = processSlice.actions;

export default processSlice.reducer;