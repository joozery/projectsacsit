# Live Exhibition (Demonstrative Area) Management System

## ระบบจัดการนิทรรศการและพื้นที่สาธิต SACIT

### 📋 ภาพรวมระบบ

ระบบจัดการ Live Exhibition ถูกออกแบบมาเพื่อจัดการข้อมูลนิทรรศการและพื้นที่สาธิตสำหรับงาน SACIT Symposium โดยรองรับ:

- ✅ **จัดการข้อมูลนิทรรศการ** - ชื่อ, หัวข้อ, รายละเอียด, สถานที่
- ✅ **อัพโหลดไฟล์** - รูปภาพหน้าปกและเอกสาร PDF
- ✅ **จัดหมวดหมู่** - แบ่งประเภทนิทรรศการ  
- ✅ **ระบบค้นหา** - ค้นหาตามชื่อหรือรายละเอียด
- ✅ **จัดการสถานะ** - เปิด/ปิด/เก็บถาวร

---

## 🗂️ โครงสร้างฐานข้อมูล

### ตารางหลัก

#### 1. `exhibitions` - ข้อมูลนิทรรศการ
```sql
CREATE TABLE exhibitions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,           -- ชื่อ (ภาษาอังกฤษ)
  title VARCHAR(255) NOT NULL,          -- หัวข้อ (ภาษาไทย)
  description TEXT,                     -- รายละเอียด
  image_url VARCHAR(500),              -- URL รูปภาพ (S3)
  image_filename VARCHAR(255),         -- ชื่อไฟล์รูปภาพเดิม
  pdf_url VARCHAR(500),                -- URL ไฟล์ PDF (S3)
  pdf_filename VARCHAR(255),           -- ชื่อไฟล์ PDF เดิม
  category_id INT,                     -- หมวดหมู่
  location VARCHAR(255),               -- สถานที่/บูธ
  organizer VARCHAR(255),              -- ผู้จัด
  contact_info VARCHAR(255),           -- ข้อมูลติดต่อ
  start_date DATE,                     -- วันเริ่มต้น
  end_date DATE,                       -- วันสิ้นสุด
  status ENUM('active', 'inactive', 'archived'),
  display_order INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### 2. `exhibition_categories` - หมวดหมู่นิทรรศการ
```sql
CREATE TABLE exhibition_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  color_code VARCHAR(7) DEFAULT '#6366f1'
);
```

#### 3. `exhibition_images` - รูปภาพเพิ่มเติม (หลายรูป)
```sql
CREATE TABLE exhibition_images (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exhibition_id INT NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  image_type ENUM('cover', 'gallery', 'thumbnail'),
  display_order INT DEFAULT 0,
  FOREIGN KEY (exhibition_id) REFERENCES exhibitions(id)
);
```

#### 4. `exhibition_documents` - เอกสารเพิ่มเติม (หลายไฟล์)
```sql
CREATE TABLE exhibition_documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  exhibition_id INT NOT NULL,
  document_url VARCHAR(500) NOT NULL,
  document_type VARCHAR(50) DEFAULT 'pdf',
  document_title VARCHAR(255),
  file_size BIGINT,
  download_count INT DEFAULT 0,
  FOREIGN KEY (exhibition_id) REFERENCES exhibitions(id)
);
```

---

## 🚀 การติดตั้งและตั้งค่า

### 1. ติดตั้งฐานข้อมูล
```bash
# รันสคริปต์ SQL
mysql -u username -p database_name < backendsacit/db/exhibitions.sql
```

### 2. ตั้งค่า Environment Variables
```bash
# ใน .env file
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET_NAME=your_bucket_name
```

### 3. ติดตั้ง Dependencies
```bash
# Backend
cd backendsacit
npm install aws-sdk multer

# Frontend  
cd projectsacsit
npm install
```

---

## 📡 API Endpoints

### Exhibition Management
- `GET /api/exhibitions` - ดึงรายการนิทรรศการทั้งหมด
- `GET /api/exhibitions/:id` - ดึงข้อมูลนิทรรศการรายตัว
- `POST /api/exhibitions` - สร้างนิทรรศการใหม่
- `PUT /api/exhibitions/:id` - แก้ไขนิทรรศการ
- `DELETE /api/exhibitions/:id` - ลบนิทรรศการ

### Category Management  
- `GET /api/exhibitions/categories/list` - ดึงรายการหมวดหมู่

### File Upload
- `POST /api/upload` - อัพโหลดไฟล์เดี่ยว (รูปภาพหรือ PDF)
- `POST /api/upload/multiple` - อัพโหลดหลายไฟล์
- `DELETE /api/upload/:fileKey` - ลบไฟล์จาก S3

### Additional Features
- `POST /api/exhibitions/:id/images` - เพิ่มรูปภาพให้นิทรรศการ
- `POST /api/exhibitions/:id/documents` - เพิ่มเอกสารให้นิทรรศการ
- `PUT /api/exhibitions/reorder` - จัดลำดับการแสดงผล

---

## 💻 การใช้งาน Frontend

### 1. หน้าจัดการนิทรรศการ
```javascript
// Path: /admin/exhibitions
import exhibitionService from '@/services/exhibitionService';

