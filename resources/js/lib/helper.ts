const namaBulanIndonesia = [
  'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
  'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
];

export function formatTanggalIndonesia(tanggal: string | Date): string {
  const dateObj = new Date(tanggal);

  if (isNaN(dateObj.getTime())) {
    return 'Tanggal tidak valid';
  }

  const hari = dateObj.getDate();
  const bulan = namaBulanIndonesia[dateObj.getMonth()];
  const tahun = dateObj.getFullYear();

  return `${hari} ${bulan} ${tahun}`;
}

export function formatRupiah(value: number | string): string {
  const number = typeof value === 'string' ? parseInt(value) : value;

  if (isNaN(number)) return 'Rp 0';

  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number);
}

export const unformatRupiah = (value: string): number => {
  const cleanString = value.replace(/[Rp.,\s]/g, '');
  const parsed = parseInt(cleanString, 10);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatRupiahString(value: number | string): string {
  const number = typeof value === 'string' ? parseFloat(value) : value;
  if (isNaN(number)) return 'Rp 0';

  return `Rp ${number.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })}`;
}

// Fungsi bantu untuk mendapatkan tanggal hari ini dalam format lokal
export function getTodayDateIndo(): string {
  const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const bulan = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  const today = new Date();
  const namaHari = hari[today.getDay()];
  const tanggal = today.getDate();
  const namaBulan = bulan[today.getMonth()];
  const tahun = today.getFullYear();

  return `${namaHari}, ${tanggal} ${namaBulan} ${tahun}`;
};
