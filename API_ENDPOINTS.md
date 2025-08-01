# API Endpoints สำหรับ SACIT Symposium

## Base URL
```
http://localhost:8000/api
```

## Authentication
ทุก request ต้องมี Authorization header:
```
Authorization: Bearer {token}
```

## Registration Endpoints

### 1. ดึงข้อมูลการลงทะเบียนทั่วไป
```
GET /registrations
```

**Parameters:**
- `year` (string, required): ปีที่ต้องการดึงข้อมูล (e.g., "2025")
- `type` (string, optional): ประเภทการลงทะเบียน ("general", "research", "creative")
- `status` (string, optional): สถานะการลงทะเบียน ("confirmed", "pending", "cancelled")
- `page` (number, optional): หน้าข้อมูล (default: 1)
- `limit` (number, optional): จำนวนข้อมูลต่อหน้า (default: 50)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title_prefix": "นาย",
      "first_name": "สมชาย",
      "last_name": "ใจดี",
      "email": "somchai@email.com",
      "phone": "081-234-5678",
      "organization": "บริษัท ABC จำกัด",
      "education_level": "ปริญญาตรี",
      "created_at": "2024-01-15T10:30:00Z",
      "status": "confirmed",
      "checked_in": true,
      "check_in_time": "2024-01-20T08:30:00Z",
      "check_in_requested": true,
      "check_in_request_time": "2024-01-20T08:25:00Z"
    }
  ],
  "pagination": {
    "current_page": 1,
    "total_pages": 5,
    "total_items": 250,
    "items_per_page": 50
  }
}
```

### 2. อัปเดตสถานะเช็คอิน
```
PUT /registrations/{id}/checkin
```

**Request Body:**
```json
{
  "checked_in": true,
  "check_in_time": "2024-01-20T08:30:00Z",
  "check_in_requested": true,
  "check_in_request_time": "2024-01-20T08:25:00Z"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "checked_in": true,
    "check_in_time": "2024-01-20T08:30:00Z",
    "check_in_requested": true,
    "check_in_request_time": "2024-01-20T08:25:00Z"
  },
  "message": "อัปเดตสถานะเช็คอินสำเร็จ"
}
```

### 3. ยกเลิกการเช็คอิน
```
PUT /registrations/{id}/checkin/cancel
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "checked_in": false,
    "check_in_time": null,
    "check_in_requested": false,
    "check_in_request_time": null
  },
  "message": "ยกเลิกการเช็คอินสำเร็จ"
}
```

### 4. ค้นหาการลงทะเบียน
```
GET /registrations/search
```

**Parameters:**
- `q` (string, required): คำค้นหา
- `year` (string, optional): ปี
- `type` (string, optional): ประเภท
- `status` (string, optional): สถานะ

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title_prefix": "นาย",
      "first_name": "สมชาย",
      "last_name": "ใจดี",
      "email": "somchai@email.com",
      "phone": "081-234-5678",
      "organization": "บริษัท ABC จำกัด",
      "education_level": "ปริญญาตรี",
      "created_at": "2024-01-15T10:30:00Z",
      "status": "confirmed"
    }
  ]
}
```

### 5. ดึงสถิติการลงทะเบียน
```
GET /registrations/stats
```

**Parameters:**
- `year` (string, required): ปี

**Response:**
```json
{
  "success": true,
  "data": {
    "total_registrations": 250,
    "confirmed_registrations": 200,
    "pending_registrations": 30,
    "cancelled_registrations": 20,
    "checked_in_count": 150,
    "general_registrations": 180,
    "research_registrations": 40,
    "creative_registrations": 30,
    "by_month": {
      "January": 50,
      "February": 45,
      "March": 60
    }
  }
}
```

## Error Responses

### Network Error
```json
{
  "success": false,
  "message": "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้"
}
```

### Validation Error
```json
{
  "success": false,
  "message": "ข้อมูลไม่ถูกต้อง",
  "errors": {
    "email": ["รูปแบบอีเมลไม่ถูกต้อง"],
    "phone": ["เบอร์โทรศัพท์ไม่ถูกต้อง"]
  }
}
```

### Authentication Error
```json
{
  "success": false,
  "message": "ไม่ได้รับอนุญาตให้เข้าถึงข้อมูลนี้"
}
```

### Not Found Error
```json
{
  "success": false,
  "message": "ไม่พบข้อมูลที่ต้องการ"
}
```

## Database Schema

### Registrations Table
```sql
CREATE TABLE registrations (
  id SERIAL PRIMARY KEY,
  title_prefix VARCHAR(20),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  organization VARCHAR(255),
  education_level VARCHAR(50),
  registration_type VARCHAR(20) DEFAULT 'general',
  status VARCHAR(20) DEFAULT 'pending',
  year VARCHAR(4) NOT NULL,
  checked_in BOOLEAN DEFAULT FALSE,
  check_in_time TIMESTAMP,
  check_in_requested BOOLEAN DEFAULT FALSE,
  check_in_request_time TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## การใช้งานใน Frontend

### 1. ดึงข้อมูลผู้เข้าร่วมทั่วไป
```javascript
const response = await registrationService.getGeneralRegistrations('2025');
if (response.success) {
  const attendees = response.data;
  // Process attendees data
}
```

### 2. อัปเดตสถานะเช็คอิน
```javascript
const response = await registrationService.updateCheckInStatus(attendeeId, {
  checked_in: true,
  check_in_time: new Date().toISOString()
});
```

### 3. ยกเลิกการเช็คอิน
```javascript
const response = await registrationService.cancelCheckIn(attendeeId);
```

## การตั้งค่า Backend

### 1. สร้าง Express.js Server
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/registrations', registrationRoutes);

app.listen(8000, () => {
  console.log('Server running on port 8000');
});
```

### 2. สร้าง Database Connection
```javascript
const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'sacit_symposium',
  password: 'password',
  port: 5432,
});
```

### 3. สร้าง Registration Routes
```javascript
const express = require('express');
const router = express.Router();

// GET /registrations
router.get('/', async (req, res) => {
  try {
    const { year, type, status, page = 1, limit = 50 } = req.query;
    
    // Build query
    let query = 'SELECT * FROM registrations WHERE 1=1';
    const params = [];
    
    if (year) {
      query += ' AND year = $' + (params.length + 1);
      params.push(year);
    }
    
    if (type) {
      query += ' AND registration_type = $' + (params.length + 1);
      params.push(type);
    }
    
    if (status) {
      query += ' AND status = $' + (params.length + 1);
      params.push(status);
    }
    
    // Add pagination
    const offset = (page - 1) * limit;
    query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    params.push(limit, offset);
    
    const result = await pool.query(query, params);
    
    res.json({
      success: true,
      data: result.rows,
      pagination: {
        current_page: parseInt(page),
        total_pages: Math.ceil(result.rowCount / limit),
        total_items: result.rowCount,
        items_per_page: parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'เกิดข้อผิดพลาดในการดึงข้อมูล'
    });
  }
});

module.exports = router;
```

## หมายเหตุ
- API จะ fallback ไปใช้ mock data หาก backend ไม่พร้อมใช้งาน
- ระบบจะแสดง error message ที่เหมาะสมเมื่อเกิดปัญหา
- ข้อมูลจะถูก cache ใน localStorage เพื่อการใช้งาน offline 