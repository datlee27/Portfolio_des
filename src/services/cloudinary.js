/**
 * Cloudinary Direct Upload Service
 * Hỗ trợ upload ảnh trực tiếp từ client lên Cloudinary mà không cần qua server trung gian.
 */

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'ddwt6nl7s';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'portfolio_preset';

/**
 * Upload file ảnh hoặc video lên Cloudinary
 * @param {File|Blob} file - File từ <input type="file" />
 * @param {string} [customPreset] - Tùy chọn truyền upload preset khác nếu cần
 * @param {'auto'|'image'|'video'} [resourceType='auto'] - Loại tài nguyên
 * @returns {Promise<{ secure_url: string, public_id: string, resource_type: string, width?: number, height?: number }>}
 */
export async function uploadToCloudinary(file, customPreset = '', resourceType = 'auto') {
  if (!file) {
    throw new Error('Chưa chọn file để tải lên.');
  }

  const preset = customPreset || CLOUDINARY_UPLOAD_PRESET;
  const isVideo = file.type && file.type.startsWith('video/');
  const type = resourceType === 'auto' ? (isVideo ? 'video' : 'image') : resourceType;
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/${type}/upload`;

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', preset);

  const response = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    const msg = data?.error?.message || `Lỗi tải lên Cloudinary (HTTP ${response.status})`;
    throw new Error(msg);
  }

  return {
    secure_url: data.secure_url,
    public_id: data.public_id,
    resource_type: data.resource_type || (isVideo ? 'video' : 'image'),
    width: data.width,
    height: data.height,
  };
}

export default {
  uploadToCloudinary,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
};
