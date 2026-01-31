# Ollama Setup for Offline Chatbot

## Installation Steps:

### 1. Install Ollama
```bash
# Windows (PowerShell as Administrator)
winget install Ollama.Ollama

# Or download from: https://ollama.com/download/windows
```

### 2. Start Ollama Service
```bash
# Start Ollama (runs on localhost:11434)
ollama serve
```

### 3. Pull the Model
```bash
# Pull lightweight model (1.3GB)
ollama pull llama3.2:1b

# Or for better quality (4.7GB)
ollama pull llama3.2:3b
```

### 4. Test Ollama
```bash
# Test the model
ollama run llama3.2:1b "Hello, how are you?"
```

## How it Works:

1. **Online Mode**: Uses Groq API (faster, requires internet)
2. **Offline Mode**: Falls back to Ollama (slower, works offline)
3. **Auto-Detection**: Automatically switches based on availability

## Model Options:

- `llama3.2:1b` - Fastest, smallest (1.3GB)
- `llama3.2:3b` - Better quality (4.7GB)
- `llama3.1:8b` - Best quality (4.7GB)

## Usage:
Your chatbot will automatically:
- Try Groq first (online)
- Fall back to Ollama if offline
- Show connection status to user