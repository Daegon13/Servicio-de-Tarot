import { access, mkdir, rename, stat, unlink } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDirectory, '..');
const imagesDirectory = path.join(projectRoot, 'images');
const sourcePath = path.join(imagesDirectory, 'marivivian-tarot-fondo.jpg');
const mobileMaxWidth = 840;
const desktopMaxWidth = 1600;

const formatBytes = (bytes) => {
  const units = ['B', 'KB', 'MB'];
  let value = bytes;
  let unit = units[0];

  for (let index = 1; index < units.length && value >= 1024; index += 1) {
    value /= 1024;
    unit = units[index];
  }

  return `${value.toFixed(value >= 10 || unit === 'B' ? 0 : 1)} ${unit}`;
};

const createWebp = async ({ filename, width, quality }) => {
  const outputPath = path.join(imagesDirectory, filename);
  const temporaryPath = `${outputPath}.tmp`;

  await sharp(sourcePath)
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality, effort: 5, smartSubsample: true })
    .toFile(temporaryPath);

  await unlink(outputPath).catch((error) => {
    if (error.code !== 'ENOENT') throw error;
  });
  await rename(temporaryPath, outputPath);

  const outputStats = await stat(outputPath);
  console.log(`✓ images/${filename} — ${formatBytes(outputStats.size)}`);
};

try {
  await access(sourcePath);
  await mkdir(imagesDirectory, { recursive: true });

  const metadata = await sharp(sourcePath).metadata();
  const sourceStats = await stat(sourcePath);

  if (!metadata.width || !metadata.height) {
    throw new Error('No se pudieron leer las dimensiones de la imagen fuente.');
  }

  console.log(
    `Fuente: images/${path.basename(sourcePath)} — ${metadata.width}×${metadata.height} — ${formatBytes(sourceStats.size)}`,
  );

  await createWebp({
    filename: 'marivivian-tarot-fondo.webp',
    width: metadata.width,
    quality: 78,
  });

  if (metadata.width > mobileMaxWidth) {
    await createWebp({
      filename: 'marivivian-tarot-fondo-mobile.webp',
      width: mobileMaxWidth,
      quality: 74,
    });
  } else {
    console.log('• No se generó una versión mobile: la fuente ya es igual o menor a 840 px.');
  }

  if (metadata.width >= desktopMaxWidth) {
    await createWebp({
      filename: 'marivivian-tarot-fondo-desktop.webp',
      width: desktopMaxWidth,
      quality: 80,
    });
  } else {
    console.log(
      `• No se generó una versión desktop de ${desktopMaxWidth} px: la fuente mide ${metadata.width} px y no se escalará hacia arriba.`,
    );
  }
} catch (error) {
  console.error(`Error al optimizar imágenes: ${error.message}`);
  process.exitCode = 1;
}
