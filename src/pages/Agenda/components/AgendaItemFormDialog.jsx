import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

const AgendaItemFormDialog = ({ isOpen, onOpenChange, item, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    time: '',
    title: '',
    speaker: '',
    type: 'talk',
  });

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({ time: '', title: '', speaker: '', type: 'talk' });
    }
  }, [item, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({ ...prev, type: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onOpenChange(false);
  };
  
  const handleCancel = () => {
    onOpenChange(false);
    if (onCancel) onCancel();
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{item ? 'แก้ไขรายการ' : 'เพิ่มรายการใหม่'}</DialogTitle>
          <DialogDescription>กรอกข้อมูลกำหนดการ</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div>
            <Label htmlFor="time">เวลา (เช่น 09:00 - 10:00)</Label>
            <Input id="time" name="time" value={formData.time} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="title">หัวข้อ / กิจกรรม</Label>
            <Input id="title" name="title" value={formData.title} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="speaker">ผู้บรรยาย (ถ้ามี)</Label>
            <Input id="speaker" name="speaker" value={formData.speaker} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="type">ประเภท</Label>
            <Select name="type" value={formData.type} onValueChange={handleSelectChange}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="talk">การบรรยาย/เสวนา</SelectItem>
                <SelectItem value="break">พัก</SelectItem>
                <SelectItem value="other">อื่นๆ</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleCancel}>ยกเลิก</Button>
            <Button type="submit">{item ? 'บันทึก' : 'เพิ่มรายการ'}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AgendaItemFormDialog;