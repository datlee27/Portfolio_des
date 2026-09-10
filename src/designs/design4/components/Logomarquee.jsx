'use client';
import React, { useEffect, useMemo } from 'react';

// ─── Authentic Vector SVG Logos for Dat Lee's Real Tech Stack ───

// 1. React Logo (from user snippet)
const ReactLogo = () => (
  <svg viewBox="175.7 78 490.6 436.9" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <g fill="currentColor">
      <path d="m666.3 296.5c0-32.5-40.7-63.3-103.1-82.4 14.4-63.6 8-114.2-20.2-130.4-6.5-3.8-14.1-5.6-22.4-5.6v22.3c4.6 0 8.3.9 11.4 2.6 13.6 7.8 19.5 37.5 14.9 75.7-1.1 9.4-2.9 19.3-5.1 29.4-19.6-4.8-41-8.5-63.5-10.9-13.5-18.5-27.5-35.3-41.6-50 32.6-30.3 63.2-46.9 84-46.9v-22.3c-27.5 0-63.5 19.6-99.9 53.6-36.4-33.8-72.4-53.2-99.9-53.2v22.3c20.7 0 51.4 16.5 84 46.6-14 14.7-28 31.4-41.3 49.9-22.6 2.4-44 6.1-63.6 11-2.3-10-4-19.7-5.2-29-4.7-38.2 1.1-67.9 14.6-75.8 3-1.8 6.9-2.6 11.5-2.6v-22.3c-8.4 0-16 1.8-22.6 5.6-28.1 16.2-34.4 66.7-19.9 130.1-62.2 19.2-102.7 49.9-102.7 82.3 0 32.5 40.7 63.3 103.1 82.4-14.4 63.6-8 114.2 20.2 130.4 6.5 3.8 14.1 5.6 22.5 5.6 27.5 0 63.5-19.6 99.9-53.6 36.4 33.8 72.4 53.2 99.9 53.2 8.4 0 16-1.8 22.6-5.6 28.1-16.2 34.4-66.7 19.9-130.1 62-19.1 102.5-49.9 102.5-82.3zm-130.2-66.7c-3.7 12.9-8.3 26.2-13.5 39.5-4.1-8-8.4-16-13.1-24-4.6-8-9.5-15.8-14.4-23.4 14.2 2.1 27.9 4.7 41 7.9zm-45.8 106.5c-7.8 13.5-15.8 26.3-24.1 38.2-14.9 1.3-30 2-45.2 2-15.1 0-30.2-.7-45-1.9-8.3-11.9-16.4-24.6-24.2-38-7.6-13.1-14.5-26.4-20.8-39.8 6.2-13.4 13.2-26.8 20.7-39.9 7.8-13.5 15.8-26.3 24.1-38.2 14.9-1.3 30-2 45.2-2 15.1 0 30.2.7 45 1.9 8.3 11.9 16.4 24.6 24.2 38 7.6 13.1 14.5 26.4 20.8 39.8-6.3 13.4-13.2 26.8-20.7 39.9zm32.3-13c5.4 13.4 10 26.8 13.8 39.8-13.1 3.2-26.9 5.9-41.2 8 4.9-7.7 9.8-15.6 14.4-23.7 4.6-8 8.9-16.1 13-24.1zm-101.4 106.7c-9.3-9.6-18.6-20.3-27.8-32 9 .4 18.2.7 27.5.7 9.4 0 18.7-.2 27.8-.7-9 11.7-18.3 22.4-27.5 32zm-74.4-58.9c-14.2-2.1-27.9-4.7-41-7.9 3.7-12.9 8.3-26.2 13.5-39.5 4.1 8 8.4 16 13.1 24s9.5 15.8 14.4 23.4zm73.9-208.1c9.3 9.6 18.6 20.3 27.8 32-9-.4-18.2-.7-27.5-.7-9.4 0-18.7.2-27.8.7 9-11.7 18.3-22.4 27.5-32zm-74 58.9c-4.9 7.7-9.8 15.6-14.4 23.7-4.6 8-8.9 16-13 24-5.4-13.4-10-26.8-13.8-39.8 13.1-3.1 26.9-5.8 41.2-7.9zm-90.5 125.2c-35.4-15.1-58.3-34.9-58.3-50.6s22.9-35.6 58.3-50.6c8.6-3.7 18-7 27.7-10.1 5.7 19.6 13.2 40 22.5 60.9-9.2 20.8-16.6 41.1-22.2 60.6-9.9-3.1-19.3-6.5-28-10.2zm53.8 142.9c-13.6-7.8-19.5-37.5-14.9-75.7 1.1-9.4 2.9-19.3 5.1-29.4 19.6 4.8 41 8.5 63.5 10.9 13.5 18.5 27.5 35.3 41.6 50-32.6 30.3-63.2 46.9-84 46.9-4.5-.1-8.3-1-11.3-2.7zm237.2-76.2c4.7 38.2-1.1 67.9-14.6 75.8-3 1.8-6.9 2.6-11.5 2.6-20.7 0-51.4-16.5-84-46.6 14-14.7 28-31.4 41.3-49.9 22.6-2.4 44-6.1 63.6-11 2.3 10.1 4.1 19.8 5.2 29.1zm38.5-66.7c-8.6 3.7-18 7-27.7 10.1-5.7-19.6-13.2-40-22.5-60.9 9.2-20.8 16.6-41.1 22.2-60.6 9.9 3.1 19.3 6.5 28.1 10.2 35.4 15.1 58.3 34.9 58.3 50.6-.1 15.7-23 35.6-58.4 50.6z"></path>
      <circle cx="420.9" cy="296.5" r="45.7"></circle>
    </g>
  </svg>
);

