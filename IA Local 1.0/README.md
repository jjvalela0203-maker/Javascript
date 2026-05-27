# 📄 Local PDF Summarizer

A clean, fully local web app to summarize PDFs using **Ollama** (`gemma2:2b`) + pdf.js.  
Private, fast on low-end hardware, with smart sampling and OCR support.

## ✨ Features

- **100% Local & Private** — Nothing leaves your machine
- **Smart Summarization** — Samples key sections (first pages + representative middle blocks) instead of just the beginning
- **OCR for Scanned PDFs** — Automatic fallback using Tesseract.js when text extraction fails
- **Always in Spanish** — Summaries are generated in Spanish regardless of document language
- **Lightweight** — Works great on modest hardware (i3 + 8GB RAM)
- **Simple UI** — Drag & drop, one-click summarize

## 🛠 Requirements

- [Ollama](https://ollama.com) installed and running
- Model: `gemma2:2b`
- Modern browser (Chrome, Edge, Firefox)
- Python (or any static file server) for local hosting

## 🚀 Quick Setup

### 1. Install & Run Ollama
```bash
# Install
curl -fsSL https://ollama.com/install.sh | sh

# Pull the model
ollama pull gemma2:2b

# Start Ollama (keep it running)
ollama serve
```
Or enable as user service:
```bash
systemctl --user enable --now ollama
```

### 2. Run the Web App
In the project folder:
```bash
python -m http.server 8000
```

Open your browser and go to:
**http://localhost:8000**

### 3. Use It
1. Drag & drop a PDF or click to select
2. Click **Resumir**
3. Get a clean Spanish summary

## 🧠 How the Smart Features Work

**Smart Sampling**  
For long documents, the app doesn't just read the first pages. It intelligently samples:
- The first ~10 pages
- Representative blocks from the middle (~35–45% and ~65–75%)
- The last page

This gives better context while keeping the prompt efficient for the small model.

**OCR Fallback**  
If a PDF has little or no extractable text (scanned documents), it automatically renders pages and runs OCR using Tesseract.js in the browser.

## 📁 Project Files

| File          | Description                          |
|---------------|--------------------------------------|
| `index.html`  | Main interface                       |
| `main.js`     | Logic + PDF parsing + Ollama calls   |
| `style.css`   | Clean dark UI                        |
| `README.md`   | This file                            |

## ⚠️ Notes

- Ollama must be running in the background for the summarizer to work.
- On very low-end hardware, OCR can be slow (text-based PDFs are instant).
- Everything runs locally on `localhost`.
- The app is designed to be minimal and respect your system resources.

---

Made for local use. Enjoy your private summaries! ✨

---

*Tip: You can also use VS Code Live Server instead of `python -m http.server`.*