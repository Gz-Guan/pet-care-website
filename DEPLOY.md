# 部署到互联网

这个项目已经配置为 Next.js 静态导出，运行 `npm run build` 后会生成 `out/` 目录，可以部署到任意静态网站托管平台。

## 推荐：Cloudflare Pages

1. 把项目上传到 GitHub。
2. 打开 Cloudflare Dashboard，进入 Workers & Pages。
3. 创建 Pages 项目并连接 GitHub 仓库。
4. 构建配置填写：
   - Framework preset: Next.js 或 None
   - Build command: `npm run build`
   - Build output directory: `out`
5. 部署完成后会得到一个 `*.pages.dev` 网址，任何人都可以访问。

## 也可以用 Vercel

1. 把项目上传到 GitHub。
2. 在 Vercel 新建 Project 并导入仓库。
3. 保持默认 Next.js 构建配置即可。
4. 部署完成后会得到一个 `*.vercel.app` 网址。

## 本地确认

```powershell
npm install
npm run build
npm run preview
```

本地预览地址是 `http://127.0.0.1:3000`，正式部署后的地址由托管平台生成。
