from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from api.rag_api import router as rag_router
import uvicorn
import os

app = FastAPI(title="RAG Chatbot for Book Content", version="1.0.0")

# Include API routes
app.include_router(rag_router, prefix="/api/v1", tags=["rag"])

# Serve static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_root():
    return {"message": "Welcome to the RAG Chatbot API for Book Content"}

@app.get("/chat")
def chat_interface():
    return {"message": "Chat interface available at /static/index.html"}

if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(app, host="0.0.0.0", port=port)