
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Upload } from 'lucide-react';
import { DialogFooter, DialogClose } from "@/components/ui/dialog";

const SpeakerForm = ({ speaker, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({ name: '', title: '', company: '', bio: '', photoUrl: '' });
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    if (speaker) {
      setFormData(speaker);
      setPhotoPreview(speaker.photoUrl);
    } else {
      setFormData({ name: '', title: '', company: '', bio: '', photoUrl: '' });
      setPhotoPreview(null);
    }
  }, [speaker]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
        setFormData(prev => ({...prev, photoUrl: reader.result}));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={photoPreview} />
          <AvatarFallback className="bg-gray-200"><User className="h-10 w-10 text-gray-400" /></AvatarFallback>
        </Avatar>
        <div>
          <Label htmlFor="photo">รูปภาพผู้บรรยาย</Label>
          <div className="relative mt-1">
             <Button type="button" variant="outline" size="sm">
                <Upload className="w-4 h-4 mr-2" />
                อัปโหลดรูป
             </Button>
             <Input id="photo" type="file" accept="image/*" onChange={handlePhotoChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="name">ชื่อ-นามสกุล</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="title">ตำแหน่ง</Label>
        <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="company">บริษัท / องค์กร</Label>
        <Input id="company" name="company" value={formData.company} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="bio">ประวัติโดยย่อ</Label>
        <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} rows={4} />
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>ยกเลิก</Button>
        </DialogClose>
        <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white">
          {speaker ? 'บันทึก' : 'เพิ่มผู้บรรยาย'}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default SpeakerForm;
