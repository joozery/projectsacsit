
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, Mic, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import SpeakerForm from './SpeakerForm';
import SpeakerCard from './SpeakerCard';

const SPEAKERS_STORAGE_KEY = 'sacit_speakers_v1';

const initialSpeakers = [
    { id: 1, name: 'ดร. วิชัย รักชาติ', title: 'ผู้เชี่ยวชาญด้านการตลาดดิจิทัล', company: 'Digital Transformation Co.', bio: 'ดร. วิชัย มีประสบการณ์มากกว่า 20 ปีในวงการการตลาดดิจิทัลและเป็นที่ปรึกษาให้กับองค์กรชั้นนำมากมาย', photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80' },
    { id: 2, name: 'คุณสมศรี สร้างสรรค์', title: 'นักออกแบบผลิตภัณฑ์ผ้าไทย', company: 'SACIT', bio: 'นักออกแบบรุ่นใหม่ไฟแรงที่ได้รับรางวัลระดับนานาชาติมากมาย และเป็นผู้ผลักดันผ้าไทยสู่สากล', photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'คุณพัฒนา นวัตกรรม', title: 'CEO & Founder', company: 'Tech Weavers Inc.', bio: 'ผู้ก่อตั้งสตาร์ทอัพที่นำเทคโนโลยีมาประยุกต์ใช้กับอุตสาหกรรมสิ่งทอ สร้างความเปลี่ยนแปลงครั้งใหญ่', photoUrl: 'https://images.unsplash.com/photo-1627161683080-e374ca138804?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80' },
    { id: 4, name: 'ดร. สุภาพร เทคโนโลยี', title: 'นักวิจัยด้าน AI และ Machine Learning', company: 'AI Research Institute', bio: 'ดร. สุภาพร เป็นผู้เชี่ยวชาญด้านปัญญาประดิษฐ์และแมชชีนเลิร์นนิง มีผลงานวิจัยที่ได้รับการยอมรับในระดับนานาชาติ', photoUrl: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80' },
];


const SpeakersPage = () => {
  const { toast } = useToast();
  const [speakers, setSpeakers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState(null);
  const [deletingSpeaker, setDeletingSpeaker] = useState(null);

  useEffect(() => {
    const savedSpeakers = localStorage.getItem(SPEAKERS_STORAGE_KEY);
    setSpeakers(savedSpeakers ? JSON.parse(savedSpeakers) : initialSpeakers);
  }, []);

  const saveSpeakers = (updatedSpeakers) => {
    setSpeakers(updatedSpeakers);
    localStorage.setItem(SPEAKERS_STORAGE_KEY, JSON.stringify(updatedSpeakers));
  };

  const handleFormSubmit = (data) => {
    if (editingSpeaker) {
      saveSpeakers(speakers.map(s => s.id === editingSpeaker.id ? { ...s, ...data } : s));
      toast({ title: "แก้ไขข้อมูลผู้บรรยายสำเร็จ!" });
    } else {
      const newSpeaker = { ...data, id: Date.now() };
      saveSpeakers([...speakers, newSpeaker]);
      toast({ title: "เพิ่มผู้บรรยายใหม่สำเร็จ!" });
    }
    setIsFormOpen(false);
    setEditingSpeaker(null);
  };
  
  const confirmDelete = () => {
    if (deletingSpeaker) {
      saveSpeakers(speakers.filter(s => s.id !== deletingSpeaker.id));
      toast({ title: "ลบผู้บรรยายสำเร็จ!", variant: "destructive" });
      setDeletingSpeaker(null);
    }
  };
  
  const filteredSpeakers = speakers.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Helmet><title>จัดการผู้บรรยาย - ระบบจัดการ SACIT</title></Helmet>
      <div className="space-y-6 admin-panel" data-admin="true">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">ผู้บรรยาย</h1>
            <p className="text-gray-600 mt-1">จัดการข้อมูลผู้บรรยายสำหรับงาน Symposium</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="add-button-gradient" onClick={() => setEditingSpeaker(null)}>
                <Plus className="w-5 h-5 mr-2" />เพิ่มผู้บรรยาย
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{editingSpeaker ? 'แก้ไขข้อมูลผู้บรรยาย' : 'เพิ่มผู้บรรยายใหม่'}</DialogTitle>
                <DialogDescription>กรอกข้อมูลผู้บรรยายให้ครบถ้วน</DialogDescription>
              </DialogHeader>
              <SpeakerForm speaker={editingSpeaker} onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input type="text" placeholder="ค้นหาชื่อ, ตำแหน่ง, หรือบริษัท..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredSpeakers.map(speaker => (
              <SpeakerCard 
                key={speaker.id} 
                speaker={speaker} 
                onEdit={() => { setEditingSpeaker(speaker); setIsFormOpen(true); }}
                onDelete={() => setDeletingSpeaker(speaker)}
              />
            ))}
          </AnimatePresence>
        </div>
         {filteredSpeakers.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg">
                <Mic className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-lg">ไม่พบข้อมูลผู้บรรยาย</p>
                <p className="text-sm mt-1">ลองเพิ่มข้อมูลผู้บรรยายคนแรกของคุณ!</p>
            </div>
        )}
      </div>

      <AlertDialog open={!!deletingSpeaker} onOpenChange={(open) => !open && setDeletingSpeaker(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
            <AlertDialogDescription>คุณแน่ใจหรือไม่ว่าต้องการลบ "{deletingSpeaker?.name}" ออกจากรายชื่อผู้บรรยาย?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingSpeaker(null)}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">ลบ</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SpeakersPage;
