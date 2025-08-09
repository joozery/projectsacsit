import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { UploadCloud } from 'lucide-react';

const CertificateForm = ({ certificate, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    eventDate: '',
    status: 'draft',
    backgroundImage: null,
    backgroundUrl: '', 
  });
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    if (certificate) {
      setFormData({
        name: certificate.name || '',
        type: certificate.type || '',
        eventDate: certificate.eventDate || '',
        status: certificate.status || 'draft',
        backgroundImage: null, 
        backgroundUrl: certificate.backgroundUrl || '', 
      });
      setPreviewImage(certificate.backgroundUrl || null);
    } else {
      setFormData({
        name: '',
        type: '',
        eventDate: '',
        status: 'draft',
        backgroundImage: null,
        backgroundUrl: '',
      });
      setPreviewImage(null);
    }
  }, [certificate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, backgroundImage: file, backgroundUrl: '' }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = { ...formData };
    if (formData.backgroundImage) {
      dataToSubmit.backgroundUrl = previewImage;
    }
    delete dataToSubmit.backgroundImage; 
    onSubmit(dataToSubmit);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name" className="text-gray-700">ชื่อกิจกรรม</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="เช่น SACIT Symposium 2025" required className="mt-1"/>
      </div>
      <div>
        <Label htmlFor="type" className="text-gray-700">ประเภทใบประกาศ</Label>
        <Input id="type" name="type" value={formData.type} onChange={handleChange} placeholder="เช่น ผู้เข้าร่วมงาน" required className="mt-1"/>
      </div>
      <div>
        <Label htmlFor="eventDate" className="text-gray-700">วันที่จัดงาน</Label>
        <Input id="eventDate" name="eventDate" type="date" value={formData.eventDate} onChange={handleChange} required className="mt-1"/>
      </div>
      <div>
        <Label htmlFor="backgroundImage" className="text-gray-700">ภาพพื้นหลัง</Label>
        <div className="mt-1 flex items-center space-x-4">
          <div className="flex-shrink-0 w-32 h-20 rounded-md border border-gray-300 flex items-center justify-center overflow-hidden bg-gray-50">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="h-full w-full object-cover" />
            ) : (
              <UploadCloud className="w-8 h-8 text-gray-400" />
            )}
          </div>
          <Input 
            id="backgroundImage" 
            name="backgroundImage" 
            type="file" 
            onChange={handleFileChange} 
            accept="image/*" 
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
          />
        </div>
        {formData.backgroundUrl && !formData.backgroundImage && (
           <p className="text-xs text-gray-500 mt-1">ใช้ภาพเดิม: {formData.backgroundUrl.substring(0,30)}...</p>
        )}
      </div>
      <div>
        <Label htmlFor="status" className="text-gray-700">สถานะ</Label>
        <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
          <SelectTrigger className="w-full mt-1">
            <SelectValue placeholder="เลือกสถานะ" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">แบบร่าง</SelectItem>
            <SelectItem value="published">เผยแพร่แล้ว</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>ยกเลิก</Button>
        </DialogClose>
        <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white">
          {certificate ? 'บันทึกการเปลี่ยนแปลง' : 'เพิ่มใบประกาศ'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default CertificateForm;