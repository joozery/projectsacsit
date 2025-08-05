// Exhibition Service for API communication

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

class ExhibitionService {
  // Get all exhibitions
  async getExhibitions(filters = {}) {
    try {
      const queryParams = new URLSearchParams();
      
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.category_id) queryParams.append('category_id', filters.category_id);
      if (filters.search) queryParams.append('search', filters.search);

      const response = await fetch(`${API_BASE_URL}/exhibitions?${queryParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching exhibitions:', error);
      throw error;
    }
  }

  // Get single exhibition by ID
  async getExhibition(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/exhibitions/${id}`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Exhibition not found');
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching exhibition:', error);
      throw error;
    }
  }

  // Create new exhibition
  async createExhibition(exhibitionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/exhibitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exhibitionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create exhibition');
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating exhibition:', error);
      throw error;
    }
  }

  // Update exhibition
  async updateExhibition(id, exhibitionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/exhibitions/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(exhibitionData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update exhibition');
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating exhibition:', error);
      throw error;
    }
  }

  // Delete exhibition
  async deleteExhibition(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/exhibitions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete exhibition');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting exhibition:', error);
      throw error;
    }
  }

  // Get exhibition categories
  async getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/exhibitions/categories/list`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  // Upload single file (image or PDF)
  async uploadFile(file, type = 'exhibition') {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload file');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  }

  // Upload multiple files
  async uploadMultipleFiles(files) {
    try {
      const formData = new FormData();
      
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i]);
      }

      const response = await fetch(`${API_BASE_URL}/upload/multiple`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to upload files');
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading multiple files:', error);
      throw error;
    }
  }

  // Delete file from S3
  async deleteFile(fileKey) {
    try {
      const response = await fetch(`${API_BASE_URL}/upload/${encodeURIComponent(fileKey)}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to delete file');
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting file:', error);
      throw error;
    }
  }

  // Add image to exhibition
  async addImageToExhibition(exhibitionId, imageData) {
    try {
      const response = await fetch(`${API_BASE_URL}/exhibitions/${exhibitionId}/images`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(imageData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add image to exhibition');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding image to exhibition:', error);
      throw error;
    }
  }

  // Add document to exhibition
  async addDocumentToExhibition(exhibitionId, documentData) {
    try {
      const response = await fetch(`${API_BASE_URL}/exhibitions/${exhibitionId}/documents`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add document to exhibition');
      }

      return await response.json();
    } catch (error) {
      console.error('Error adding document to exhibition:', error);
      throw error;
    }
  }

  // Update exhibition display order
  async updateDisplayOrder(orders) {
    try {
      const response = await fetch(`${API_BASE_URL}/exhibitions/reorder`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ orders }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update display order');
      }

      return await response.json();
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