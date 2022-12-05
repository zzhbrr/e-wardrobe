// cloth
import React from "react";
import "./Cloth.css";
import cloth_pic from "./cloth.png";
import { useNavigate, useParams } from "react-router-dom";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
const ariaLabel = { 'aria-label': 'description' };

export default function ClothDetail(props){
    const params=useParams();
    const pid=params.pid;
    const uid=params.uid;
    const [new_comment, set_new_comment] = React.useState("");
    const [cloth_detail, set_cloth_detail] = React.useState({
        img_src: cloth_pic,
        season: "season-1",
        climate: "climate-1",
        situation: "situation-1",
        band:  "band-1",
        texture: "texture-1",
    })
    const [comment_list, set_comment_list] = React.useState([{
        time: "2022-12-01",
        content: "Loading...",
        uid:      uid,
        username: "Tom",
    }])
    // 请求衣物产品内容
    React.useEffect(() => {
        props.socket.off('getClothesDetailSuccess');
        props.socket.on('getClothesDetailSuccess', (res) => {
            set_cloth_detail(res);
            console.log(res);
        })
        props.socket.emit('getClothesDetail', {pid: pid});
    }, [])
    // 请求衣物产品对应评论
    React.useEffect(() => {
        props.socket.off('getClothesCommentsSuccess');
        props.socket.on('getClothesCommentsSuccess', (res) => {
            set_comment_list(res.comments);
            console.log(res);
        })
        props.socket.emit('getClothesComments', {pid: pid});
    }, [])
    //发布评论
    const handleSubmit = () => {
        props.socket.emit('addClothesComments', {uid: uid, pid: pid, content: new_comment});
        console.log({uid: uid, pid: pid, add_new_content: new_comment});
        // addClothesCommentsSuccess:{uid:int,pid:int,seqid:int,content:string,c_time:string}
        props.socket.off('addClothesCommentsSuccess');
        props.socket.on('addClothesCommentsSuccess', (data) =>{
            console.log(data);
            set_new_comment("");
            // 重新获取全部评论
            props.socket.off('getClothesCommentsSuccess');
            props.socket.on('getClothesCommentsSuccess', (res) => {
                set_comment_list(res.comments);
                console.log(res);
            })
            props.socket.emit('getClothesComments', {pid: pid});
        })
    }


    return(
        <div>
            <div className="Cloth_head">
                <bottom className="Cloth_season">
                    季节:&nbsp;{cloth_detail.season}
                </bottom>&nbsp;&nbsp;&nbsp;
                <bottom className="Cloth_climate">
                    适宜天气:&nbsp;{cloth_detail.climate}
                </bottom>&nbsp;&nbsp;&nbsp;
                <bottom className="Cloth_situation">
                    适宜场景:&nbsp;{cloth_detail.situation}
                </bottom>&nbsp;&nbsp;&nbsp;
                <bottom className="Cloth_band">
                    品牌:&nbsp;{cloth_detail.band}
                </bottom>&nbsp;&nbsp;&nbsp;
                <bottom className="Cloth_texture">
                    材质:&nbsp;{cloth_detail.texture}
                </bottom>
            </div>
            <div className="Cloth_body">
                <img src={cloth_detail.img_src} className="cloth_img"/>
            </div>
            <div>
                <h2>相关评论</h2>
                <Box sx={{ display: 'flex', alignItems: 'flex-end' }} className="addComment_block">
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField id="input-with-sx" placeholder="添加评论" inputProps={ariaLabel} fullWidth
                        onChange={(e) => set_new_comment(e.target.value)} className="addComment_TextField">
                    </TextField>
                    <div className="addComment_enter">
                        <Button onClick={() => handleSubmit()} size='small' variant="contained" endIcon={<SendIcon />}>
                            提交
                        </Button>
                    </div>
                </Box>
                {comment_list.map((comment)=>{return (
                    <div className="Comment_block" key={comment.pid}>
                        <p className="Comment_username">{comment.username}&nbsp;编辑于&nbsp;{comment.time}</p>
                        <div className="Comment_content">{comment.content}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}