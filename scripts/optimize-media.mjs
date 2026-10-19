// Builds web-ready media into public/ from the original files.
//   npm run media            → images + videos
//   npm run media -- images  → images only
//   npm run media -- videos  → videos only (skips ones already encoded; add --force to redo)
//
// Sources: ../assets (client videos, cutouts, logo) and raw/old-site (the CV only).
// The site is an overview of the client's local work — nothing else is pulled from the old site.
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import { execFileSync } from 'node:child_process';
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const ASSETS = '../assets';
const OLD = 'raw/old-site';
const args = process.argv.slice(2);
const only = args.find((a) => !a.startsWith('--'));
const force = args.includes('--force');

// Card previews are short, silent loops; the full videos (with sound) live on YouTube/Vimeo
// and are linked per project with `watch` in src/data/projects.ts.
const PREVIEW_SECONDS = 12;

const slug = (name) =>
  name.replace(/\.[^.]+$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const kb = (file) => `${(statSync(file).size / 1024).toFixed(0)} KB`;
const out = (dir) => (mkdirSync(dir, { recursive: true }), dir);

async function webp(src, dest, { width, height, quality = 78 } = {}) {
  const res = await sharp(src)
    .resize({ width, height, withoutEnlargement: true })
    .webp({ quality, alphaQuality: 90 })
    .toFile(dest);
  console.log(`  ${dest}  ${res.width}x${res.height}  ${kb(dest)}`);
}

async function images() {
  console.log('images');

  // Cutouts (already trimmed + transparent). Two widths for srcset.
  const cut = out('public/img/cutouts');
  for (const name of ['portrait', 'hero-thinking', 'pondering', 'pose-camera', 'laptop']) {
    for (const [w, size] of [[480, 'sm'], [920, 'lg']]) await webp(`${ASSETS}/images/${name}.webp`, `${cut}/${name}-${size}.webp`, { width: w, quality: 82 });
  }

  // Logo: black mark → white mark on transparent, plus favicons.
  const logoSrc = `${ASSETS}/LOGO/NEW ICON FIXED.png`;
  const { width, height } = await sharp(logoSrc).metadata();
  const alpha = await sharp(logoSrc).ensureAlpha().extractChannel('alpha').raw().toBuffer();
  const whitePng = await sharp({ create: { width, height, channels: 3, background: '#ffffff' } })
    .joinChannel(alpha, { raw: { width, height, channels: 1 } })
    .png()
    .toBuffer();
  await sharp(whitePng).resize({ height: 128 }).png().toFile('public/img/logo-white.png');
  console.log(`  public/img/logo-white.png  ${kb('public/img/logo-white.png')}`);
  for (const size of [64, 180]) {
    const mark = await sharp(whitePng).resize({ height: Math.round(size * 0.58) }).png().toBuffer();
    await sharp({ create: { width: size, height: size, channels: 4, background: '#02040f' } })
      .composite([{ input: mark, gravity: 'center' }])
      .png()
      .toFile(`public/${size === 64 ? 'favicon' : 'apple-touch-icon'}.png`);
  }

  // CV
  out('public/cv');
  copyFileSync(`${OLD}/BELZA-CV-PORT FULL_2.pdf`, 'public/cv/BELZA-CV-PORT-FULL_2.pdf');
  console.log('  public/cv/BELZA-CV-PORT-FULL_2.pdf');
}

// ffmpeg-static ships without ffprobe, so read the duration from `ffmpeg -i` (which exits non-zero).
function posterTime(src) {
  let info = '';
  try {
    execFileSync(ffmpeg, ['-i', src], { stdio: 'pipe' });
  } catch (e) {
    info = String(e.stderr);
  }
  const m = info.match(/Duration: (\d+):(\d+):([\d.]+)/);
  return m ? ((+m[1] * 3600 + +m[2] * 60 + +m[3]) * 0.4).toFixed(2) : '1.5';
}

function videos() {
  console.log('videos');
  const dir = out('public/media');
  const posters = out('public/media/posters');
  const sources = [ASSETS].flatMap((d) =>
    existsSync(d) ? readdirSync(d).filter((f) => f.toLowerCase().endsWith('.mp4')).map((f) => [d, f]) : [],
  );
  for (const [d, f] of sources) {
    const src = join(d, f);
    const name = slug(f);
    const mp4 = `${dir}/${name}.mp4`;
    const poster = `${posters}/${name}.webp`;
    if (!force && existsSync(mp4) && existsSync(poster)) {
      console.log(`  skip ${name}`);
      continue;
    }
    // Preview: first PREVIEW_SECONDS only, short side → 720px, H.264 for universal playback,
    // no audio, faststart so playback begins before the whole file arrives.
    execFileSync(ffmpeg, [
      '-v', 'error', '-y', '-i', src, '-t', String(PREVIEW_SECONDS),
      '-vf', "scale='if(gt(iw,ih),-2,720)':'if(gt(iw,ih),720,-2)',fps=30",
      '-c:v', 'libx264', '-preset', 'slow', '-crf', '27', '-profile:v', 'high', '-pix_fmt', 'yuv420p',
      '-an', '-movflags', '+faststart', mp4,
    ]);
    // Poster from ~40% in: early frames are often blank intros.
    execFileSync(ffmpeg, [
      '-v', 'error', '-y', '-ss', String(posterTime(src)), '-i', src, '-frames:v', '1',
      '-vf', "scale='if(gt(iw,ih),-2,540)':'if(gt(iw,ih),540,-2)'",
      '-c:v', 'libwebp', '-quality', '72', poster,
    ]);
    console.log(`  ${name}.mp4  ${kb(mp4)}  (from ${(statSync(src).size / 1048576).toFixed(1)} MB)`);
  }
}

if (!only || only === 'images') await images();
if (!only || only === 'videos') videos();
