import React from 'react';
import { 
    Dialog, DialogTitle, DialogContent,
    FormControl, InputLabel, DialogActions, 
    FormLabel, Radio, Button, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import "../../UserInfo/user_info.css";

const items=['上衣','下装','外套','鞋子','饰品']

export default function AddOutfit(props) {
    const handleChangeInfo=props.reqAddOutfit;
    const reqClothes=props.reqClothes;
    const clothes=props.clothes;
    const [open, setOpen] = React.useState(false);
    const [top,set_top]=React.useState(-1)
    const [down,set_down]=React.useState(-1)
    const [shoe,set_shoe]=React.useState(-1)
    const [coat,set_coat]=React.useState(-1)
    const [ornament,set_ornament]=React.useState(-1)
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

    function handleSubmit() {
        const data = {
            top_id:      top, 
            bottom_id:   down, 
            coat_id:     coat, 
            shoe_id:     shoe, 
            ornament_id: ornament
        };
        console.log(data);
        handleClose();
        set_top(-1);
        set_down(-1);
        set_shoe(-1);
        set_coat(-1);
        set_ornament(-1);
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
                    添加穿搭
                </button>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>添加穿搭</DialogTitle>
                <DialogContent>
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[0]}</FormLabel> 
                        <Select value={chosens[0]} onChange={(e) => sets[items[0]](e.target.value)}>
                            {clothes[items[0]].map((cloth)=><MenuItem value={cloth.pid} key={cloth.pid}>
                                <img src={cloth.img_src} style={{height:'40px',width:'40px'}}/>
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[1]}</FormLabel> 
                        <Select value={chosens[1]} onChange={(e) => sets[items[1]](e.target.value)}>
                            {clothes[items[1]].map((cloth)=><MenuItem value={cloth.pid} key={cloth.pid}>
                                <img src={cloth.img_src} style={{height:'40px',width:'40px'}}/>
                            </MenuItem>)}
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[2]}</FormLabel> 
                        <Select value={chosens[2]} onChange={(e) => sets[items[2]](e.target.value)}>
                            {clothes[items[2]].map((cloth)=><MenuItem value={cloth.pid} key={cloth.pid}><img src={cloth.img_src} style={{height:'40px',width:'40px'}}/></MenuItem>)}
                        </Select>
                    </FormControl> 
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[3]}</FormLabel> 
                        <Select value={chosens[3]} onChange={(e) => sets[items[3]](e.target.value)}>
                            {clothes[items[3]].map((cloth)=><MenuItem value={cloth.pid} key={cloth.pid}><img src={cloth.img_src} style={{height:'40px',width:'40px'}}/></MenuItem>)}
                        </Select>   
                    </FormControl>
                    <FormControl fullWidth>
                        <FormLabel component="legend">{items[4]}</FormLabel> 
                        <Select value={chosens[4]} onChange={(e) => sets[items[4]](e.target.value)}>
                            {clothes[items[4]].map((cloth)=><MenuItem value={cloth.pid} key={cloth.pid}><img src={cloth.img_src} style={{height:'40px',width:'40px'}}/></MenuItem>)}
                        </Select>
                    </FormControl>
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