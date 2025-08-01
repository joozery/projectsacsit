# Attendees API Integration

## ภาพรวม
หน้า Attendees ได้รับการอัปเดตเพื่อเชื่อมต่อกับ API และดึงข้อมูลผู้เข้าร่วมงานทั่วไปจากฐานข้อมูลจริง

## การเปลี่ยนแปลงหลัก

### 1. การเชื่อมต่อ API
- เพิ่มการ import `registrationService` และ `attendeesAPI`
- สร้างฟังก์ชัน `fetchAttendeesData()` เพื่อดึงข้อมูลจาก API
- เพิ่มการจัดการ loading state และ error handling

### 2. Mock Data
- สร้างไฟล์ `src/services/mockData.js` สำหรับทดสอบ
- ข้อมูล mock ประกอบด้วยผู้เข้าร่วมงานทั่วไปในปี 2024 และ 2025
- มีการจำลอง API delay และ error simulation

### 3. API Endpoints ที่ใช้

#### ดึงข้อมูลการลงทะเบียนทั่วไป
```javascript
GET /api/registrations/general?year=2025
```

#### อัปเดตสถานะเช็คอิน
```javascript
PUT /api/registrations/{id}/checkin
{
  "checked_in": true,
  "check_in_time": "2024-01-20T08:30:00Z",
  "check_in_requested": true,
  "check_in_request_time": "2024-01-20T08:25:00Z"
}
```

#### ยกเลิกการเช็คอิน
```javascript
PUT /api/registrations/{id}/checkin/cancel
```

### 4. การแปลงข้อมูล
ข้อมูลจาก API จะถูกแปลงให้ตรงกับรูปแบบที่ใช้ในหน้า:

```javascript
{
  id: attendee.id,
  name: `${attendee.title_prefix || ''} ${attendee.first_name} ${attendee.last_name}`.trim(),
  email: attendee.email,
  phone: attendee.phone,
  organization: attendee.organization,
  education: attendee.education_level || 'ไม่ระบุ',
  registeredAt: attendee.created_at || attendee.registered_at,
  status: attendee.status || 'confirmed',
  checkedIn: attendee.checked_in || false,
  checkInTime: attendee.check_in_time,
  checkInRequested: attendee.check_in_requested || false,
  checkInRequestTime: attendee.check_in_request_time
}
```

## การใช้งาน

### 1. การดึงข้อมูล
- ข้อมูลจะถูกดึงอัตโนมัติเมื่อเปิดหน้า
- สามารถเปลี่ยนปีเพื่อดูข้อมูลปีอื่น
- มีปุ่ม "รีเฟรช" สำหรับดึงข้อมูลใหม่

### 2. การเช็คอิน
- คลิกปุ่ม "เช็คอิน" เพื่อยืนยันการเข้าร่วมงาน
- ระบบจะอัปเดตสถานะในฐานข้อมูลและ UI

### 3. การอนุมัติ/ปฏิเสธคำขอเช็คอิน
- สำหรับผู้ที่ส่งคำขอเช็คอินแล้ว สามารถอนุมัติหรือปฏิเสธได้
- คลิกปุ่ม "อนุมัติ" หรือ "ปฏิเสธ" ตามต้องการ

### 4. การยกเลิกเช็คอิน
- คลิกปุ่ม "ยกเลิกเช็คอิน" เพื่อยกเลิกการเช็คอิน

## การตั้งค่า

### 1. ใช้ Mock Data (ปัจจุบัน)
ใน `src/services/registrationService.js`:
```javascript
// ใช้ mock data
const mockData = mockGeneralRegistrations[year] || [];
return { success: true, data: mockData };
```

### 2. ใช้ Real API
ใน `src/services/registrationService.js`:
```javascript
// Uncomment เพื่อใช้ real API
const response = await api.get('/registrations/general', { 
  params: { year } 
});
return {
  success: true,
  data: response.data.data || response.data
};
```

## การจัดการ Error

### 1. Network Error
- แสดงข้อความ "ไม่สามารถดึงข้อมูลผู้เข้าร่วมงานได้"
- มีปุ่ม "ลองใหม่" สำหรับ retry

### 2. API Error
- แสดงข้อความ error จาก API
- Log error ใน console สำหรับ debugging

### 3. Loading State
- แสดง spinner ขณะโหลดข้อมูล
- ปิดการใช้งานปุ่มต่างๆ ขณะโหลด

## การทดสอบ

### 1. Mock Data Testing
- ข้อมูล mock มีผู้เข้าร่วม 5 คนในปี 2025
- ข้อมูล mock มีผู้เข้าร่วม 2 คนในปี 2024
- มีการจำลองสถานะต่างๆ (confirmed, pending, checked-in)

### 2. Error Simulation
- มีการจำลอง API error 10% ของการเรียก
- สามารถทดสอบ error handling ได้

### 3. Loading Simulation
- มีการจำลอง API delay 800ms
- สามารถทดสอบ loading state ได้

## การพัฒนาต่อ

### 1. เพิ่ม Real API
- สร้าง backend API endpoints ตามที่กำหนด
- อัปเดต `registrationService.js` เพื่อใช้ real API
- ทดสอบการเชื่อมต่อกับ backend

### 2. เพิ่ม Features
- การส่งอีเมลแจ้งเตือน
- การ export ข้อมูลเป็น Excel/PDF
- การค้นหาและกรองข้อมูลขั้นสูง
- การจัดการสิทธิ์ผู้ใช้

### 3. การปรับปรุง UI/UX
- เพิ่ม toast notifications
- เพิ่ม confirmation dialogs
- ปรับปรุง responsive design
- เพิ่ม keyboard shortcuts

## หมายเหตุ
- ระบบปัจจุบันใช้ mock data สำหรับการทดสอบ
- เมื่อ backend API พร้อมแล้ว สามารถเปลี่ยนไปใช้ real API ได้
- ข้อมูลจะถูก cache ใน localStorage เพื่อการใช้งาน offline 