#!/usr/bin/env python3
"""
Startup script for the Local RAG Chatbot
"""

import asyncio
import os
import sys
from pathlib import Path

# Add the project root to the path
project_root = Path(__file__).parent
sys.path.insert(0, str(project_root))

from services.local_rag_service import LocalRAGService
from utils.book_utils import load_book_from_file
import uvicorn

async def initialize_book_content(book_path: str):
    """Initialize the local RAG service with book content"""
    print("Initializing Local RAG service...")
    rag_service = LocalRAGService()

    print(f"Loading book content from {book_path}...")
    book_content = await load_book_from_file(book_path)

    print("Processing and indexing book content...")
    await rag_service.load_book_content(book_content)

    print("Book content indexed successfully!")

def main():
    # Check if book path is provided
    if len(sys.argv) < 2:
        print("Usage: python startup.py <book_path> [--load-book]")
        print("Example: python startup.py ./book.txt --load-book")
        return

    book_path = sys.argv[1]
    load_book_flag = "--load-book" in sys.argv

    if load_book_flag:
        # Initialize the book content
        asyncio.run(initialize_book_content(book_path))

    # Start the FastAPI server
    print("Starting Local RAG Chatbot server...")
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )

if __name__ == "__main__":
    main()