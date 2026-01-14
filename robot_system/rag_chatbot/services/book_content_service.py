import asyncio
import os
from pathlib import Path
from typing import List
from services.local_rag_service import LocalRAGService
from utils.book_utils import load_book_from_file, chunk_text, sanitize_text

class BookContentService:
    def __init__(self):
        self.rag_service = LocalRAGService()
    
    async def load_and_process_book(self, book_path: str, chunk_size: int = 1000, overlap: int = 100):
        """
        Load a book from file and process it for the RAG system
        """
        print(f"Loading book from {book_path}...")
        book_content = await load_book_from_file(book_path)
        
        print("Sanitizing book content...")
        sanitized_content = sanitize_text(book_content)
        
        print(f"Chunking book content (size: {chunk_size}, overlap: {overlap})...")
        chunks = chunk_text(sanitized_content, chunk_size=chunk_size, overlap=overlap)
        
        print(f"Indexing {len(chunks)} chunks into the vector database...")
        for i, chunk in enumerate(chunks):
            if chunk.strip():  # Only add non-empty chunks
                await self.rag_service.add_document(
                    text=chunk,
                    metadata={
                        "source": os.path.basename(book_path),
                        "chunk_index": i,
                        "total_chunks": len(chunks)
                    }
                )
                if (i + 1) % 10 == 0:  # Progress update every 10 chunks
                    print(f"Processed {i + 1}/{len(chunks)} chunks...")
        
        print(f"Successfully indexed {len([c for c in chunks if c.strip()])} chunks from the book.")
        return len(chunks)
    
    async def load_sample_book(self):
        """
        Load the sample book for testing purposes
        """
        current_dir = Path(__file__).parent
        sample_book_path = current_dir / "sample_book.txt"
        return await self.load_and_process_book(str(sample_book_path))

# Example usage
async def main():
    service = BookContentService()
    await service.load_sample_book()
    print("Sample book loaded successfully!")

if __name__ == "__main__":
    asyncio.run(main())