// ดึงข้อมูลนิทรรศการ
const exhibitions = await exhibitionService.getExhibitions();

// สร้างนิทรรศการใหม่พร้อมไฟล์
await exhibitionService.createExhibitionWithFiles(data, imageFile, pdfFile);
```

### 2. ฟอร์มเพิ่ม/แก้ไขนิทรรศการ
- รองรับอัพโหลดรูปภาพ (JPEG, PNG, GIF, WebP) ขนาดไม่เกิน 5MB
- รองรับอัพโหลดไฟล์ PDF ขนาดไม่เกิน 10MB
- ตรวจสอบประเภทไฟล์และขนาดอัตโนมัติ
- แสดง Loading state ระหว่างอัพโหลด

### 3. คุณสมบัติเพิ่มเติม
- **ค้นหา**: ค้นหาตามชื่อ, ชื่อเรื่อง, หรือรายละเอียด
- **หมวดหมู่**: จัดแบ่งตามประเภทงานฝีมือ
- **สถานที่**: ระบุบูธหรือพื้นที่จัดแสดง
- **ช่วงเวลา**: กำหนดวันเริ่มต้นและสิ้นสุด

---

## 🔧 การกำหนดค่า S3 Bucket

### 1. สร้าง S3 Bucket
```bash
# โครงสร้างโฟลเดอร์ที่แนะนำ
your-bucket/
├── exhibitions/
│   ├── images/          # รูปภาพนิทรรศการ
│   └── documents/       # เอกสาร PDF
└── uploads/             # ไฟล์อื่นๆ
```

### 2. ตั้งค่า CORS Policy
```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "POST", "PUT", "DELETE"],
    "AllowedOrigins": ["http://localhost:3000", "your-domain.com"],
    "ExposeHeaders": []
  }
]
```

### 3. ตั้งค่า Bucket Policy
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::your-bucket/*"
    }
  ]
}
```

---

## 📊 หมวดหมู่เริ่มต้น

ระบบมีหมวดหมู่เริ่มต้น 7 ประเภท:

1. **Traditional Crafts** - งานฝีมือดั้งเดิม
2. **Contemporary Arts** - ศิลปะร่วมสมัย  
3. **Textile & Weaving** - สิ่งทอและการทอผ้า
4. **Ceramics & Pottery** - เครื่องปั้นดินเผา
5. **Wood & Bamboo** - ไม้และไผ่
6. **Metal & Jewelry** - โลหะและเครื่องประดับ
7. **Natural Materials** - วัสดุธรรมชาติ

---

## 🔒 ความปลอดภัย

### 1. การอัพโหลดไฟล์
- ตรวจสอบประเภทไฟล์ (MIME type validation)
- จำกัดขนาดไฟล์ (5MB สำหรับรุปภาพ, 10MB สำหรับ PDF)
- สร้างชื่อไฟล์ใหม่ด้วย UUID เพื่อป้องกัน conflict

### 2. การจัดเก็บข้อมูล
- ใช้ Prepared Statements เพื่อป้องกัน SQL Injection
- Hash file keys สำหรับความปลอดภัย
- ตรวจสอบสิทธิ์การเข้าถึง (ต้องมีการเพิ่ม Authentication)

---

## 🐛 การแก้ไขปัญหา

### ปัญหาที่พบบ่อย

1. **ไฟล์อัพโหลดไม่ได้**
   - ตรวจสอบ AWS credentials
   - ตรวจสอบ S3 bucket permissions
   - ตรวจสอบขนาดและประเภทไฟล์

2. **ข้อมูลไม่แสดง**
   - ตรวจสอบการเชื่อมต่อฐานข้อมูล
   - ตรวจสอบ API endpoints
   - ดู Browser console สำหรับ error messages

3. **CORS Error**
   - ตั้งค่า CORS ใน S3 bucket
   - ตรวจสอบ origin URLs

---

## 🚧 การพัฒนาต่อ

### คุณสมบัติที่สามารถเพิ่มได้

1. **Authentication & Authorization**
   - ระบบ Login สำหรับ Admin
   - การจำกัดสิทธิ์การแก้ไข

2. **Advanced Features**
   - Drag & Drop สำหรับจัดลำดับ
   - Bulk operations (ลบหลายรายการ)
   - Export ข้อมูลเป็น Excel/PDF

3. **Performance Optimization**
   - Image compression และ thumbnail generation  
   - Caching สำหรับ API responses
   - Pagination สำหรับรายการขนาดใหญ่

4. **Analytics**
   - สstatistics การดูนิทรรศการ
   - Download counter สำหรับเอกสาร
   - Popular exhibitions tracking

---

## 📞 การติดต่อ

หากมีปัญหาหรือข้อสงสัยเกี่ยวกับระบบ กรุณาติดต่อทีมพัฒนา:

- **Technical Issues**: ปัญหาทางเทคนิค
- **Feature Requests**: ขอเพิ่มคุณสมบัติใหม่
- **Bug Reports**: รายงานข้อผิดพลาด

---

*อัพเดทล่าสุด: มกราคม 2025*