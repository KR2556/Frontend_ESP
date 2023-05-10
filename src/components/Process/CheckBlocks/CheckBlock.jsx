import { Button, FormControlLabel, Radio, RadioGroup, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import MultipleSelect from "../../MultipleSelect/MultipleSelect";
import {  
     
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

import styles from './checkblock.module.css'
import CheckBlockDialog from "../../ModalDialog/CheckBlockDialog";


const CheckBlock = ({state,getCheckskHandler,addProhibitionCodeToCheckHandler,deleteProhibitionCodeToCheckHandler,deleteCheckHandler}) => {

    return (
      <div>
            <Typography variant="h5">Блок проверок</Typography>
            <Stack mt={3}>
                <Formik 
                        initialValues={{subjects:[], IsNewClient:false}}
                        onSubmit={(values, { setSubmitting }) => {
                            const request = {
                                    IsNewClient:values.IsNewClient !== '' ? values.IsNewClient : null,
                                    Subjects:values.subjects 
                            }

                            getCheckskHandler(request);
                            setSubmitting(false);
                        }}>
                        {formik => (
                            <form onSubmit={formik.handleSubmit}>
                                <Stack direction="row" spacing={5}>
                                    <MultipleSelect
                                        minWidth={200} 
                                        maxWidth={300} 
                                        label="Субъекты"
                                        items={state.subjects}
                                        setFieldValue={formik.setFieldValue}
                                        {...formik.getFieldProps('subjects')}
                                    />
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        {...formik.getFieldProps('IsNewClient')}>
                                        <FormControlLabel value={false} control={<Radio />} label="Есть ПИН" />
                                        <FormControlLabel value={true} control={<Radio />} label="Нет ПИНа" />
                                        <FormControlLabel value={''} control={<Radio />} label="Есть/Нет Пина" />
                                    </RadioGroup>    
                                    
                                </Stack>
                            <Button type="submit" variant="contained" sx={{mt:5}}>Извлечь</Button>
                        </form>
                        )}
                    </Formik>
                    {
                        state.checks != null  ? 
                        <>
                        <Paper sx={{ width:'750px', overflow: 'hidden'}}>
                            <TableContainer sx={{ maWidth:'100%', maxHeight:400}} component={Paper} >
                                <Table stickyHeader aria-label="sticky table"  >
                                    <TableHead>
                                        <TableRow sx={{'.css-dwuj3p-MuiTableCell-root':{fontSize:13,padding:0}}}>
                                            <TableCell>Id</TableCell>
                                            <TableCell align="center">Блок</TableCell>
                                            <TableCell align="center">Комплаенс Проверка</TableCell>
                                            <TableCell align="center">Код проверки для нового субъекта (есть ПИН) </TableCell>
                                            <TableCell align="center">Код проверки для действующего субъекта (нет ПИНа) </TableCell> 
                                            <TableCell align="center">Субъекты проверки</TableCell>
                                            <TableCell align="center">Операции</TableCell>
                                        </TableRow>
                                        </TableHead>
                                                {state.checks && state.checks.map((check,index) => (
                                                <TableBody key={check.id}>
                                                    <TableRow
                                                        sx={{ '&:last-child td, &:last-child th': { border: 0 },background:'#b2b8be'}}>
                                                        <TableCell component="th" scope="row">
                                                            {check.id}
                                                        </TableCell>
                                                        <TableCell align="center">{check.block.name}</TableCell>
                                                        <TableCell align="center">{check.shortName}</TableCell>
                                                        {
                                                           <>
                                                            <TableCell align="center">{check.checkCodes.filter(x => !x.isActive).map(x => x.name).join()}</TableCell>
                                                            <TableCell align="center">{check.checkCodes.filter(x => x.isActive).map(x => x.name).join()}</TableCell> 
                                                           </>
                                                        }

                                                        <TableCell align="center">{check.subjectTypes.map(x => x.name).join()}</TableCell>
                                                        {/*<TableCell align="center">{state.prohibitionCodesToCheck.filter(x => x.checkId === check.id).map(x => (<span className={styles.prohibitionCode} key={x.id} onClick={() => deleteProhibitionCodeToCheckHandler(x.id)}> {x.name} </span>))}</TableCell>*/}
                                                        <TableCell align="center"><Button color="error" onClick={() => deleteCheckHandler(check.id)}><ClearIcon/></Button></TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                         <TableCell>Коды запрета</TableCell>
                                                         <TableCell>{state.prohibitionCodesToCheck.filter(x => x.checkId === check.id).map(x => (<span className={styles.prohibitionCode} key={x.id}> {x.name} </span>))}</TableCell>
                                                         <TableCell align="right" colSpan={6}>
                                                            <CheckBlockDialog checkCodes={check.checkCodes}
                                                                              checkId={check.id} 
                                                                              addProhibitionCodeToCheckHandler={addProhibitionCodeToCheckHandler} 
                                                                              deleteProhibitionCodeToCheckHandler={deleteProhibitionCodeToCheckHandler}
                                                                              prohibitionCodesToCheck={state.prohibitionCodesToCheck.filter(x => x.checkId === check.id)}/>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                         <TableCell colSpan={7}>Маршрут</TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                         <TableCell colSpan={7}>Номер этапа</TableCell>
                                                    </TableRow>
                                                </TableBody>))}
                                </Table> 
                            </TableContainer>
                        </Paper>
                        </> :
                        <>
                            <div>Не удалось найти совпадений</div>
                        </>
                    
                    }
                    
            </Stack>
      </div>  
    )
}

export default CheckBlock;