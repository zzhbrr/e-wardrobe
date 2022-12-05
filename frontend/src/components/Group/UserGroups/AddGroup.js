import React, {useState} from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { 
    Dialog, DialogTitle, DialogContent, 
    DialogContentText, RadioGroup, FormControlLabel, 
    FormControl, InputLabel, DialogActions, 
    FormLabel, Button, Select, MenuItem
} from '@mui/material';
import TextField from '@mui/material/TextField';


export default function AddGroup({handleAddGroup, socket, uid}) {
    const [open, setOpen] = React.useState(false);
    const [groupName, setGroupName] = React.useState("");
    const [intro, setIntro] = React.useState("");

    const handleSubmit = () => {
        socket.emit('createGroup', {uid: uid, group_name: groupName, intro: intro});
        console.log({uid: uid, group_name: groupName, intro: intro});
        socket.off('createGroupSuccess');
        socket.on('createGroupSuccess', (data) => {
            console.log(data);
            setGroupName("");
            setIntro("");
            setOpen(false);
            handleAddGroup(data);
        })
    }

    return (
        <div>
            <button className='change_btn' onClick={()=>{setOpen(true)}}>
                <EditIcon style={{float:"left",marginRight:"5px"}}/>
                新建组
            </button>

            <Dialog open={open} onClose={()=>[setOpen(false)]}>
                <DialogTitle>新建组</DialogTitle>
                <DialogContent>
                <TextField autoFocus margin="normal" type="text" variant='filled' fullWidth
                        onChange={(e) => setGroupName(e.target.value)} label="组名" ></TextField>
                <TextField autoFocus margin="normal" type="text" variant='filled' fullWidth
                    onChange={(e) => setIntro(e.target.value)} label="介绍" ></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="primary">
                        取消
                    </Button>
                    <Button onClick={() => handleSubmit()} color="primary">
                        添加
                    </Button>                
                </DialogActions>
            </Dialog>
        </div>
    )
}