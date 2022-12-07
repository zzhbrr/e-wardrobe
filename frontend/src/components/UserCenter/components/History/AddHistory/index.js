import React from 'react';
import { 
    Dialog, DialogTitle, DialogContent,
    FormControl, InputLabel, DialogActions, 
    FormLabel, Radio, Button, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker, Space } from 'antd';


import "../../UserInfo/user_info.css";

const items=['上衣','下装','外套','鞋子','饰品']

export default function AddHistory(props) {
    const handleChangeInfo=props.reqAddHistory;
    const reqClothes=props.reqClothes;
    const clothes=props.clothes;
    const [open, setOpen] = React.useState(false);
    const [top, set_top]=React.useState(-1)
    const [down, set_down]=React.useState(-1)
    const [shoe, set_shoe]=React.useState(-1)
    const [coat, set_coat]=React.useState(-1)
    const [ornament,set_ornament]=React.useState(-1)
    const [climate_info, set_climate_info]=React.useState(-1)
    const [situation_info, set_situation_info]=React.useState(-1)
    const [Time, set_Time]=React.useState({
        year: -1,
        month:-1,
        day: -1
    })
    const chosens=[top,down,coat,shoe,ornament]
    const sets={
        '上衣': set_top,
        '下装': set_down,
        '外套': set_coat,
        '鞋子': set_shoe,
        '饰品': set_ornament
    }

    function handleClickChangeInfo() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }
    // 修改时间
    function changeDate(date) {
        set_Time({
            year: date.$y, 
            month:date.$M+1, 
            day: date.$D
        });
    }
    // 提交接口
    function handleSubmit() {
        const data = {
            year:        Time.year,
            month:       Time.month,
            day:         Time.day,
            climate:     climate_info,
            situation:   situation_info,
            top_id:      top, 
            bottom_id:   down, 
            coat_id:     coat, 
            shoe_id:     shoe, 
            ornament_id: ornament
        };
        console.log(data);
        handleClose();
        handleChangeInfo(data);
    }
    React.useEffect(()=>{
        for(let i in items){
            if(clothes[items[i]]==false){
                reqClothes(items[i]);
            }
        }
    },[])

    

    return (
        <div>
            <div>
                <button className='change_btn' onClick={handleClickChangeInfo}>
                    <EditIcon style={{float:"left",marginRight:"5px"}}/>
                    添加历史
                </button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>添加历史</DialogTitle>
                <DialogContent>

                    <FormControl fullWidth>
                        <FormLabel component="legend">时间</FormLabel> 
                        {/* <DatePicker onChange={changeDate} /> */}
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                // label="sss"
                                value={Time}
                                onChange={changeDate}
                            />
                        </LocalizationProvider>
                    </FormControl>
                    <TextField autoFocus margin="normal" type="text" variant='filled' fullWidth
                        onChange={(e) => set_climate_info(e.target.value)} label="天气" ></TextField>
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[0]}</FormLabel> 
                        <Select value={top} onChange={(e) => sets[items[0]](e.target.value)}>
                            {clothes[items[0]].map((cloth)=>
                                <MenuItem value={cloth.pid} key={cloth.pid}>
                                    <img src={cloth.img_src} style={{height:'40px',width:'40px'}}/>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[1]}</FormLabel> 
                        <Select value={down} onChange={(e) => sets[items[1]](e.target.value)}>
                            {clothes[items[1]].map((cloth)=>
                            <MenuItem value={cloth.pid} key={cloth.pid}>
                                <img src={cloth.img_src} style={{height:'40px',width:'40px'}}/>
                            </MenuItem>
                        )}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[2]}</FormLabel> 
                        <Select value={coat} onChange={(e) => sets[items[2]](e.target.value)}>
                            {clothes[items[2]].map((cloth)=>
                                <MenuItem value={cloth.pid} key={cloth.pid}>
                                    <img src={cloth.img_src} style={{height:'40px',width:'40px'}}/>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[3]}</FormLabel> 
                        <Select value={shoe} onChange={(e) => sets[items[3]](e.target.value)}>
                            {clothes[items[3]].map((cloth)=>
                                <MenuItem value={cloth.pid} key={cloth.pid}>
                                    <img src={cloth.img_src} style={{height:'40px',width:'40px'}}/>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[4]}</FormLabel> 
                        <Select value={ornament} onChange={(e) => sets[items[4]](e.target.value)}>
                            {clothes[items[4]].map((cloth)=>
                                <MenuItem value={cloth.pid} key={cloth.pid}>
                                    <img src={cloth.img_src} style={{height:'40px',width:'40px'}}/>
                                </MenuItem>
                            )}
                        </Select>
                    </FormControl>
                    <TextField autoFocus margin="normal" type="text" variant='filled' fullWidth
                        onChange={(e) => set_situation_info(e.target.value)} label="场景" ></TextField>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
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