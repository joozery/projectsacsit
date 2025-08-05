// Exhibition Service for API communication
import { exhibitionsAPI } from './api';

class ExhibitionService {
  // Get all exhibitions
  async getExhibitions(filters = {}) {
    try {
      return await exhibitionsAPI.getExhibitions(filters);
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
      throw error;
    }
  }

  // Get single exhibition by ID
  async getExhibition(id) {
    try {
      return await exhibitionsAPI.getExhibition(id);
    } catch (error) {
      console.error('Error fetching exhibition:', error);
      throw error;
    }
  }

  // Create new exhibition
  async createExhibition(exhibitionData) {
    try {
      return await exhibitionsAPI.createExhibition(exhibitionData);
    } catch (error) {
      console.error('Error creating exhibition:', error);
      throw error;
    }
  }

  // Update exhibition
  async updateExhibition(id, exhibitionData) {
    try {
      return await exhibitionsAPI.updateExhibition(id, exhibitionData);
    } catch (error) {
      console.error('Error updating exhibition:', error);
      throw error;
    }
  }

  // Delete exhibition
  async deleteExhibition(id) {
    try {
      return await exhibitionsAPI.deleteExhibition(id);
    } catch (error) {
      console.error('Error deleting exhibition:', error);
      throw error;
    }
  }

  // Get exhibition categories
  async getCategories() {
    try {
      return await exhibitionsAPI.getCategories();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Upload single file (image or PDF)
  async uploadFile(file, type = 'exhibition') {
    try {
      return await exhibitionsAPI.uploadFile(file);
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Upload multiple files
  async uploadMultipleFiles(files) {
    try {
      return await exhibitionsAPI.uploadMultipleFiles(files);
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }

  // Delete file from S3
  async deleteFile(fileKey) {
    try {
      return await exhibitionsAPI.deleteFile(fileKey);
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // Add image to exhibition (using existing API - this would need to be added to exhibitions.js backend)
  async addImageToExhibition(exhibitionId, imageData) {
    try {
      // For now, we'll use direct implementation since this specific endpoint
      // would need to be added to the backend exhibitions.js
      console.warn('addImageToExhibition: Direct API implementation needed');
      return { success: true, message: 'Image added (placeholder)' };
    } catch (error) {
      console.error('Error adding image to exhibition:', error);
      throw error;
    }
  }

  // Add document to exhibition (using existing API - this would need to be added to exhibitions.js backend)
  async addDocumentToExhibition(exhibitionId, documentData) {
    try {
      // For now, we'll use direct implementation since this specific endpoint
      // would need to be added to the backend exhibitions.js
      console.warn('addDocumentToExhibition: Direct API implementation needed');
      return { success: true, message: 'Document added (placeholder)' };
    } catch (error) {
      console.error('Error adding document to exhibition:', error);
      throw error;
    }
  }

  // Update exhibition display order (using existing API - this would need to be added to exhibitions.js backend)
  async updateDisplayOrder(orders) {
    try {
      // For now, we'll use direct implementation since this specific endpoint
      // would need to be added to the backend exhibitions.js
      console.warn('updateDisplayOrder: Direct API implementation needed');
      return { success: true, message: 'Display order updated (placeholder)' };
    } catch (error) {
      console.error('Error updating display order:', error);
      throw error;
    }
  }

  // Helper: Create exhibition with file uploads
  async createExhibitionWithFiles(exhibitionData, imageFile = null, pdfFile = null) {
    try {
      let imageUrl = '', imageFilename = '';
      let pdfUrl = '', pdfFilename = '';

      // Upload image if provided
      if (imageFile) {
        const imageResult = await this.uploadFile(imageFile);
        imageUrl = imageResult.fileUrl;
        imageFilename = imageResult.fileName;
      }

      // Upload PDF if provided
      if (pdfFile) {
        const pdfResult = await this.uploadFile(pdfFile);
        pdfUrl = pdfResult.fileUrl;
        pdfFilename = pdfResult.fileName;
      }

      // Create exhibition with uploaded file URLs
      const exhibitionPayload = {
        ...exhibitionData,
        image_url: imageUrl,
        image_filename: imageFilename,
        pdf_url: pdfUrl,
        pdf_filename: pdfFilename,
      };

      return await this.createExhibition(exhibitionPayload);
    } catch (error) {
      console.error('Error creating exhibition with files:', error);
      throw error;
    }
  }

  // Helper: Update exhibition with file uploads
  async updateExhibitionWithFiles(id, exhibitionData, imageFile = null, pdfFile = null) {
    try {
      let imageUrl = exhibitionData.image_url || '';
      let imageFilename = exhibitionData.image_filename || '';
      let pdfUrl = exhibitionData.pdf_url || '';
      let pdfFilename = exhibitionData.pdf_filename || '';

      // Upload new image if provided
      if (imageFile) {
        const imageResult = await this.uploadFile(imageFile);
        imageUrl = imageResult.fileUrl;
        imageFilename = imageResult.fileName;
      }

      // Upload new PDF if provided
      if (pdfFile) {
        const pdfResult = await this.uploadFile(pdfFile);
        pdfUrl = pdfResult.fileUrl;
        pdfFilename = pdfResult.fileName;
      }

      // Update exhibition with file URLs
      const exhibitionPayload = {
        ...exhibitionData,
        image_url: imageUrl,
        image_filename: imageFilename,
        pdf_url: pdfUrl,
        pdf_filename: pdfFilename,
      };

      return await this.updateExhibition(id, exhibitionPayload);
    } catch (error) {
      console.error('Error updating exhibition with files:', error);
      throw error;
    }
  }
}

// Export singleton instance
export default new ExhibitionService();