pdfjsLib.GlobalWorkerOptions.workerSrc =
    'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';

const dropZone   = document.getElementById('drop-zone');
const fileInput  = document.getElementById('file-input');
const fileNameEl = document.getElementById('file-name');
const btnResumir = document.getElementById('btn-resumir');
const status = document.getElementById('status');
const output = document.getElementById('output');
const outputText = document.getElementById('output-text');

let pdfText = '';

// JHONATHA START - Smart block sampling for long PDFs (efficient summarization)
// Samples first ~10 pages + representative middle blocks instead of only head or full doc
function getSampledPageIndices(numPages) {
  const indices = [];
  const firstBlock = Math.min(10, numPages);
  for (let i = 0; i < firstBlock; i++) indices.push(i);

  if (numPages > 20) {
    const midStart = Math.floor(numPages * 0.35);
    const midEnd = Math.min(midStart + 8, numPages);
    for (let i = midStart; i < midEnd; i++) if (!indices.includes(i)) indices.push(i);
  }
  if (numPages > 40) {
    const laterStart = Math.floor(numPages * 0.65);
    const laterEnd = Math.min(laterStart + 8, numPages);
    for (let i = laterStart; i < laterEnd; i++) if (!indices.includes(i)) indices.push(i);
  }
  if (numPages > 15 && !indices.includes(numPages - 1)) indices.push(numPages - 1);
  return indices.sort((a, b) => a - b);
}

function getSampledText(pages, numPages) {
  const indices = getSampledPageIndices(numPages);
  return indices.map(i => `--- Página ${i + 1} ---\n${pages[i] || ''}`).join('\n\n').trim();
}
// JHONATHA END

dropZone.addEventListener('dragover', e => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
});
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
dropZone.addEventListener('drop', e => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') handleFile(file);
});

// Cambio de entrada del archivo
fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) handleFile(fileInput.files[0]);
});

// SEBASTIAN START - OCR support for scanned/image-based PDFs using Tesseract.js
async function ocrSampledPages(pdf, numPages) {
  const indices = getSampledPageIndices(numPages);
  let ocrText = '';
  for (let idx of indices) {
    try {
      const page = await pdf.getPage(idx + 1);
      const viewport = page.getViewport({ scale: 1.2 }); // lower scale for speed on low hardware
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      await page.render({ canvasContext: ctx, viewport }).promise;

      const { data: { text } } = await Tesseract.recognize(canvas, 'spa+eng', {
        logger: m => { if (m.status === 'recognizing text') console.log('OCR progress:', m.progress); }
      });
      ocrText += `--- Página ${idx + 1} (OCR) ---\n${text}\n\n`;
    } catch (e) {
      console.warn('OCR error on page', idx, e);
    }
  }
  return ocrText.trim();
}
// SEBASTIAN END

// Lee el pdf y lo extrae con PDF.js
async function handleFile(file) {
    fileNameEl.textContent = file.name;
    btnResumir.disabled = true;
    pdfText = '';
    resetOutput();

    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    const numPages = pdf.numPages;

    const pages = [];
    for (let i = 1; i <= numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      const strings = content.items.map(item => item.str);
      pages.push(strings.join(' '));
    }

    pdfText = pages.join('\n').trim();

    // SEBASTIAN: If little/no text (scanned PDF), fallback to OCR on sampled pages
    if (pdfText.length < 80) {
      showThinking();
      status.innerHTML = '<span class="dots">Extrayendo con OCR (puede tardar en hardware bajo)</span>';
      pdfText = await ocrSampledPages(pdf, numPages);
      if (pdfText.length < 30) {
        hideStatus();
        showError('No se pudo extraer texto ni con OCR. El PDF puede estar protegido o ser muy gráfico.');
        btnResumir.disabled = true;
        return;
      }
      hideStatus();
    } else {
      // JHONATHA: For text-based PDFs, use efficient sampled text (not full + truncate)
      pdfText = getSampledText(pages, numPages);
    }

    if (pdfText.length < 30) {
      showError('El PDF no tiene contenido suficiente.');
      btnResumir.disabled = true;
      return;
    }

    btnResumir.disabled = false;
}

// Boton de resumir
btnResumir.addEventListener('click', async () => {
    if (!pdfText) return;

    btnResumir.disabled = true;
    resetOutput();
    showThinking();

    // Prompt uses pdfText which is already smartly sampled (Jhonatha)
    const prompt = `Eres un asistente que resume documentos. 
IMPORTANTE: Sin importar el idioma del texto, SIEMPRE responde en español.
Tu respuesta debe estar completamente en español.

Resume el siguiente texto (secciones clave muestreadas) en no más de 5 párrafos claros y concisos:

${pdfText}`;

    await new Promise(resolve => setTimeout(resolve, 50));

    try {
    const response = await fetch('http://localhost:11434/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        model: 'gemma2:2b',
        prompt: prompt,
        stream: false
        })
    });

    if (!response.ok) {
        throw new Error(`Ollama respondió con estado ${response.status}`);
    }

    const data = await response.json();
    const resumen = data.response?.trim();

    if (!resumen) throw new Error('La respuesta del modelo estaba vacía.');

    hideStatus();
    showOutput(resumen);

    } catch (err) {
    let msg = err.message;
    if (err.message.includes('Failed to fetch') || err.message.includes('NetworkError')) {
        msg = 'No se pudo conectar con Ollama. ¿Está corriendo en http://localhost:11434?';
    }
    showError(msg);
    }

    btnResumir.disabled = false;
});

// Funciones de mensajes
function showThinking() {
    status.style.display = '';
    status.className = 'thinking';
    status.innerHTML = '<span class="dots">Pensando</span>';
}

function showError(msg) {
    status.style.display = '';
    status.className = 'error';
    status.textContent = '⚠ ' + msg;
}

function hideStatus() {
    status.className = '';
    status.style.display = 'none';
}

function showOutput(text) {
    output.style.display = 'block';
    outputText.textContent = text;
}

function resetOutput() {
    output.style.display = 'none';
    outputText.textContent = '';
    status.className = '';
    status.style.display = 'none';
}