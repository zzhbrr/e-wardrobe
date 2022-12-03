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
    Ref;
    socket;
    onChange;

    constructor(props){
        // console.log(props)
        this.socket=props.socket;
        this.Ref=props.InfoRef;
        this.onChange=props.onChange;
        this.socket.on('userInfoAskSuccess',this.handleUserInfo)
        this.socket.on('userInfoChangeSuccess',this.handleUserInfoChange)
        this.socket.on('getOutfitsSuccess',this.handleOutfits)
        this.socket.on('getOutfitsRetURLSuccess',this.handelOutfitImg)
        this.socket.on('getAllClothesSuccess',this.handleAllClothes)
        this.socket.on('getAllArticlesSuccess',this.handleAllArticles)
    }

    onchange=()=>{
        console.log("on change")
        this.onChange.set(!this.onChange.value)
    }

    reqArticles=()=>{
        console.log(this.Ref.current.user_info)
        if(this.Ref.current.user_info.uid!=-1){
            this.socket.emit('getAllArticles',{
                uid:        this.Ref.current.user_info.uid,
                username:   this.Ref.current.user_info.username
            });
            this.Ref.current.init_state['我的文章']=true;
        }
    }
    reqClothes=(type)=>{
        this.socket.emit('getAllClothes',{
            uid:        this.Ref.current.user_info.uid,
            username:   this.Ref.current.user_info.username,
            type:       be_type[type]
        })
        this.Ref.current.init_state['我的衣服'][type]=true;
    }
    reqUserInfo=(username)=>{
        console.log("username: "+username)
        this.socket.emit('userInfoAsk',{userName:username})
        this.Ref.current.init_state['个人信息']=true;
    }
    reqUserInfoChange=(data)=>{
        console.log("userinfo change")
        const tmp = {
            uid:        this.Ref.current.user_info.uid,
            username:   this.Ref.current.user_info.username,
            gender:     data.gender,
            age:        data.age,
            profession: data.profession
        }
        this.socket.emit('userInfoChange',tmp)
    }
    reqOutfitList=()=>{
        this.socket.emit('getOutfits',{
            askType:'all',
            uid:this.Ref.current.user_info.uid,
            oid:-1
        })
        this.Ref.current.init_state['我的穿搭']=true;
        //test code
        // console.log("outfits req")
        // this.handleOutfits({outfits:default_outfits})
    }
    // reqOutfitImg=(index,type,pid)=>{
    //     if(this.Ref.current.outfit_list[index][type].img_src==''){
    //         console.log(`req img: ${pid} ${type}`)
    //         this.socket.emit('PID2url',{
    //             pid:pid,
    //             type_src:be_type[type],
    //             index:index
    //         })
    //     }
        
    //     // console.log(this.Ref.current.outfit_list)
    //     // if(this.Ref.current.outfit_list==false||this.Ref.current.cur_img>=this.Ref.current.outfit_list.length) return;
    //     // // console.log(this.Ref.current.outfit_list)
    //     // let cur=this.Ref.current.cur_img;
    //     // console.log("req img: "+cur)
    //     // let i;
    //     // for(i in be_type){
    //     //     if(this.Ref.current.outfit_list[cur][i].img_src===''){
    //     //         this.socket.emit('PID2url',{
    //     //             pid:        this.Ref.current.outfit_list[cur][i].pid,
    //     //             type_src:   be_type[i],
    //     //             index:      cur
    //     //         });
    //     //         break;
    //     //     }
    //     // }
    //     // if(i==='饰品'){
    //     //     this.sets.setCurImg(cur+1)
    //     // } 
    // }

    handelOutfitImg=(data)=>{
        if(this.Ref.current.outfit_list==false){
            console.log('rcv img: outfit_list null')
            return
        }
        // if(this.Ref.current.outfit_list[data.index][fe_type[data.type]].img_src!=false){
        //     console.log("rev img: already had")
        //     return
        // }
        console.log(`rcv img:${data.index} ${data.type} `)
        this.Ref.current.outfit_list[data.index][fe_type[data.type]].img_src=data.img_src;
        this.onchange()
        this.Ref.current.init_state['我的穿搭']=true;
    }

    handleUserInfo=(data)=>{
        // console.log(this.Ref.current)
        console.log('rcv userinfo')
        console.log(data.userInfo)
        this.Ref.current.user_info=data.userInfo
        console.log(this.Ref.current.user_info)
        this.onchange()
    }
    handleUserInfoChange=(data)=>{
        console.log(data)
        this.Ref.current.user_info={
            uid:data.uid,
            username:data.username,
            gender:data.gender,
            age:data.age,
            profession:data.profession   
        }
        this.onchange()
        // confirm(data.message)
    }
    handleAllArticles=(data)=>{
        this.Ref.current.article_list=data.articles;
        console.log(data.articles)
        this.onchange()
    }
    handleAllClothes=(data)=>{
        this.Ref.current.clothes_lists[fe_type[data.type]]=data.clothes
        this.onchange()
    }
    handleOutfits=(data)=>{
        this.Ref.current.outfit_list=data.outfits.map((outfit)=>{return({
            oid:    outfit.oid,
            '上衣': {pid: outfit.top_id,      img_src: ''},
            '下装': {pid: outfit.bottom_id,   img_src: ''},
            '外套': {pid: outfit.coat_id,     img_src: ''},
            '鞋子': {pid: outfit.shoe_id,     img_src: ''},
            '饰品': {pid: outfit.ornament_id, img_src: ''}
        })})
        this.onchange();
        // this.sets.setOutfits(tmp_outfit_list)
    }
}