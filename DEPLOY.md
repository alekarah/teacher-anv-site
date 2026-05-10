# Деплой

Сайт задеплоен на Netlify: https://repetitor-agareva.ru

Netlify деплоит из папки `web/` ветки `main` на GitHub.

---

## Как вносить изменения

### Правки в шаблонах, CSS, JS, картинках

```bash
# 1. Запустить сервер локально
go run ./cmd/server

# 2. Проверить в браузере
# http://localhost:8080

# 3. Сгенерировать статику
curl http://localhost:8080 -o web/index.html
curl http://localhost:8080/robots.txt -o web/robots.txt
curl http://localhost:8080/sitemap.xml -o web/sitemap.xml

# 4. Закоммитить и запушить
git add web/
git commit -m "описание изменений"
git push
```

Netlify автоматически подхватит push и обновит сайт за ~30 секунд.

### Если меняли только CSS, JS или картинки (не шаблоны)

Шаг 3 (curl) можно пропустить — `index.html` не изменится. Просто:

```bash
git add web/static/
git commit -m "описание изменений"
git push
```


---

## Структура для деплоя

Netlify отдаёт содержимое папки `web/`:

```
web/
├── index.html       ← генерируется через curl
├── robots.txt       ← генерируется через curl
├── sitemap.xml      ← генерируется через curl
├── static/
│   ├── css/
│   ├── js/
│   └── img/
└── templates/       ← Go-шаблоны (Netlify игнорирует)
```

---

## Ждём от клиента

- Скриншоты отзывов от родителей — для замены текстовых заглушек в reviews.html
