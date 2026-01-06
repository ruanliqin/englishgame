#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
用户创建脚本
用于在SQLite数据库中创建新用户
"""

import sqlite3
import sys
import getpass
import os

DB_PATH = os.path.join(os.path.dirname(__file__), 'users.db')


def init_database():
    """初始化数据库，如果不存在则创建表"""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()
    print(f"数据库已初始化: {DB_PATH}")


def create_user(username, password):
    """创建新用户"""
    try:
        conn = sqlite3.connect(DB_PATH)
        cursor = conn.cursor()
        
        # 检查用户是否已存在
        cursor.execute('SELECT * FROM users WHERE username = ?', (username,))
        existing_user = cursor.fetchone()
        
        if existing_user:
            print(f"错误: 用户名 '{username}' 已存在")
            conn.close()
            return False
        
        # 创建用户
        cursor.execute('INSERT INTO users (username, password) VALUES (?, ?)', 
                      (username, password))
        conn.commit()
        conn.close()
        
        print(f"✓ 用户 '{username}' 创建成功")
        return True
        
    except sqlite3.Error as e:
        print(f"错误: 创建用户失败 - {e}")
        return False


def main():
    """主函数"""
    # 初始化数据库
    init_database()
    
    # 获取用户名
    if len(sys.argv) > 1:
        username = sys.argv[1]
    else:
        username = input("请输入用户名: ").strip()
    
    if not username:
        print("错误: 用户名不能为空")
        sys.exit(1)
    
    # 获取密码
    if len(sys.argv) > 2:
        password = sys.argv[2]
    else:
        password = getpass.getpass("请输入密码: ")
        password_confirm = getpass.getpass("请再次输入密码确认: ")
        
        if password != password_confirm:
            print("错误: 两次输入的密码不一致")
            sys.exit(1)
    
    if not password:
        print("错误: 密码不能为空")
        sys.exit(1)
    
    # 创建用户
    if create_user(username, password):
        sys.exit(0)
    else:
        sys.exit(1)


if __name__ == '__main__':
    main()
