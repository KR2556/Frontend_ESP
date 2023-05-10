import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, Typography } from '@mui/material';
import { Box } from '@mui/system';

export default function CheckBlockDialog({checkCodes,addProhibitionCodeToCheckHandler,deleteProhibitionCodeToCheckHandler,checkId,prohibitionCodesToCheck}) {

  
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleCloseWithoutSaving = () => {
    setOpen(false);
  }
  const handleClose = () => {

    for (const item of prohibitionCodesToCheck) {
      deleteProhibitionCodeToCheckHandler(item.id);
    }

    for (const item of prohibitionCode) {
      addProhibitionCodeToCheckHandler(item);
    }
    setOpen(false);
  };

  const [prohibitionCode,setProhibitonCode] = useState(prohibitionCodesToCheck);

  
  const handleChange = (event) => {


      let { id,name,checked } = event.target;
      if(checked)  {
        setProhibitonCode([...prohibitionCode,{id,name,checkId}]);
      }
      else {
        setProhibitonCode(prohibitionCode.filter(x => +x.id !== +id))
      };
  }


  return (
    <div>
      <Button size='small' variant="outlined" onClick={handleClickOpen}>
        {"выбрать коды запрета"}
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title">
        <DialogContent>
          <Box>
            <FormControl sx={{ mr:5 }}  variant="standard">
                <FormLabel component="legend">Выберите коды запретов</FormLabel>
                    <FormGroup sx={{mt:3}}>
                       {
                         checkCodes.map(checkCode => (
                            <Box key={checkCode.id}>
                                <Typography >{checkCode.name}</Typography> 
                                {
                                  checkCode.prohibitionCodes.map(x => <FormControlLabel key={x.id} checked={prohibitionCode.filter(p => +p.id === +x.id ).length !== 0} control={<Checkbox key={x.id} id={x.id.toString()} name={x.name} onChange={handleChange}   />} label={x.name} />)
                                }
                            </Box>
                         ))
                       }
                       
                    </FormGroup>
            </FormControl>
            </Box>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseWithoutSaving} autoFocus>
                Отмена
            </Button>
            <Button onClick={handleClose} autoFocus>
                Сохранить
            </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}