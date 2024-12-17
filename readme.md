# 谷歌激励广告接入模块

该项目是由 Bs 公司提供的谷歌激励广告接入模块，通过使用谷歌的 `gpt.js` 和 Bs 公司的 `bsads.js` 文件，简化了接入流程。

## 功能特点
- 简单易用的谷歌激励广告接入。
- `bsads.js` 提供的预定义 API。
- 示例用法见 `example.js` 文件。

## 使用方法

### 前置条件
1. 确保您已获得Bs 公司提供的 `bsads.js` 文件。
2. 请向我们运营申请广告单元id。

### 集成步骤

1. **引入必要的脚本**
   在需要展示激励视频广告的 HTML 文件的\<body\>中添加以下脚本：

   ```html
   <script src="https://securepubads.g.doubleclick.net/tag/js/gpt.js"></script>
   <script src="path/to/bsads.js"></script>
   ```

2. **设置广告单元 ID**
   `bsads.js` 中的广告单元 ID 仅供测试使用，请替换为您申请的广告单元 ID：
   请将 `bsads.js`中的 

   ```javascript
   bsads.adUnitId = "/22639388115/rewarded_web_example";
   ```

   替换为

   ```javascript
   bsads.adUnitId = "your-ad-unit-id";
   ```

3. **请求并显示广告**
   在相应的广告请求页面调用 `bsads.showVideo` 方法来拉取并展示激励视频广告，同时传入 `success` 和 `fail` 两个回调函数以处理广告播放结果：

   ```javascript
   bsads.showVideo(
       ()=> {
            // add your logic to give reward
       },
       ()=> {
            // add your logic to NOT give reward
       }
   );
   ```

4. **本地运行 Demo**
   将项目部署到本地，并通过 Web 代理访问 Demo 页面。

   web代理方式：
    下载安装VSCode软件后，通过VSCode打开index.html文件所在的文件夹，点击左侧栏中的扩展(extension),搜索框输入 Live Server 安装后
    右下角会出现一个Go Live的按钮 点击后即可查看demo

## 示例
详细用法请参考仓库中的 `example.js` 文件。

## 注意事项
- 请务必在上线前将测试广告单元 ID 替换为您的实际广告单元 ID。
- 更多 API 相关信息，请参阅 `bsads.js` 文档。