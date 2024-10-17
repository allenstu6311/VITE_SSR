function viteLifecycle() {
  return {
    name: "vite-lifecycle",

    //---- Rollup 第一階段(构建钩子)-----
    /**
     * 第一個鉤子，開始建構前調用，不能訪問建構的訊息
     * @param {Function} onwarn 處理提示訊息
     * @param {Array} plugins 尚未得知用處
     */
    options({ onwarn, plugins }) {
      // console.log("options");
    },
    /**
     * 實際開始建構前調用
     */
    buildStart({ onwarn, plugins }) {
      // console.log("buildStart");
    },
    resolveId(source) {
      // console.log("resolveId");
    },
    /**
     * 加載模塊時調用
     * @param {String} id 檔案路徑
     */
    load(id) {
      // console.log("load");
    },
    /**
     * 使用快取時調用(不常用到)
     */
    shouldTransformCachedModuleHook() {
      console.log("shouldTransformCachedModuleHook");
    },
    /**
     * 模塊被轉換時調用，可用於修改代碼內容
     * @param {String} code 程式碼
     * @param {String} id 檔案路徑
     */
    transform(code, id) {
      // console.log("transform", id);
    },
    /**
     * 模块内容被解析成 AST 之后立即被调用(Vite開發中不會調用)
     * @param {Object} moduleInfo 模組詳細資訊
     */
    moduleParsed(moduleInfo) {
      // console.log("moduleParsed");
    },
    /**
     * 使用動態導入時調用
     */
    resolveDynamicImport() {
      // console.log("resolveDynamicImport");
    },
    /**
     * Rollup 完成了对所有模块的解析後调用
     * @param {Error} error
     */
    buildEnd(error) {
      // console.log("buildEnd");
    },

    //---- Rollup 第二階段(输出生成钩子)-----

    /**
     * 打包文件已经生成，但还未写入磁盘时执行
     * @param {*} _
     * @param {*} bundle
     */
    generateBundle(_, bundle) {
      // for (const fileName of Object.keys(bundle)) {
      //   if (/\.(ttf|otf)$/i.test(fileName)) {
      //     console.log("fileName ", fileName);
      //   }
      // }
    },

    /**
     * 完整打包完後調用
     */
    closeBundle() {
      // console.log("closeBundle");
    },

    //--------- vite hook ---------

    /**
     * 在解析 Vite 配置前调用
     * @param {Object} config vite.config
     * @param {Object} env 環境設定
     */
    config(config, env) {
      //console.log("config");
    },
    /**
     * 在解析 Vite 配置后调用
     * @param {Object} config vite.config
     */
    configResolved(config) {
      //console.log("configResolved");
    },
    /**
     * 用於配置開發服務器(生產版本不調用)
     * @param {ViteDevServer} server
     */
    configureServer(server) {
      //console.log("configureServer");
      // server.middlewares.use((req, res, next) => {
      //   // 每次請求觸發
      //   //console.log("server");
      // });
    },
    /**
     * 用於預覽開發服務器(生產版本不調用)
     * @param {PreviewServer} server
     */
    configurePreviewServer(server) {
      //console.log("configurePreviewServer");
    },
    /**
     * 轉換html的時候調用
     * @param {HTML} html
     */
    transformIndexHtml(html) {
      //console.log("transformIndexHtml");
    },
    /**
     * 修改文件時調用
     * @param {string} file 文件名稱
     * @param {ViteDevServer} server
     * @param {Array} modules 受更改文件影响的模块数组(可能同時影響多個模組)
     * @param {Function} read 返回現在的文件內容(非同步)
     * @param {number} timestamp 時間戳
     */
    handleHotUpdate({ file, server, modules, read, timestamp }) {
      //console.log("handleHotUpdate", file);
    },
  };
}

export default viteLifecycle;
