package handlers

import (
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
)

// PageData — данные, передаваемые во все шаблоны
type PageData struct {
	Title            string
	Description      string
	TeacherName      string
	TeacherShortName string
}

func defaultPage() PageData {
	return PageData{
		Title:            "Агарёва Наталья Владимировна — репетитор начальных классов",
		Description:      "Репетитор по всем предметам начальной школы. Москва и онлайн. Русский язык, математика, чтение, подготовка к школе.",
		TeacherName:      "Агарёва Наталья Владимировна",
		TeacherShortName: "Агарёва Н. В.",
	}
}

// IndexHandler — главная страница
func IndexHandler(c *gin.Context) {
	c.HTML(http.StatusOK, "base", defaultPage())
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
