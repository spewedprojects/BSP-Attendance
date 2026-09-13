import { Directory, Encoding, Filesystem } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

/**
 * Service to manage file export to device Downloads/BSP_Attendance directory
 * and native share (WhatsApp, Gmail, Drive).
 */

export async function saveToDownloads(
  filename: string,
  content: string,
  mimeType: string = 'text/csv'
): Promise<{ success: boolean; path?: string; message: string }> {
  const relativeDir = 'BSP_Attendance';
  const relativePath = `${relativeDir}/${filename}`;

  // 1. Try native Capacitor Filesystem write to Documents / Downloads
  let savedPath: string | null = null;
  try {
    // Ensure subdirectory exists
    try {
      await Filesystem.mkdir({
        path: relativeDir,
        directory: Directory.Documents,
        recursive: true,
      });
    } catch {
      // Ignore if directory already exists
    }

    const writeResult = await Filesystem.writeFile({
      path: relativePath,
      data: content,
      directory: Directory.Documents,
      encoding: Encoding.UTF8,
      recursive: true,
    });
    savedPath = writeResult.uri;
  } catch (fsErr) {
    console.warn('Native filesystem write failed, using browser fallback:', fsErr);
  }

  // 2. Trigger browser download anchor as guaranteed delivery
  try {
    const blob = new Blob([content], { type: `${mimeType};charset=utf-8;` });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 400);
  } catch (blobErr) {
    console.error('Blob download trigger error:', blobErr);
  }

  if (savedPath) {
    return {
      success: true,
      path: savedPath,
      message: `Saved to Documents/BSP_Attendance/${filename}`,
    };
  }

  return {
    success: true,
    message: `Downloaded ${filename}`,
  };
}

export async function shareReportText(
  title: string,
  text: string
): Promise<boolean> {
  try {
    const canShare = await Share.canShare();
    if (canShare.value) {
      await Share.share({
        title,
        text,
        dialogTitle: 'Share Manpower Report',
      });
      return true;
    }
  } catch (err) {
    console.warn('Capacitor Share unavailable, falling back to navigator.share:', err);
  }

  if (navigator.share) {
    try {
      await navigator.share({ title, text });
      return true;
    } catch {
      return false;
    }
  }

  return false;
}