// 2. TypeScript Logo (from user snippet)
const TSLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M0 32v32h64.002V-.002H0zm51.577-2.55c1.625.406 2.865 1.128 4.003 2.306.59.63 1.463 1.778 1.534 2.052.02.08-2.763 1.95-4.45 2.997-.06.04-.305-.223-.58-.63-.823-1.2-1.686-1.717-3.007-1.808-1.94-.132-3.2.884-3.18 2.58 0 .498.07.792.274 1.2.427.884 1.22 1.412 3.708 2.49 4.582 1.97 6.542 3.27 7.76 5.12 1.36 2.062 1.666 5.354.742 7.802-1.016 2.662-3.535 4.47-7.08 5.07-1.097.193-3.698.163-4.876-.05-2.57-.457-5.008-1.727-6.512-3.393-.59-.65-1.737-2.347-1.666-2.47.03-.04.295-.203.59-.376l2.377-1.37 1.84-1.067.386.57c.538.823 1.717 1.95 2.428 2.326 2.042 1.077 4.846.924 6.227-.315.59-.538.833-1.097.833-1.92 0-.742-.09-1.067-.477-1.625-.498-.71-1.514-1.31-4.4-2.56-3.302-1.422-4.724-2.306-6.024-3.708-.752-.813-1.463-2.113-1.758-3.2-.244-.904-.305-3.17-.112-4.084.68-3.2 3.088-5.415 6.563-6.075 1.128-.213 3.75-.132 4.856.142zM36.552 32.12l.02 2.62h-8.33v23.67H22.35v-23.67h-8.33v-2.57l.07-2.64c.03-.04 5.1-.06 11.246-.05l11.185.03z" fill="currentColor"></path>
  </svg>
);

// 3. JavaScript Logo (from user snippet)
const JSLogo = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <rect x="5.5" y="5.5" fill="rgba(0,0,0,.15)" width="489" height="489" rx="36"></rect>
    <path fill="currentColor" d="M454.478 377.875c-3.58-22.312-18.128-41.045-61.218-58.522-14.967-6.88-31.654-11.806-36.628-23.147-1.767-6.602-1.999-10.319-.883-14.318 3.208-12.968 18.686-17.012 30.958-13.293 7.902 2.648 15.386 8.739 19.895 18.453 21.104-13.666 21.056-13.572 35.792-22.963-5.393-8.366-8.275-12.225-11.807-15.804-12.69-14.177-29.981-21.475-57.639-20.917-4.788.604-9.622 1.255-14.41 1.86-13.805 3.486-26.96 10.737-34.676 20.452-23.149 26.264-16.547 72.234 11.621 91.153 27.75 20.824 68.517 25.565 73.722 45.042 5.067 23.845-17.524 31.561-39.975 28.819-16.548-3.439-25.752-11.854-35.7-27.146-18.313 10.598-18.313 10.598-37.139 21.428 4.462 9.762 9.157 14.178 16.641 22.637 35.42 35.931 124.063 34.166 139.959-20.22.651-1.859 4.927-14.317 1.487-33.514zm-183.142-147.63h-45.74l-.186 118.252c0 25.147 1.302 48.203-2.789 55.27-6.694 13.897-24.032 12.178-31.935 9.481-8.042-3.951-12.132-9.575-16.873-17.523-1.301-2.278-2.278-4.044-2.604-4.184-12.411 7.576-24.775 15.2-37.187 22.776 6.182 12.69 15.293 23.707 26.96 30.864 17.432 10.458 40.858 13.666 65.355 8.041 15.943-4.647 29.703-14.27 36.907-28.911 10.412-19.198 8.181-42.439 8.088-68.145.236-41.927.004-83.854.004-125.921z"></path>
  </svg>
);

