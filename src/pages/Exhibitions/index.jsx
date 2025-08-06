import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { Plus, Search, Image as ImageIcon, FileText, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import ExhibitionForm from './ExhibitionForm';
import ExhibitionCard from './ExhibitionCard';
import exhibitionService from '@/services/exhibitionService';

const EXHIBITIONS_STORAGE_KEY = 'sacit_exhibitions_v1';

const initialExhibitions = [
  { 
    id: 1, 
    name: 'Traditional Weaving', 
    title: 'ผ้าทอพื้นเมืองภาคเหนือ', 
    description: 'การสาธิตการทอผ้าแบบดั้งเดิมจากภาคเหนือของไทย พร้อมเรียนรู้เทคนิคการใช้สีธรรมชาติ',
    imageUrl: '', 
    pdfUrl: '',
    status: 'active',
    createdAt: '2024-01-01'
  },
  { 
    id: 2, 
    name: 'Ceramic Workshop', 
    title: 'เครื่องปั้นดินเผาร่วมสมัย', 
    description: 'พื้นที่สาธิตการปั้นดินเผาที่ผสมผสานเทคนิคดั้งเดิมกับการออกแบบสมัยใหม่',
    imageUrl: '', 
    pdfUrl: '',
    status: 'active',
    createdAt: '2024-01-02'
  },
  { 
    id: 3, 
    name: 'Wood Carving', 
    title: 'งานแกะสลักไม้ดั้งเดิม', 
    description: 'การสาธิตงานแกะสลักไม้ที่ถ่ายทอดความเป็นไทยผ่านลวดลายต่างๆ',
    imageUrl: '', 
    pdfUrl: '',
    status: 'active',
    createdAt: '2024-01-03'
  },
  { 
    id: 4, 
    name: 'Jewelry Making', 
    title: 'เครื่องประดับจากวัสดุธรรมชาติ', 
    description: 'การสร้างสรรค์เครื่องประดับจากวัสดุธรรมชาติในท้องถิ่น เน้นความยั่งยืน',
    imageUrl: '', 
    pdfUrl: '',
    status: 'active',
    createdAt: '2024-01-04'
  },
  { 
    id: 5, 
    name: 'Local Handicrafts', 
    title: 'หัตถกรรมพื้นถิ่นอาเซียน', 
    description: 'นิทรรศการรวมผลงานหัตถกรรมจากประเทศต่างๆ ในอาเซียน แสดงความหลากหลายทางวัฒนธรรม',
    imageUrl: '', 
    pdfUrl: '',
    status: 'active',
    createdAt: '2024-01-05'
  },
];

const ExhibitionsPage = () => {
  const { toast } = useToast();
  const [exhibitions, setExhibitions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExhibition, setEditingExhibition] = useState(null);
  const [deletingExhibition, setDeletingExhibition] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadExhibitions();
  }, []);

  const loadExhibitions = async () => {
    try {
      setLoading(true);
      console.log('🔄 Loading exhibitions...');
      const response = await exhibitionService.getExhibitions();
      console.log('📥 Raw API response:', response);
      
      // ตรวจสอบ response format และจัดการข้อมูลให้ถูกต้อง
      let exhibitionsData = [];
      
      if (response && response.success && response.data) {
        // ถ้า response มี format { success: true, data: [...] }
        exhibitionsData = response.data;
        console.log('✅ Using response.data format');
      } else if (Array.isArray(response)) {
        // ถ้า response เป็น array โดยตรง
        exhibitionsData = response;
        console.log('✅ Using direct array format');
      } else if (response && Array.isArray(response.data)) {
        // กรณีอื่นๆ ที่อาจมี data เป็น array
        exhibitionsData = response.data;
        console.log('✅ Using response.data array format');
      } else {
        // fallback เป็น array ว่าง
        console.warn('❌ Unexpected response format:', response);
        exhibitionsData = [];
      }
      
      console.log('📊 Processed exhibitions count:', exhibitionsData.length);
      console.log('📋 Exhibitions data:', exhibitionsData);
      setExhibitions(exhibitionsData);
    } catch (error) {
      console.error('❌ Error loading exhibitions:', error);
      toast({
        title: "เกิดข้อผิดพลาด",
        description: "ไม่สามารถโหลดข้อมูลนิทรรศการได้",
        variant: "destructive"
      });
      // Fallback to empty array if API fails
      setExhibitions([]);
    } finally {
      setLoading(false);
    }
  };

  // Remove localStorage functions since we're using API now

  const handleFormSubmit = async () => {
    // Form submission is now handled in ExhibitionForm component
    // This function is called after successful submission to refresh the list
    await loadExhibitions();
    setIsFormOpen(false);
    setEditingExhibition(null);
  };
  
  const confirmDelete = async () => {
    if (deletingExhibition) {
      try {
        console.log('🗑️ Deleting exhibition:', deletingExhibition.id, deletingExhibition.name);
        await exhibitionService.deleteExhibition(deletingExhibition.id);
        console.log('✅ Delete API call successful');
        toast({ title: "ลบนิทรรศการสำเร็จ!" });
        console.log('🔄 Refreshing exhibitions list...');
        await loadExhibitions(); // Refresh list
        console.log('✅ Exhibitions list refreshed');
        setDeletingExhibition(null);
      } catch (error) {
        console.error('❌ Error deleting exhibition:', error);
        toast({
          title: "เกิดข้อผิดพลาด",
          description: "ไม่สามารถลบนิทรรศการได้",
          variant: "destructive"
        });
      }
    }
  };
  
  // ตรวจสอบว่า exhibitions เป็น array ก่อนใช้ filter
  const filteredExhibitions = Array.isArray(exhibitions) 
    ? exhibitions.filter(e =>
        e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        e.description?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : [];

  return (
    <>
      <Helmet><title>จัดการนิทรรศการ - ระบบจัดการ SACIT</title></Helmet>
      <div className="space-y-6 admin-panel" data-admin="true">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Live Exhibition (Demonstrative Area)</h1>
            <p className="text-gray-600 mt-1">จัดการข้อมูลนิทรรศการและพื้นที่สาธิตสำหรับงาน Symposium</p>
          </div>
          <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
            <DialogTrigger asChild>
              <Button className="add-button-gradient" onClick={() => setEditingExhibition(null)}>
                <Plus className="w-5 h-5 mr-2" />เพิ่มนิทรรศการ
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingExhibition ? 'แก้ไขข้อมูลนิทรรศการ' : 'เพิ่มนิทรรศการใหม่'}</DialogTitle>
                <DialogDescription>กรอกข้อมูลนิทรรศการให้ครบถ้วน สามารถอัปโหลดรูปภาพหน้าปกและไฟล์ PDF ได้</DialogDescription>
              </DialogHeader>
              <ExhibitionForm exhibition={editingExhibition} onSubmit={handleFormSubmit} onCancel={() => setIsFormOpen(false)} />
            </DialogContent>
          </Dialog>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-6 rounded-xl shadow-lg">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input type="text" placeholder="ค้นหาชื่อนิทรรศการ หรือรายละเอียด..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10" />
          </div>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin mx-auto text-violet-600 mb-4" />
            <p className="text-gray-600">กำลังโหลดข้อมูลนิทรรศการ...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredExhibitions.map(exhibition => (
                  <ExhibitionCard 
                    key={exhibition.id} 
                    exhibition={exhibition} 
                    onEdit={() => { setEditingExhibition(exhibition); setIsFormOpen(true); }}
                    onDelete={() => setDeletingExhibition(exhibition)}
                  />
                ))}
              </AnimatePresence>
            </div>
            
            {filteredExhibitions.length === 0 && !loading && (
              <div className="col-span-full text-center py-12 text-gray-500 bg-white rounded-xl shadow-lg">
                <ImageIcon className="w-16 h-16 mx-auto text-gray-400 mb-4" />
                <p className="text-lg">ไม่พบข้อมูลนิทรรศการ</p>
                <p className="text-sm mt-1">
                  {searchTerm ? 'ลองค้นหาด้วยคำอื่น' : 'ลองเพิ่มข้อมูลนิทรรศการแรกของคุณ!'}
                </p>
              </div>
            )}
          </>
        )}
      </div>

      <AlertDialog open={!!deletingExhibition} onOpenChange={(open) => !open && setDeletingExhibition(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบ</AlertDialogTitle>
            <AlertDialogDescription>คุณแน่ใจหรือไม่ว่าต้องการลบนิทรรศการ "{deletingExhibition?.name}" ออกจากรายการ?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeletingExhibition(null)}>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-red-600 hover:bg-red-700">ลบ</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ExhibitionsPage;