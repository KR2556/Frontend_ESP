import { configureStore } from "@reduxjs/toolkit"
import blockSlice from "../features/Block/blockSlice"
import checkBlockSlice from "../features/CheckBlock/checkBlockSlice"
import checkCodeSlice from "../features/CheckCode/checkCodeSlice"
import clientTypeSlice from "../features/ClientType/clientTypeSlice"
import processSlice from "../features/Process/processSlice"
import prohibitionCodeSlice from "../features/ProhibitionCode/prohibitionCodeSlice"
import routeSlice from "../features/Route/routeSlice"
import subjectSlice from "../features/Subject/subjectSlice"
import systemBlockSlice from "../features/SystemBlock/systemBlockSlice"
import systemTypeSlice from "../features/SystemType/systemTypeSlice"

export const store = configureStore({
    reducer:{
        process:processSlice,
        checkBlock:checkBlockSlice,
        checkCode:checkCodeSlice,
        prohibitionCode:prohibitionCodeSlice,
        subject:subjectSlice,
        block:blockSlice,
        clientType:clientTypeSlice,
        systemType:systemTypeSlice,
        systemBlock:systemBlockSlice,
        route:routeSlice
    }
})