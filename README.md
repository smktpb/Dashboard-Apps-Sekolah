# Dashboard Apps Sekolah

Laman ini ialah pusat akses untuk semua aplikasi dan pautan sekolah dalam satu tempat, dan projek ini telah disusun supaya terus sesuai untuk GitHub Pages.

## Apa yang sudah disediakan

- Paparan responsif untuk komputer, telefon, dan tablet
- Carian aplikasi
- Penapis mengikut kategori
- Struktur fail statik yang sesuai untuk GitHub Pages
- Sokongan asas PWA supaya boleh dibuka seperti aplikasi ringkas di telefon apabila dihoskan melalui HTTPS

## Fail utama

- `index.html` - halaman utama dashboard
- `styles.css` - reka bentuk dan susun atur responsif
- `app.js` - senarai apps dan fungsi carian/penapis
- `manifest.json` - tetapan asas PWA
- `sw.js` - cache asas untuk fail utama
- `.nojekyll` - memastikan GitHub Pages melayan fail statik ini tanpa pemprosesan Jekyll

## Cara tambah aplikasi baharu

Buka fail `app.js` dan tambah satu objek baharu dalam senarai `apps`.

Contoh:

```js
{
  name: "Nama App",
  category: "Kategori",
  type: "AppSheet / Apps Script / Google Sheet / Excel Online",
  description: "Penerangan ringkas fungsi app",
  url: "https://pautan-sebenar-app",
  owner: "Nama unit / guru / jawatan"
}
```

## Cara publish ke GitHub Pages

### 1. Cipta akaun dan repository GitHub

- Daftar atau log masuk ke GitHub
- Klik `New repository`
- Namakan repository contohnya `dashboard-apps-sekolah`
- Pilih `Public`
- Klik `Create repository`

### 2. Muat naik fail projek

Muat naik semua fail ini ke dalam repository:

- `index.html`
- `styles.css`
- `app.js`
- `manifest.json`
- `sw.js`
- `.nojekyll`
- `README.md`

Jika anda guna laman GitHub:

- Buka repository
- Klik `Add file` > `Upload files`
- Seret semua fail ke ruang upload
- Klik `Commit changes`

### 3. Hidupkan GitHub Pages

- Masuk ke `Settings`
- Pilih `Pages` pada menu sebelah kiri
- Di bahagian `Build and deployment`, pilih:
  - `Source`: `Deploy from a branch`
  - `Branch`: `main`
  - `Folder`: `/ (root)`
- Klik `Save`

### 4. Tunggu pautan laman siap

GitHub akan jana pautan laman anda. Biasanya bentuknya seperti:

`https://nama-akaun.github.io/dashboard-apps-sekolah/`

Kadang-kadang ambil beberapa minit untuk aktif sepenuhnya.

### 5. Uji pada telefon

- Buka pautan GitHub Pages di telefon atau tablet
- Cuba fungsi carian dan kategori
- Jika mahu, tambah laman ke `Home Screen`

## Cadangan penggunaan sebenar

Jenis pautan yang sesuai dimasukkan:

- AppSheet untuk aplikasi operasi sekolah
- Google Apps Script web app
- Google Sheet yang dikongsi sebagai dashboard
- Excel Online atau Microsoft 365 links
- Google Form
- Sistem dalaman sekolah atau portal luaran

## Nota penting

- Gantikan semua pautan contoh `https://example.com/...` dalam `app.js` dengan pautan sebenar sekolah anda
- Jika mahu ikon aplikasi pada telefon, kita boleh tambah fail ikon kemudian
- Jika pada masa depan anda mahu senarai apps dibaca terus dari Google Sheet, projek ini masih boleh dinaik taraf tanpa ubah keseluruhan reka bentuk
