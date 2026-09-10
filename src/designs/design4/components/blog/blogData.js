/**
 * Blog data, constants, themes, and helpers.
 * Uses Vietnamese content matching the "chạng vạng" personal blog style.
 */

export const SITE = {
  name: 'chạng vạng.',
  intro:
    'mình ghi lại vài dòng mỗi khi có điều gì đó đáng nhớ — về công việc, sách vở, và những thứ lặt vặt khác trong ngày.',
};

export const TAGS = ['tất cả', 'suy ngẫm', 'thiết kế', 'công nghệ', 'đọc sách'];

export const IMAGE_LIMIT = 6;
export const VIDEO_LIMIT = 2;

/**
 * Each post can have media: null, or { type: "image"|"video", items: [...] }
 * Items are either real URLs or [color1, color2] fallback gradient arrays.
 */
export const POSTS = [
  {
    id: 1,
    title: 'một năm làm việc một mình',
    excerpt:
      'tự do hoá ra không hề dễ. mười hai tháng làm một mình dạy mình nhiều hơn bốn năm đi làm công ty.',
    content: [
      'khi mới nghỉ việc, mình tưởng tượng cảnh ngồi quán cà phê, không ai quản, thu nhập tự do. thực tế khác xa như vậy.',
      'khó nhất không phải là tìm khách hàng, mà là tự tạo kỷ luật cho chính mình khi không còn ai nhắc nhở.',
      'đổi lại, mình học được cách định giá công sức của mình, và quan trọng hơn là học cách nói không.',
    ],
    date: '2026-08-12',
    tag: 'suy ngẫm',
    media: null,
    likes: 24,
    comments: [
      { name: 'Thảo', text: 'đọc mà thấy đồng cảm ghê, mình cũng đang cân nhắc nghỉ việc làm freelance' },
      { name: 'Minh Anh', text: 'phần học cách nói không đúng thật sự, mình vẫn đang tập điều này' },
    ],
  },
  {
    id: 2,
    title: 'vẽ tay trước khi mở figma',
    excerpt:
      'màn hình trắng của figma khiến mình thiết kế theo những gì công cụ cho phép, chứ không phải điều mình muốn.',
    content: [
      'bút và giấy chậm hơn, nhưng chính vì chậm nên buộc phải nghĩ kỹ trước khi đặt nét vẽ đầu tiên.',
      'mình hay phác năm, sáu bố cục trong mười phút, thay vì loay hoay kéo thả cả giờ trong figma.',
      'đến khi mở máy tính, mình đã biết chính xác cần dựng gì.',
    ],
    date: '2026-07-30',
    tag: 'thiết kế',
    media: {
      type: 'image',
      items: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    likes: 15,
    comments: [
      { name: 'Đức', text: 'mình cũng hay làm vậy, phác thảo nhanh trên giấy trước khi vào máy' },
    ],
  },
  {
    id: 3,
    title: 'mười lăm phút mỗi sáng, trước khi mở điện thoại',
    excerpt:
      'một thay đổi nhỏ, nhưng cảm giác kiểm soát buổi sáng của mình rõ rệt hơn hẳn.',
    content: [
      'mình để cuốn sách đang đọc ngay cạnh gối, thay vì để điện thoại ở đó.',
      'việc đầu tiên khi thức dậy là đọc mười lăm phút, trước khi cho phép mình chạm màn hình.',
      'chỉ vậy thôi, nhưng cả buổi sáng cảm giác chậm lại và dễ thở hơn nhiều.',
    ],
    date: '2026-07-18',
    tag: 'suy ngẫm',
    media: null,
    likes: 9,
    comments: [],
  },
  {
    id: 4,
    title: 'một năm dùng react server components',
    excerpt:
      'sau một năm dùng rsc trong dự án thật, đây là điều mình ước có ai đó đã nói từ đầu.',
    content: [
      'rsc giải quyết tốt bài toán tải dữ liệu, nhưng ranh giới client và server có đường cong học tập không hề nhỏ.',
      'cả nhóm mất gần hai tuần chỉ để thống nhất khi nào một component nên là use client.',
      'kết quả cuối cùng thì xứng đáng, bundle nhẹ hơn và trang tải nhanh hơn rõ rệt.',
    ],
    date: '2026-07-05',
    tag: 'công nghệ',
    media: {
      type: 'image',
      items: [
        'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    likes: 31,
    comments: [
      { name: 'Huy', text: 'bài này đúng lúc mình đang tìm hiểu rsc luôn' },
      { name: 'Lan', text: 'nhóm mình cũng mất cả tuần để thống nhất quy ước này :))' },
    ],
  },
  {
    id: 5,
    title: 'cuốn sách về nghề làm gốm đã thay đổi cách mình làm việc',
    excerpt:
      'không phải sách self-help hô hào, mà là một cuốn sách viết về nghề làm gốm.',
    content: [
      'cuốn sách kể chuyện một người học nghề gốm, không hề nhắc đến năng suất hay quản lý thời gian.',
      'nhưng cách tác giả tả sự kiên nhẫn với từng mẻ gốm hỏng khiến mình nhìn lại cách đối xử với thất bại của chính mình.',
      'mình đã đổi cách phản ứng với thất bại kể từ đó.',
    ],
    date: '2026-06-22',
    tag: 'đọc sách',
    media: {
      type: 'image',
      items: [
        'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1531875456634-3f5418280d20?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1493106819501-66d381c466f1?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1590402494682-cd3fb53b1f70?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    likes: 12,
    comments: [
      { name: 'Chi', text: 'tên sách là gì vậy bạn, mình muốn tìm đọc thử' },
    ],
  },
  {
    id: 6,
    title: 'tối giản không phải là bớt đồ đạc',
    excerpt:
      'mình từng nghĩ tối giản là vứt bớt đồ. hoá ra nó là bớt đi những quyết định không cần thiết.',
    content: [
      'bỏ đồ chỉ là phần nổi. phần chìm là giảm số quyết định nhỏ mỗi ngày để dành năng lượng cho việc quan trọng hơn.',
      'tủ áo ít món hơn nghĩa là buổi sáng không cần nghĩ mặc gì.',
      'ít lựa chọn hơn, nhưng đầu óc lại rảnh rang hơn.',
    ],
    date: '2026-06-10',
    tag: 'suy ngẫm',
    media: {
      type: 'video',
      items: [
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      ],
    },
    likes: 18,
    comments: [],
  },
  {
    id: 7,
    title: 'góc làm việc tại nhà, phiên bản dưới hai triệu',
    excerpt:
      'không cần bàn đứng đắt tiền. đây là góc làm việc mình dựng với chưa tới hai triệu đồng.',
    content: [
      'một cái bàn cũ, vài cuốn sách kê màn hình, và một chiếc đèn đủ sáng, vậy là đủ để bắt đầu.',
      'mình tin thói quen ngồi vào bàn mỗi ngày quan trọng hơn việc cái bàn đó đắt hay rẻ.',
      'khi nào thật sự cần nâng cấp, mình sẽ biết, vì lúc đó chính công việc sẽ đòi hỏi điều đó.',
    ],
    date: '2026-05-28',
    tag: 'thiết kế',
    media: {
      type: 'image',
      items: [
        'https://images.unsplash.com/photo-1590212151175-e58edd96185b?auto=format&fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1519217651866-847339e674d4?auto=format&fit=crop&w=1200&q=80',
      ],
    },
    likes: 7,
    comments: [
      { name: 'Nam', text: 'góc làm việc nhìn ấm cúng ghê' },
    ],
  },
];

export const THEMES = {
  light: {
    bg: '#FFFFFF',
    surface: '#FAFAFA',
    text: '#141B2A',
    muted: '#5B6478',
    accent: '#A8650F',
    border: '#E4E4E7',
  },
  dark: {
    bg: '#121A2B',
    surface: '#1B2540',
    text: '#EBE7DE',
    muted: '#9AA6BC',
    accent: '#E7AC4E',
    border: '#26314A',
  },
};

export function formatDate(dateStr) {
  if (!dateStr) return '';
  const cleanStr = String(dateStr).split(' ')[0];
  const d = new Date(cleanStr.includes('T') ? cleanStr : cleanStr + 'T00:00:00');
  if (isNaN(d.getTime())) return cleanStr;
  return `${d.getDate()} thg ${d.getMonth() + 1}`;
}