// 4. Tailwind CSS Logo (from user snippet)
const TailwindLogo = () => (
  <svg viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M489.5 226.499C328 231.632 280 346.999 269 409.499C283.333 386.332 328.5 335.5 395 335.5C472.5 335.5 531.5 422 567.5 449C611.237 481.803 699.123 525.115 814.5 490C906.5 462 949.167 364.332 958.5 317.999C914 378.499 846.5 414.838 763 371.999C705.5 342.499 662.5 221 489.5 226.499Z" fill="currentColor"></path>
    <path d="M261 500.999C99.5 506.132 51.5 621.499 40.5 683.999C54.8333 660.832 100 610 166.5 610C244 610 303 696.5 339 723.5C382.737 756.303 470.623 799.615 586 764.5C678 736.5 720.667 638.832 730 592.499C685.5 652.999 618 689.338 534.5 646.499C477 616.999 434 495.5 261 500.999Z" fill="currentColor"></path>
  </svg>
);

// 5. Vite Logo
const ViteLogo = () => (
  <svg viewBox="0 0 410 404" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.074 395.378 198.219 388.618L10.5842 59.5554C6.38087 52.1896 12.6802 43.2665 21.0281 44.7554L206.186 77.7774C207.399 77.9938 208.641 77.9897 209.852 77.7654L389.305 44.5372C397.637 42.9943 403.907 51.8603 399.641 59.5246Z" fill="url(#vite-grad-1)"/>
    <path d="M285.556 12.2988L156.402 189.605C154.512 192.201 156.096 195.845 159.278 196.257L213.791 203.322C217.472 203.799 219.824 207.604 218.423 210.999L181.085 301.528C179.351 305.733 184.343 309.288 187.674 306.196L311.238 191.439C313.742 189.114 312.355 184.974 309.006 184.619L257.653 179.172C254.081 178.793 251.87 175.056 253.228 171.706L293.447 72.4844C294.945 68.7901 290.722 65.1764 287.411 67.4473L285.556 12.2988Z" fill="url(#vite-grad-2)"/>
    <defs>
      <linearGradient id="vite-grad-1" x1="25.5" y1="11" x2="384" y2="397.5" gradientUnits="userSpaceOnUse">
        <stop stopColor="#41D1FF"/>
        <stop offset="1" stopColor="#BD34FE"/>
      </linearGradient>
      <linearGradient id="vite-grad-2" x1="150" y1="50" x2="280" y2="300" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFEA83"/>
        <stop offset="0.0833333" stopColor="#FFDD35"/>
        <stop offset="1" stopColor="#FFA800"/>
      </linearGradient>
    </defs>
  </svg>
);

// 6. HTML5 Logo
const HTML5Logo = () => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path fill="#E34F26" d="M71,460 L30,0 481,0 440,460 255,512"/>
    <path fill="#EF652A" d="M256,472 L407,430 440,61 256,61"/>
    <path fill="#EBEBEB" d="M256,208 L181,208 176,150 256,150 256,94 255,94 114,94 128,264 256,264 z M256,386 L255,386 192,369 188,322 133,322 140,402 255,434 256,434 z"/>
    <path fill="#FFFFFF" d="M255,208 L255,264 324,264 318,335 255,352 255,408 368,377 379,264 380,250 393,105 255,105 255,161 336,161 332,208 z"/>
  </svg>
);

// 7. CSS3 Logo
const CSS3Logo = () => (
  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path fill="#1572B6" d="M71,460 L30,0 481,0 440,460 255,512"/>
    <path fill="#33A9DC" d="M256,472 L407,430 440,61 256,61"/>
    <path fill="#EBEBEB" d="M256,208 L181,208 176,150 256,150 256,94 114,94 128,264 256,264 z M256,386 L192,369 188,322 133,322 140,402 255,434 z"/>
    <path fill="#FFFFFF" d="M255,208 L329,208 322,286 255,304 255,360 351,334 362,208 368,141 373,94 255,94 255,150 336,150 332,197 255,197 z M255,408 L368,377 370,352 255,386 z"/>
  </svg>
);

// 8. Figma Logo
const FigmaLogo = () => (
  <svg viewBox="0 0 38 57" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M19 28.5C19 23.2533 23.2533 19 28.5 19C33.7467 19 38 23.2533 38 28.5C38 33.7467 33.7467 38 28.5 38C23.2533 38 19 33.7467 19 28.5Z" fill="#1ABCFE"/>
    <path d="M0 47.5C0 42.2533 4.25329 38 9.5 38H19V47.5C19 52.7467 14.7467 57 9.5 57C4.25329 57 0 52.7467 0 47.5Z" fill="#0ACF83"/>
    <path d="M19 0V19H28.5C33.7467 19 38 14.7467 38 9.5C38 4.25329 33.7467 0 28.5 0H19Z" fill="#FF7262"/>
    <path d="M0 9.5C0 14.7467 4.25329 19 9.5 19H19V0H9.5C4.25329 0 0 4.25329 0 9.5Z" fill="#F24E1E"/>
    <path d="M0 28.5C0 33.7467 4.25329 38 9.5 38H19V19H9.5C4.25329 19 0 23.2533 0 28.5Z" fill="#A259FF"/>
  </svg>
);

