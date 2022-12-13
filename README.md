## ER图

![image-20221212222743774](readme.assets\image-20221212222743774.png)

## 表

1. pruduct
2. band
3. history
4. interest_group
5. p_comment
6. users
7. outfit
8. essay
9. prod_essay
10. essaycomment
11. group_user
12. essay_group
13. user_product

## 功能

### 用户服务

#### 登录

![image-20221212233444624](readme.assets\image-20221212233444624.png)

#### 注册

![image-20221212233459119](readme.assets\image-20221212233459119.png)

#### 登出

![image-20221212233516215](readme.assets\image-20221212233516215.png)

#### 用户信息

个人信息的展示及修改

![image-20221212233534092](readme.assets\image-20221212233534092.png)

### 衣物服务

#### 展示穿搭

![image-20221212233644458](readme.assets\image-20221212233644458.png)

点击穿搭可进入 *穿搭详情* 

![image-20221212234914148](readme.assets\image-20221212234914148.png)

在 *穿搭详情* 界面可以删除穿搭

#### 添加穿搭

![image-20221212233700985](readme.assets\image-20221212233700985.png)

#### 展示衣物

在 *个人中心* 总览衣物

![image-20221212233736712](readme.assets\image-20221212233736712.png)

点击衣物跳转到 *衣物详情* 

可以在 *衣物详情* 界面删除衣物

![image-20221212233754954](readme.assets\image-20221212233754954.png)

在 *衣物详情* 界面可以添加对衣物的评论，但是不允许评论评论

![image-20221212234641400](readme.assets\image-20221212234641400.png)



#### 添加衣物

![image-20221212235027614](readme.assets\image-20221212235027614.png)

### 文章服务

#### 查看文章

在 *用户中心* 可以总览用户发送的文章

![image-20221212235256648](readme.assets\image-20221212235256648.png)

点击文章进入 *文章详情* 

*文章详情* 中包含文章内容展示，文章下载链接（Markdown文件），删除文章以及相关评论

![image-20221212235341288](readme.assets\image-20221212235341288.png)

#### 新建文章

文章使用Markdown编辑，在提交文章前选择相关组，以将文章发送到相关组内。

![image-20221212235635777](readme.assets\image-20221212235635777.png)

![image-20221212235548307](readme.assets\image-20221212235548307.png)

### 历史服务

#### 查看历史

在 *用户中心* 界面可以查看用户的历史

可以删除历史

![image-20221213095418177](readme.assets\image-20221213095418177.png)

#### 添加历史

![image-20221213095501251](readme.assets\image-20221213095501251.png)

### 兴趣组服务

#### 查看全部兴趣组文章

点击 *组*  中的 *首页* 页面查看世界全部文章

![image-20221213100755371](readme.assets\image-20221213100755371.png)

点击文章进入详情界面，可以查看文章，下载文章，并在文章下添加评论，但作者不是用户的文章不可删除

![image-20221213100904364](readme.assets\image-20221213100904364.png)

#### 我的组

点击 *组* 中的 *我的组* ，可查看我参与的组和我创建的组

![image-20221213101135023](readme.assets\image-20221213101135023.png)

![image-20221213101145780](readme.assets\image-20221213101145780.png)

可以新建兴趣组

![image-20221213101354638](readme.assets\image-20221213101354638.png)

根据gid搜索兴趣组 

![image-20221213101445330](readme.assets\image-20221213101445330.png)

![image-20221213101424732](readme.assets\image-20221213101424732.png)

点击组可以进入组详情

#### 兴趣组详情

*兴趣组详情* 的 *详细信息* 页面展示兴趣组名称、介绍

![image-20221213101539435](readme.assets\image-20221213101539435.png)

*全部成员* 页面展示兴趣组的全部成员

![image-20221213101605575](readme.assets\image-20221213101605575.png)

可以加入本组

![image-20221213101620931](readme.assets\image-20221213101620931.png)

退出本组

![image-20221213101634453](readme.assets\image-20221213101634453.png)

点击 *全部文章* 可以看到所有的组成员在本组发表的文章

![image-20221213101815710](readme.assets\image-20221213101815710.png)



## 设计

前端使用React框架，后端使用node.js。

数据库使用华为OpenGauss，云存储服务使用七牛云。