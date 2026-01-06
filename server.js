const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const { initDatabase, verifyUser } = require('./db');

const app = express();
const PORT = 3000;

// 中间件配置
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
    secret: 'englishgame-secret-key-2024',
    resave: false,
    saveUninitialized: false,
    cookie: { 
        secure: false, // 如果使用 HTTPS，设置为 true
        maxAge: 24 * 60 * 60 * 1000 // 24小时
    }
}));

// 静态文件服务
app.use(express.static(path.join(__dirname)));

// 认证中间件
function requireAuth(req, res, next) {
    if (req.session && req.session.authenticated) {
        return next();
    } else {
        return res.redirect('/login.html');
    }
}

// 登录页面路由
app.get('/login.html', (req, res) => {
    if (req.session && req.session.authenticated) {
        return res.redirect('/index.html');
    }
    res.sendFile(path.join(__dirname, 'login.html'));
});

// 登录处理
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    
    console.log('登录请求 - 用户名:', username, '密码:', password ? '***' : '(空)');
    
    if (!username || !password) {
        return res.status(400).json({ 
            success: false, 
            message: '用户名和密码不能为空' 
        });
    }
    
    try {
        const isValid = await verifyUser(username, password);
        
        if (isValid) {
            req.session.authenticated = true;
            req.session.username = username;
            console.log('登录成功:', username);
            return res.json({ 
                success: true, 
                message: '登录成功' 
            });
        } else {
            console.log('登录失败 - 用户名或密码错误');
            return res.status(401).json({ 
                success: false, 
                message: '用户名或密码错误' 
            });
        }
    } catch (error) {
        console.error('登录验证错误:', error);
        return res.status(500).json({ 
            success: false, 
            message: '服务器错误，请稍后重试' 
        });
    }
});

// 登出处理
app.post('/api/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ 
                success: false, 
                message: '登出失败' 
            });
        }
        res.json({ 
            success: true, 
            message: '已登出' 
        });
    });
});

// 检查认证状态
app.get('/api/auth/check', (req, res) => {
    res.json({ 
        authenticated: !!(req.session && req.session.authenticated),
        username: req.session?.username || null
    });
});

// 保护主应用路由
app.get('/index.html', requireAuth, (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// 保护根路径，重定向到登录或主页
app.get('/', (req, res) => {
    if (req.session && req.session.authenticated) {
        res.redirect('/index.html');
    } else {
        res.redirect('/login.html');
    }
});

// 启动服务器
initDatabase()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`服务器运行在 http://localhost:${PORT}`);
            console.log('访问限制已启用，请先登录');
            console.log('使用SQLite数据库存储用户信息');
        });
    })
    .catch((err) => {
        console.error('数据库初始化失败:', err);
        process.exit(1);
    });
