# İlk İki Resimli Senaryo Güncellemesi

Bu paket, `sinanseden-eng/montessori-ile-baris-masasi` deposunun güncel `main` dalı için hazırlanmıştır.

## GitHub web arayüzünde uygulama

1. Depoda `app/page.tsx` dosyasını açın ve içeriğini bu paketteki `app/page.tsx` ile değiştirin.
2. `app/globals.css` dosyasını açın ve içeriğini bu paketteki `app/globals.css` ile değiştirin.
3. Depo kökünde `.gitignore` yoksa paketteki `.gitignore` dosyasını oluşturun. Varsa içeriğini karşılaştırarak gerekli satırları ekleyin.
4. Dört PNG'nin `public/scenes` altında şu adlarla bulunduğunu doğrulayın:
   - `01-personal-property-dont.png`
   - `01-personal-property-do.png`
   - `02-fountain-queue-dont.png`
   - `02-fountain-queue-do.png`
5. Değişiklikleri `feat: add first two illustrated conflict scenes` mesajıyla kaydedin.

## Git ile tek seferde uygulama

Depoyu bilgisayarınıza klonladıysanız paket içindeki `.patch` dosyasını depo kökünde şu komutla uygulayabilirsiniz:

```bash
git am 0001-feat-add-first-two-illustrated-conflict-scenes.patch
```

Ardından:

```bash
npm ci
npm run build
git push
```

## Güncellemenin kapsamı

- İlk iki senaryo dört çizime bağlanır.
- Öğretmen ve çocukların konuşmaları görsel üzerinde dinamik baloncuklarla gösterilir.
- Her söz yaklaşık 4,8 saniye ekranda kalır; baloncuklar 1,1 saniyelik yumuşak animasyonla belirir.
- Durdurma ve tek tek ilerletme kontrolleri korunur.
- Mobil yerleşim uyarlanır.
- Diğer beş senaryo mevcut klasik görünümünü korur.
