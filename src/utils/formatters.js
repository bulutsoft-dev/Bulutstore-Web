// Utility functions for formatting dates, downloads, etc.

export const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  const now = new Date();
  const diffTime = Math.abs(now - d);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return 'Dün';
  if (diffDays < 7) return `${diffDays} gün önce`;
  if (diffDays < 30) return `${Math.ceil(diffDays / 7)} hafta önce`;

  return d.toLocaleDateString('tr-TR');
};

export const formatDownloads = (downloads) => {
  if (!downloads) return '0';
  if (downloads >= 1000000) return (downloads / 1000000).toFixed(1) + 'M';
  if (downloads >= 1000) return (downloads / 1000).toFixed(1) + 'B';
  return downloads.toString();
};

