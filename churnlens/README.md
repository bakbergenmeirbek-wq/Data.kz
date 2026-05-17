# ChurnLens

**Тұтынушыларды ұстап қалу көрсеткіштерін талдау (Churn Rate Analysis)**

Авторлар: Еслямова Айдана, Мейрбек Бакберген  
Университет: Нархоз Университеті | Факультет: ЦТМ | Пән: АКТ | 2026

## Жоба сипаттамасы

ChurnLens — тұтынушы кету коэффициентін (Churn Rate) талдайтын көп бетті веб-сайт. Сайт қазақ тілінде жазылған және бизнес-аналитика, визуализация, AI кеңесші функцияларын қамтиды.

## Файл құрылымы

```
churnlens/
├── index.html          — Басты бет
├── about.html          — Жоба туралы
├── analytics.html      — Талдау
├── portfolio.html      — Портфолио
├── contact.html        — Байланыс
├── css/styles.css
├── js/
│   ├── main.js
│   ├── table.js
│   ├── charts.js
│   ├── ai-agent.js
│   └── chatbot.js
└── assets/
    ├── ai-image-1.jpg  (өз фотоңызды қойыңыз)
    ├── ai-image-2.jpg
    ├── ai-image-3.jpg
    ├── ai-background-music.mp3
    └── churn-presentation.mp4
```

## Іске қосу

1. `index.html` файлын браузерде ашыңыз (Live Server немесе қалыпты ашу).
2. AI функциялары үшін `js/ai-agent.js` және `js/chatbot.js` файлдарында API кілтін орнатыңыз:

```javascript
const API_KEY = 'YOUR_API_KEY_HERE';  // өз кілтіңізбен ауыстырыңыз
```

3. `assets/` папкасына AI арқылы жасалған суреттер, бейне және музыканы қойыңыз.

## API (Anthropic Claude)

- Модель: `claude-sonnet-4-20250514`
- `max_tokens`: 1000
- Браузерден тікелей шақыру үшін Anthropic кілтінде CORS рұқсаты қажет болуы мүмкін. Кілт жоқ болса, демо жауаптар көрсетіледі.

## Технологиялар

HTML5, CSS3, Vanilla JavaScript, Chart.js (CDN), Google Fonts (Syne, IBM Plex Sans, JetBrains Mono), Claude API.

## Беттер

| Бет | Мазмұн |
|-----|--------|
| Басты бет | Hero, статистика, AI суреттер, Churn Rate түсіндірмесі |
| Жоба туралы | Авторлар, мақсат, технологиялар, кезеңдер |
| Талдау | Кесте, CSV, AI болжам, графиктер |
| Портфолио | Бейне, музыка, чат-бот, инфографика |
| Байланыс | Форма, карта, FAQ |
