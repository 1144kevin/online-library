// const jsonServer = require('json-server');
// const multer = require('multer');
// const path = require('path');
// const server = jsonServer.create();
// const router = jsonServer.router('db.json');
// const middlewares = jsonServer.defaults();

// // 使用 multer 保存圖片到指定的資料夾
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, 'src/assets/images')); // 保存到圖片資料夾
//   },
//   filename: function (req, file, cb) {
//     const date = new Date();
//     const imageFileName = date.getTime() + '-' + file.originalname;
//     req.body.image = imageFileName; // 保存圖片名稱到請求中
//     cb(null, imageFileName); // 確保正確命名圖片文件
//   }
// });

// // 配置 multer
// const upload = multer({ storage: storage }).single('image');

// // 使用 json-server 的默認中介軟件
// server.use(middlewares);

// // 處理圖片上傳和其他書籍數據
// server.post("/book", (req, res, next) => {
//   upload(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ error: "圖片上傳失敗" });
//     } else if (err) {
//       return res.status(500).json({ error: "伺服器錯誤" });
//     }

//     let date = new Date();
//     req.body.createdAt = date.toISOString();

//     let hasError = false;
//     let errors = {};

//     if (!req.body.title || req.body.title.length < 2) {
//       hasError = true;
//       errors.title = "Title must be at least 2 characters";
//     }
//     if (!req.body.body || req.body.body.length < 2) {
//       hasError = true;
//       errors.body = "Body must be at least 2 characters";
//     }
//     if (!req.body.image) {
//       hasError = true;
//       errors.image = "Image is required";
//     }
//     if (hasError) {
//       res.status(400).jsonp(errors);
//       return;
//     }

//     // 将新书添加到数据库
//     const db = router.db; // 获取 lowdb 实例
//     const books = db.get('books'); // 假设 'books' 是集合名称
//     books.push(req.body).write();

//     res.status(201).jsonp(req.body);
//   });
// });

// // 使用 json-server 的路由來處理 GET/POST 等請求
// server.use(router);

// // 啟動伺服器
// server.listen(3006, () => {
//   console.log('JSON Server is running on port 3006');
// });