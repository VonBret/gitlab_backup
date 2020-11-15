# gitlab_backup

> gitlab 代码备份

### 构建设置

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

### .env 文件

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

