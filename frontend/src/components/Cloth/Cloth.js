// cloth
import React from "react";
import "./Cloth.css";
import cloth_pic from "./cloth.png";
import { useNavigate, useParams } from "react-router-dom";

export default function ClothDetail(props){
    const params=useParams();
    const pid=params.pid;
    const [cloth_detail, set_cloth_detail] = React.useState({
        img_src: cloth_pic,
        season: "season-1",
        climate: "climate-1",
        situation: "situation-1",
        band:  "band-1",
        texture: "texture-1"
    })
    const [comment_list, set_comment_list] = React.useState([{
        time: "2022-12-01",
        content_src: "good good good.",
        uid:      0,
        username: "Tom",
    }])

    React.useEffect(() => {
        props.socket.off('getClothesDetailSuccess');
        props.socket.on('getClothesDetailSuccess', (res) => {
            set_cloth_detail(res);
            console.log(res);
        })
        props.socket.emit('getClothesDetail', {pid: pid});
    }, [])
    React.useEffect(() => {
        console.log("adfsfs");
        props.socket.off('getClothesCommentsSuccess');
        props.socket.on('getClothesCommentsSuccess', (res) => {
            set_comment_list(res.comments);
            console.log(res);
        })
        props.socket.emit('getClothesComments', {pid: pid});
    }, [])


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
                {comment_list.map((comment)=>{return (
                    <div className="Comment_block" key={comment.pid}>
                        <p className="Comment_username">{comment.username}&nbsp;编辑于&nbsp;{comment.time}</p>
                        <div className="Comment_content">{comment.content_src}</div>
                    </div>
                )})}
            </div>
        </div>
    )
}