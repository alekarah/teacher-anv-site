# План деплоя

## Архитектура: как это работает

Go-сервер остаётся как инструмент локальной разработки:
- Правите шаблоны в `web/templates/partials/` — каждая секция в своём файле
- Смотрите результат на `localhost:8080`
- Когда готово — делаете `curl` и получаете плоский `index.html` для деплоя

Деплоите статику (один HTML + папка static/) на бесплатный хостинг.

---

## Рабочий процесс (каждый раз при правках)

```
1. Запустить сервер локально
   go run ./cmd/server

2. Посмотреть результат в браузере
   http://localhost:8080

3. Когда всё устраивает — сгенерировать index.html
   curl http://localhost:8080 -o index.html

4. Залить на хостинг (см. ниже)
```

---

## Что заливать на хостинг

```
index.html          ← генерируется через curl
robots.txt          ← уже есть (отдаётся Go-сервером, нужно сохранить отдельно)
sitemap.xml         ← то же самое
static/
  css/              ← все CSS файлы
  js/               ← все JS файлы
  img/              ← все изображения
```

Сохранить robots.txt и sitemap.xml один раз:
```
curl http://localhost:8080/robots.txt -o robots.txt
curl http://localhost:8080/sitemap.xml -o sitemap.xml
```

---

## Шаг 1 — Выбрать хостинг и имя сайта

### Рекомендация: Netlify (бесплатно)

- Адрес сайта: `вашеимя.netlify.app` — выбираете любое незанятое
- Свой домен подключается бесплатно (платите только за домен ~150–300 ₽/год)
- SSL автоматически
- Деплой: просто перетащить папку в браузере

**Зарегистрироваться:** netlify.com → Sign up (можно через GitHub)

### Альтернативы

| Платформа | Адрес | Деплой |
|---|---|---|
| Netlify | `имя.netlify.app` | drag & drop или git |
| GitHub Pages | `имя.github.io` | git push |
| Cloudflare Pages | `имя.pages.dev` | drag & drop или git |

---

## Шаг 2 — Первый деплой на Netlify

1. Зайти на netlify.com, зарегистрироваться
2. На главной странице появится зона «drag and drop» — перетащить туда папку с файлами:
   ```
   deploy/
   ├── index.html
   ├── robots.txt
   ├── sitemap.xml
   └── static/
   ```
3. Netlify выдаст случайный адрес — в настройках сайта (`Site settings → General → Site name`) поменять на нужное имя
4. SSL подключится автоматически

---

## Шаг 3 — Домен (опционально, ~200 ₽/год)

Если нужен красивый адрес типа `agareva-repetitor.ru`:
1. Купить домен на reg.ru или nic.ru
2. В Netlify: `Domain settings → Add custom domain`
3. Прописать DNS по инструкции Netlify (занимает до 24 часов)
4. SSL обновится автоматически

После регистрации домена вписать финальный URL в `index.html` в двух местах:
- `<link rel="canonical" href="https://ваш-домен.ru">`
- `<meta property="og:url" content="https://ваш-домен.ru">`

---

## Шаг 4 — Обновление сайта

Когда нужно что-то поменять:

```
1. Открыть нужный partial в VS Code:
   web/templates/partials/hero.html     — главный экран
   web/templates/partials/about.html    — обо мне
   web/templates/partials/services.html — занятия и цены
   web/templates/partials/reviews.html  — отзывы
   web/templates/partials/contact.html  — контакты
   web/static/css/                      — стили
   web/static/img/                      — картинки

2. Запустить сервер и проверить
   go run ./cmd/server

3. Сгенерировать index.html
   curl http://localhost:8080 -o index.html

4. Зайти на netlify.com → свой сайт → Deploys
   Перетащить обновлённую папку deploy/
   Сайт обновится за 30 секунд
```

---

## Шаг 5 — После деплоя

- [ ] Проверить сайт на телефоне
- [ ] Проверить скорость: pagespeed.web.dev
- [ ] Добавить в Google Search Console
- [ ] Добавить в Яндекс Вебмастер
- [ ] Когда будут реальные отзывы — обновить reviews.html и перезалить
