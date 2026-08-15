# Barışın Küçük Büyük Kitabı

Montessori yaklaşımına dayalı, 6–12 yaş için hazırlanmış etkileşimli çatışma çözümü kitapçığıdır. Proje GitHub ve Netlify için hazırdır; herhangi bir veritabanı, API anahtarı veya çevre değişkeni gerektirmez.

## Bilgisayarda çalıştırma

Node.js 22 kurulu olmalıdır.

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini açın.

## GitHub'a yükleme

1. GitHub'da yeni ve boş bir repository oluşturun.
2. Bu klasörün **içindeki dosyaların tamamını** repository'ye yükleyin. ZIP dosyasını tek parça halinde yüklemeyin.
3. Değişiklikleri `main` dalına kaydedin.

Git kullanıyorsanız:

```bash
git init
git add .
git commit -m "İlk sürüm"
git branch -M main
git remote add origin GITHUB_REPOSITORY_ADRESINIZ
git push -u origin main
```

## Netlify'da yayınlama

1. Netlify'da **Add new project → Import an existing project** seçeneğini açın.
2. GitHub hesabınızı ve yüklediğiniz repository'yi seçin.
3. Netlify, kökteki `netlify.toml` dosyasını otomatik okuyacaktır.
4. Görünen ayarlar şunlar olmalıdır:
   - Build command: `npm run build`
   - Publish directory: `out`
5. **Deploy** düğmesine basın.

Sonraki GitHub güncellemeleri Netlify'da otomatik olarak yeniden yayınlanır.

## Yapı

- `app/page.tsx`: Kitabın içeriği ve bütün etkileşimler
- `app/globals.css`: Flipbook düzeni, konuşma baloncukları ve sayfa animasyonları
- `app/layout.tsx`: Sayfa başlığı ve açıklaması
- `netlify.toml`: Netlify derleme ve yayın ayarları

## Üretim derlemesini denetleme

```bash
npm run build
```

Başarılı derleme sonunda Netlify'ın yayınlayacağı statik site `out` klasöründe oluşur.
