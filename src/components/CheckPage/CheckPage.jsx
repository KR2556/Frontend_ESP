import React from "react"
import { Route, Routes } from "react-router";
import { NavLink } from "react-router-dom";
import CheckBlockContainerForm  from './CheckBlock/CheckBlockFormContainer'
import CheckCodeFormContainer from './CheckCode/CheckCodeFormContainer'
import BlockFormContainer from './Block/BlockFormContainer'
import SubjectFormContainer from './Subject/SubjectFormContainer'
import ProhibitionCodeFormContainer from "./ProhibitionCode/ProhibitionCodeFormContainer";
import { Stack } from "@mui/system";
import './CheckPage.css'
import CheckCodesContainer from "./CheckCode/CheckCodesContainer";
import CheckBlocksContainer from "./CheckBlock/CheckBlocksContainer";
import SubjectsContainer from "./Subject/SubjectsContainer";
import BlocksContainer from "./Block/BlocksContainer";
import DropDownList from "../Menu/DropDownList";
import { Box } from "@mui/material";
import ProcessContainer from "../Process/ProcessContainer";
import ProcessesContainer from "../Process/ProcessesContainer";
import ClientTypeFormContainer from "./ClientType/ClientTypeFormContainer";
import SystemTypeFormContainer from "./SystemType/SystemTypeFormContainer";
import SystemBlockFormContainer from "./SystemBlock/SystemBlockFormContainer";
import ClientTypesContainer from "./ClientType/ClientTypesContainer";
import SystemTypesContainer from "./SystemType/SystemTypesContainer";
import SystemBlocksContainer from "./SystemBlock/SystemBlocksContainer";
import RouteFormContainer from "./Route/RouteFormContainer";
import RoutesContainer from "./Route/RoutesContainer";

 
const CheckPage = function() 
{

 
    return (
        <div>
          <Stack sx={{boxShadow:"0px 0px 5px black",padding:4,display:"flex",alignItems:"center"}} direction={"row"} spacing={9}>
            <Box>
              <NavLink  className={({ isActive }) => "proccesMenuItem" + (isActive ? " proccesMenuItemActive" : "")}  to={"/processes"}>Процесс</NavLink>
            </Box>
             <DropDownList/>
          </Stack>
          <Routes>
            <Route path="/checkBlocks" element={<CheckBlocksContainer/>} />
            <Route path="/checkBlockAdd" element={<CheckBlockContainerForm/>} />
            <Route path="/checkBlockEdit/:id" element={<CheckBlockContainerForm edit={true} />} />
            <Route path="/checkCodes" element={<CheckCodesContainer/>} />
            <Route path="/checkCodeAdd"  element={<CheckCodeFormContainer/>} />
            <Route path="/checkCodeEdit/:id"  element={<CheckCodeFormContainer edit={true}/>} />
            <Route path="/blocks" element={<BlocksContainer/>} />
            <Route path="/blockAdd" element={<BlockFormContainer/>}/>
            <Route path="/blockEdit/:id" element={<BlockFormContainer edit={true} />}/>
            <Route path="/subjects" element={<SubjectsContainer/>} />
            <Route path="/subjectAdd" element={<SubjectFormContainer />} />
            <Route path="/subjectEdit/:id" element={<SubjectFormContainer edit={true} />} />
            <Route path="/prohibitionCodes" element={<ProhibitionCodeFormContainer/> }/>
            <Route path="/processes" element={<ProcessesContainer/>} />
            <Route path="/process/:id" element={<ProcessContainer/>} />
            <Route path="/processAdd" element={<ProcessContainer/>} />
            <Route path="/clientType" element={<ClientTypeFormContainer/>} />
            <Route path="/clientType/:id" element={<ClientTypeFormContainer/>} />
            <Route path="/clientTypes" element={<ClientTypesContainer/>} />
            <Route path="/systemType" element={<SystemTypeFormContainer/>}/>
            <Route path="/systemType/:id" element={<SystemTypeFormContainer/>}/>
            <Route path="/systemTypes" element={<SystemTypesContainer/>}/>
            <Route path="/systemBlock" element={<SystemBlockFormContainer/>} />
            <Route path="/systemBlock/:id" element={<SystemBlockFormContainer/>} />
            <Route path="/systemBlocks" element={<SystemBlocksContainer/>} />
            <Route path="/route" element={<RouteFormContainer/>} />
            <Route path="/route/:id" element={<RouteFormContainer/>} />
            <Route path="/routes" element={<RoutesContainer/>}/>
          </Routes>
        </div>
    )
}


export default CheckPage;