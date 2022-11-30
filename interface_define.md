### **UserService**

#### userLogin

| 接口名    | 参数                                          | 返回值                                                       |
| --------- | --------------------------------------------- | ------------------------------------------------------------ |
| login     | `{username:string, password:md5(string)}` | `loginSuccess:{username:srtring, uid:int}`<br />`loginFailed:{message:string}` |
| autoLogin | `{username:string}`                           | `autoLoginSuccess:{}`<br />`autoLoginFailed:{message:string}` |

#### userRegister

| 接口名   | 参数                                               | 返回值                                                       |
| -------- | -------------------------------------------------- | ------------------------------------------------------------ |
| register | `{username:string, password:string, email:string}` | `registerSuccess:{message:string}`<br />`registerFailed:{message:string}` |

#### **userInfo**

| 接口名         | 参数                                                         | 返回值                                                       |
| -------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| userInfoAsk    | `{userName:string}`                                          | `userInfoAskSuccess:{message:string, userInfo:{UID:int, gender:int, age:int, profession:string}}`<br />`userInfoAskFailed:{message:string}` |
| userInfoChange | `{uid:int, username:string, gender:string, age:int, profession:string}`<br /> | `userInfoChangeSuccess:{message:srting}`                     |

userInfoAsk返回的gender，0表示男，1表示女。

userInfoChange参数中gender的取值为"男"/"女"



### clothesService

#### **getOutfits**

| 接口名     | 参数                                 | 返回值                                                       |
| ---------- | ------------------------------------ | ------------------------------------------------------------ |
| getOutfits | `{askType:string, uid:int, oid:int}` | `getOutfitsSuccess:{askType:string,message:sting,outfits:[{}]/}` |

askType: 'all', 'alone'.

#### **PID2url**

| 接口名      | 参数                                    | 返回值                                                       |
| ----------- | --------------------------------------- | ------------------------------------------------------------ |
| **PID2url** | `{pid:int, type_src:string, index:int}` | `PID2urlSuccess:{message:string,img_src:string,type_src:string,index:int}` |

#### getClothes

| 接口名             | 参数                                    | 返回值                                                       |
| ------------------ | --------------------------------------- | ------------------------------------------------------------ |
| getAllClothes      | `{uid:int,username:string,type:string}` | `getAllClothesSuccess:{clothes:[{pid:int, img_src:string, type:string},...], type:string}` |
| getClothesDetail   | `{pid:int}`                             | `getClothesDetailSuccess:{img_src:string,season:string,climate:string,situation:string,band:string}` |
| getClothesComments | `{pid:int}`                             | `getClothesCommentsSuccess:{comments:[{time:strig,content:string,username:string,uid:int}...]}` |



### ArticleService

#### getArticles

| 接口名             | 参数                        | 返回值                                                       |
| ------------------ | --------------------------- | ------------------------------------------------------------ |
| getAllArticles     | `{uid:int,username:string}` | `getAllArticlesSuccess:{articles:[{title:string,time:string}...]}` |
| getArticleDetail   | `{eid:int}`                 | `getArticleDetailSuccess:{title:string,content:string,uid:int,username:string}` |
| getArticleComments | `{eid:int}`                 | `getArticleCommentsSuccess:{comments:[{time:strig,content:string,username:string,uid:int}...]}` |
| getRelatedProducts | `{eid:int}`                 | `getRelatedProductsSuccess:{products:[{pid:int}...]}`        |

getArticleDetail: content返回url.



### groupService

#### getGroups

| 接口名          | 参数      | 返回值                                                       |
| --------------- | --------- | ------------------------------------------------------------ |
| getGroupDetail  | `gid:int` | `getGroupDetailSuccess:{groupName:string,intro:string}`      |
| getGroupMembers | `gid:int` | `getGroupMembersSuccess:{members:[{uid:int,username:string}]}` |
| getGroupEssay   | `gid:int` | `getGroupEssaySuccess:{essays:[{title:string,time:string,uid:int,username:string}...]}` |



### historyService

#### getHistory

| 接口名        | 参数                        | 返回值                                                       |
| ------------- | --------------------------- | ------------------------------------------------------------ |
| getAllHistory | `{hid:int,username:string}` | `getAllHistorySuccess:{histories:[{date:string,climate:string,situation:string,top_id:int...}...]}` |