// 9. Bootstrap Logo
const BootstrapLogo = () => (
  <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M416 0H96C42.98 0 0 42.98 0 96v320c0 53.02 42.98 96 96 96h320c53.02 0 96-42.98 96-96V96c0-53.02-42.98-96-96-96z" fill="#7952B3"/>
    <path d="M309.8 288.7c22.1-13.3 35.8-36.9 35.8-62.4 0-48.4-38.3-75.1-99.3-75.1H147v210.8h105.8c58.7 0 96.6-26.3 96.6-73.3 0-29.3-15.6-54.6-39.6-66.2zm-113.6-92.4h49.6c31 0 49.3 11.5 49.3 35.7 0 24.5-18.7 36.3-49.3 36.3h-49.6v-72zm58.1 161.7h-58.1v-74.9h58.1c34.9 0 56.4 12.1 56.4 37.4 0 25.4-21.5 37.5-56.4 37.5z" fill="#FFFFFF"/>
  </svg>
);

// 10. Java Logo
const JavaLogo = () => (
  <svg viewBox="0 0 384 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M277.7 329.9c48.3-4.5 90.6-26.2 90.6-53.7 0-30.8-54.3-56.5-121.7-56.5-70.1 0-126.9 27.5-126.9 61.4 0 24.3 30.5 44.5 73.1 52.4l-4.4 31.9C92.2 355.2 0 327.4 0 268.4c0-78.2 93.9-122.9 214.3-122.9 123.6 0 169.7 51.1 169.7 99.4 0 49.1-47.5 86.8-106.3 99.6l0-14.6zm-127.3-80.4c0-12.7 7.7-24.8 20.4-34.8 19.3-15.3 47.9-23.7 77.2-23.7 46.2 0 83.2 20.2 83.2 45.4 0 11.2-6.5 21.9-17.7 30.8-18.5 14.8-45.7 23.3-73.8 23.3-48.4 0-89.3-19.8-89.3-41zm212.7 131.6c-4.4 2.2-9 4.3-13.8 6.2-31.9 12.8-77.9 19.9-128.4 19.9-52.6 0-99.8-7.5-131.8-21-4.2-1.8-8.2-3.7-12-5.7l-9.6 30.8c12.2 6.5 26 12.1 41.2 16.7 34.6 10.4 75.9 15.9 119.5 15.9 44.5 0 86.6-5.7 121.7-16.4 14.6-4.4 27.9-9.8 39.5-16l-26.3-30.4z"/>
  </svg>
);

// 11. Spring Boot Logo
const SpringLogo = () => (
  <svg viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M228.3 116.8L139.7 28.2c-6.6-6.6-17.3-6.6-23.9 0L27.2 116.8c-6.6 6.6-6.6 17.3 0 23.9l88.6 88.6c6.6 6.6 17.3 6.6 23.9 0l88.6-88.6c6.6-6.6 6.6-17.3 0-23.9zm-97.7 77c-36.4 7.6-70.2-19.4-71.1-56.1-.9-35.8 28.4-66.7 64.6-67.6 19.3-.5 37.1 7.2 50.1 20.3-6.8 5.7-16.1 9.9-27.1 11.2-22.1 2.6-40.4 17.5-44.5 38.3-4.5 22.8 9.5 45.1 32 50.9 9.3 2.4 18.2 1.5 26.2-1.8-8 15.6-18.7 2.4-30.2 4.8zm39.6-43.5c-4.1 20.8-22.4 35.7-44.5 38.3-11 1.3-20.3 5.5-27.1 11.2 13 13.1 30.8 20.8 50.1 20.3 36.2-.9 65.5-31.8 64.6-67.6-.9-36.7-34.7-63.7-71.1-56.1-11.5 2.4-22.2-10.8-30.2 4.8 8-3.3 16.9-4.2 26.2-1.8 22.5 5.8 36.5 28.1 32 50.9z"/>
  </svg>
);

