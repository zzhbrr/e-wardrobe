import React, {useState} from 'react';
import { 
    Dialog, DialogTitle, DialogContent, 
    DialogContentText, RadioGroup, FormControlLabel, 
    FormControl, InputLabel, DialogActions, 
    FormLabel, Button, Select, MenuItem
} from '@mui/material';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from "react-router-dom";


export default function SearchGroup({socket, uid}) {
    const navigate=useNavigate();
    const [open, setOpen] = React.useState(false);
    const [groupID, setGroupID] = React.useState(-1);
    const [open2, setOpen2] = React.useState(false);
    const [searchResult, setSearchResult] = React.useState({
        groupName: "",
        intro: "",
        creatorid: -1
    });

    const handleSearch = () => {
        setOpen(false);
        socket.off('getGroupDetailSuccess');
        socket.on('getGroupDetailSuccess', (data) => {
            console.log(data);
            setOpen(false);
            setOpen2(true);
            setSearchResult(data);
        });
        socket.emit('getGroupDetail', {gid: groupID});
    }

    return (
        <div>
            <button className='change_btn' onClick={()=>{setOpen(true)}}>
                <SearchIcon style={{float:"left",marginRight:"5px"}}/>
                搜索组
            </button>
            <Dialog open={open} onClose={()=>[setOpen(false)]}>
                <DialogTitle>搜索组</DialogTitle>
                <DialogContent>
                    <TextField autoFocus margin="normal" type="text" variant='filled' fullWidth
                        onChange={(e) => setGroupID(e.target.value)} label="group_id" ></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>setOpen(false)} color="primary">
                        取消
                    </Button>
                    <Button onClick={() => handleSearch()} color="primary">
                        搜索
                    </Button>                
                </DialogActions>
            </Dialog>
            <Dialog open={open2} onClose={()=>[setOpen2(false)]}>
                <DialogTitle>搜索结果</DialogTitle>
                <DialogContent>
                    <div className="group_block" key={groupID} onClick={()=>{navigate(`${groupID}/${uid}`)}}>
                        <h3 className="group_name">{searchResult.groupName}</h3>
                        <div className="intro">{searchResult.intro}</div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}