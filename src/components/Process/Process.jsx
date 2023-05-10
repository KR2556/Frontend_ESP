import { Button, Stack, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Formik } from "formik";
import React from "react";
import CheckBlockContainer from "./CheckBlocks/CheckBlockContainer";

const Process = ({state,sendData,deleteProcessHandler}) => {
  
    return (
        
        <Box m={5}>
            <Formik 
                initialValues={{name:state.name,prohibitionCodes:[]}}
                onSubmit={(values,{setSubmitting}) => {
                    sendData(values);
                }}
                >
                {formik => (
                <>
                    <form onSubmit={formik.handleSubmit}>
                        <Box mt={5} mb={5}>
                            <Stack direction="row" spacing={5}>
                                <Button type="submit" variant="outlined">Сохранить процесс</Button>
                                <Button onClick={() => deleteProcessHandler()} variant="outlined">Удалить процесс</Button>
                            </Stack>
                        </Box>
                        <Typography variant="h3">Процесс</Typography>
                        <Stack mt={5} mb={5} direction="row" spacing={19}>
                            <Box minWidth="200px" width="30%">
                                <Typography variant="h5">Наименование</Typography>
                                <TextField id="outlined-basic" {...formik.getFieldProps('name')} variant="outlined" fullWidth  />
                            </Box>
                        </Stack>
                    </form>
                    <CheckBlockContainer formik={formik}/>
                </>
                )}
            </Formik>
            
        </Box>
    )
}

export default Process;