// 12. MySQL Logo
const MySQLLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M16.96 15.17c-.36-.08-.73-.13-1.11-.16.27-.47.45-.99.53-1.54.08-.55.04-1.12-.13-1.65-.24-.76-.73-1.42-1.39-1.89s-1.45-.73-2.27-.77c-.82-.04-1.63.14-2.34.52s-1.3 1-1.67 1.74c-.26.51-.39 1.08-.39 1.66s.13 1.15.39 1.66c-.38.03-.75.08-1.11.16-1.1.25-2.07.82-2.81 1.63-.74.81-1.18 1.84-1.27 2.94-.09 1.1.18 2.2.77 3.12.59.92 1.45 1.63 2.47 2.03 1.02.4 2.14.47 3.2.2.85-.22 1.63-.67 2.25-1.28.62.61 1.4 1.06 2.25 1.28 1.06.27 2.18.2 3.2-.2 1.02-.4 1.88-1.11 2.47-2.03.59-.92.86-2.02.77-3.12-.09-1.1-.53-2.13-1.27-2.94-.74-.81-1.71-1.38-2.81-1.63v-.14zM12 12.87c.46 0 .91.13 1.3.37.39.24.7.59.89 1.01.19.42.24.89.15 1.34-.09.45-.31.86-.64 1.18-.32.32-.73.54-1.18.63-.45.09-.92.04-1.34-.15-.42-.19-.77-.5-1.01-.89-.24-.39-.37-.84-.37-1.3 0-.58.23-1.14.64-1.55.41-.41.97-.64 1.56-.64z"/>
  </svg>
);

// 13. C# (.NET) Logo
const CSharpLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M12 1.5L2.25 7.13v11.24L12 24l9.75-5.63V7.13L12 1.5zm6.75 15.65L12 21.17l-6.75-3.9V8.48L12 4.58l6.75 3.9v8.67zM11.2 9.2h-1.6c-1.3 0-2.4 1.1-2.4 2.4v.8c0 1.3 1.1 2.4 2.4 2.4h1.6c.7 0 1.3-.3 1.7-.8l1.1 1.1c-.7.8-1.7 1.3-2.8 1.3h-1.6c-2.2 0-4-1.8-4-4v-.8c0-2.2 1.8-4 4-4h1.6c1.1 0 2.1.5 2.8 1.3l-1.1 1.1c-.4-.5-1-.8-1.7-.8zm4.3 2.1h1v-1.2h1.2v1.2h.9v1.2h-.9v1.1h.9v1.2h-.9v1.2h-1.2v-1.2h-1v1.2h-1.2v-1.2h-.9v-1.2h.9v-1.1h-.9v-1.2h.9v-1.2h1.2v1.2zm1 2.3v-1.1h-1v1.1h1z"/>
  </svg>
);

// 14. RESTful API Logo
const RestApiLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2"/>
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2"/>
    <line x1="6" y1="6" x2="6.01" y2="6"/>
    <line x1="6" y1="18" x2="6.01" y2="18"/>
    <path d="M14 6h4"/>
    <path d="M14 18h4"/>
  </svg>
);

// 15. Swagger Logo
const SwaggerLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <circle cx="12" cy="12" r="10" fill="#85EA2D"/>
    <path d="M7.2 10.3c0-1.4 1.1-2.5 2.5-2.5h1.2v1.5H9.7c-.6 0-1 .4-1 1v.7c0 .6.4 1 1 1h.3v1.5h-.3c-.6 0-1 .4-1 1v.7c0 .6.4 1 1 1h1.2V17H9.7c-1.4 0-2.5-1.1-2.5-2.5v-.5c0-.6-.4-1-1-1v-1.4c.6 0 1-.4 1-1v-.3zm9.6 0c0-1.4-1.1-2.5-2.5-2.5h-1.2v1.5h1.2c.6 0 1 .4 1 1v.7c0 .6-.4 1-1 1h-.3v1.5h.3c.6 0 1 .4 1 1v.7c0 .6-.4 1-1 1h-1.2V17h1.2c1.4 0 2.5-1.1 2.5-2.5v-.5c0-.6.4-1 1-1v-1.4c-.6 0-1-.4-1-1v-.3z" fill="#090a0f"/>
  </svg>
);

// 16. Git Logo
const GitLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M21.62 10.56L13.44 2.38a2.12 2.12 0 0 0-3 0L8.4 4.43l3.22 3.22a2.52 2.52 0 0 1 3.18 3.19l3.1 3.1a2.5 2.5 0 1 1-1.5 1.5l-3-3a2.5 2.5 0 0 1-3.15-3.15L7 6.07l-4.62 4.62a2.12 2.12 0 0 0 0 3l8.18 8.18a2.12 2.12 0 0 0 3 0l8.06-8.06a2.12 2.12 0 0 0 0-3.25zM15.5 19a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm-3.5-7a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5z"/>
  </svg>
);

