# gitlab_backup

> gitlab 代码备份

#### 一、构建设置

```bash
# 安装依赖
npm install
# 或者 
yarn

# 启动服务
npm run fetch
# 或者
yarn fetch
```

#### 二、更目录下新建`data`文件夹，在`data`文件夹下新建`list.js`文件

#### 三、需要在项目更目录下新建 `.env `文件（这只是暂时的），配置如下

```bash
# gitlab 配置

# URL地址
GITLAB_BASE_URL = 'http://xxx.com'

# 登录账号及密码
GITLAB_LOGIN = 'your name'
GITLAB_PASSWORD = 'your password'

# 私有授权
PRIVATE_TOKEN = 'Private authorization for your git repository'

# 读取、写入目录路径
PATH_NAME = 'E:/1_Project/Project_Backup'
```

