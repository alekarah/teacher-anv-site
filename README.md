# Сайт репетитора Агарёвой Н. В.

Сайт-визитка репетитора начальных классов. Чистый HTML/CSS/JS без фреймворков.
Go-сервер используется только локально для удобной разработки по шаблонам — на хостинг деплоится статика.

## Стек

- **Локальная разработка:** Go + [Gin](https://github.com/gin-gonic/gin) — шаблонизация, просмотр на localhost
- **Frontend:** HTML/CSS/JS (без фреймворков)
- **Деплой:** статика (index.html + static/) на Netlify (бесплатно)

## Структура

```
teacher-anv-site/
├── cmd/server/main.go              # точка входа, локальный сервер
├── internal/handlers/handlers.go  # обработчики маршрутов
├── web/
│   ├── templates/
│   │   ├── base.html               # базовый layout (head, SEO)
│   │   ├── index.html              # сборка всех секций
│   │   └── partials/               # hero, about, seasons, services, reviews, contact, nav
│   └── static/
│       ├── css/                    # по одному файлу на секцию + mobile.css
│       ├── js/                     # main.js, seasons.js, contact.js
│       └── img/                    # spring/summer/autumn/winter/forest/hero/ava
├── go.mod
├── PLAN.md                         # план разработки и текущий статус
└── DEPLOY.md                       # план деплоя
```

## Локальная разработка

```bash
go run ./cmd/server
```

Сервер поднимается на [http://localhost:8080](http://localhost:8080).

Правки вносить в файлы по секциям:

| Файл | Секция |
|---|---|
| `web/templates/partials/hero.html` | Главный экран |
| `web/templates/partials/about.html` | Обо мне |
| `web/templates/partials/credentials.html` | Грамоты и достижения |
| `web/templates/partials/seasons.html` | Сезоны |
| `web/templates/partials/services.html` | Занятия и цены |
| `web/templates/partials/reviews.html` | Отзывы |
| `web/templates/partials/contact.html` | Контакты |
| `web/static/css/` | Стили |
| `web/static/img/` | Изображения |

## Деплой на Netlify

Подробно — в [DEPLOY.md](DEPLOY.md). Кратко:

```bash
# 1. Запустить сервер
go run ./cmd/server

# 2. Сгенерировать статику
curl http://localhost:8080 -o index.html
curl http://localhost:8080/robots.txt -o robots.txt
curl http://localhost:8080/sitemap.xml -o sitemap.xml
```

Затем перетащить папку с файлами на [netlify.com](https://netlify.com).

## Ожидаем от клиента

- Скриншоты отзывов от родителей
