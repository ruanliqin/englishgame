const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = path.join(__dirname, 'users.db');

// 初始化数据库
function initDatabase() {
    return new Promise((resolve, reject) => {
        const db = new sqlite3.Database(DB_PATH, (err) => {
            if (err) {
                console.error('打开数据库失败:', err);
                return reject(err);
            }
            console.log('已连接到SQLite数据库');
        });

        // 创建User表
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('创建表失败:', err);
                db.close();
                return reject(err);
            }
            console.log('User表已创建或已存在');
            db.close();
            resolve();
        });
    });
}

// 获取数据库连接
function getDatabase() {
    return new sqlite3.Database(DB_PATH);
}

// 根据用户名查找用户
function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
        const db = getDatabase();
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, row) => {
            db.close();
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
}

// 创建用户
function createUser(username, password) {
    return new Promise((resolve, reject) => {
        const db = getDatabase();
        db.run('INSERT INTO users (username, password) VALUES (?, ?)', 
            [username, password], 
            function(err) {
                db.close();
                if (err) {
                    return reject(err);
                }
                resolve({ id: this.lastID, username, password });
            }
        );
    });
}

// 验证用户密码
function verifyUser(username, password) {
    return new Promise((resolve, reject) => {
        getUserByUsername(username)
            .then(user => {
                if (!user) {
                    return resolve(false);
                }
                if (user.password === password) {
                    return resolve(true);
                }
                return resolve(false);
            })
            .catch(reject);
    });
}

module.exports = {
    initDatabase,
    getDatabase,
    getUserByUsername,
    createUser,
    verifyUser
};
