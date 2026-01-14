import os
import asyncio
from pathlib import Path
from typing import List

async def load_book_from_file(file_path: str) -> str:
    """
    Load book content from a file
    Supported formats: txt, pdf, epub (basic support)
    """
    path = Path(file_path)
    
    if not path.exists():
        raise FileNotFoundError(f"Book file not found: {file_path}")
    
    if path.suffix.lower() == '.txt':
        with open(file_path, 'r', encoding='utf-8') as file:
            return file.read()
    
    elif path.suffix.lower() == '.pdf':
        # For PDF files, we'll use PyPDF2
        try:
            import PyPDF2
            with open(file_path, 'rb') as file:
                reader = PyPDF2.PdfReader(file)
                text = ""
                for page in reader.pages:
                    text += page.extract_text()
                return text
        except ImportError:
            raise ImportError("PyPDF2 is required to read PDF files. Install it with: pip install PyPDF2")
    
    elif path.suffix.lower() == '.epub':
        # For EPUB files, we'll use ebooklib
        try:
            import ebooklib
            from ebooklib import epub
            book = epub.read_epub(file_path)
            text = ""
            for item in book.get_items():
                if item.get_type() == ebooklib.ITEM_DOCUMENT:
                    text += item.get_content().decode('utf-8')
            return text
        except ImportError:
            raise ImportError("ebooklib is required to read EPUB files. Install it with: pip install ebooklib")
    
    else:
        raise ValueError(f"Unsupported file format: {path.suffix}. Supported formats: .txt, .pdf, .epub")


def chunk_text(text: str, chunk_size: int = 1000, overlap: int = 100) -> List[str]:
    """
    Split text into overlapping chunks
    """
    chunks = []
    for i in range(0, len(text), chunk_size - overlap):
        chunk = text[i:i + chunk_size]
        chunks.append(chunk)
    return chunks


def sanitize_text(text: str) -> str:
    """
    Sanitize text by removing extra whitespace and normalizing
    """
    # Remove extra whitespace
    text = ' '.join(text.split())
    return text