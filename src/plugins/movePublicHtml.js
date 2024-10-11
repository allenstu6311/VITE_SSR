import fs from "fs-extra";

export default function movePublicHtml() {
  return {
    name: "move-public-files-plugin",
    closeBundle() {
      const publicFilePath = resolve(__dirname, "dist/public");
      const targetPath = resolve(__dirname, "dist");

      if (fs.existsSync(publicFilePath)) {
        fs.readdirSync(publicFilePath).forEach(async (file) => {
          if (file.endsWith(".html")) {
            const srcFile = resolve(publicFilePath, file);
            const destFile = resolve(targetPath, file);
            // 移動 public 目錄到 dist 根目錄
            fs.renameSync(srcFile, destFile, { overwrite: true });
          }
        });
        const isPublicEmpty = fs.readdirSync(publicFilePath);

        if (!isPublicEmpty.length) {
          // 刪除public
          fs.removeSync(publicFilePath);
        }
      }
    },
  };
}
