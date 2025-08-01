# 🔐 การติดตั้ง Admin Login กับ LDAP

## 📋 สรุปการเปลี่ยนแปลง

ระบบได้เพิ่มหน้า Admin Login ที่เชื่อมต่อกับ LDAP Server สำหรับการเข้าสู่ระบบจัดการ SACIT

## 🎯 คุณสมบัติใหม่

### 1. **หน้า Admin Login**
- หน้าจอ login เฉพาะสำหรับ admin
- เชื่อมต่อกับ LDAP Server: `172.16.0.2`
- ใช้ username: `administrator` และ password: `ITS@pp0rt`

### 2. **ระบบ Authentication**
- LDAP Authentication
- JWT Token สำหรับ session management
- ตรวจสอบสิทธิ์ admin
- Auto logout เมื่อ token หมดอายุ

### 3. **Security Features**
- AdminAuthGuard component
- Token verification
- Secure logout
- Session management

## 🔧 การติดตั้ง

### 1. **Backend Dependencies**
```bash
cd backendsacit
npm install ldapauth-fork jsonwebtoken
```

### 2. **Environment Variables**
สร้างไฟล์ `.env` ใน `backendsacit/`:
```env
JWT_SECRET=your-secret-key-here
LDAP_URL=ldap://172.16.0.2:389
LDAP_BIND_DN=administrator
LDAP_BIND_PASSWORD=ITS@pp0rt
LDAP_SEARCH_BASE=DC=yourdomain,DC=com
```

### 3. **LDAP Configuration**
ปรับแต่งการตั้งค่า LDAP ใน `adminAuthController.js`:
```javascript
const ldapConfig = {
  url: 'ldap://172.16.0.2:389',
  bindDN: 'administrator',
  bindCredentials: 'ITS@pp0rt',
  searchBase: 'DC=yourdomain,DC=com', // ปรับตาม domain
  searchFilter: '(sAMAccountName={{username}})',
  searchAttributes: ['displayName', 'mail', 'memberOf'],
  reconnect: true,
  timeout: 5000,
  connectTimeout: 10000,
  idleTimeout: 10000,
};
```

## 🚀 การใช้งาน

### 1. **เข้าสู่ระบบ Admin**
- ไปที่ `/admin-login`
- กรอก username: `administrator`
- กรอก password: `ITS@pp0rt`
- ระบบจะตรวจสอบกับ LDAP Server

### 2. **การเข้าถึงหน้า Admin**
- หลังจาก login สำเร็จ จะไปที่ `/admin/dashboard`
- ระบบจะตรวจสอบ token ทุกครั้งที่เข้าถึงหน้า admin
- หาก token หมดอายุ จะ redirect ไปหน้า login

### 3. **ออกจากระบบ**
- คลิกปุ่ม logout ใน sidebar
- ระบบจะลบ token และ redirect ไปหน้า login

## 🔒 Security Features

### 1. **Token Management**
- JWT token มีอายุ 24 ชั่วโมง
- Token ถูกเก็บใน localStorage
- ตรวจสอบ token ทุกครั้งที่เข้าถึงหน้า admin

### 2. **LDAP Authentication**
- เชื่อมต่อกับ LDAP Server แบบ secure
- ตรวจสอบ username/password กับ LDAP
- ตรวจสอบสิทธิ์ admin จาก group membership

### 3. **Admin Role Check**
- ตรวจสอบว่าผู้ใช้อยู่ในกลุ่ม admin หรือไม่
- รองรับการตรวจสอบจาก memberOf attribute
- Fallback ไปตรวจสอบ username

## 📁 ไฟล์ที่เพิ่มเข้ามา

### Frontend:
- `src/pages/AdminLogin.jsx` - หน้า Admin Login
- `src/components/AdminAuthGuard.jsx` - Component ป้องกันการเข้าถึง

### Backend:
- `backendsacit/controllers/adminAuthController.js` - Controller สำหรับ admin auth
- `backendsacit/routes/adminAuth.js` - Routes สำหรับ admin auth

## 🔧 การปรับแต่ง

### 1. **เปลี่ยน LDAP Server**
แก้ไขใน `adminAuthController.js`:
```javascript
const ldapConfig = {
  url: 'ldap://your-ldap-server:389',
  bindDN: 'your-admin-username',
  bindCredentials: 'your-admin-password',
  // ...
};
```

### 2. **ปรับ Admin Groups**
แก้ไขใน `checkAdminRole` function:
```javascript
const adminGroups = [
  'CN=Your Admin Group,CN=Users,DC=yourdomain,DC=com',
  // เพิ่มกลุ่ม admin อื่นๆ
];
```

### 3. **เปลี่ยน JWT Secret**
แก้ไขใน `.env`:
```env
JWT_SECRET=your-very-secure-secret-key
```

## 🚨 หมายเหตุสำคัญ

### 1. **Security**
- เปลี่ยน JWT_SECRET เป็นค่าที่ปลอดภัย
- ตรวจสอบ LDAP connection string
- ใช้ HTTPS ใน production

### 2. **LDAP Configuration**
- ตรวจสอบ LDAP server accessibility
- ตรวจสอบ bind credentials
- ปรับ searchBase ตาม domain structure

### 3. **Error Handling**
- ระบบจะแสดง error message เมื่อ login ไม่สำเร็จ
- ตรวจสอบ console log สำหรับ debugging

## 🎉 สรุป

ระบบ Admin Login พร้อมใช้งานแล้ว! สามารถเข้าสู่ระบบด้วย LDAP credentials และเข้าถึงหน้า admin ได้อย่างปลอดภัย 