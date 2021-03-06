/**
 * 配置文件信息，统一处理
 * Created by keenfir on 2020/11/15.
 */
module.exports = {
    baseurl: process.env.GITLAB_BASE_URL,
    login: process.env.GITLAB_LOGIN,
    password: process.env.GITLAB_PASSWORD,
    private_token: process.env.PRIVATE_TOKEN,
    path_name: process.env.PATH_NAME,
};