const http = require('http');
const fs = require('fs').promises;
const path = require('path');
const url = require('url');

const PORT = 5502;
const ROOT_DIR = __dirname;

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain',
  '.mp3': 'audio/mpeg',
};

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  return mimeTypes[ext] || 'application/octet-stream';
}

const server = http.createServer(async (req, res) => {
  let pathname = url.parse(req.url).pathname;

  if (pathname !== '/' && pathname.endsWith('/')) {
    pathname = pathname.slice(0, -1);
  }

  console.log(`请求: ${pathname}`);
  let filePath = path.join(ROOT_DIR, pathname);

  try {
    const stats = await fs.stat(filePath);

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      const indexStats = await fs.stat(filePath);
      const content = await fs.readFile(filePath);
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(content);
      return;
    }

    if (stats.isFile()) {
      const content = await fs.readFile(filePath);
      res.writeHead(200, { 'Content-Type': getContentType(filePath) });
      res.end(content);
      return;
    }
  } catch (err) {
    // 尝试加 .html
    const htmlPath = filePath + '.html';
    try {
      const stats = await fs.stat(htmlPath);
      if (stats.isFile()) {
        const content = await fs.readFile(htmlPath);
        res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
        res.end(content);
        return;
      }
    } catch (err2) {
      // 都不存在
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('404 - 文件未找到: ' + pathname);
      return;
    }
  }
});

server.listen(PORT, () => {
  console.log(`✓ 本地服务器运行于: http://127.0.0.1:${PORT}`);
  console.log(`✓ 支持无 .html 扩展名的 URL`);
  console.log(`✓ 按 Ctrl+C 停止服务器`);
});
