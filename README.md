# cim-deploy
deploy tool
#### 使用方法

- 获取项目并安装依赖

```
git clone https://github.com/fridego/cim-deploy.git

cd cim-deploy

```

- 指令全局化

```
npm link
```

- 配置deploy命令

```
"deploy": "cim-deploy C:/fe/github/base tttt.txt"
```
  - cim-deploy 为全局命令

  - C:/fe/github/base 为目标目录

  - tttt.txt 为保留文件或文件夹， 包含.git文件