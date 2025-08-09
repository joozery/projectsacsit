import React, { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
import { UploadCloud, X, Palette, Image as ImageIcon, Check, Loader2 } from 'lucide-react';
import { useMediaForm, useMediaFilters } from '@/hooks/useMedia';

const defaultColors = [
  { name: 'ม่วงอ่อน', value: '#A855F7' },
  { name: 'ฟ้า', value: '#3B82F6' },
  { name: 'เขียว', value: '#10B981' },
  { name: 'เหลือง', value: '#F59E0B' },
  { name: 'ส้ม', value: '#F97316' },
  { name: 'แดง', value: '#EF4444' },
  { name: 'ชมพู', value: '#EC4899' },
  { name: 'เทา', value: '#6B7280' },
];

const MediaForm = ({ mediaItem, onSubmit, onCancel }) => {
  // API hooks
  const { 
    loading, 
    error, 
    uploadProgress,
    createMedia, 
    updateMedia, 
    uploadFile, 
    uploadMultipleFiles,
    setError 
  } = useMediaForm();
  
  const { events, keywords: popularKeywords } = useMediaFilters();

  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    content: '',
    type: 'image',
    event: '',
    date: '',
    coverImage: null,
    coverImageUrl: '',
    themeColor: defaultColors[0].value,
    keywords: [],
    additionalMedia: [], 
    status: 'draft',
    itemsCount: undefined,
  });

  const [keywordInput, setKeywordInput] = useState('');
  const [coverPreview, setCoverPreview] = useState(null);
  const [additionalMediaPreviews, setAdditionalMediaPreviews] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(''); // NEW: For folder upload

  useEffect(() => {
    if (mediaItem) {
      setFormData({
        name: mediaItem.name || '',
        subtitle: mediaItem.subtitle || '',
        content: mediaItem.content || '',
        type: mediaItem.type || 'image',
        event: mediaItem.event || '',
        date: mediaItem.date || '',
        coverImage: null,
        coverImageUrl: mediaItem.cover_image_url || mediaItem.thumbnail_url || mediaItem.coverImageUrl || mediaItem.thumbnailUrl || '',
        themeColor: mediaItem.theme_color || mediaItem.themeColor || defaultColors[0].value,
        keywords: mediaItem.keywords || [],
        additionalMedia: [], 
        status: mediaItem.status || 'draft',
        itemsCount: mediaItem.type === 'folder' ? (mediaItem.items_count || mediaItem.itemsCount || 0) : undefined,
      });
      setCoverPreview(mediaItem.cover_image_url || mediaItem.thumbnail_url || mediaItem.coverImageUrl || mediaItem.thumbnailUrl || null);
      // Handle both API response formats
      setAdditionalMediaPreviews(mediaItem.additional_media_urls || mediaItem.additionalMediaUrls || []);
    } else {
      // Reset form for new item
      setFormData({
        name: '',
        subtitle: '',
        content: '',
        type: 'image',
        event: '',
        date: '',
        coverImage: null,
        coverImageUrl: '',
        themeColor: defaultColors[0].value,
        keywords: [],
        additionalMedia: [],
        status: 'draft',
        itemsCount: undefined,
      });
      setCoverPreview(null);
      setKeywordInput('');
      setAdditionalMediaPreviews([]);
    }
  }, [mediaItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ 
      ...prev, 
      [name]: value,
      itemsCount: value === 'folder' ? (prev.itemsCount || 0) : undefined 
    }));
  };

  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('กรุณาเลือกไฟล์รูปภาพเท่านั้น');
        return;
      }
      
      // Validate file size (10MB)
      if (file.size > 10 * 1024 * 1024) {
        setError('ขนาดไฟล์ต้องไม่เกิน 10MB');
        return;
      }
      
      setFormData((prev) => ({ ...prev, coverImage: file, coverImageUrl: '' }));
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setError(null);
    }
  };
  
  const handleAdditionalMediaChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, additionalMedia: [...prev.additionalMedia, ...files] }));
      const newPreviews = files.map(file => URL.createObjectURL(file));
      setAdditionalMediaPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeAdditionalMedia = (index) => {
    setFormData(prev => ({
      ...prev,
      additionalMedia: prev.additionalMedia.filter((_, i) => i !== index)
    }));
    setAdditionalMediaPreviews(prev => prev.filter((_, i) => i !== index));
  };


  const handleKeywordAdd = () => {
    if (keywordInput.trim() && formData.keywords.length < 5 && !formData.keywords.includes(keywordInput.trim())) {
      setFormData((prev) => ({ ...prev, keywords: [...prev.keywords, keywordInput.trim()] }));
      setKeywordInput('');
    }
  };

  const handleKeywordRemove = (keywordToRemove) => {
    setFormData((prev) => ({ ...prev, keywords: prev.keywords.filter(kw => kw !== keywordToRemove) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let coverImageUrl = formData.coverImageUrl;
      let additionalMediaUrls = [];

      // Upload cover image if new file is selected
      if (formData.coverImage) {
        console.log('📤 Uploading cover image...');
        const uploadResult = await uploadFile(formData.coverImage);
        console.log('📤 Upload result:', uploadResult);
        
        if (!uploadResult || !uploadResult.fileUrl) {
          throw new Error('Upload failed: Invalid response from server');
        }
        
        coverImageUrl = uploadResult.fileUrl;
      }

      // Upload additional media files
      if (formData.additionalMedia && formData.additionalMedia.length > 0) {
        console.log('📤 Uploading additional media files...');
        const uploadResults = await uploadMultipleFiles(formData.additionalMedia);
        console.log('📤 Multiple upload results:', uploadResults);
        
        if (!uploadResults || !Array.isArray(uploadResults)) {
          throw new Error('Multiple upload failed: Invalid response from server');
        }
        
        additionalMediaUrls = uploadResults.map((result, index) => {
          if (!result || !result.fileUrl) {
            throw new Error(`Upload failed for file ${index + 1}: Invalid response`);
          }
          return result.fileUrl;
        });
      }

      // Prepare data for API
      const mediaData = {
        name: formData.name,
        subtitle: formData.subtitle,
        content: formData.content,
        type: formData.type,
        event: formData.event,
        date: formData.date,
        cover_image_url: coverImageUrl,
        theme_color: formData.themeColor,
        keywords: formData.keywords,
        additional_media_urls: additionalMediaUrls,
        status: formData.status,
        items_count: formData.type === 'folder' ? parseInt(formData.itemsCount) || 0 : null,
      };

      let result;
      if (mediaItem) {
        // Update existing media
        result = await updateMedia(mediaItem.id, mediaData);
        console.log('✅ Media updated successfully:', result.name);
      } else {
        // Create new media
        result = await createMedia(mediaData);
        console.log('✅ Media created successfully:', result.name);
      }

      // Call parent onSubmit with result
      if (onSubmit) {
        onSubmit(result);
      }

    } catch (err) {
      console.error('❌ Error submitting media form:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 py-2 max-h-[75vh] overflow-y-auto pr-2">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">❌ {error}</p>
        </div>
      )}
      
      {/* Upload Progress */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
          <p className="text-blue-600 text-sm mb-2">📤 กำลังอัปโหลดไฟล์... {uploadProgress}%</p>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        </div>
      )}
      
      {/* Upload Success */}
      {uploadProgress === 100 && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <div className="flex items-center">
            <div className="animate-bounce mr-2">✅</div>
            <p className="text-green-600 text-sm">อัปโหลดสำเร็จ! กำลังบันทึกข้อมูล...</p>
          </div>
        </div>
      )}
      <div>
        <Label htmlFor="coverImage" className="text-gray-700 font-medium">หน้าปก</Label>
        <div className="mt-2 flex justify-center items-center w-full h-48 rounded-lg border-2 border-dashed border-gray-300 hover:border-violet-500 transition-colors bg-gray-50 relative group">
          {coverPreview ? (
            <div className="relative h-full w-full">
              <img 
                src={coverPreview} 
                alt="Preview" 
                className="h-full w-full object-cover rounded-md" 
              />
              {/* Upload Progress Overlay */}
              {(isSubmitting || loading) && uploadProgress > 0 && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-md">
                  <div className="text-center text-white">
                    <div className="animate-spin w-8 h-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="text-sm">อัปโหลด {uploadProgress}%</p>
                  </div>
                </div>
              )}
              {/* Remove Button */}
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, coverImage: null, coverImageUrl: '' }));
                  setCoverPreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="text-center">
              <UploadCloud className="mx-auto h-10 w-10 text-gray-400 group-hover:text-violet-500" />
              <p className="mt-1 text-sm text-gray-600 group-hover:text-violet-600">คลิกเพื่ออัปโหลดรูปภาพ</p>
              <p className="text-xs text-gray-500">PNG, JPG, GIF ขนาดไม่เกิน 10MB</p>
            </div>
          )}
          <Input 
            id="coverImage" 
            name="coverImage" 
            type="file" 
            onChange={handleCoverImageChange} 
            accept="image/*" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
        {/* File Info */}
        {formData.coverImage && (
          <div className="mt-2 p-2 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">📁 {formData.coverImage.name}</span>
              <span className="text-gray-500">{(formData.coverImage.size / 1024 / 1024).toFixed(2)} MB</span>
            </div>
            <div className="flex items-center mt-1">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              <span className="text-xs text-green-600">พร้อมอัปโหลด</span>
            </div>
          </div>
        )}
        {formData.coverImageUrl && !formData.coverImage && (
           <p className="text-xs text-gray-500 mt-1">ใช้ภาพเดิม: {formData.coverImageUrl.substring(0,40)}...</p>
        )}
      </div>

      <div>
        <Label htmlFor="themeColor" className="text-gray-700 font-medium">ธีมสี</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {defaultColors.map(color => (
            <Button
              key={color.value}
              type="button"
              variant="outline"
              size="sm"
              onClick={() => handleSelectChange('themeColor', color.value)}
              className={`h-8 w-8 p-0 rounded-full border-2 ${formData.themeColor === color.value ? 'ring-2 ring-offset-1 ring-violet-500 border-violet-500' : 'border-gray-300'}`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            >
              {formData.themeColor === color.value && <Check className="h-4 w-4 text-white mix-blend-difference" />}
            </Button>
          ))}
          <div className="relative h-8 w-8">
            <input 
              type="color" 
              value={formData.themeColor} 
              onChange={(e) => handleSelectChange('themeColor', e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div 
              className="h-full w-full rounded-full border-2 border-gray-300 flex items-center justify-center"
              style={{ backgroundColor: formData.themeColor }}
            >
              <Palette className="h-4 w-4 text-white mix-blend-difference" />
            </div>
          </div>
        </div>
      </div>

      <div>
        <Label htmlFor="name" className="text-gray-700 font-medium">ชื่อ</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="เช่น ภาพบรรยากาศงาน..." required className="mt-1"/>
      </div>
      <div>
        <Label htmlFor="subtitle" className="text-gray-700 font-medium">หัวข้อย่อย</Label>
        <Input id="subtitle" name="subtitle" value={formData.subtitle} onChange={handleChange} placeholder="คำอธิบายสั้นๆ เพิ่มเติม" className="mt-1"/>
      </div>
      <div>
        <Label htmlFor="content" className="text-gray-700 font-medium">เนื้อหา</Label>
        <Textarea id="content" name="content" value={formData.content} onChange={handleChange} placeholder="รายละเอียดเนื้อหา (ถ้ามี)" className="mt-1 min-h-[100px]"/>
      </div>
      
      <div>
        <Label htmlFor="keywords" className="text-gray-700 font-medium">คำสำคัญ (Keyword)</Label>
        <div className="mt-1 flex">
          <Input 
            id="keywordInput" 
            value={keywordInput} 
            onChange={(e) => setKeywordInput(e.target.value)} 
            placeholder="เพิ่มคำสำคัญ (ไม่เกิน 5 คำ)" 
            className="rounded-r-none"
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleKeywordAdd();}}}
          />
          <Button type="button" onClick={handleKeywordAdd} className="rounded-l-none bg-violet-600 hover:bg-violet-700 text-white">เพิ่ม</Button>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.keywords.map(kw => (
            <span key={kw} className="flex items-center bg-violet-100 text-violet-700 text-xs font-medium px-2.5 py-1 rounded-full">
              {kw}
              <Button type="button" variant="ghost" size="icon" onClick={() => handleKeywordRemove(kw)} className="ml-1.5 h-4 w-4 p-0 text-violet-500 hover:text-violet-700">
                <X className="h-3 w-3" />
              </Button>
            </span>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="additionalMedia" className="text-gray-700 font-medium">สื่อหรือภาพประกอบ</Label>
        <div className="mt-2 flex justify-center items-center w-full min-h-[6rem] p-2 rounded-lg border-2 border-dashed border-gray-300 hover:border-violet-500 transition-colors bg-gray-50 relative group">
          {additionalMediaPreviews.length === 0 ? (
            <div className="text-center">
              <ImageIcon className="mx-auto h-8 w-8 text-gray-400 group-hover:text-violet-500" />
              <p className="mt-1 text-xs text-gray-600 group-hover:text-violet-600">อัปโหลดภาพหรือวิดีโอเพิ่มเติม</p>
            </div>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2">
              {additionalMediaPreviews.map((previewUrl, index) => (
                <div key={index} className="relative aspect-square group/item">
                  <img 
                    src={previewUrl} 
                    alt={`Preview ${index + 1}`} 
                    className="h-full w-full object-cover rounded-md border border-gray-200" 
                  />
                  {/* Upload Progress for Individual Files */}
                  {(isSubmitting || loading) && uploadProgress > 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-md">
                      <div className="text-center text-white">
                        <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto mb-1"></div>
                        <p className="text-xs">อัปโหลด...</p>
                      </div>
                    </div>
                  )}
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    className="absolute top-1 right-1 h-5 w-5 p-0 opacity-0 group-hover/item:opacity-100 transition-opacity"
                    onClick={() => removeAdditionalMedia(index)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
              {/* Add More Button */}
              <div className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md hover:border-violet-500 transition-colors cursor-pointer">
                <div className="text-center">
                  <UploadCloud className="mx-auto h-6 w-6 text-gray-400" />
                  <p className="text-xs text-gray-500 mt-1">เพิ่ม</p>
                </div>
              </div>
            </div>
          )}
          <Input 
            id="additionalMedia" 
            name="additionalMedia" 
            type="file" 
            onChange={handleAdditionalMediaChange} 
            accept="image/*,video/*" 
            multiple
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="type" className="text-gray-700 font-medium">ประเภทสื่อ</Label>
          <Select name="type" value={formData.type} onValueChange={(value) => handleSelectChange('type', value)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="เลือกประเภทสื่อ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="image">รูปภาพ</SelectItem>
              <SelectItem value="video">วิดีโอ</SelectItem>
              <SelectItem value="folder">โฟลเดอร์/อัลบั้ม</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {formData.type === 'folder' && (
          <div>
            <Label htmlFor="itemsCount" className="text-gray-700 font-medium">จำนวนรายการในโฟลเดอร์</Label>
            <Input id="itemsCount" name="itemsCount" type="number" value={formData.itemsCount || ''} onChange={handleChange} placeholder="0" className="mt-1"/>
          </div>
        )}
        <div>
          <Label htmlFor="event" className="text-gray-700 font-medium">ชื่องานอีเว้นท์ที่เกี่ยวข้อง</Label>
          <Input id="event" name="event" value={formData.event} onChange={handleChange} placeholder="เช่น SACIT Symposium 2025" required className="mt-1"/>
        </div>
        <div>
          <Label htmlFor="date" className="text-gray-700 font-medium">วันที่เผยแพร่/วันที่งาน</Label>
          <Input id="date" name="date" type="date" value={formData.date} onChange={handleChange} required className="mt-1"/>
        </div>
        <div>
          <Label htmlFor="status" className="text-gray-700 font-medium">สถานะ</Label>
          <Select name="status" value={formData.status} onValueChange={(value) => handleSelectChange('status', value)}>
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="เลือกสถานะ" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">บันทึกแบบร่าง</SelectItem>
              <SelectItem value="published">เผยแพร่ภาพและวิดีโอ</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <DialogFooter className="pt-4">
        <DialogClose asChild>
          <Button type="button" variant="outline" onClick={onCancel}>ยกเลิก</Button>
        </DialogClose>
        <Button 
          type="submit" 
          disabled={isSubmitting || loading}
          className="bg-violet-600 hover:bg-violet-700 text-white disabled:opacity-50"
        >
          {isSubmitting || loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {uploadProgress > 0 ? `อัปโหลด ${uploadProgress}%` : 'กำลังบันทึก...'}
            </>
          ) : (
            mediaItem ? 'บันทึกการเปลี่ยนแปลง' : (formData.status === 'draft' ? 'บันทึกแบบร่าง' : 'เผยแพร่ภาพและวิดีโอ')
          )}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default MediaForm;