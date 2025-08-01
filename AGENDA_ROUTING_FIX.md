# การแก้ไขปัญหา Agenda Routing

## ปัญหาที่พบ
เมื่อเข้าที่ `http://localhost:5174/admin/agenda` ระบบจะแสดงหน้า agenda ทั่วไป (public view) แทนที่จะเป็นหน้า admin สำหรับจัดการ agenda

## สาเหตุของปัญหา
ในไฟล์ `src/App.jsx` มีการกำหนด route ซ้ำกัน:

1. **Route ทั่วไป**: `<Route path="/agenda" element={<AgendaPage />} />`
2. **Route Admin**: `<Route path="agenda" element={<AgendaPage />} />`

React Router จะ match route ที่สั้นกว่าก่อน ทำให้ `/admin/agenda` ไป match กับ `/agenda` แทนที่จะเป็น `/admin/agenda`

## การแก้ไข

### 1. สร้างหน้า Admin Agenda แยกต่างหาก
สร้างไฟล์ `src/pages/Agenda/AdminAgenda.jsx` สำหรับหน้า admin ที่มีฟีเจอร์:
- เพิ่ม แก้ไข ลบรายการ agenda
- ค้นหาและกรองข้อมูล
- จัดการประเภทของรายการ (พิธีการ, ปาฐกถา, เวิร์กช็อป, เสวนา)
- กำหนดเวลา สถานที่ ผู้พูด และจำนวนผู้เข้าร่วม

### 2. อัปเดต Routing
ในไฟล์ `src/App.jsx`:

```javascript
// Import หน้าใหม่
import AdminAgenda from '@/pages/Agenda/AdminAgenda';

// Route ทั่วไป (public view)
<Route path="/agenda" element={<AgendaPage />} />

// Route Admin (management view)
<Route path="agenda" element={<AdminAgenda />} />
```

### 3. โครงสร้างไฟล์ใหม่
```
src/pages/Agenda/
├── index.jsx          # หน้าแสดง agenda สำหรับผู้ใช้ทั่วไป
├── AdminAgenda.jsx    # หน้าจัดการ agenda สำหรับ admin
├── AgendaDay.jsx      # Component สำหรับแสดงรายการตามวัน
├── AgendaForm.jsx     # Component สำหรับฟอร์ม
└── components/        # Components อื่นๆ
```

## ฟีเจอร์ของหน้า Admin Agenda

### 1. การจัดการรายการ
- **เพิ่มรายการใหม่**: ปุ่ม "เพิ่มรายการใหม่" พร้อมฟอร์ม
- **แก้ไขรายการ**: คลิกปุ่มแก้ไขเพื่อแก้ไขข้อมูล
- **ลบรายการ**: คลิกปุ่มลบพร้อม confirmation

### 2. ข้อมูลที่จัดการ
- ชื่อรายการ
- รายละเอียด
- วันที่ (วันที่ 1 หรือ 2)
- เวลาเริ่มและสิ้นสุด
- สถานที่
- ผู้พูด
- ประเภท (พิธีการ, ปาฐกถา, เวิร์กช็อป, เสวนา, การประชุม)
- จำนวนผู้เข้าร่วม
- สถานะ (เปิดใช้งาน/ปิดใช้งาน)

### 3. การค้นหาและกรอง
- ค้นหาตามชื่อรายการ, ผู้พูด, หรือสถานที่
- กรองตามวันที่

### 4. การแสดงผล
- ตารางแสดงรายการทั้งหมด
- สีที่แตกต่างกันตามประเภทของรายการ
- ไอคอนสำหรับข้อมูลต่างๆ (เวลา, สถานที่, ผู้พูด)

## การใช้งาน

### สำหรับผู้ใช้ทั่วไป
- เข้าที่ `http://localhost:5174/agenda`
- ดูกำหนดการงาน SACIT Symposium 2025
- ไม่สามารถแก้ไขข้อมูลได้

### สำหรับ Admin
- เข้าที่ `http://localhost:5174/admin/agenda`
- จัดการรายการในกำหนดการ
- เพิ่ม แก้ไข ลบรายการได้
- ค้นหาและกรองข้อมูล

## การพัฒนาต่อ

### 1. เชื่อมต่อ API
- สร้าง API endpoints สำหรับจัดการ agenda
- อัปเดต AdminAgenda เพื่อใช้ real API
- เพิ่มการจัดการ error และ loading states

### 2. เพิ่มฟีเจอร์
- การอัปโหลดไฟล์แนบ
- การจัดการผู้พูดหลายคน
- การตั้งค่าการแจ้งเตือน
- การ export ข้อมูล

### 3. การปรับปรุง UI/UX
- เพิ่ม drag & drop สำหรับจัดลำดับ
- เพิ่ม calendar view
- เพิ่ม timeline view
- ปรับปรุง responsive design

## หมายเหตุ
- ระบบปัจจุบันใช้ mock data สำหรับการทดสอบ
- เมื่อ backend API พร้อมแล้ว สามารถเปลี่ยนไปใช้ real API ได้
- หน้า Admin Agenda ใช้ Layout component ที่มี sidebar สำหรับ admin
- หน้า Agenda ทั่วไปใช้ Navbar component สำหรับผู้ใช้ทั่วไป 