// 17. Arduino Logo
const ArduinoLogo = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M7.4 6.5C3.3 6.5 0 9 0 12s3.3 5.5 7.4 5.5c2.3 0 4.4-.8 5.8-2.2 1.4 1.4 3.5 2.2 5.8 2.2 4.1 0 7.4-2.5 7.4-5.5s-3.3-5.5-7.4-5.5c-2.3 0-4.4.8-5.8 2.2-1.4-1.4-3.5-2.2-5.8-2.2zm0 1.8c2.9 0 5.2 1.7 5.2 3.7s-2.3 3.7-5.2 3.7S2.2 14 2.2 12s2.3-3.7 5.2-3.7zm10.2 0c2.9 0 5.2 1.7 5.2 3.7s-2.3 3.7-5.2 3.7-5.2-1.7-5.2-3.7 2.3-3.7 5.2-3.7zM5 11.2h4.8v1.6H5v-1.6zm11.8-2.4h1.6v2.4h2.4v1.6h-2.4v2.4h-1.6v-2.4h-2.4v-1.6h2.4V8.8z"/>
  </svg>
);

// 18. LM Studio / AI Logo
const AILogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <path d="M12 2a4 4 0 0 1 4 4c0 1.2-.5 2.2-1.3 2.9l1.8 1.8A4 4 0 0 1 20 14a4 4 0 0 1-4 4l-1.5-1.5a4 4 0 0 1-5 0L8 18a4 4 0 0 1-4-4c0-1.5.8-2.8 2-3.5L7.8 8.7A4 4 0 0 1 6 6a4 4 0 0 1 6-3.5V2z"/>
    <circle cx="12" cy="12" r="2" fill="currentColor"/>
  </svg>
);

// 19. Hardware / Sensors Logo
const SensorsLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" style={{ width: '100%', height: '100%' }}>
    <rect x="4" y="4" width="16" height="16" rx="2"/>
    <rect x="9" y="9" width="6" height="6"/>
    <line x1="9" y1="1" x2="9" y2="4"/>
    <line x1="15" y1="1" x2="15" y2="4"/>
    <line x1="9" y1="20" x2="9" y2="23"/>
    <line x1="15" y1="20" x2="15" y2="23"/>
    <line x1="20" y1="9" x2="23" y2="9"/>
    <line x1="20" y1="14" x2="23" y2="14"/>
    <line x1="1" y1="9" x2="4" y2="9"/>
    <line x1="1" y1="14" x2="4" y2="14"/>
  </svg>
);

// ─── Dat Lee's Actual Skills Datasets ───

// Row 1: Frontend, Modern Web & Visual Tools (9 items)
const logos1 = [
  { id: 1, name: 'React', category: 'WEB DEV', color: '#61dafb', component: <ReactLogo /> },
  { id: 2, name: 'TypeScript', category: 'WEB DEV', color: '#3178c6', component: <TSLogo /> },
  { id: 3, name: 'JavaScript', category: 'WEB DEV', color: '#f7df1e', component: <JSLogo /> },
  { id: 4, name: 'Tailwind CSS', category: 'WEB DEV', color: '#38bdf8', component: <TailwindLogo /> },
  { id: 5, name: 'Vite', category: 'TOOLS', color: '#bd34fe', component: <ViteLogo /> },
  { id: 6, name: 'HTML5', category: 'WEB DEV', color: '#e34f26', component: <HTML5Logo /> },
  { id: 7, name: 'CSS3', category: 'WEB DEV', color: '#1572b6', component: <CSS3Logo /> },
  { id: 8, name: 'Figma', category: 'AI & DESIGN', color: '#f24e1e', component: <FigmaLogo /> },
  { id: 9, name: 'Bootstrap', category: 'TOOLS', color: '#7952b3', component: <BootstrapLogo /> },
];

// Row 2: Backend, Database, Hardware & Systems (10 items)
const logos2 = [
  { id: 10, name: 'Java', category: 'WEB DEV', color: '#f89820', component: <JavaLogo /> },
  { id: 11, name: 'Spring Boot', category: 'WEB DEV', color: '#6db33f', component: <SpringLogo /> },
  { id: 12, name: 'MySQL (SQL)', category: 'DATA & API', color: '#00758f', component: <MySQLLogo /> },
  { id: 13, name: 'C# (.NET)', category: 'WEB DEV', color: '#9b4993', component: <CSharpLogo /> },
  { id: 14, name: 'RESTful API', category: 'DATA & API', color: '#25ff8d', component: <RestApiLogo /> },
  { id: 15, name: 'Swagger', category: 'DATA & API', color: '#85ea2d', component: <SwaggerLogo /> },
  { id: 16, name: 'Git', category: 'TOOLS', color: '#f05032', component: <GitLogo /> },
  { id: 17, name: 'Arduino', category: 'HARDWARE (IOT)', color: '#00979d', component: <ArduinoLogo /> },
  { id: 18, name: 'LM Studio / AI', category: 'AI & DESIGN', color: '#a259ff', component: <AILogo /> },
  { id: 19, name: 'Sensors & IoT', category: 'HARDWARE (IOT)', color: '#25ff8d', component: <SensorsLogo /> },
];

