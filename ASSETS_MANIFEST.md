# Asset Manifest & Download Instructions

## Project: Portfolio Home Page React Recreation (Creatie®)

All assets must be saved locally under the `public/assets/` directory before building or running the project in standalone mode.

### 1. Download Script Instructions
Run the following Node.js script to download all 18 remote Framer assets directly into `public/assets/`:

```bash
node -e "
const fs = require('fs');
const path = require('path');
const https = require('https');

const manifest = JSON.parse(fs.readFileSync('./public/assets/asset_manifest.json', 'utf8'));
const destDir = path.join(process.cwd(), 'public', 'assets');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

async function download() {
  for (const item of manifest.assets) {
    const filename = path.basename(item.remoteUrl);
    const dest = path.join(destDir, filename);
    await new Promise((resolve) => {
      https.get(item.remoteUrl, (res) => {
        if (res.statusCode !== 200) {
          console.error('Failed ' + item.remoteUrl + ' (' + res.statusCode + ')');
          return resolve();
        }
        const fileStream = fs.createWriteStream(dest);
        res.pipe(fileStream);
        fileStream.on('finish', () => {
          fileStream.close();
          console.log('Saved: ' + filename);
          resolve();
        });
      }).on('error', (err) => {
        console.error('Error on ' + item.remoteUrl, err);
        resolve();
      });
    });
  }
}
download();
"
```

---

### 2. Complete Asset Catalog

| Asset ID | Local File Path | Resolution | Description & Usage |
| :--- | :--- | :--- | :--- |
| `hero-bg` | `/assets/02RFtEx03DTNa37qOwrWcR7cP8.png` | 4320×3612 | 3D Hero & Footer Landscape Background |
| `project-bg` | `/assets/iheh57SbwDCbLIJPfTCJqC9yGG4.png` | 4320×3612 | Projects Section Ambient Mesh Fill |
| `project-banner-1` | `/assets/2y9hWY2pBjaONGzPRqdv67woE.png` | 4320×2253 | Project card visual & Card Stack |
| `project-preview-1` | `/assets/Be455u4BRYelSl1NS32A0tLSZU.png` | 4140×1887 | Project Case Study Mockup UI |
| `project-preview-2` | `/assets/jC3NYM1gkKdVNzokU0ojtj01asg.png` | 2496×2475 | Dock Finder Icon / Project Preview |
| `project-preview-3` | `/assets/N2w6GD9OJ32bkpXkfMSCXEAtsY.png` | 1600×1404 | Project Card UI visual |
| `dock-icon-notes` | `/assets/ZAH3C8amQUigspCjEG1FJWPjI.png` | 180×180 | macOS Notes 3D Glass Icon / Avatar |
| `dock-icon-photos` | `/assets/VCIQF7ylF9U0o5QZkTgji0mxx28.png` | 180×180 | macOS Photos 3D Glass Icon / Avatar |
| `dock-icon-mail` | `/assets/EVSY45U60gTa9UjvovzPTZx7Hw.png` | 180×180 | macOS Mail 3D Glass Icon / Avatar |
| `sticker-1` | `/assets/eOYxEIuj9eit1MkxUJQwRtgpmw.png` | 4320×4320 | Geometric Decorative Sticker |
| `sticker-2` | `/assets/4FBbf4WZcrn8dK3FlA2Mzd21XSU.png` | 930×921 | Playful Character Sticker |
| `sticker-3` | `/assets/cq5QJAT41B3uEalepXxZ1xzIFmU.png` | 840×795 | Retro Star Sticker |
| `sticker-4` | `/assets/rSV8scREB8oa33rmCe6aKwYvNA.png` | 567×942 | Vertical Capsule Sticker |
| `sticker-5` | `/assets/Th3QEx0L91no7qCoJwVGnsQ4A.png` | 624×717 | Heart / Smiley Sticker |
| `sticker-6` | `/assets/zLP5ArGJ7hRzp9j67em5xLB9lk.png` | 930×921 | Starburst Badge Sticker |
| `sticker-7` | `/assets/RwKHVR3FyIMRIxdPMY5G15IYs.png` | 930×732 | Creative Shape Sticker |
| `sticker-8` | `/assets/rgYxF9l8RqCw4sA13nn9mebjBM4.png` | 289×168 | Mini Tag Sticker |
| `sticker-9` | `/assets/qS3oEPOyjasx1PFSn1iz2kRT7w.png` | 344×300 | Mini Ribbon Sticker |
