import React from 'react';
import { motion } from 'framer-motion';
import { Edit2, Trash2, Eye, FileText, Image as ImageIcon, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ExhibitionCard = ({ exhibition, onEdit, onDelete }) => {
  const handleViewPdf = () => {
    if (exhibition.pdf_url) {
      // สร้าง URL สำหรับเปิดไฟล์ PDF ในแท็บใหม่
      const link = document.createElement('a');
      link.href = exhibition.pdf_url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.download = exhibition.pdf_filename || `${exhibition.name}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* รูปภาพหน้าปก */}
      <div className="relative h-48 bg-gray-200 overflow-hidden">
        {exhibition.image_url ? (
          <img 
            src={exhibition.image_url} 
            alt={exhibition.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <ImageIcon className="w-16 h-16 text-gray-400" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={exhibition.status === 'active' ? 'default' : 'secondary'}>
            {exhibition.status === 'active' ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}
          </Badge>
        </div>

        {/* PDF Indicator */}
        {exhibition.pdf_url && (
          <div className="absolute top-3 right-3">
            <Button
              size="sm"
              variant="secondary"
              className="bg-white/90 hover:bg-white text-gray-700 px-2 py-1"
              onClick={handleViewPdf}
            >
              <FileText className="w-4 h-4 mr-1" />
              PDF
            </Button>
          </div>
        )}
      </div>

      {/* เนื้อหา */}
      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
            {exhibition.name}
          </h3>
          <p className="text-gray-600 font-medium mb-2 line-clamp-1">
            {exhibition.title}
          </p>
          <p className="text-gray-500 text-sm line-clamp-3 leading-relaxed">
            {exhibition.description || 'ไม่มีรายละเอียด'}
          </p>
        </div>

        {/* ข้อมูลเพิ่มเติม */}
        <div className="mb-4 space-y-2">
          {exhibition.created_at && (
            <div className="flex items-center text-xs text-gray-400">
              <span>สร้างเมื่อ: {new Date(exhibition.created_at).toLocaleDateString('th-TH')}</span>
            </div>
          )}
          
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <ImageIcon className="w-3 h-3 mr-1" />
                {exhibition.image_url ? 'มีรูปภาพ' : 'ไม่มีรูปภาพ'}
              </span>
              <span className="flex items-center">
                <FileText className="w-3 h-3 mr-1" />
                {exhibition.pdf_url ? 'มี PDF' : 'ไม่มี PDF'}
              </span>
            </div>
          </div>
        </div>

        {/* ปุ่มจัดการ */}
        <div className="flex space-x-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onEdit}
            className="flex-1 text-blue-600 border-blue-200 hover:bg-blue-50"
          >
            <Edit2 className="w-4 h-4 mr-1" />
            แก้ไข
          </Button>
          
          <Button
            size="sm"
            variant="outline"
            onClick={onDelete}
            className="flex-1 text-red-600 border-red-200 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4 mr-1" />
            ลบ
          </Button>
        </div>

        {/* Quick Actions */}
        {exhibition.pdf_url && (
          <div className="mt-3 pt-3 border-t border-gray-100">
            <Button
              size="sm"
              variant="ghost"
              onClick={handleViewPdf}
              className="w-full text-gray-600 hover:text-gray-900 justify-center"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              เปิดดู PDF ({exhibition.pdf_filename || 'เอกสาร.pdf'})
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ExhibitionCard;