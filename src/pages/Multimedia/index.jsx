import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, UploadCloud, Film } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MediaForm from './MediaForm';
import MediaGrid from './MediaGrid';

const initialMediaItems = [
  { id: 1, type: 'image', name: 'ภาพบรรยากาศงาน SACIT Symposium Day 1', event: 'SACIT Symposium 2025', date: '2025-08-08', thumbnailUrl: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', status: 'published', coverImage: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', themeColor: '#4A90E2', subtitle: 'รวมภาพกิจกรรมวันที่ 1', keywords: ['symposium', 'sacit', 'วิชาการ'], additionalMedia: [] },
  { id: 2, type: 'video', name: 'วิดีโอสรุปงาน SACIT Workshop', event: 'SACIT Workshop 2025', date: '2025-07-15', thumbnailUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', status: 'published', coverImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', themeColor: '#F5A623', subtitle: 'ไฮไลท์จากเวิร์คช็อป', keywords: ['workshop', 'sacit', 'อบรม'], additionalMedia: [] },
  { id: 3, type: 'image', name: 'ภาพผู้ได้รับรางวัลงาน SACIT Conference', event: 'SACIT Conference 2025', date: '2025-09-20', thumbnailUrl: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80', status: 'draft', coverImage: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', themeColor: '#7ED321', subtitle: 'ผู้ชนะและผู้เข้ารอบ', keywords: ['conference', 'รางวัล', 'sacit'], additionalMedia: [] },
  { id: 4, type: 'folder', name: 'รวมภาพถ่ายงาน SACIT Fair 2024', event: 'SACIT Fair 2024', date: '2024-11-10', itemsCount: 50, status: 'published', coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80', themeColor: '#BD10E0', subtitle: 'ภาพรวมงานแฟร์', keywords: ['fair', 'sacit', 'นิทรรศการ'], additionalMedia: [] },
];

const MEDIA_STORAGE_KEY = 'multimedia_v2'; // Updated key for new structure

const MultimediaPage = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [mediaItems, setMediaItems] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingMediaItem, setEditingMediaItem] = useState(null);
  const [deletingMediaItem, setDeletingMediaItem] = useState(null);

  useEffect(() => {
    const savedMedia = localStorage.getItem(MEDIA_STORAGE_KEY);
    if (savedMedia) {
      setMediaItems(JSON.parse(savedMedia));
    } else {
      setMediaItems(initialMediaItems);
      localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(initialMediaItems));
    }
  }, []);

  const saveMediaItems = (updatedMedia) => {
    setMediaItems(updatedMedia);
    localStorage.setItem(MEDIA_STORAGE_KEY, JSON.stringify(updatedMedia));
  };

  const handleAddMedia = () => {
    setEditingMediaItem(null);
    setIsFormOpen(true);
  };

  const handleEditMedia = (item) => {
    setEditingMediaItem(item);
    setIsFormOpen(true);
  };

  const handleDeleteMedia = (item) => {
    setDeletingMediaItem(item);
  };

  const confirmDelete = () => {
    if (deletingMediaItem) {
      const updatedMedia = mediaItems.filter(m => m.id !== deletingMediaItem.id);
      saveMediaItems(updatedMedia);
      toast({ title: "ลบสำเร็จ!", description: `สื่อ "${deletingMediaItem.name}" ถูกลบแล้ว`, variant: "destructive" });
      setDeletingMediaItem(null);
    }
  };

  const handleFormSubmit = (formData) => {
    if (editingMediaItem) {
      const updatedMedia = mediaItems.map(m => m.id === editingMediaItem.id ? { ...editingMediaItem, ...formData } : m);
      saveMediaItems(updatedMedia);
      toast({ title: "แก้ไขสำเร็จ!", description: `สื่อ "${formData.name}" ได้รับการอัปเดตแล้ว` });
    } else {
      const newMediaItem = { ...formData, id: Date.now() };
      saveMediaItems([...mediaItems, newMediaItem]);
      toast({ title: "เพิ่มสำเร็จ!", description: `สื่อ "${newMediaItem.name}" ถูกเพิ่มแล้ว` });
    }
    setIsFormOpen(false);
    setEditingMediaItem(null);
  };

  const handleFeatureClick = (feature, itemName = '') => {
    toast({
      title: `🚧 ฟีเจอร์ "${feature}" ${itemName ? `สำหรับ "${itemName}"` : ''} ยังไม่ได้พัฒนา`,
      description: "แต่ไม่ต้องกังวล! คุณสามารถขอให้เพิ่มฟีเจอร์นี้ในข้อความถัดไปได้! 🚀",
    });
  };

  const filteredMediaItems = mediaItems.filter(item => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = item.name.toLowerCase().includes(searchTermLower) ||
                         item.event.toLowerCase().includes(searchTermLower) ||
                         (item.keywords && item.keywords.some(k => k.toLowerCase().includes(searchTermLower)));
    const matchesType = filterType === 'all' || item.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <>
      <Helmet>
        <title>สื่อมัลติมีเดีย - ระบบจัดการ SACIT</title>
        <meta name="description" content="จัดการและเผยแพร่สื่อมัลติมีเดียและภาพถ่ายภายในงาน" />
      </Helmet>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-800">สื่อมัลติมีเดีย</h1>
            <p className="text-gray-600 mt-1">จัดการและเผยแพร่สื่อมัลติมีเดียและภาพถ่ายภายในงาน</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button 
                className="add-button-gradient w-full sm:w-auto"
                onClick={handleAddMedia}
              >
                <UploadCloud className="w-5 h-5 mr-2" />
                เพิ่ม/อัปโหลดสื่อ
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl">{editingMediaItem ? 'แก้ไขสื่อ' : 'เพิ่มสื่อใหม่'}</DialogTitle>
                <DialogDescription>
                  {editingMediaItem ? 'แก้ไขรายละเอียดสื่อด้านล่าง' : 'กรอกรายละเอียดเพื่อเพิ่มสื่อใหม่'}
                </DialogDescription>
              </DialogHeader>
              <MediaForm 
                mediaItem={editingMediaItem} 
                onSubmit={handleFormSubmit}
                onCancel={() => {
                  setIsFormOpen(false);
                  setEditingMediaItem(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-lg"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="ค้นหาสื่อ (ชื่อ, งานอีเว้นท์, คีย์เวิร์ด)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 w-full bg-gray-50 border-gray-300 focus:border-violet-500 text-sm"
              />
            </div>
             <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px] bg-gray-50 border-gray-300 text-sm">
                  <SelectValue placeholder="ตัวกรองประเภท" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">ทุกประเภท</SelectItem>
                  <SelectItem value="image">รูปภาพ</SelectItem>
                  <SelectItem value="video">วิดีโอ</SelectItem>
                  <SelectItem value="folder">โฟลเดอร์</SelectItem>
                </SelectContent>
              </Select>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AlertDialog>
            {filteredMediaItems.length > 0 ? (
              <MediaGrid 
                mediaItems={filteredMediaItems}
                onEdit={handleEditMedia}
                onDelete={handleDeleteMedia}
                onFeatureClick={handleFeatureClick}
              />
            ) : (
              <div className="text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg">
                <Film className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-lg">ยังไม่มีสื่อมัลติมีเดีย</p>
                <p className="text-sm mt-1">ลองปรับคำค้นหาหรือตัวกรอง หรือเริ่มอัปโหลดภาพหรือวิดีโอแรกของคุณได้เลย!</p>
              </div>
            )}
          
            {deletingMediaItem && (
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>ยืนยันการลบสื่อ</AlertDialogTitle>
                  <AlertDialogDescription>
                    คุณแน่ใจหรือไม่ว่าต้องการลบสื่อ "{deletingMediaItem?.name}"? การกระทำนี้ไม่สามารถย้อนกลับได้
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setDeletingMediaItem(null)}>ยกเลิก</AlertDialogCancel>
                  <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">ลบ</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            )}
          </AlertDialog>
        </motion.div>
      </div>
    </>
  );
};

export default MultimediaPage;