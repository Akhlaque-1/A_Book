# Local RAG Chatbot for Book Content

This project implements a Retrieval-Augmented Generation (RAG) chatbot that can answer user questions about book content, including answering questions based only on text selected by the user. The implementation works completely locally without requiring external APIs like OpenAI.

## Architecture

The system consists of:
- **Frontend**: A chat interface for users to ask questions and select text
- **Backend**: FastAPI server to handle requests and orchestrate the RAG process
- **Vector Database**: TF-IDF for storing and retrieving relevant book content
- **Response Generation**: Local rule-based response system
- **Database**: Optional storage for conversation history and metadata

## Setup

1. Install the required dependencies:
```bash
pip install fastapi uvicorn python-dotenv PyPDF2 ebooklib scikit-learn
```

2. Load your book content into the system:
```bash
python startup.py path/to/your/book.txt --load-book
```

3. Start the server:
```bash
python startup.py path/to/your/book.txt
```

## API Endpoints

- `GET /` - Health check
- `POST /api/v1/chat` - Chat with the book content
- `POST /api/v1/chat-selected-text` - Chat with selected text

## Features

- Ask questions about the book content
- Ask questions about selected text only
- Multi-turn conversations with context
- Handles cases where no relevant information is found
- Works completely offline without external API dependencies

## Technologies Used

- FastAPI
- TF-IDF Vectorization (scikit-learn)
- Local response generation