package main

import (
	"context"
	"html/template"
	"log"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/gin-gonic/gin"

	"teacher-anv-site/internal/handlers"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	r := gin.Default()

	// Загружаем все шаблоны вручную — base + partials + страницы
	tmpl := template.Must(template.ParseFiles(
		"web/templates/base.html",
		"web/templates/index.html",
		"web/templates/partials/nav.html",
		"web/templates/partials/hero.html",
		"web/templates/partials/about.html",
		"web/templates/partials/credentials.html",
		"web/templates/partials/seasons.html",
		"web/templates/partials/services.html",
		"web/templates/partials/reviews.html",
		"web/templates/partials/contact.html",
	))
	r.SetHTMLTemplate(tmpl)

	// Статика
	r.Static("/static", "./web/static")

	// Маршруты
	r.GET("/", handlers.IndexHandler)
	r.POST("/contact", handlers.ContactHandler)
	r.GET("/robots.txt", handlers.RobotsHandler)
	r.GET("/sitemap.xml", handlers.SitemapHandler)

	// Запуск с graceful shutdown
	srv := &http.Server{
		Addr:    ":" + port,
		Handler: r,
	}

	go func() {
		log.Printf("Сервер запущен на http://localhost:%s", port)
		if err := srv.ListenAndServe(); err != nil && err != http.ErrServerClosed {
			log.Fatalf("Ошибка запуска сервера: %v", err)
		}
	}()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
	<-quit

	log.Println("Завершение работы сервера...")
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	if err := srv.Shutdown(ctx); err != nil {
		log.Fatalf("Принудительное завершение: %v", err)
	}
	log.Println("Сервер остановлен")
}
