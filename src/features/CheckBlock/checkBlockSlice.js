import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { checkAPI } from "../../api/checkAPI";


const initialState = {
      blocks:[],
      codes:[],
      selectedCodes:[],
      id:0,
      block:'',
      shortName:'',
      fullName:'',
      subjects:[],
      checkBlocks:[],
      subjectList:[],
      isLoading:true,
      redirectFlag:false,
      storage:''
}


export const InitCheckBlock = createAsyncThunk("checkBlock/getBlocksToCheckBlock",async (_, { rejectWithValue, dispatch}) => {

    dispatch(setSubjects([]));
    dispatch(isLoading(true));
    let response = await checkAPI.getBlocks();
    dispatch(setBlocks(response.body));
    response = await checkAPI.getCheckCodes(true);
    dispatch(setCodes(response.body));
    response = await checkAPI.getSubjectTypes();
    dispatch(setSubjectList(response.body));
    dispatch(isLoading(false));

})

export const getCheckBlockById = createAsyncThunk("checkBlock/GetCheckBlockById", async (payload,{ rejectWithValue, dispatch}) => {
    
    dispatch(isLoading(true));
    const request = await checkAPI.getCheckBlockById(payload);
    dispatch(setState(request.body));
    dispatch(isLoading(false));
})

export const addCheckBlock = createAsyncThunk("checkBlock/AddCheckBlock", async (payload,{ rejectWithValue, dispatch }) => {

    await checkAPI.addCheckBlock(payload);
    dispatch(setRedirectFlag(true));
});

export const updateCheckBlock = createAsyncThunk("checkBlock/UpdateCheckBlock", async (payload, { rejectWithValue, dispatch}) => {
   
    await checkAPI.updateCheckBlock(payload);
    dispatch(setRedirectFlag(true));
    
});


export const getCheckBlocks = createAsyncThunk("checkBlock/GetCheckBlocks",async(_,{ rejectWithValue,dispatch }) => {
   
    dispatch(reset());
    dispatch(isLoading(true));
    const response = await checkAPI.getCheckBlocks();
    
    if(!response.body) return;
    
    let checkBlocks = response.body.map(checkBlock => ({...checkBlock,
        subjects:checkBlock.subjects.map(x => x.name).join(),
        checkCodes:checkBlock.checkCodes.map(x => x.name).join(),
        status:checkBlock.checkCodes.length > 1 ? (
        checkBlock.checkCodes.map(code => `${code.name}-${!code.isActive ? "Есть ПИН" : "Нет ПИНа"}`)) : 
        checkBlock.checkCodes.map(code => !code.isActive ? "Есть ПИН" : "Нет ПИНа")}));

    
    dispatch(setCheckBlocks(checkBlocks));
    dispatch(isLoading(false));

})
export const deleteCheckBlock = createAsyncThunk("checkBlock/DeleteCheckBlock", async(payload,{ rejectWithValue, dispatch }) => {

    await checkAPI.deleteCheckBlock(payload);
    dispatch(deleteCheckBlockFromList(payload));
})

export const checkBlockSlice = createSlice({
    name:"checkBlock",
    initialState,
    reducers: {
        setState(state,action) {
            state.id = action.payload.id;
            state.block = action.payload.block;
            state.shortName = action.payload.shortName;
            state.fullName = action.payload.fullName;
            state.subjects = action.payload.subjects;
            state.selectedCodes = action.payload.checkCodes
        },
        setSelectedCodes(state,action) {
            state.selectedCodes = action.payload;
        },

        addSelectedCode(state,action) {
            for (const iterator of state.selectedCodes) {
                if(iterator.id === action.payload.id) {
                    return;
                }
            }
            state.selectedCodes.push(action.payload);  
        },
        deleteSelectedCode(state,action) {
            state.selectedCodes = state.selectedCodes.filter(value => value.id !== action.payload);
        },
        setBlocks(state,action) {
            state.blocks = action.payload;
        },
        setCodes(state,action) {
            state.codes = action.payload;
        },
        setCheckBlocks(state,action) {
            if(action.payload != null) {
                state.checkBlocks = action.payload;
            }
        },
        deleteCheckBlockFromList(state,action) {
            state.checkBlocks = state.checkBlocks.filter(x => x.id !== action.payload);
        },
        setSubjectList(state,action) {
            state.subjectList = action.payload;
        },
        setSubjects(state,action) {
            state.subjects = action.payload;
        },
        isLoading(state,action) {
             state.isLoading = action.payload;
        },
        setRedirectFlag(state,action) {
            state.redirectFlag = action.payload;
        },
        reset(){
            return initialState;
        }
    }
});

export const { setBlocks,setCodes,setSelectedCodes,addSelectedCode,deleteSelectedCode,setState,setCheckBlocks,deleteCheckBlockFromList,setSubjectList,setSubjects,isLoading, setRedirectFlag,reset } = checkBlockSlice.actions;

export default checkBlockSlice.reducer;