import React from 'react';
import TextField from '@mui/material/TextField';
import { 
    Dialog, DialogTitle, DialogContent, 
    DialogContentText, RadioGroup, FormControlLabel, 
    FormControl, InputLabel, DialogActions, 
    FormLabel, Radio, Button, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import "../UserInfo/user_info.css";

export default function ChangeInfo({handleChangeInfo}) {
    const [open, setOpen] = React.useState(false);
    const [gender, setGender] = React.useState('男');
    const [profession, setProfession] = React.useState("");
    const [age, setAge] = React.useState(10);
    function handleClickChangeInfo() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }

    var ages = []
    for (let i = 10; i < 80; i++) ages.push(i);

    function handleSubmit() {
        const data = {gender: gender, profession: profession, age: age};
        console.log(data);
        handleClose();
        handleChangeInfo(data);
    }

    return (
        <div>
            <div>
                <button className='change_btn left' onClick={handleClickChangeInfo}>
                    <EditIcon style={{float:"left",marginRight:"5px"}}/>
                    修改信息
                </button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>修改信息</DialogTitle>
                <DialogContent>
                    <FormLabel>性别</FormLabel>
                    <RadioGroup value={gender} onChange={(e) => setGender(e.target.value)}>
                        <FormControlLabel value="男" control={<Radio />} label="男" />
                        <FormControlLabel value="女" control={<Radio />} label="女" />
                    </RadioGroup>
                    <FormControl fullWidth>
                        <FormLabel>年龄</FormLabel>
                        <Select value={age} onChange={(e) => setAge(e.target.value)}>
                            {ages.map((age) => <MenuItem value={age} key={age}>{age}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField
                        autoFocus
                        margin="normal"
                        type="text"
                        variant='filled'
                        fullWidth
                        onChange={(e) => setProfession(e.target.value)}
                        label="职业"
                    ></TextField>  
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        取消
                    </Button>
                    <Button onClick={() => handleSubmit()} color="primary">
                        更改
                    </Button>                
                </DialogActions>
            </Dialog>
        </div>
    )
}