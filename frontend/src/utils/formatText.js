export default function formatFilename(filename, maxLength = 12) {
  const dotIndex = filename.lastIndexOf(".");
  if (dotIndex === -1 || dotIndex === 0 || dotIndex === filename.length - 1) {
    // no extension, weird file name, or ends with dot — truncate whole
    return filename.length > maxLength
      ? filename.slice(0, maxLength - 1) + "…"
      : filename;
  }

  const name = filename.slice(0, dotIndex);
  const ext = filename.slice(dotIndex); // includes dot
  const availableLength = maxLength - ext.length;

  if (filename.length <= maxLength) return filename;

  const truncated = name.slice(0, availableLength - 1); // leave space for "-"
  return `${truncated}-${ext}`;
}
