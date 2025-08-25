team cctv -> monitoring dashboard
-> monitoring activity by cctvteam toko -> task / jobsesk
-> laporan kegiatan

- team cctv ada 2 shift
- upload laporan cctv mati berdasarkan inputan
- input berdasarkan toko

- role
  -> superadmin
  -> sl = store leader
  -> asl = assisten store leader
  -> chief leader
  -> admin store
  -> admin receive
  -> checker
  -> staff dep
  -> kasir
  -> ba
  -> security

- setiap penilaian berdasarakan jod desk masing masing
  -> hangat
  -> ramah
  -> tertib

team kasir /ba/ security
-> notifikasi peringatan
-> point pelanggaran
-> laporan check body
-> absensi
-> pengechekan body setiak masuk, keluar dan jam pulang
-> laporan izin. - keterangan - foto - izin toilet 10 menit - jam kelaur - jam masuk - sholat 15 menit - jam keluar - jam masuk
-> laporan istriahat durasi 1 jam - foto - jam keluar - jam masuk - taggal - batas poin sp -> cek dari pdf

=============================================================

# TABLE

=============================================================

- store
  -> nama store
  -> alamat store

- point
  -> role_id
  -> pelanggaran
  -> point

- absen
  -> user id
  -> tanggal
  -> store_id

- kategori_izin
  -> jenis
  -> durasi

- izin
  -> user_id
  -> kategori_izin_id
  -> keterangan

- activity
  -> user_id
  -> absen_id -> null
  -> izin_id -> null
  -> title ( foto full body, body checkup )
  -> keterangan
  -> image

- warning
  -> user_id
  -> keterangan
  -> image

=============================================================================
