# 🌊 Datashine - HydroSphere Analytics System
### Prediksi Tinggi Muka Air Sungai dengan LightGBM: Integrasi Jangkar Spasial Haversine dan Peluruhan Temporal Eksplisit

[![SSDS 2026 Finalist](https://img.shields.io/badge/SSDS%202026-Finalist%20Top%208-06B6D4?style=for-the-badge&logo=target)](https://github.com/Rizki0907/Datashine)
[![Live Dashboard](https://img.shields.io/badge/Live%20Dashboard-Vercel-10B981?style=for-the-badge&logo=vercel)](https://datashine-hydrosphere.vercel.app/)
[![Kaggle Private RMSE](https://img.shields.io/badge/Private%20RMSE-1.42078-blue?style=for-the-badge)](https://www.kaggle.com/competitions/sebelas-maret-statistics-data-science-2026)
[![Python](https://img.shields.io/badge/Python-3.10%2B-F59E0B?style=for-the-badge&logo=python)](https://python.org)

---

## 📌 Tentang Penelitian
Repositori ini memuat implementasi resmi model pembelajaran mesin (*machine learning*), rekayasa fitur hidrologi spasial-temporal, serta antarmuka web interaktif **HydroSphere** yang dikembangkan oleh **Tim Datashine** dari **Universitas Negeri Surabaya (UNESA)** untuk babak final **Sebelas Maret Statistics Data Science (SSDS) 2026** yang diselenggarakan oleh HIMASTA Universitas Sebelas Maret (UNS).

### 👥 Profil Tim Peneliti (Tim Datashine)
* **Ketua Tim (1st Author)**: Rizki Piji Fathoni
* **Anggota Tim (2nd Author)**: Ivan Andika Setyawan
* **Anggota Tim (3rd Author)**: Ketut Shridhara
* **Dosen Pembimbing**: Ulfa Siti Nuraini, S.Stat., M.Stat.
* **Institusi**: Program Studi S1 Sains Data, Fakultas Matematika dan Ilmu Pengetahuan Alam, Universitas Negeri Surabaya (UNESA)

---

## 🎯 Ringkasan Performa Model

| Metrik Evaluasi | Nilai / Skor | Keterangan |
| :--- | :---: | :--- |
| **Kaggle Private RMSE** | **1.42078** | Evaluasi pada data tak terlihat (*Unseen Test Set*) |
| **Kaggle Public RMSE** | **0.63839** | Evaluasi pada data publik |
| **5-Fold CV Mean RMSE** | **2.11892 ± 0.845** | Validasi silang K-Fold Shuffled bebas kebocoran data (*data leakage*) |
| **Cakupan Wilayah** | **30 Stasiun** | DAS Bengawan Solo (Hulu, Tengah, Hilir) & DAS Kali Lamong |
| **Total Observasi** | **84.396 Titik** | Agregasi interval 6-jam (Januari 2023 – Mei 2026) |

---

## 💡 Inovasi Utama (Pilar Metodologi)

1. **Jangkar Spasial Haversine (*Haversine Spatial Anchor*)**:
   Perhitungan jarak *geodesic* antar 30 pos pemantauan dengan bobot peluruhan eksponensial:
   $$W_{ij} = \exp\left(-\frac{d_{ij}}{30\text{ km}}\right)$$
   Mengekstrak sinyal elevasi hulu terdekat guna menangkap propagasi gelombang banjir ke hilir secara akurat.

2. **Peluruhan Temporal Eksplisit (*Explicit Temporal Decay*)**:
   Memodelkan memori hidrologis sepanjang horizon prediksi melalui konstanta waktu cepat ($\tau = 24\text{ jam}$ untuk limpasan langsung) dan konstanta waktu lambat ($\tau = 168\text{ jam} / 7\text{ hari}$ untuk kelembapan tanah).

3. **Fisika Limpasan & Normalisasi Target Z-Score**:
   Konstruksi *Effective Rain* ($P_{\text{eff}} = P \times \text{SM}_1$) dan *Global Pivot Matrices* 30 pos (1D, 2D, 3D, 7D), serta normalisasi $Z\text{-score}$ per stasiun untuk mengeliminasi disparitas datum elevasi dasar sungai (0.5 s.d. 145 mdpl).

---

## 📁 Struktur Repositori

```text
├── dashboard/                  # Source code Web Dashboard (React + Vite + Tailwind CSS)
│   ├── src/components/         # Komponen UI interaktif (Overview, Spatial, EDA, Model Lab, Forecaster, Report)
│   ├── src/data/               # Clean JSON datasets (30 stasiun, metrik CV, timeseries, dsb)
│   └── package.json
├── dashboard_assets/           # Artefak data, visualisasi PNG/HTML, dan model terlatih
│   ├── data/                   # cv_rmse_per_fold.csv, feature_importance_5fold_avg.csv, train.csv
│   ├── img/                    # Gambar resolusi tinggi untuk paper (Gambar 1 - 7)
│   ├── html/                   # Visualisasi Plotly interaktif
│   └── models/                 # Model terlatih LightGBM (lgbm_fold_0.txt s.d. lgbm_fold_4.txt)
├── notebooks/
│   └── Datashine_Notebook.ipynb # 🌟 Notebook Resmi Final (Self-contained, GPU-ready, Optuna + 5-Fold CV)
└── README.md
```

---

## 🚀 Panduan Menjalankan Notebook (Reproduksibilitas)

Notebook `notebooks/Datashine_Notebook.ipynb` telah dirancang sepenuhnya **mandiri (*self-contained*)** dan dapat langsung di-running di Google Colab atau Kaggle tanpa perlu mengunggah file manual:

1. Clone repositori ini:
   ```bash
   git clone https://github.com/Rizki0907/Datashine.git
   cd Datashine
   ```
2. Buka `notebooks/Datashine_Notebook.ipynb` di Google Colab / Jupyter Notebook.
3. Seluruh dataset akan diunduh secara otomatis melalui `gdown`.
4. Jalankan **Run All** (disarankan menggunakan akselerator GPU CUDA).

---

## 🌐 Akses Live Web Dashboard
Kunjungi web dashboard interaktif kami di Vercel:
👉 **[https://datashine-hydrosphere.vercel.app/](https://datashine-hydrosphere.vercel.app/)**

---

*Hak Cipta © 2026 Tim Datashine — Universitas Negeri Surabaya (UNESA)*
