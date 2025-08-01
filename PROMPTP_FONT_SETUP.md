# 🎨 การติดตั้งฟอนต์ PromptP ในระบบ Admin

## 📋 สรุปการเปลี่ยนแปลง

ระบบหลังบ้าน admin ได้ถูกอัพเดทให้ใช้ฟอนต์ **PromptP** แทนฟอนต์เดิมทั้งหมดแล้ว

## 🔧 ไฟล์ที่ถูกแก้ไข

### 1. ไฟล์ CSS หลัก
- `src/index.css` - เปลี่ยน import font และ font-family หลัก
- `src/assets/fonts/promptp.css` - ไฟล์ CSS สำหรับ PromptP (ใหม่)
- `src/assets/admin-promptp.css` - ไฟล์ CSS เฉพาะสำหรับ admin panel (ใหม่)

### 2. ไฟล์ Configuration
- `tailwind.config.js` - เพิ่ม font family สำหรับ PromptP
- `src/main.jsx` - เพิ่ม import ไฟล์ CSS ใหม่

### 3. ไฟล์ Components
- `src/components/Layout.jsx` - เพิ่ม class `admin-panel` และ `data-admin="true"`
- `src/pages/Dashboard.jsx` - เพิ่ม class `admin-panel` และ `data-admin="true"`
- `src/pages/Users/index.jsx` - เพิ่ม class `admin-panel` และ `data-admin="true"`
- `src/pages/Settings/index.jsx` - เพิ่ม class `admin-panel` และ `data-admin="true"`

## 🎯 วิธีการใช้งาน

### 1. ใช้กับ Tailwind Classes
```jsx
<h1 className="font-promptp text-2xl">ข้อความปกติ</h1>
<h2 className="font-promptp-bold text-xl">ข้อความตัวหนา</h2>
<p className="font-promptp-light">ข้อความตัวบาง</p>
```

### 2. ใช้กับ CSS Classes
```jsx
<h1 className="font-promptp">ข้อความปกติ</h1>
<h2 className="font-promptp-bold">ข้อความตัวหนา</h2>
```

### 3. ใช้กับ CSS Variables
```css
.my-text {
  font-family: var(--font-promptp);
}
```

## 🔍 การตรวจสอบ

### 1. ตรวจสอบใน Browser
- เปิด Developer Tools (F12)
- ไปที่ Elements tab
- ตรวจสอบว่า elements มี class `admin-panel` และ `data-admin="true"`
- ตรวจสอบ Computed styles ว่ามี `font-family: 'Prompt'` หรือไม่

### 2. ตรวจสอบใน Network Tab
- ตรวจสอบว่า Google Fonts Prompt ถูกโหลดสำเร็จ
- ตรวจสอบว่าไฟล์ CSS ใหม่ถูกโหลด

## 📱 หน้าจอที่ได้รับผลกระทบ

### Admin Pages ที่ใช้ฟอนต์ PromptP:
- ✅ Dashboard (`/admin/dashboard`)
- ✅ Users Management (`/admin/users`)
- ✅ Settings (`/admin/settings`)
- ✅ Agenda Management (`/admin/agenda`)
- ✅ Speakers Management (`/admin/speakers`)
- ✅ Attendees Management (`/admin/attendees`)
- ✅ Certificates (`/admin/certificates`)
- ✅ Google Analytics (`/admin/google-analytics`)
- ✅ Multimedia (`/admin/multimedia`)
- ✅ Submissions Review (`/admin/submissions-review`)
- ✅ Templates (`/admin/templates`)
- ✅ E-Books (`/admin/ebooks`)

### หน้าจอที่ไม่ได้รับผลกระทบ:
- ❌ Landing Page (ยังใช้ฟอนต์เดิม)
- ❌ Register Pages (ยังใช้ฟอนต์เดิม)
- ❌ Login Page (ยังใช้ฟอนต์เดิม)
- ❌ Public Pages (ยังใช้ฟอนต์เดิม)

## 🚀 การปรับแต่งเพิ่มเติม

### 1. เปลี่ยนฟอนต์เฉพาะส่วน
```css
/* เปลี่ยนเฉพาะส่วน header */
.admin-header {
  font-family: 'Prompt', sans-serif !important;
}

/* เปลี่ยนเฉพาะส่วน sidebar */
.admin-sidebar {
  font-family: 'Prompt', sans-serif !important;
}
```

### 2. เปลี่ยนฟอนต์สำหรับหน้าจออื่นๆ
หากต้องการเปลี่ยนฟอนต์สำหรับหน้าจออื่นๆ ให้เพิ่ม class `admin-panel` และ `data-admin="true"` ในไฟล์ component นั้นๆ

## 🔧 การแก้ไขปัญหา

### 1. ฟอนต์ไม่แสดงผล
- ตรวจสอบการเชื่อมต่ออินเทอร์เน็ต
- ตรวจสอบว่า Google Fonts ถูกบล็อกหรือไม่
- ลองใช้ local font files แทน

### 2. ฟอนต์แสดงผลไม่ถูกต้อง
- ตรวจสอบ CSS specificity
- ตรวจสอบว่า `!important` ถูกใช้อย่างถูกต้อง
- ตรวจสอบ Tailwind configuration

### 3. Performance Issues
- ใช้ `font-display: swap` เพื่อปรับปรุง performance
- พิจารณาใช้ local font files แทน Google Fonts

## 📝 หมายเหตุ

- ฟอนต์ PromptP เป็นฟอนต์ที่ออกแบบมาเพื่อภาษาไทยโดยเฉพาะ
- มีการรองรับ font weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
- ใช้ Google Fonts เป็น fallback หาก local fonts ไม่สามารถโหลดได้
- ใช้ Noto Sans Thai เป็น fallback สุดท้าย

## 🎉 สรุป

ระบบ admin ได้รับการอัพเดทให้ใช้ฟอนต์ PromptP เรียบร้อยแล้ว ซึ่งจะทำให้การแสดงผลข้อความภาษาไทยมีความสวยงามและอ่านง่ายมากขึ้น 