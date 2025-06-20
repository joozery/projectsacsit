import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { 
  Eye, 
  Edit, 
  Trash2, 
  Film, 
  Image as ImageIcon, 
  Video, 
  FolderOpen, 
  CalendarDays 
} from 'lucide-react';

const MediaGrid = ({ mediaItems, onEdit, onDelete, onFeatureClick }) => {

  const getStatusBadge = (status) => {
    if (status === 'published') {
      return <span className="inline-block text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">เผยแพร่แล้ว</span>;
    }
    return <span className="inline-block text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full font-medium">แบบร่าง</span>;
  };

  const getIconForType = (type) => {
    if (type === 'image') return <ImageIcon className="w-4 h-4 text-white" />;
    if (type === 'video') return <Video className="w-4 h-4 text-white" />;
    if (type === 'folder') return <FolderOpen className="w-4 h-4 text-white" />;
    return <Film className="w-4 h-4 text-white" />;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <AnimatePresence>
        {mediaItems.map((item, index) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden group hover:shadow-2xl transition-all duration-300 flex flex-col border border-gray-100"
          >
            <div 
              className="relative w-full h-48 bg-gray-200 cursor-pointer"
              onClick={() => onFeatureClick('ดูรายละเอียด', item.name)}
              style={{ backgroundColor: item.themeColor || '#E5E7EB' }}
            >
              {item.type === 'folder' ? (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <FolderOpen className="w-16 h-16 text-white opacity-80" />
                  <p className="mt-2 text-white font-semibold">{item.itemsCount || 0} รายการ</p>
                </div>
              ) : item.coverImageUrl || item.thumbnailUrl ? (
                <img-replace src={item.coverImageUrl || item.thumbnailUrl} alt={item.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  {item.type === 'image' ? <ImageIcon className="w-12 h-12 text-gray-400" /> : <Video className="w-12 h-12 text-gray-400" />}
                </div>
              )}
              <div className="absolute top-2 right-2 p-1.5 bg-black/40 rounded-full backdrop-blur-sm">
                {getIconForType(item.type)}
              </div>
              <div 
                className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent"
                style={{
                  background: `linear-gradient(to top, ${item.themeColor ? `${item.themeColor}BF` : 'rgba(0,0,0,0.4)'} 0%, transparent 100%)`
                }}
              >
                <h3 className="font-semibold text-sm text-white truncate group-hover:text-gray-100 transition-colors">{item.name}</h3>
                {item.subtitle && <p className="text-xs text-gray-200 truncate">{item.subtitle}</p>}
              </div>
            </div>
            <div className="p-4 flex-grow flex flex-col justify-between">
              <div>
                <p className="text-xs text-gray-500 mt-1 flex items-center">
                  <CalendarDays className="w-3 h-3 mr-1.5 text-gray-400"/>
                  {item.event} - {item.date}
                </p>
                <div className="mt-2 mb-3">{getStatusBadge(item.status)}</div>
                {item.keywords && item.keywords.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {item.keywords.slice(0, 3).map(kw => (
                      <span key={kw} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{kw}</span>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center justify-end space-x-1 mt-3">
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100" onClick={() => onFeatureClick('ดูตัวอย่าง', item.name)}>
                  <Eye className="w-4 h-4 text-gray-500 hover:text-blue-600" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100" onClick={() => onEdit(item)}>
                  <Edit className="w-4 h-4 text-gray-500 hover:text-violet-600" />
                </Button>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-gray-100" onClick={() => onDelete(item)}>
                    <Trash2 className="w-4 h-4 text-gray-500 hover:text-red-600" />
                  </Button>
                </AlertDialogTrigger>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MediaGrid;