// Combine all for category filtering
const allSkillsList = [...logos1, ...logos2];

const PRESET_ICONS = {
  react: { color: '#61dafb', component: <ReactLogo /> },
  typescript: { color: '#3178c6', component: <TSLogo /> },
  ts: { color: '#3178c6', component: <TSLogo /> },
  javascript: { color: '#f7df1e', component: <JSLogo /> },
  js: { color: '#f7df1e', component: <JSLogo /> },
  tailwind: { color: '#38bdf8', component: <TailwindLogo /> },
  'tailwind css': { color: '#38bdf8', component: <TailwindLogo /> },
  vite: { color: '#bd34fe', component: <ViteLogo /> },
  html: { color: '#e34f26', component: <HTML5Logo /> },
  html5: { color: '#e34f26', component: <HTML5Logo /> },
  css: { color: '#1572b6', component: <CSS3Logo /> },
  css3: { color: '#1572b6', component: <CSS3Logo /> },
  figma: { color: '#f24e1e', component: <FigmaLogo /> },
  bootstrap: { color: '#7952b3', component: <BootstrapLogo /> },
  java: { color: '#f89820', component: <JavaLogo /> },
  spring: { color: '#6db33f', component: <SpringLogo /> },
  'spring boot': { color: '#6db33f', component: <SpringLogo /> },
  sql: { color: '#00758f', component: <MySQLLogo /> },
  mysql: { color: '#00758f', component: <MySQLLogo /> },
  'c#': { color: '#9b4993', component: <CSharpLogo /> },
  csharp: { color: '#9b4993', component: <CSharpLogo /> },
  restful: { color: '#25ff8d', component: <RestApiLogo /> },
  'restful api': { color: '#25ff8d', component: <RestApiLogo /> },
  swagger: { color: '#85ea2d', component: <SwaggerLogo /> },
  git: { color: '#f05032', component: <GitLogo /> },
  arduino: { color: '#00979d', component: <ArduinoLogo /> },
  'lm studio': { color: '#a259ff', component: <AILogo /> },
  ai: { color: '#a259ff', component: <AILogo /> },
  sensors: { color: '#25ff8d', component: <SensorsLogo /> },
  motors: { color: '#fe3c01', component: <SensorsLogo /> },
};

const GenericSkillLogo = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ width: '100%', height: '100%' }}>
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
);

const getCategoryColor = (cat = '') => {
  const c = cat.toUpperCase();
  if (c.includes('WEB')) return '#61dafb';
  if (c.includes('DATA') || c.includes('API')) return '#00758f';
  if (c.includes('AI') || c.includes('DESIGN')) return '#a259ff';
  if (c.includes('HARDWARE') || c.includes('IOT')) return '#00979d';
  if (c.includes('TOOL')) return '#bd34fe';
  return '#fe3c01';
};

/**
 * Logomarquee component with dual-track infinite marquee
 * Matching the exact card shape, aspect ratio (1 / 1.2), mask gradient, and forward/reverse speeds.
 */
