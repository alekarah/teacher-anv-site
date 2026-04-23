# Сайт репетитора Агарёвой Н. В.

Сайт-визитка репетитора начальных классов. Go-сервер + чистый HTML/CSS/JS без фреймворков.

## Стек

- **Backend:** Go + [Gin](https://github.com/gin-gonic/gin)
- **Frontend:** HTML/CSS/JS (без фреймворков)
- **Деплой:** VPS (Beget) + Nginx + systemd

## Структура

```
teacher-anv-site/
├── cmd/server/main.go              # точка входа, graceful shutdown
├── internal/handlers/handlers.go  # обработчики маршрутов
├── web/
│   ├── templates/
│   │   ├── base.html               # базовый layout
│   │   ├── index.html
│   │   └── partials/               # hero, about, seasons, services, reviews, contact, nav
│   └── static/
│       ├── css/                    # по одному файлу на секцию + mobile.css
│       ├── js/                     # main.js, seasons.js, contact.js
│       └── img/                    # spring/summer/autumn/winter/forest/hero
├── go.mod
└── PLAN.md
```

## Запуск локально

```bash
go run ./cmd/server
```

Сервер поднимается на [http://localhost:8080](http://localhost:8080).

Порт можно переопределить через переменную окружения:

```bash
PORT=3000 go run ./cmd/server
```

## Маршруты

| Метод | Путь          | Описание                        |
|-------|---------------|---------------------------------|
| GET   | `/`           | Главная страница                |
| GET   | `/robots.txt` | Файл для поисковых роботов      |
| GET   | `/sitemap.xml`| Карта сайта                     |
| GET   | `/static/`    | Статические файлы               |

## Деплой

1. Собрать бинарник: `go build -o server ./cmd/server`
2. Перенести на VPS вместе с папкой `web/`
3. Настроить Nginx как reverse proxy на порт 8080
4. Зарегистрировать как systemd-сервис (конфиг в `PLAN.md`)
5. HTTPS — Let's Encrypt (Certbot)
6. Обновить `siteURL` в `internal/handlers/handlers.go` на реальный домен

Workflow после деплоя: `git push` на GitHub → `git pull` на VPS → `systemctl restart teacher-anv`.

## Ожидаем от клиента

- Скриншоты отзывов от родителей
- Фото для og-cover.jpg (1200×630px) — превью в соцсетях
