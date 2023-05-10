import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { NavLink } from 'react-router-dom';
import { useRef } from 'react';
import styles from './DropDownList.module.css'

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right',
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    color:
      theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
    boxShadow:
      'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
    '& .MuiMenu-list': {
      padding: '4px 0',
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      '&:active': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity,
        ),
      },
    },
  },
}));

export default function DropDownList() {
   
  const buttonRef = useRef(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {

    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event) => {
    
    if(event.target.firstChild){
        buttonRef.current.firstChild.textContent = event.target.firstChild.textContent;
    }
    setAnchorEl(null);

  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? 'demo-customized-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        ref={buttonRef}
      >
        Справочник
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          'aria-labelledby': 'demo-customized-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
         <MenuItem onClick={handleClose}  disableRipple>
            Справочник
        </MenuItem>
        <MenuItem className={styles.Items} onClick={handleClose} disableRipple>
            <NavLink  className={({ isActive }) => "menuItem" + (isActive ? " active" : "")}  to={"/checkBlocks"}>1.Список проверок</NavLink>
        </MenuItem>
        <MenuItem className={styles.Items} onClick={handleClose} disableRipple>
            <NavLink  className={({ isActive }) => "menuItem" + (isActive ? " active" : "")}  to={"/checkCodes"}>2.Список кодов проверок</NavLink>
        </MenuItem>
        <MenuItem className={styles.Items} onClick={handleClose} disableRipple>
            <NavLink  className={({ isActive }) => "menuItem" + (isActive ? " active" : "")}  to={"/subjects"}>3.Список субъектов</NavLink>
        </MenuItem>
        <MenuItem className={styles.Items} onClick={handleClose} disableRipple>
            <NavLink  className={({ isActive }) => "menuItem" + (isActive ? " active" : "")}  to={"/blocks"}>4.Список блоков</NavLink>
        </MenuItem>
        <Divider sx={{ my: 0.5 }} />
        <MenuItem className={styles.Items} onClick={handleClose} disableRipple>
            <NavLink  className={({ isActive }) => "menuItem" + (isActive ? " active" : "")}  to={"/prohibitionCodes"}>5.Коды запретов</NavLink>
        </MenuItem>
        <MenuItem className={styles.Items} onClick={handleClose} disableRipple>
            <NavLink  className={({ isActive }) => "menuItem" + (isActive ? " active" : "")}  to={"/clientTypes"}>6.Тип клиента процесса</NavLink>
        </MenuItem>
        
        <MenuItem className={styles.Items} onClick={handleClose} disableRipple>
            <NavLink  className={({ isActive }) => "menuItem" + (isActive ? " active" : "")}  to={"/systemTypes"}>7.Тип системы</NavLink>
        </MenuItem>
        <MenuItem className={styles.Items} onClick={handleClose} disableRipple>
            <NavLink  className={({ isActive }) => "menuItem" + (isActive ? " active" : "")}  to={"/systemBlocks"}>8.Блок системы</NavLink>
        </MenuItem>
        <MenuItem className={styles.Items} onClick={handleClose} disableRipple>
            <NavLink  className={({ isActive }) => "menuItem" + (isActive ? " active" : "")}  to={"/routes"}>9.Маршруты</NavLink>
        </MenuItem> 
      </StyledMenu>
    </div>
  );
}