function Logomarquee({ activeCategory = 'ALL', currentSkills = null, onLogoHover = () => {} }) {
  // Inject mathematical keyframes for smooth, infinite, subpixel-precise loop
  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'd4-marquee-keyframes';
    styleSheet.innerText = `
      @keyframes marquee-move {
        0% {
          transform: translate3d(0, 0, 0);
        }
        100% {
          transform: translate3d(-50%, 0, 0);
        }
      }
      .d4-marquee-card-item {
        transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1),
                    border-color 0.28s ease,
                    box-shadow 0.28s ease,
                    background 0.28s ease;
      }
      .d4-marquee-card-item:hover {
        transform: translateY(-5px) scale(1.05) !important;
        background: rgba(255, 255, 255, 0.12) !important;
      }
      .d4-marquee-track-container:hover .d4-marquee-animated-track {
        animation-play-state: paused !important;
      }
    `;
    document.head.appendChild(styleSheet);
    return () => {
      const el = document.getElementById('d4-marquee-keyframes');
      if (el) document.head.removeChild(el);
    };
  }, []);

  // Dynamically resolve skills dataset from currentSkills or fallback
  const dynamicSkillsList = useMemo(() => {
    if (!currentSkills || !Array.isArray(currentSkills) || currentSkills.length === 0) {
      return allSkillsList;
    }
    const list = [];
    let idCounter = 100;
    currentSkills.forEach((catObj) => {
      const catName = catObj.category || 'GENERAL';
      const items = Array.isArray(catObj.items) ? catObj.items : [];
      items.forEach((item) => {
        const name = String(item).trim();
        if (!name) return;
        const key = name.toLowerCase();
        const preset = PRESET_ICONS[key] || PRESET_ICONS[key.replace(/\s+/g, '')];
        list.push({
          id: idCounter++,
          name,
          category: catName,
          color: preset ? preset.color : getCategoryColor(catName),
          component: preset ? preset.component : <GenericSkillLogo />,
        });
      });
    });
    return list.length > 0 ? list : allSkillsList;
  }, [currentSkills]);

  // Filter skills by selected category if user clicked a filter pill
  const { filteredRow1, filteredRow2 } = useMemo(() => {
    const listToFilter = dynamicSkillsList;
    let matches = listToFilter;

    if (activeCategory && activeCategory !== 'ALL') {
      matches = listToFilter.filter(
        (s) => s.category.trim().toUpperCase() === activeCategory.trim().toUpperCase()
      );
    }

    if (matches.length === 0) {
      matches = listToFilter;
    }

    // Ensure we have enough items to maintain continuous marquee without gaps
    const ensureCount = (arr, min = 6) => {
      if (!arr || arr.length === 0) return listToFilter;
      let res = [...arr];
      while (res.length < min) {
        res = [...res, ...arr];
      }
      return res;
    };

    const half = Math.ceil(matches.length / 2);
    const r1 = matches.slice(0, half);
    const r2 = matches.slice(half).length > 0 ? matches.slice(half) : matches;

    return {
      filteredRow1: ensureCount(r1),
      filteredRow2: ensureCount(r2),
    };
  }, [activeCategory, dynamicSkillsList]);

  const Marquee = ({ logos, direction = 'forwards' }) => {
    const numItems = logos.length;
    const speed = '26s';
    const itemWidth = '120px';
    const itemGap = '25px';

    return (
      <div
        className="d4-marquee-track-container max-w-full overflow-hidden"
        style={{
          width: '100%',
          overflow: 'hidden',
          padding: '8px 0',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)',
          maskImage:
            'linear-gradient(to right, transparent, black 3rem, black calc(100% - 3rem), transparent)',
          '--speed': speed,
          '--numItems': numItems,
          '--item-width': itemWidth,
          '--item-gap': itemGap,
          '--direction': direction,
        }}
      >
        <div
          className="d4-marquee-animated-track w-max flex"
          style={{
            display: 'flex',
            width: 'max-content',
            animation: `marquee-move var(--speed) linear infinite ${direction}`,
            willChange: 'transform',
          }}
        >
          {/* Double the list for mathematically seamless infinite scroll */}
          {[...logos, ...logos].map((logo, index) => {
            const cardColor = logo.color || '#fe3c01';
            return (
              <div
                key={`${logo.name || logo.id}-${index}`}
                className="d4-marquee-card-item flex-shrink-0 flex flex-col justify-center items-center bg-white/10 border border-black rounded-2xl text-white"
                style={{
                  width: 'var(--item-width)',
                  aspectRatio: '1 / 1.2',
                  marginRight: 'var(--item-gap)',
                  borderRadius: '18px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1.5px solid rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                  cursor: 'pointer',
                  padding: '16px 12px 14px',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  boxSizing: 'border-box',
                }}
                onMouseEnter={(e) => {
                  onLogoHover(logo);
                  e.currentTarget.style.borderColor = cardColor;
                  e.currentTarget.style.boxShadow = `0 10px 28px ${cardColor}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Subtle radial glow in brand color */}
                <div
                  style={{
                    position: 'absolute',
                    top: '-15%',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '70%',
                    height: '70%',
                    background: `radial-gradient(circle, ${cardColor}28 0%, transparent 70%)`,
                    filter: 'blur(10px)',
                    pointerEvents: 'none',
                  }}
                />

                {/* SVG Logo Container (w-3/5 h-auto) */}
                <div
                  className="w-3/5 h-auto"
                  style={{
                    width: '56%',
                    height: 'auto',
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: cardColor,
                    filter: `drop-shadow(0 2px 8px ${cardColor}50)`,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  {logo.component}
                </div>

                {/* Skill Name & Domain Tag */}
                <div
                  style={{
                    marginTop: 10,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 3,
                    position: 'relative',
                    zIndex: 2,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-outfit)',
                      fontSize: 12,
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '-0.01em',
                      lineHeight: 1.1,
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {logo.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: 8.5,
                      fontWeight: 600,
                      color: cardColor,
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase',
                      opacity: 0.9,
                    }}
                  >
                    {logo.category}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div
      className="items-center overflow-hidden"
      style={{
        width: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div
        className="w-full max-w-6xl flex flex-col gap-y-6"
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '24px',
        }}
      >
        <Marquee logos={filteredRow1} direction="forwards" />
        <Marquee logos={filteredRow2} direction="reverse" />
      </div>
    </div>
  );
}

export default Logomarquee;
