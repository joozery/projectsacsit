# ระบบเทมเพลตใบประกาศนียบัตร

## ภาพรวม

ระบบเทมเพลตใบประกาศนียบัตรเป็นฟีเจอร์ที่ช่วยให้แอดมินสร้างเทมเพลตใบประกาศขึ้นมา แล้วผู้ใช้งานที่ login เข้ามาสามารถโหลดใบประกาศนียบัตรได้เลย

## การทำงานของระบบ

### 1. สำหรับแอดมิน (Admin)
- **สร้างเทมเพลต**: ใช้ Certificate Template Editor สร้างเทมเพลตใบประกาศ
- **แก้ไขเทมเพลต**: ปรับแต่งองค์ประกอบต่างๆ ของเทมเพลต
- **จัดการเทมเพลต**: ลบหรือแก้ไขเทมเพลตที่มีอยู่

### 2. สำหรับผู้ใช้ (User)
- **เลือกเทมเพลต**: ดูเทมเพลตที่แอดมินสร้างไว้
- **สร้างใบประกาศ**: ใช้เทมเพลตเพื่อสร้างใบประกาศของตัวเอง
- **ดาวน์โหลด**: ดาวน์โหลดใบประกาศเป็นรูปภาพ
- **ดูใบประกาศ**: ดูใบประกาศที่สร้างไว้ในหน้า Account

## ฟีเจอร์หลัก

### Certificate Template Editor
- **Canvas Editor**: ใช้ HTML5 Canvas สำหรับการแก้ไขแบบ Visual
- **Drag & Drop**: ลากและวางองค์ประกอบเพื่อจัดตำแหน่ง
- **Font Selection**: รองรับฟอนต์ PromptP และ AWConqueror
- **Color Picker**: เลือกสีสำหรับข้อความ
- **Background Upload**: อัปโหลดภาพพื้นหลัง
- **Element Properties**: แก้ไขขนาด, สี, การจัดตำแหน่ง

### Certificate Generator
- **ข้อมูลผู้ใช้**: ใช้ข้อมูลจากระบบ login
- **Preview**: ดูตัวอย่างใบประกาศก่อนสร้าง
- **Download**: ดาวน์โหลดใบประกาศเป็นรูปภาพ
- **Save**: บันทึกใบประกาศในหน้า Account

## การใช้งาน

### สำหรับแอดมิน
1. ไปที่หน้า Templates
2. คลิก "สร้างเทมเพลตใหม่"
3. ใช้ Certificate Template Editor
4. เพิ่มองค์ประกอบ (ข้อความ, พื้นที่จัดวาง)
5. จัดตำแหน่งและปรับแต่ง
6. บันทึกเทมเพลต

### สำหรับผู้ใช้
1. ไปที่หน้า Templates
2. เลือกเทมเพลตที่ต้องการ
3. คลิก "สร้างใบประกาศ"
4. ตรวจสอบข้อมูล
5. สร้างใบประกาศ
6. ดูในหน้า Account

## โครงสร้างข้อมูล

### Certificate Template
```javascript
{
  id: 'cert_1',
  name: 'ใบประกาศนียบัตร SACIT 2025',
  description: 'เทมเพลตใบประกาศนียบัตรสำหรับงาน SACIT Symposium 2025',
  type: 'certificate',
  width: 800,
  height: 600,
  backgroundUrl: '',
  elements: [
    {
      id: 'recipientName',
      type: 'placeholder',
      content: '{{recipientName}}',
      x: 400,
      y: 250,
      fontSize: 36,
      fontFamily: 'PromptP-Regular',
      color: '#2D3748',
      alignment: 'center',
      placeholder: 'ชื่อผู้รับ'
    }
  ]
}
```

### Generated Certificate
```javascript
{
  id: Date.now(),
  templateId: template.id,
  recipientName: 'สมชาย ใจดี',
  eventName: 'SACIT Symposium 2025',
  date: '8 สิงหาคม 2025',
  certificateNumber: 'CERT-123456',
  imageData: 'data:image/png;base64,...',
  generatedAt: '2025-01-15T10:30:00.000Z',
  userId: 'user@example.com'
}
```

## องค์ประกอบที่รองรับ

### ข้อความ (Text)
- เนื้อหาคงที่
- ฟอนต์: PromptP, AWConqueror
- สี: ระบบสีของ SACIT
- การจัดตำแหน่ง: ซ้าย, กลาง, ขวา

### พื้นที่จัดวาง (Placeholder)
- `{{recipientName}}` - ชื่อผู้รับ
- `{{date}}` - วันที่
- `{{eventName}}` - ชื่อกิจกรรม
- `{{organization}}` - หน่วยงาน
- `{{email}}` - อีเมล
- `{{certificateNumber}}` - เลขที่ใบประกาศ
- `{{issuedDate}}` - วันที่ออกใบประกาศ

## การจัดเก็บข้อมูล

### LocalStorage Keys
- `certificate_templates_editable_v1`: เทมเพลตใบประกาศ
- `user_certificates`: ใบประกาศที่สร้างไว้

## การตรวจสอบสิทธิ์

### Admin Check
```javascript
const currentUser = authService.getCurrentUser();
const isAdmin = currentUser?.role === 'admin' || currentUser?.isAdmin === true;
```

### การแสดงผล
- **แอดมิน**: แสดง AdminTemplates component
- **ผู้ใช้**: แสดง UserTemplates component

## ฟีเจอร์ที่พร้อมใช้งาน
- ✅ สร้างเทมเพลตใบประกาศ (แอดมิน)
- ✅ แก้ไขเทมเพลต (แอดมิน)
- ✅ สร้างใบประกาศจากเทมเพลต (ผู้ใช้)
- ✅ แสดงใบประกาศในหน้า Account
- ✅ ดาวน์โหลดใบประกาศ
- ✅ ดูใบประกาศแบบเต็มหน้าจอ
- ✅ ตรวจสอบสิทธิ์แอดมิน/ผู้ใช้

## ฟีเจอร์ที่กำลังพัฒนา
- 🔄 PDF Export
- 🔄 QR Code Generation
- 🔄 Digital Signature
- 🔄 Email Integration
- 🔄 Server-side Storage

## การแก้ไขปัญหา

### ปัญหาที่พบบ่อย
1. **Canvas ไม่แสดงผล**: ตรวจสอบการโหลดฟอนต์
2. **ใบประกาศไม่แสดง**: ตรวจสอบ localStorage
3. **สิทธิ์ไม่ถูกต้อง**: ตรวจสอบ role ของ user

## การทดสอบ
1. สร้างเทมเพลตใหม่ (แอดมิน)
2. เพิ่มองค์ประกอบต่างๆ
3. สร้างใบประกาศ (ผู้ใช้)
4. ตรวจสอบการแสดงผลในหน้า Account
5. ทดสอบการดาวน์โหลด 