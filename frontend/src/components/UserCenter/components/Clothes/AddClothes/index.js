import React from 'react';
import TextField from '@mui/material/TextField';
import { 
    Dialog, DialogTitle, DialogContent, 
    DialogContentText, RadioGroup, FormControlLabel, 
    FormControl, InputLabel, DialogActions, 
    FormLabel, Radio, Button, Select, MenuItem
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
const qiniuserver = require('../../../../../qiniuserver/uploadToQiniu'); 

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
};
const onPreview = async (file) => {
    let src = file.url;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
};



export default function AddClothes({handleAddClothes, socket}) {
    const [loading, setLoading] = React.useState(false);
    const [imageUrl, setImageUrl] = React.useState();
    const [fileList, setFileList] = React.useState([
        // {
        //   uid: '-1',
        //   name: 'image.png',
        //   status: 'done',
        //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // },
      ]);
    

    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("");
    const [color, setColor] = React.useState("");
    const [season, setSeason] = React.useState("");
    // const [situation, setSituation] = React.useState("");
    // const [climate, setClimate] = React.useState("");
    const [texture, setTexture] = React.useState("");
    function handleClickAddClothes() {
        setOpen(true);
    }
    function handleClose() {
        setOpen(false);
    }

    var types = ['上衣', '下装', '外套', '鞋子', '饰品'];
    var seasons = ['春', '夏', '秋', '冬'];

    var observer = {
        next (res) {
            // 输出上传进度，小数形式，0~1 之间 
            console.log (res.total.percent)
        },
        error (err) {
            console.log (err)
        },
        complete (res) {
          // 输出最终返回可用的图片链接 
            console.log ("http://rm4z8n129.hn-bkt.clouddn.com/" + res.key);
            console.log ('complete!')
            const data = {img_src: "http://rm4z8n129.hn-bkt.clouddn.com/" + res.key, type: type, color: color, season: season, texture: texture};
            console.log(data);
            handleClose();
            setFileList([]);
            setType("");
            setColor("");
            setSeason("");
            setTexture("");            
            handleAddClothes(data);
        }
    }

    function handleSubmit() {
        socket.emit('getToken');
        socket.off('getTokenSuccess');
        socket.on('getTokenSuccess', function (res) {
            console.log(res);
            qiniuserver.uploadfile(fileList[0].originFileObj, 'images/', res.token, observer); 
        });
    }

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>
            Upload
          </div>
        </div>
    );
    const onChange = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        setOpen(true);
        console.log('newFileList', newFileList);
    };

    function beforeCrop() {
        setOpen(false);
        return true;
    }
    
    
    return (
        <div> 
            <div>
                <button className='change_btn' onClick={handleClickAddClothes}>
                    <EditIcon style={{float:"left",marginRight:"5px"}}/>
                    添加衣服
                </button>
            </div>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>添加衣服</DialogTitle>      
                {/* <ImgCrop rotate beforeCrop={beforeCrop}>           */}
                    <Upload name="clothes" listType="picture-card" className="avatar-uploader" 
                        fileList={fileList}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload} onChange={onChange} onPreview={onPreview} >
                        {fileList.length === 0 ? '+ Upload' : null}
                    </Upload>
                {/* </ImgCrop> */}
                
                <DialogContent>
                    <FormControl fullWidth>
                        <InputLabel>种类</InputLabel>
                        <Select value={type} onChange={(e) => setType(e.target.value)}>
                            {types.map((type) => <MenuItem value={type} key={type}>{type}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField autoFocus margin="normal" type="text" variant='filled' fullWidth
                        onChange={(e) => setColor(e.target.value)} label="颜色" ></TextField>
                    <FormControl fullWidth>
                        <InputLabel>季节</InputLabel>
                        <Select value={season} onChange={(e) => setSeason(e.target.value)}>
                            {seasons.map((season) => <MenuItem value={season} key={season}>{season}</MenuItem>)}
                        </Select>
                    </FormControl>
                    <TextField autoFocus margin="normal" type="text" variant='filled' fullWidth
                        onChange={(e) => setTexture(e.target.value)} label="材质" ></TextField>
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