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
const history_type_img={
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
        this.socket.off('userInfoAskSuccess');
        this.socket.on('userInfoAskSuccess',this.handleUserInfo);
        this.socket.off('userInfoChangeSuccess');
        this.socket.on('userInfoChangeSuccess',this.handleUserInfoChange);
        this.socket.off('getOutfitsSuccess');
        this.socket.on('getOutfitsSuccess',this.handleOutfits);
        this.socket.off('getOutfitsRetURLSuccess');
        this.socket.on('getOutfitsRetURLSuccess',this.handelOutfitImg);
        this.socket.off('getAllClothesSuccess');
        this.socket.on('getAllClothesSuccess',this.handleAllClothes);
        this.socket.off('getAllArticlesSuccess');
        this.socket.on('getAllArticlesSuccess',this.handleAllArticles);
        this.socket.off('getAllHistorySuccess');
        this.socket.on('getAllHistorySuccess',this.handleAllHistories);
        this.socket.off('getAllHistoryRetURLSuccess');
        this.socket.on('getAllHistoryRetURLSuccess',this.handelHistoriesImg);
        this.socket.off('addClothesSuccess');
        this.socket.on('addClothesSuccess', this.handleAddClothes);
        this.socket.off('addArticleSuccess');
        this.socket.on('addArticleSuccess', this.handleAddArticle);
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
    }
    reqHistories=()=>{
        console.log(this.Ref.current.user_info)
        if(this.Ref.current.user_info.uid!=-1){
            this.socket.emit('getAllHistory',{
                uid:        this.Ref.current.user_info.uid,
                username:   this.Ref.current.user_info.username
            });
            this.Ref.current.init_state['我的历史']=true;
        }
    }
    reqAddClothes=(data)=>{
        console.log('add clothes')
        this.socket.emit('addClothes',{
            uid:        this.Ref.current.user_info.uid,
            username:   this.Ref.current.user_info.username,
            type:       be_type[data.type],
            img_src:    data.img_src, 
            color:      data.color,
            season:     data.season,
            texture:    data.texture
        })
    }
    reqAddArticle=(data)=>{
        console.log('add article')
        this.socket.emit('addArticle',{
            uid:        this.Ref.current.user_info.uid,
            title:      data.title,
            content_src:    data.content_src,
            relatedgroups: data.relatedGroups, 
            relatedproducts: []
        })
    }
    reqAddOutfit=(data)=>{
        data.uid=this.Ref.current.user_info.uid;
        data.username=this.Ref.current.user_info.username;
        this.socket.emit('addOutfits',data)
    }

    handleAddArticle=(data)=>{
        console.log('add article: '); console.log(data);
        this.Ref.current.article_list.push(data);
        this.onchange();
    }

    handleAddClothes=(data)=>{
        console.log('add Cloth : ');
        console.log(data);
        console.log(fe_type[data.type]);
        this.Ref.current.clothes_lists[fe_type[data.type]].push({pid:data.pid, img_src:data.img_src, type:data.type});
        this.onchange();
    }

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
    handelHistoriesImg=(data)=>{
        if(this.Ref.current.history_list==false){
            console.log('rcv img: history_list null')
            return
        }
        console.log(`rcv img:${data.index} ${data.type} `)
        this.Ref.current.history_list[data.index][history_type_img[data.type]]=data.img_src;
        this.onchange()
        this.Ref.current.init_state['我的历史']=true;
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
    handleAllHistories=(data)=>{
        this.Ref.current.history_list=data.history; 
        console.log(data.history)
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