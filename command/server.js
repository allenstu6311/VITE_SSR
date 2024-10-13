/**
 * #製作功能
 * 1. 上傳圖片功能
 */

import express from 'express';
import { resolve } from "path";


const app = express();

app.use("/assets", express.static(resolve("dist/assets")));
app.get(/\..+$/, express.static(resolve("dist")));

app.get("*",(req, res)=>{
    const html = resolve('dist/index.html')
    res.sendFile(html);
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
});
