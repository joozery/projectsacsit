import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Image as ImageIcon, Upload, FileText, X, Loader2 } from 'lucide-react';
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { useToast } from '@/components/ui/use-toast';
import exhibitionService from '@/services/exhibitionService';

const ExhibitionForm = ({ exhibition, onSubmit, onCancel }) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({ 
    name: '', 
    title: '', 
    description: '', 
    image_url: '', 
    image_filename: '',
    pdf_url: '',
    pdf_filename: '',
    location: '',
    organizer: '',
    contact_info: '',
    start_date: '',
    end_date: '',
    category_id: null
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [pdfFileUpload, setPdfFileUpload] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (exhibition) {
      setFormData(exhibition);
      setImagePreview(exhibition.image_url);
      if (exhibition.pdf_url) {
        setPdfFile({
          name: exhibition.pdf_filename || 'เอกสาร.pdf',
          url: exhibition.pdf_url
        });
      }
    } else {
      setFormData({ 
        name: '', 
        title: '', 
        description: '', 
        image_url: '', 
        image_filename: '',
        pdf_url: '',
        pdf_filename: '',
        location: '',
        organizer: '',
        contact_info: '',
        start_date: '',
        end_date: '',
        category_id: null
      });
      setImagePreview(null);
      setPdfFile(null);
    }
    
    // Load categories
    loadCategories();
  }, [exhibition]);

  const loadCategories = async () => {
    try {
      const categoriesData = await exhibitionService.getCategories();
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading categories:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ตรวจสอบประเภทไฟล์
      if (!file.type.startsWith('image/')) {
        toast({
          title: "ไฟล์ไม่ถูกต้อง",
          description: "กรุณาเลือกไฟล์รูปภาพเท่านั้น",
          variant: "destructive"
        });
        return;
      }
      
      // ตรวจสอบขนาดไฟล์ (5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "ไฟล์ใหญ่เกินไป",
          description: "กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน 5MB",
          variant: "destructive"
        });
        return;
      }

      // Store file for upload
      setImageFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ตรวจสอบประเภทไฟล์
      if (file.type !== 'application/pdf') {
        toast({
          title: "ไฟล์ไม่ถูกต้อง",
          description: "กรุณาเลือกไฟล์ PDF เท่านั้น",
          variant: "destructive"
        });
        return;
      }
      
      // ตรวจสอบขนาดไฟล์ (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "ไฟล์ใหญ่เกินไป",
          description: "กรุณาเลือกไฟล์ PDF ที่มีขนาดไม่เกิน 10MB",
          variant: "destructive"
        });
        return;
      }

      // Store file for upload
      setPdfFileUpload(file);
      setPdfFile({
        name: file.name,
        url: null // Will be set after upload
      });
    }
  };

  const removePdf = () => {
    setPdfFile(null);
    setPdfFileUpload(null);
    setFormData(prev => ({
      ...prev,
      pdf_url: '',
      pdf_filename: ''
    }));
  };

  const removeImage = () => {
    setImagePreview(null);
    setImageFile(null);
    setFormData(prev => ({
      ...prev,
      image_url: '',
      image_filename: ''
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ตรวจสอบข้อมูลที่จำเป็น
    if (!formData.name.trim() || !formData.title.trim()) {
      toast({
        title: "ข้อมูลไม่ครบถ้วน",
        description: "กรุณากรอกชื่อและหัวข้อนิทรรศการ",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);

    try {
      if (exhibition) {
        // Update existing exhibition
        await exhibitionService.updateExhibitionWithFiles(
          exhibition.id, 
          formData, 
          imageFile, 
          pdfFileUpload
        );
        toast({
          title: "แก้ไขสำเร็จ",
          description: "บันทึกข้อมูลนิทรรศการเรียบร้อยแล้ว"
        });
      } else {
        // Create new exhibition
        await exhibitionService.createExhibitionWithFiles(
          formData, 
          imageFile, 
          pdfFileUpload
        );
        toast({
          title: "เพิ่มสำเร็จ",
          description: "เพิ่มนิทรรศการใหม่เรียบร้อยแล้ว"
        });
      }

      onSubmit(); // Refresh parent component
    } catch (error) {
      console.error('Error submitting exhibition:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: error.message || "ไม่สามารถบันทึกข้อมูลได้",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* รูปภาพหน้าปก */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">รูปภาพหน้าปก *</Label>
        <div className="flex flex-col items-center space-y-4 p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          {imagePreview ? (
            <div className="relative">
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="w-full h-48 object-cover rounded-lg shadow-md max-w-md"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="absolute top-2 right-2 bg-white"
                onClick={removeImage}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">ไม่มีรูปภาพ</p>
            </div>
          )}
          <div className="relative">
            <Button type="button" variant="outline">
              <Upload className="w-4 h-4 mr-2" />
              {imagePreview ? 'เปลี่ยนรูปภาพ' : 'อัปโหลดรูปภาพ'}
            </Button>
            <Input 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
          </div>
          <p className="text-xs text-gray-500">รองรับไฟล์ JPG, PNG, GIF ขนาดไม่เกิน 5MB</p>
        </div>
      </div>

      {/* ข้อมูลพื้นฐาน */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="name">ชื่อนิทรรศการ (ภาษาอังกฤษ) *</Label>
          <Input 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="เช่น Traditional Weaving"
            required 
          />
        </div>
        <div>
          <Label htmlFor="title">หัวข้อ (ภาษาไทย) *</Label>
          <Input 
            id="title" 
            name="title" 
            value={formData.title} 
            onChange={handleChange}
            placeholder="เช่น ผ้าทอพื้นเมืองภาคเหนือ"
            required 
          />
        </div>
      </div>

      <div>
        <Label htmlFor="description">รายละเอียดนิทรรศการ</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          rows={4}
          placeholder="อธิบายรายละเอียดของนิทรรศการ เทคนิคที่จะสาธิต และสิ่งที่ผู้เข้าชมจะได้เรียนรู้..."
        />
      </div>

      {/* ฟิลด์เพิ่มเติม */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="category_id">หมวดหมู่</Label>
          <select 
            id="category_id" 
            name="category_id" 
            value={formData.category_id || ''} 
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            <option value="">เลือกหมวดหมู่</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <Label htmlFor="location">สถานที่/บูธ</Label>
          <Input 
            id="location" 
            name="location" 
            value={formData.location} 
            onChange={handleChange} 
            placeholder="เช่น Hall A - Booth 1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="organizer">ผู้จัด/ผู้รับผิดชอบ</Label>
          <Input 
            id="organizer" 
            name="organizer" 
            value={formData.organizer} 
            onChange={handleChange} 
            placeholder="ชื่อองค์กรหรือผู้รับผิดชอบ"
          />
        </div>
        <div>
          <Label htmlFor="contact_info">ข้อมูลติดต่อ</Label>
          <Input 
            id="contact_info" 
            name="contact_info" 
            value={formData.contact_info} 
            onChange={handleChange} 
            placeholder="เบอร์โทรหรืออีเมล"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="start_date">วันที่เริ่มต้น</Label>
          <Input 
            id="start_date" 
            name="start_date" 
            type="date"
            value={formData.start_date} 
            onChange={handleChange} 
          />
        </div>
        <div>
          <Label htmlFor="end_date">วันที่สิ้นสุด</Label>
          <Input 
            id="end_date" 
            name="end_date" 
            type="date"
            value={formData.end_date} 
            onChange={handleChange} 
          />
        </div>
      </div>

      {/* ไฟล์ PDF */}
      <div className="space-y-4">
        <Label className="text-base font-semibold">เอกสาร PDF (ไม่บังคับ)</Label>
        <div className="p-6 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
          {pdfFile ? (
            <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
              <div className="flex items-center space-x-3">
                <FileText className="w-8 h-8 text-red-500" />
                <div>
                  <p className="font-medium text-gray-900">{pdfFile.name}</p>
                  <p className="text-sm text-gray-500">ไฟล์ PDF พร้อมใช้งาน</p>
                </div>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removePdf}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500 mb-4">ไม่มีไฟล์ PDF</p>
            </div>
          )}
          <div className="flex justify-center">
            <div className="relative">
              <Button type="button" variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                {pdfFile ? 'เปลี่ยนไฟล์ PDF' : 'อัปโหลดไฟล์ PDF'}
              </Button>
              <Input 
                type="file" 
                accept=".pdf" 
                onChange={handlePdfChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
            </div>
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">รองรับไฟล์ PDF ขนาดไม่เกิน 10MB</p>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>ยกเลิก</Button>
        </DialogClose>
        <Button 
          type="submit" 
          className="bg-violet-600 hover:bg-violet-700 text-white"
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              กำลังอัพโหลด...
            </>
          ) : (
            exhibition ? 'บันทึกการแก้ไข' : 'เพิ่มนิทรรศการ'
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ExhibitionForm;