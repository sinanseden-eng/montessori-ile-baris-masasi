# İlk İki Resimli Senaryo — Güncelleme 2

Bu paket, `sinanseden-eng/montessori-ile-baris-masasi` deposunun güncel `main` dalı için hazırlanmıştır.

## GitHub web arayüzünde uygulama

1. Depoda `app/page.tsx` dosyasını açın ve içeriğini bu paketteki `app/page.tsx` ile tamamen değiştirin.
2. `app/globals.css` dosyasını açın ve içeriğini bu paketteki `app/globals.css` ile tamamen değiştirin.
3. Depo kökünde `.gitignore` bulunmuyorsa paketteki `.gitignore` dosyasını oluşturun.
4. `public/scenes` klasöründeki dört PNG'yi değiştirmeyin; bu güncelleme mevcut görselleri kullanır.
5. Değişiklikleri örneğin `fix: refine illustrated scenario playback` mesajıyla kaydedin.

## Bilgisayarda Git ile uygulama

Patch dosyasını depo köküne kopyalayın ve değişiklikleri çalışma alanına alın:

```bash
git apply first-two-scenes-update-v2.patch
npm ci
npm run build
git add -- .gitignore app/page.tsx app/globals.css
git commit -m "fix: refine illustrated scenario playback"
git push
```

## Bu sürümde neler değişti?

- İlk senaryodaki kızın adı bütün ilgili metinlerde `Elif` olarak düzeltildi.
- “Baloncuklar birazdan konuşacak” bekleme mesajı kaldırıldı.
- `Bunu Yapma` diyaloğu tamamen bittikten sonra `Bunu Yap` diyaloğu başlar.
- Her söz 6,2 saniye ekranda kalır; böylece alt sonuç notu rahatça okunabilir.
- Mobil görünümde iki yaklaşım aynı anda üst üste gösterilmez; ikinci yaklaşım yatay kitap sayfası geçişiyle gelir.
- Durdurma ve `Sıradaki söz` kontrolleri korunur.
- İkinci senaryonun içeriği değiştirilmedi.
