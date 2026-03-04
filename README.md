# 🌟 Aneeq Hussain - AI Graduate Portfolio

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://aneeqhussain.vercel.app)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

A modern, international-standard portfolio website showcasing AI and Machine Learning projects. Built with a focus on performance, aesthetics, and user experience.

## ✨ Features

- 🎨 **Premium Design**: Dark mode with glassmorphism effects and smooth animations
- 🚀 **High Performance**: Optimized loading, lazy loading images, and efficient code
- 📱 **Fully Responsive**: Perfect experience on all devices
- 🤖 **AI Projects Showcase**: Featured projects including Chlorophyll Guardian (FYP)
- 💼 **Dynamic Content**: Skills, projects, and experience loaded dynamically
- 📧 **Contact Form**: Backend-powered with Supabase storage
- 🔄 **CI/CD Pipeline**: Automated deployment via Vercel + GitHub
- ♿ **Accessible**: WCAG compliant with semantic HTML

## 🛠️ Tech Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Custom properties, Grid, Flexbox, animations
- **JavaScript (ES6+)** - Vanilla JS for interactivity
- **Particles.js** - Animated background effects

### Backend
- **FastAPI** - Modern Python web framework
- **Supabase** - PostgreSQL database and authentication
- **Pydantic** - Data validation

### Deployment
- **Vercel** - Serverless deployment platform
- **GitHub** - Version control and CI/CD

## 📂 Project Structure

```
aneeq-portfolio/
├── index.html              # Main HTML file
├── css/
│   ├── variables.css       # CSS custom properties
│   ├── base.css           # Base styles and reset
│   ├── components.css     # Reusable components
│   └── sections.css       # Section-specific styles
├── js/
│   ├── main.js            # Main JavaScript logic
│   ├── api.js             # API client
│   └── animations.js      # Animation effects
├── data/
│   ├── projects.json      # Projects data
│   ├── skills.json        # Skills data
│   └── cv-data.json       # CV/Resume data
├── backend/
│   ├── main.py            # FastAPI application
│   ├── config.py          # Configuration
│   ├── database.py        # Supabase client
│   └── requirements.txt   # Python dependencies
├── assets/
│   └── images/            # Images and media
├── vercel.json            # Vercel configuration
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Python 3.9+
- Node.js (optional, for development tools)
- Supabase account
- Vercel account (for deployment)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/aneeqhussain/portfolio-site.git
   cd portfolio-site
   ```

2. **Set up backend**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

3. **Configure environment variables**
   ```bash
   cp backend/.env.example backend/.env
   # Edit .env and add your Supabase credentials
   ```

4. **Run the backend**
   ```bash
   uvicorn backend.main:app --reload
   ```

5. **Serve the frontend**
   - Open `index.html` in a browser, or
   - Use a local server: `python -m http.server 8000`

6. **Access the site**
   - Frontend: `http://localhost:8000`
   - Backend API: `http://localhost:8000/api`
   - API Docs: `http://localhost:8000/docs`

## 🗄️ Supabase Setup

### Create Tables

1. **contact_submissions**
   ```sql
   CREATE TABLE contact_submissions (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     name TEXT NOT NULL,
     email TEXT NOT NULL,
     subject TEXT,
     message TEXT NOT NULL,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     status TEXT DEFAULT 'new'
   );
   ```

2. **projects** (optional)
   ```sql
   CREATE TABLE projects (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     title TEXT NOT NULL,
     category TEXT NOT NULL,
     description TEXT,
     technologies TEXT[],
     github_url TEXT,
     demo_url TEXT,
     image_url TEXT,
     featured BOOLEAN DEFAULT false,
     display_order INTEGER,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
   );
   ```

## 🚢 Deployment

### Deploy to Vercel

1. **Connect GitHub repository**
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository

2. **Configure environment variables**
   - Add `SUPABASE_URL`
   - Add `SUPABASE_KEY`

3. **Deploy**
   - Vercel will automatically deploy on every push to `main`
   - Preview deployments for pull requests

### Manual Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 📊 Featured Projects

### 🌿 Chlorophyll Guardian (FYP)
AI-powered plant disease detection system using computer vision and deep learning.
- [Kaggle Notebook](https://www.kaggle.com/code/rukhsarbakhtaj/chlorophyll-guardian)

### 📈 PandemicInsights
Data analysis and visualization of pandemic trends.
- [GitHub Repository](https://github.com/aneeqhussain/PandemicInsights)

### 🌍 EarthTempAnalysis
Climate data analysis on global temperature records.
- [GitHub Repository](https://github.com/aneeqhussain/EarthTempAnalysis)

### 💬 Sentiment Analysis
NLP-based sentiment analysis tool.
- [GitHub Repository](https://github.com/aneeqhussain/sentiment-analysis)

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome!

## 📄 License

MIT License - feel free to use this as a template for your own portfolio.

## 📧 Contact

- **Email**: contact@aneeqhussain.com
- **GitHub**: [@aneeqhussain](https://github.com/aneeqhussain)
- **LinkedIn**: [Aneeq Hussain](https://linkedin.com/in/aneeqhussain)

---

**Built with ❤️ and AI** | © 2025 Aneeq Hussain
