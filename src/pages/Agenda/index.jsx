import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet';
import { CalendarDays } from 'lucide-react';
import { useAgenda } from './hooks/useAgenda';
import AgendaHeader from './components/AgendaHeader';
import AgendaTabs from './components/AgendaTabs';
import SymposiumFormDialog from './components/SymposiumFormDialog';
import ConfirmationDialog from './components/ConfirmationDialog';

const AgendaPage = () => {
  const agenda = useAgenda();
  const [symposiumToEdit, setSymposiumToEdit] = useState(null);
  const [symposiumToDelete, setSymposiumToDelete] = useState(null);

  const handleOpenEdit = (symposium) => {
    setSymposiumToEdit(symposium);
    agenda.setIsSymposiumFormOpen(true);
  };

  const handleOpenDelete = (symposium) => {
    setSymposiumToDelete(symposium);
  };
  
  const confirmDelete = () => {
    if (symposiumToDelete) {
      agenda.deleteSymposium(symposiumToDelete.id);
      setSymposiumToDelete(null);
    }
  };

  return (
    <>
      <Helmet><title>จัดการ Agenda - ระบบจัดการ SACIT</title></Helmet>
      <div className="space-y-6">
        <AgendaHeader
          symposiums={agenda.symposiums}
          currentSymposiumId={agenda.currentSymposiumId}
          onSymposiumChange={agenda.setCurrentSymposiumId}
          onAddSymposium={() => { setSymposiumToEdit(null); agenda.setIsSymposiumFormOpen(true); }}
          onEditSymposium={() => handleOpenEdit(agenda.currentSymposium)}
          onDeleteSymposium={() => handleOpenDelete(agenda.currentSymposium)}
          currentSymposium={agenda.currentSymposium}
        />

        {agenda.currentSymposium ? (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
            <AgendaTabs agenda={agenda} />
          </motion.div>
        ) : (
          <div className="text-center py-16 text-gray-500 bg-white rounded-xl shadow-lg">
            <CalendarDays className="w-20 h-20 mx-auto text-gray-400 mb-4" />
            <p className="text-xl font-semibold">ยังไม่มี Symposium</p>
            <p className="text-md mt-2">เริ่มสร้าง Symposium แรกของคุณได้เลย!</p>
          </div>
        )}
      </div>

      <SymposiumFormDialog
        isOpen={agenda.isSymposiumFormOpen}
        onOpenChange={agenda.setIsSymposiumFormOpen}
        onSubmit={symposiumToEdit ? agenda.updateSymposium : agenda.addSymposium}
        symposium={symposiumToEdit}
      />
      
      <ConfirmationDialog
        isOpen={!!symposiumToDelete}
        onOpenChange={() => setSymposiumToDelete(null)}
        onConfirm={confirmDelete}
        title="ยืนยันการลบ Symposium"
        description={`คุณแน่ใจหรือไม่ว่าต้องการลบ "${symposiumToDelete?.name}"? การกระทำนี้ไม่สามารถย้อนกลับได้ และจะลบข้อมูลวันและกำหนดการทั้งหมดที่เกี่ยวข้อง`}
      />
    </>
  );
};

export default AgendaPage;