# TWT-selfstudy

天津大学自习室查询

基于 Vue3 + TypeScript + Vue-Cli4.0 + vant ui + sass

### 启动项目

在src目录下创建siteConfig.ts文件，模板如下

```js
export default {
  app_key: 'xxxx',
  app_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  domain: 'https://xxx.com',
  baseURL: 'https://xxx.com/',
  extraBaseUrl: 'https://xxx.com/'
}

```

```bash
npm install

npm run serve
```

