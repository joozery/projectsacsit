
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { UploadCloud, FileText, Eye, Edit, Trash2, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import Lightbox from '@/components/Lightbox';

const TEMPLATES_STORAGE_KEY = 'certificate_templates_v2';

const initialTemplates = [
  { id: 1, name: 'เทมเพลตทางการ (แนวตั้ง)', thumbnailUrl: 'https://images.unsplash.com/photo-1617957718642-72c544523722?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', uploadDate: '2025-05-20' },
  { id: 2, name: 'เทมเพลตงาน Workshop (แนวนอน)', thumbnailUrl: 'https://images.unsplash.com/photo-1604079628040-94301bb21b91?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', uploadDate: '2025-05-22' },
  { id: 3, name: 'เทมเพลตสำหรับเด็กและเยาวชน', thumbnailUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3a8034?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', uploadDate: '2025-06-01' },
];

const TemplatesPage = () => {
  const { toast } = useToast();
  const [templates, setTemplates] = useState([]);
  const [deletingTemplate, setDeletingTemplate] = useState(null);
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [viewingTemplateUrl, setViewingTemplateUrl] = useState(null);
  const [editedName, setEditedName] = useState('');

  useEffect(() => {
    const savedTemplates = localStorage.getItem(TEMPLATES_STORAGE_KEY);
    setTemplates(savedTemplates ? JSON.parse(savedTemplates) : initialTemplates);
  }, []);

  const saveTemplates = (updatedTemplates) => {
    setTemplates(updatedTemplates);
    localStorage.setItem(TEMPLATES_STORAGE_KEY, JSON.stringify(updatedTemplates));
  };
  
  const handleUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      const newTemplates = Array.from(files).map(file => ({
        id: Date.now() + Math.random(),
        name: file.name.replace(/\.[^/.]+$/, ""),
        thumbnailUrl: URL.createObjectURL(file),
        uploadDate: new Date().toISOString().slice(0, 10),
      }));
      saveTemplates([...templates, ...newTemplates]);
      toast({ title: "อัปโหลดสำเร็จ!", description: `${files.length} เทมเพลตถูกเพิ่มแล้ว` });
    }
  };

  const confirmDelete = () => {
    if (deletingTemplate) {
      saveTemplates(templates.filter(t => t.id !== deletingTemplate.id));
      toast({ title: "ลบสำเร็จ!", description: `เทมเพลต "${deletingTemplate.name}" ถูกลบแล้ว`, variant: "destructive" });
      setDeletingTemplate(null);
    }
  };
  
  const handleEdit = (template) => {
    setEditingTemplate(template);
    setEditedName(template.name);
  };
  
  const handleSaveEdit = () => {
    if (editingTemplate && editedName.trim() !== '') {
        saveTemplates(templates.map(t => t.id === editingTemplate.id ? { ...t, name: editedName } : t));
        toast({ title: "แก้ไขชื่อสำเร็จ!" });
        setEditingTemplate(null);
        setEditedName('');
    }
  };
  
  const handleDownload = (template) => {
    fetch(template.thumbnailUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${template.name}.png`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        toast({title: "ดาวน์โหลดสำเร็จ!"});
      })
      .catch(() => toast({title: "เกิดข้อผิดพลาดในการดาวน์โหลด", variant: 'destructive'}));
  };

  return (
    <>
      <Helmet><title>จัดการเทมเพลต - ระบบจัดการ SACIT</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">เทมเพลตใบประกาศ</h1>
            <p className="text-gray-600 mt-1">จัดการเทมเพลตสำหรับสร้างใบประกาศนียบัตร</p>
          </div>
          <div className="relative">
             <Button className="add-button-gradient w-full sm:w-auto">
                <UploadCloud className="w-5 h-5 mr-2" />อัปโหลดเทมเพลต
             </Button>
             <Input type="file" multiple accept="image/*" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {templates.map((template) => (
              <motion.div key={template.id} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col">
                <div className="relative w-full h-56 bg-gray-200">
                  <img-replace src={template.thumbnailUrl} alt={template.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="outline" size="sm" onClick={() => setViewingTemplateUrl(template.thumbnailUrl)}>
                      <Eye className="w-4 h-4 mr-2" /> ดูตัวอย่าง
                    </Button>
                  </div>
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-800 truncate">{template.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">อัปโหลด: {template.uploadDate}</p>
                  </div>
                  <div className="flex items-center justify-end space-x-1 mt-3">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleDownload(template)} title="ดาวน์โหลด"><Download className="w-4 h-4 text-gray-500 hover:text-blue-600" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(template)} title="แก้ไข"><Edit className="w-4 h-4 text-gray-500 hover:text-violet-600" /></Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setDeletingTemplate(template)} title="ลบ"><Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" /></Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        {templates.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg">
                <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-lg">ไม่พบเทมเพลต</p>
                <p className="text-sm mt-1">ลองอัปโหลดเทมเพลตแรกของคุณได้เลย!</p>
            </div>
        )}
      </div>
      
      <Lightbox imageUrl={viewingTemplateUrl} onClose={() => setViewingTemplateUrl(null)} />

      <AlertDialog open={!!deletingTemplate} onOpenChange={(open) => !open && setDeletingTemplate(null)}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle><AlertDialogDescription>คุณแน่ใจหรือไม่ว่าต้องการลบเทมเพลต "{deletingTemplate?.name}"?</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingTemplate(null)}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">ลบ</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Dialog open={!!editingTemplate} onOpenChange={(open) => !open && setEditingTemplate(null)}>
        <DialogContent>
            <DialogHeader><DialogTitle>แก้ไขชื่อเทมเพลต</DialogTitle><DialogDescription>เปลี่ยนชื่อสำหรับเทมเพลต "{editingTemplate?.name}"</DialogDescription></DialogHeader>
            <div className="py-4">
                <Label htmlFor="template-name">ชื่อเทมเพลตใหม่</Label>
                <Input id="template-name" value={editedName} onChange={(e) => setEditedName(e.target.value)} className="mt-2" />
            </div>
            <DialogFooter>
                <DialogClose asChild><Button type="button" variant="outline">ยกเลิก</Button></DialogClose>
                <Button onClick={handleSaveEdit}>บันทึก</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TemplatesPage;
