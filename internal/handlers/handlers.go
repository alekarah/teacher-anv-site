package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

const siteURL = "https://repetitor-agareva.ru"

// PageData — данные, передаваемые во все шаблоны
type PageData struct {
	Title            string
	Description      string
	TeacherName      string
	TeacherShortName string
	CanonicalURL     string
}

func defaultPage() PageData {
	return PageData{
		Title:            "Репетитор начальных классов — Агарёва Наталья Владимировна | Апрелевка, Москва, онлайн",
		Description:      "Репетитор по всем предметам начальной школы с 14-летним стажем. Апрелевка, Подмосковье, Москва и онлайн. Русский язык, математика, чтение, подготовка к школе. Диплом с отличием.",
		TeacherName:      "Агарёва Наталья Владимировна",
		TeacherShortName: "Агарёва Н. В.",
		CanonicalURL:     siteURL,
	}
}

// IndexHandler — главная страница
func IndexHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "base", defaultPage())
}

// RobotsHandler — отдаёт robots.txt
func RobotsHandler(c *gin.Context) {
	c.String(http.StatusOK, "User-agent: *\nAllow: /\nSitemap: "+siteURL+"/sitemap.xml\n")
}

// SitemapHandler — отдаёт sitemap.xml
func SitemapHandler(c *gin.Context) {
	xml := `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>` + siteURL + `/</loc>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
	c.Data(http.StatusOK, "application/xml; charset=utf-8", []byte(xml))
}

// ContactRequest — данные формы обратной связи
type ContactRequest struct {
	Name    string `json:"name"    binding:"required"`
	Phone   string `json:"phone"   binding:"required"`
	Child   string `json:"child"`
	Grade   string `json:"grade"`
	Message string `json:"message"`
}

// ContactHandler — приём заявки с формы
func ContactHandler(c *gin.Context) {
	var req ContactRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Заполните обязательные поля"})
		return
	}

	// TODO: заменить на отправку email через SMTP
	log.Printf("[ЗАЯВКА] Имя: %s | Телефон: %s | Ребёнок: %s | Класс: %s | Сообщение: %s",
		req.Name, req.Phone, req.Child, req.Grade, req.Message)

	c.JSON(http.StatusOK, gin.H{"status": "ok"})
}
