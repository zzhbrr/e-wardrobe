import "./chooseRelatedGroups.css";
import React from 'react';
import TextField from '@mui/material/TextField';
import { 
    Dialog, DialogTitle, DialogContent, 
    DialogContentText, RadioGroup, FormControlLabel, 
    FormControl, InputLabel, DialogActions, 
    FormLabel, Radio, Button, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox, Col, Row } from 'antd';


export default function ChooseRelatedGroups({socket, uid, handleChooseGroup}) {
    const [open, setOpen] = React.useState(false);
    const [groups, setGroups] = React.useState([]);
    var choosen_groups = [];

    React.useEffect(()=>{
        socket.off('getUserGroupsSuccess');
        socket.on('getUserGroupsSuccess', (data)=>{
            setGroups(data.groups);
        })
        socket.emit('getUserGroups',{uid:uid});
    }, []);

    const chosenGroup = (list) => {
        choosen_groups = list;
    }

    const handleClickComfirm = ()=>{
        setOpen(false);
        handleChooseGroup(choosen_groups);
    }


    return (
        <div>
            <div>
                <button className='change_btn' onClick={()=>setOpen(true)}>
                    <EditIcon style={{float:"left",marginRight:"5px"}}/>
                    选择相关组
                </button>
            </div>
            <div>
                <Dialog open={open} onClose={()=>setOpen(false)}>
                    <DialogTitle>选择相关组</DialogTitle>
                    <div className="group_list">
                    <Checkbox.Group style={{ width: '100%'}} onChange={chosenGroup} >
                        {groups.map((group)=>{return (
                            <Row>
                                <Col>
                                    <Checkbox value={group.gid}>
                                        <div className="group_block" key={group.gid} >
                                            <h3 className="group_name">{group.group_name}</h3>
                                            <div className="intro">{`${group.intro.substr(0,8)}......`}</div>
                                        </div>
                                    </Checkbox>
                                </Col>
                            </Row>
                        )})}
                    </Checkbox.Group>
                    <DialogActions>
                        <Button onClick={()=>setOpen(false)} color="primary">
                            取消
                        </Button>
                        <Button onClick={handleClickComfirm} color="primary">
                            确定
                        </Button>                
                    </DialogActions>
                    </div>
                </Dialog>
            </div>
        </div>
        
    )
}