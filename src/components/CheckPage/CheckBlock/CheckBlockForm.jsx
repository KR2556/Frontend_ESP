import React, { useState } from "react";
import { 
    TextField,
    Container, 
    Typography,
    Stack,
    ToggleButtonGroup,
    ToggleButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem, 
    Button, 
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Paper,
    Box} from "@mui/material";
 
const CheckBlockForm = ({state,sendData,addCheckCode,deleteCheckCode,formik}) => {
    
    const [persons, setPerson] = useState(formik.values.subjects);
    const handlePerson = (event, persons) => {
        if (persons.length) {
             setPerson(persons);
             formik.setFieldValue('subjects',persons);
        }
    };

    const handleCheckCode = (event) => {

        let value = event.target.value;
        
        formik.setFieldValue('code',value);
        
        if(!value) {
            return;
        }

        addCheckCode(value)
    }
    
    return (
        <Container maxWidth="md">
        <Typography variant="h3" mt={10} textAlign="center">Проверка</Typography>
           <Stack m={5} spacing={3}>
           <FormControl>
                   <InputLabel id="demo-simple-select-helper-label">Блок</InputLabel>
                    <Select labelId="demo-simple-select-helper-label" 
                            id="block"
                            name="block"
                            value={formik.values.block}
                            onChange={formik.handleChange}
                            label="Блок">
                            {
                                state.blocks && state.blocks.map((v,index) => (
                                    <MenuItem key={index} value={v.id}>
                                         <em>{v.name}</em>
                                    </MenuItem>
                                ))
                            }
                     </Select>
            </FormControl>
            <TextField id="shortName" label="Краткое наименование" name="shortName" variant="outlined" onChange={formik.handleChange} value={formik.values.shortName} />
            <ToggleButtonGroup
                value={persons}
                onChange={handlePerson}
                aria-label="person"
                color="primary">
                {
                    state.subjectList && state.subjectList.map(subject => (
                        <ToggleButton key={subject.id} value={subject.name} aria-label={subject.name}>{subject.name}</ToggleButton>
                    ))
                }
             
             </ToggleButtonGroup>
             <Box sx={{display:"flex",alignItems:"center"}}>
                    Выберите код проверки
            </Box>
            <FormControl sx={{ width: 250 }}>
                    <InputLabel id="demo-simple-select-helper-label">Код проверки</InputLabel>
                    <Select labelId="demo-simple-select-helper-label" 
                                id="code"
                                name="code"
                                value={formik.values.code}
                                onChange={handleCheckCode}
                                label="Код проверки">
                                <MenuItem value="">
                                    <em>Код проверки</em>
                                </MenuItem>
                                {
                                    state.codes && state.codes.map((code,index) => (
                                        <MenuItem key={index} value={code}>
                                            <em>{code.name}-{!code.isActive ? "Есть ПИН" : "Нет ПИНа"}</em>
                                        </MenuItem>
                                    ))
                                }
                    </Select>
            </FormControl>
            <Typography variant="h5">Список код проверок</Typography>
                <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell align="center">Код проверки</TableCell>
                                <TableCell align="right">Статус субъекта</TableCell>
                                <TableCell align="right">Код запрета</TableCell>
                                <TableCell align="right">Операция</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {state.selectedCodes && state.selectedCodes.map((code,index) => (
                                <TableRow
                                    key={code.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 }}}>
                                    <TableCell component="th" scope="row">
                                        {code.id}
                                    </TableCell>
                                    <TableCell align="center">{code.name}</TableCell>
                                    <TableCell align="right">{code.isActive ? "Новый/Нет ПИНа" : "Есть ПИН"}</TableCell>
                                    <TableCell sx={{wordBreak:'break-word',maxWidth:'20px'}} align="right">{code.prohibitionCodes.map(x => x.name).join()}</TableCell>
                                    <TableCell align="right"><Button onClick={() => deleteCheckCode(code.id)}>Удалить</Button></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table> 
                </TableContainer>
            <Button onClick={() => sendData(formik.values)}>Сохранить</Button>
           </Stack>
      </Container>
    )
}

export default CheckBlockForm;