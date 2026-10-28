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
  const isPdf = file.type === 'application/pdf' || (file.name && file.name.toLowerCase().endsWith('.pdf'));
  const type = resourceType === 'auto' ? (isVideo ? 'video' : isPdf ? 'auto' : 'image') : resourceType;
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

/**
 * Tự động tối ưu URL Cloudinary: chuyển sang WebP/AVIF (f_auto), nén thông minh (q_auto) và giới hạn kích thước (w_...)
 * Giúp giảm 70% - 95% dung lượng ảnh project khi tải về trình duyệt!
 *
 * @param {string} url - URL gốc từ Cloudinary
 * @param {Object} [options]
 * @param {number} [options.width] - Chiều rộng tối đa (ví dụ: 800, 1200)
 * @param {string} [options.quality='auto'] - Chất lượng ('auto', 'auto:eco', 'auto:good')
 * @param {string} [options.format='auto'] - Định dạng ('auto' => WebP/AVIF)
 * @returns {string} URL đã được chèn transformation
 */
export function optimizeCloudinaryUrl(url, options = {}) {
  if (!url || typeof url !== 'string' || !url.includes('res.cloudinary.com')) {
    return url;
  }
  if (url.includes('/image/upload/f_auto') || url.includes('/image/upload/q_auto')) {
    return url;
  }

  const { width, quality = 'auto', format = 'auto' } = options;
  const transforms = [];
  if (format) transforms.push(`f_${format}`);
  if (quality) transforms.push(`q_${quality}`);
  if (width) transforms.push(`w_${width},c_limit`);

  const transformString = transforms.join(',');
  return url.replace('/image/upload/', `/image/upload/${transformString}/`);
}

export default {
  uploadToCloudinary,
  optimizeCloudinaryUrl,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_UPLOAD_PRESET,
};
