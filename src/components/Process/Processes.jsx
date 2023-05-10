import { Box, Button, Container, Divider,Typography, } from "@mui/material";
import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { NavLink } from "react-router-dom";



const Processes = ({state,goToProcessCard}) => {

    return (
        <Container>
                
                <Box sx={{display:"flex",flexDirection:"row",justifyContent:"space-between"}}>
                    <Typography variant="h3">Карточка процесса</Typography>
                    <Button variant="contained"><NavLink to={'/processAdd'} style={{textDecoration:"none",background:"none",color:'wheat'}}>Добавить Процесс</NavLink></Button>
                </Box>
            
                <Divider/>
                <Box>
                    <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell>№</TableCell>
                                    <TableCell align="right">Процесс</TableCell>
                                    <TableCell align="right">Безымянный</TableCell>
                                    <TableCell align="right">Безымянный</TableCell>
                                    <TableCell align="right">Безымянный</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {state.processes.map((process) => (
                                    <TableRow
                                        onClick={() => goToProcessCard(`/process/${process.id}`)}
                                        hover={true}
                                        key={process.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{process.id}</TableCell>
                                        <TableCell align="right">{process.name}</TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                        <TableCell></TableCell>
                                    </TableRow>
                                    
                                ))}
                                </TableBody>
                            </Table>
                    </TableContainer>
                </Box>
        </Container>
    )
}

export default Processes;