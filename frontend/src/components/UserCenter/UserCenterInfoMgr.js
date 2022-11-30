import cloth_pic from './materials/cloth.jpg'

const be_type={
    '上衣':'top',
    '下装':'bottom',
    '外套':'coat',
    '鞋子':'shoe',
    '饰品':'ornament'
}
const fe_type={
    'top':      '上衣',
    'bottom':   '下装',
    'coat':     '外套',
    'shoe':     '鞋子',
    'ornament': '饰品'
}
const default_outfit={
    oid:0,
    ing_src:cloth_pic
}
const default_outfits=[default_outfit,default_outfit]

export default class UserCenterInfoMgr{
    states;
    sets;
    socket;

    constructor(props){
        this.socket=props.socket;
        this.sets=props.sets;
        this.states=props.states;
        this.socket.on('userInfoAskSuccess',this.handleUserInfo)
        this.socket.on('userInfoChangeSuccess',this.handleUserInfoChange)
        this.socket.on('getOutfitsSuccess',this.handleOutfits)
        this.socket.on('PID2urlSuccess',this.handelOutfitImg)
        this.socket.on('getAllClothesSuccess',this.handleAllClothes)
        this.socket.on('getAllArticlesSuccess',this.handleAllArticles)
    }

    reqArticles=()=>{
        this.socket.emit('getAllArticles',{
            uid:        this.states.user_info.UID,
            username:   this.states.user_info.username
        });
    }
    reqClothes=(type)=>{
        this.socket.emit('getAllClothes',{
            uid:        this.states.user_info.UID,
            username:   this.states.user_info.username,
            type:       be_type[type]
        })
    }
    reqUserInfo=(username)=>{
        this.socket.emit('userInfoAsk',{username:username})
    }
    reqUserInfoChange=(data)=>{
        const tmp = {
            uid:        this.user_info.uid,
            username:   this.user_info.username,
            gender:     data.gender, 
            age:        data.age,
            profession: data.profession
        }
        this.sets.setUserInfo(tmp)
        this.socket.emit('userInfoChange',tmp)
    }
    reqOutfitList=()=>{
        this.socket.emit('getOutfits',{
            askType:'all',
            uid:this.states.user_info.UID,
            oid:-1
        })
        //test code
        // console.log("outfits req")
        // this.handleOutfits({outfits:default_outfits})
    }
    reqOutfitImg=()=>{
        // this.socket.emit('PID2url',{
        //     pid:        props.pid,
        //     type_src:   be_type[props.type],
        //     index:      props.index
        // })
    }

    handleUserInfo=(data)=>{
        this.sets.setUserInfo(data.userInfo)
    }
    handleUserInfoChange=(data)=>{
        alert(data.messege);
    }
    handleAllArticles=(data)=>{
        this.sets.setArticles(data.articles)
    }
    handleAllClothes=(data)=>{
        this.sets.clothes_sets[fe_type[data.type]](data.clothes)
    }
    handleOutfits=(data)=>{
        let outfit_list=data.outfits.map((outfit)=>{return({
            oid:        outfit.oid,
            upwear:     {pid: outfit.top_id,      img_src: ''},
            downwear:   {pid: outfit.bottom_id,   img_src: ''},
            coat:       {pid: outfit.coat_id,     img_src: ''},
            shoe:       {pid: outfit.shoe_id,     img_src: ''},
            decoration: {pid: outfit.ornament_id, img_src: ''}
        })})
        this.sets.setOutfits(outfit_list)
    }
    handelOutfitImg=(data)=>{
        let outfit_list=this.states.outfit_list;
        outfit_list[data.index].img_src=data.img_src;
        this.sets.setOutfits(outfit_list)
    }
}