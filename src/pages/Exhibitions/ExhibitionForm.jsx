import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Image as ImageIcon, Upload, FileText, X, Loader2 } from 'lucide-react';
import { DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ExhibitionForm = ({ exhibition, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ 
    name: '', 
    title: '', 
    description: '' 
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileName, setPdfFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (exhibition) {
      setFormData({ 
        name: exhibition.name || '', 
        title: exhibition.title || '', 
        description: exhibition.description || '' 
      });
      setImagePreview(exhibition.image_url || null);
      setPdfFileName(exhibition.pdf_filename || '');
    } else {
      setFormData({ name: '', title: '', description: '' });
      setImagePreview(null);
      setImageFile(null);
      setPdfFile(null);
      setPdfFileName('');
    }
    setError('');
  }, [exhibition]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const validateImageFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(file.type)) {
      throw new Error('รองรับเฉพาะไฟล์รูปภาพ: JPEG, PNG, GIF, WebP');
    }
    
    if (file.size > maxSize) {
      throw new Error('ขนาดไฟล์ต้องไม่เกิน 10MB');
    }
  };

  const validatePdfFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (file.type !== 'application/pdf') {
      throw new Error('รองรับเฉพาะไฟล์ PDF');
    }
    
    if (file.size > maxSize) {
      throw new Error('ขนาดไฟล์ต้องไม่เกิน 10MB');
    }
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        validateImageFile(file);
        
        setImageFile(file);
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
        setError('');
      } catch (err) {
        setError(err.message);
        setImageFile(null);
        setImagePreview(exhibition?.image_url || null);
      }
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        validatePdfFile(file);
        
        setPdfFile(file);
        setPdfFileName(file.name);
        setError('');
      } catch (err) {
        setError(err.message);
        setPdfFile(null);
        setPdfFileName(exhibition?.pdf_filename || '');
      }
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(exhibition?.image_url || null);
  };

  const handleRemovePdf = () => {
    setPdfFile(null);
    setPdfFileName(exhibition?.pdf_filename || '');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError('กรุณาระบุชื่อนิทรรศการ');
      return;
    }

    if (!formData.title.trim()) {
      setError('กรุณาระบุหัวข้อนิทรรศการ');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const submitData = {
        name: formData.name.trim(),
        title: formData.title.trim(),
        description: formData.description.trim(),
        imageFile: imageFile,
        pdfFile: pdfFile
      };

      await onSubmit(submitData);
    } catch (err) {
      setError(err.message || 'เกิดข้อผิดพลาดในการบันทึกข้อมูล');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Image Upload Section */}
      <div className="flex items-start space-x-4">
        <div className="h-24 w-24 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
          {imagePreview ? (
            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <Label htmlFor="image">รูปภาพหน้าปก</Label>
          <div className="mt-2 space-y-2">
            <div className="relative">
              <Button type="button" variant="outline" size="sm" className="relative">
                <Upload className="w-4 h-4 mr-2" />
                {imageFile ? 'เปลี่ยนรูป' : 'อัปโหลดรูป'}
              </Button>
              <Input 
                id="image" 
                type="file" 
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp" 
                onChange={handleImageChange} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
              />
            </div>
            {(imageFile || imagePreview) && (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">
                  {imageFile ? `ไฟล์ใหม่: ${imageFile.name}` : 'รูปปัจจุบัน'}
                </span>
                {imageFile && (
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleRemoveImage}
                    className="h-6 w-6 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            )}
            <p className="text-xs text-gray-500">
              รองรับไฟล์: JPEG, PNG, GIF, WebP (สูงสุด 10MB)
            </p>
          </div>
        </div>
      </div>

      {/* Name Input */}
      <div>
        <Label htmlFor="name">ชื่อนิทรรศการ (ภาษาอังกฤษ) *</Label>
        <Input 
          id="name" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="กรอกชื่อนิทรรศการเป็นภาษาอังกฤษ"
          required 
        />
      </div>

      {/* Title Input */}
      <div>
        <Label htmlFor="title">หัวข้อนิทรรศการ (ภาษาไทย) *</Label>
        <Input 
          id="title" 
          name="title" 
          value={formData.title} 
          onChange={handleChange} 
          placeholder="กรอกหัวข้อนิทรรศการเป็นภาษาไทย"
          required 
        />
      </div>

      {/* Description Input */}
      <div>
        <Label htmlFor="description">รายละเอียด</Label>
        <Textarea 
          id="description" 
          name="description" 
          value={formData.description} 
          onChange={handleChange} 
          placeholder="กรอกรายละเอียดของนิทรรศการ"
          rows={4}
        />
      </div>

      {/* PDF Upload Section */}
      <div>
        <Label htmlFor="pdf">เอกสารประกอบ (PDF)</Label>
        <div className="mt-2 space-y-2">
          <div className="relative">
            <Button type="button" variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              {pdfFile ? 'เปลี่ยนไฟล์ PDF' : 'อัปโหลด PDF'}
            </Button>
            <Input 
              id="pdf" 
              type="file" 
              accept="application/pdf" 
              onChange={handlePdfChange} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            />
          </div>
          {(pdfFile || pdfFileName) && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {pdfFile ? `ไฟล์ใหม่: ${pdfFile.name}` : `ไฟล์ปัจจุบัน: ${pdfFileName}`}
              </span>
              {pdfFile && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleRemovePdf}
                  className="h-6 w-6 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          )}
          <p className="text-xs text-gray-500">
            รองรับไฟล์ PDF (สูงสุด 10MB)
          </p>
        </div>
      </div>

      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>
            ยกเลิก
          </Button>
        </DialogClose>
        <Button type="submit" disabled={loading}>
          {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
          {exhibition ? 'แก้ไข' : 'เพิ่ม'}นิทรรศการ
        </Button>
      </DialogFooter>
    </form>
  );
};

export default ExhibitionForm;