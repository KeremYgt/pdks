
# Backend Boilerplate

## Run
##### Development Mode:

```sh
yarn install
npm run dev
yarn dev
```

##### Test Mode: 

```sh
yarn install
npm run test
yarn test
```

##### Production Mode:

```sh
yarn install
npm run start
yarn start
```

##### Local Mode: 

```sh
yarn install
npm run local
yarn local
```

## Dikkat Edilmesi Gerekenler

*   `src/constants/config/index.js` içerisindeki `PORTS`, `ENV`, `CRON_KEY` projeye göre uygun bilgilerle güncellenmelidir.
*   `src/constants/db/MongoDB.js` içerisindeki `generalDbs` projeye göre güncellenmelidir.
*   Veritabanı işlemleri yapılırken 'db_name' olarak kullanılan veritabanı ismi projeye göre güncellenmelidir.
*   AWS S3 servisine bağlanılacaksa `src/constants/upload` içerisindeki `buckets` ve `region` alanı projeye göre güncellenmelidir.

## Development

Want to contribute? Great!

- default eslint konfigrasyonu kullanılacak ayrıca max length eklenecek. 
- değişkenler lowerCamelCase 
- Değişken tanımlamalarında const ve let kullanılacak 
- javascript dökümanlarına özen gösterilecek. 

#### Backend Boilerplate Mimari Özellikleri;
- Modüler nesne ve fonksiyon temelli,
- Kolay Hata Yönetimi,
- ✨ Performans'a dayalı✨,
- Güncel Dependencies,
- Hızlı ve Kolay entegrasyon

#### Mimari
```
src/
  constants/
  controller/
  db/
  helpers/
  middlewares/
  routes/
  services/
index.js
```

> `constants/`
Sistemin ihtiyacı olan değişmezleri belli bir düzene göre kaydettiğimiz yer.

> `controller/`
Request validation ve request manipulation yaptığımız yer.

> `db/`
DB bağlantılarımızı yapabileceğimiz ve db işlemlerimizi gerçekleştirdiğimiz yer.

> `helpers/`
İstediğimiz tüm fonksiyonların burada belli bir düzene göre oluşturarak tekrar tekrar kullanmamıza yardımcı olacak.

> `middlewares/`
Express middleware de kullanacağımız tüm middleareleri belli bir düzene göre tuttuğumuz yer.

> `repositories/`
Veritabanı işlemlerimizi yaptığımız yer. Gerekirse veritabanından gelen verinin manipülasyonuda burada yapılabilir.

> `routes/`
Express routing klasörü

> `services/`
client tarafından gelen isteklerin en son geleceği ve isteğin response olarak şekilleneceği yer.

> `index.js`
> Backendi ayağa kaldıracak tanımlamalar, main route tanımı ve db gibi connectionların başlatma servislerinin olduğu yer.

## Tech

- [MongoDB] - 6.0>
- [Redis] - 4.0>
- [async-redis]2.0>
- [JsonWebToken] - 9.5.0 > 
- [Cors] 
- [Axios]
- [moment-timezone]
- [request-ip]

Base code yazılırken ihtiyaç olan dependencies bunlar.
