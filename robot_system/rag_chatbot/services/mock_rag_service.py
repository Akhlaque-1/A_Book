import os
import asyncio
from typing import List, Optional, Dict, Any
from utils.embedding_service import TFIDFEmbedder
import uuid
from datetime import datetime

class MockRAGService:
    def __init__(self):
        # Initialize TF-IDF embedder
        self.encoder = TFIDFEmbedder()

        # Store documents for similarity search
        self.documents = []

        # Initialize the encoder with a placeholder document to avoid empty vocabulary error
        self.encoder.fit(["placeholder document for initialization"])
    
    def _initialize_collection(self):
        """Initialize the internal document store"""
        pass
    
    async def add_document(self, text: str, metadata: Dict[str, Any] = None):
        """Add a document to the internal document store"""
        if metadata is None:
            metadata = {}
        
        # Add to internal document store
        doc_id = str(uuid.uuid4())
        self.documents.append({
            "id": doc_id,
            "text": text,
            "metadata": metadata,
            "created_at": datetime.utcnow().isoformat()
        })
        
        # Re-fit the TF-IDF vectorizer with all documents
        texts = [doc["text"] for doc in self.documents]
        self.encoder.fit(texts)
        
        return doc_id
    
    async def retrieve_relevant_content(self, query: str, top_k: int = 5):
        """Retrieve relevant content using TF-IDF similarity"""
        # Find similar documents
        if not self.documents:  # If no documents, return empty results
            return []
        
        similar_docs = self.encoder.find_similar(query, top_k=top_k)
        
        # Return the documents with their similarity scores
        results = []
        for doc_idx, similarity in similar_docs:
            if doc_idx < len(self.documents):
                doc = self.documents[doc_idx].copy()
                doc["similarity_score"] = similarity
                results.append(doc)
        
        return results
    
    async def generate_response(self, query: str, context: str, conversation_history: Optional[List[dict]] = None):
        """Generate a mock response (for testing without OpenAI)"""
        if conversation_history is None:
            conversation_history = []
        
        # For testing purposes, return a mock response based on the context
        if context and "artificial intelligence" in context.lower():
            return f"Based on the context: {context[:100]}... AI is a branch of computer science that aims to create software or machines that exhibit human-like intelligence."
        elif context:
            return f"Based on the provided context: {query} - This is a mock response for testing purposes."
        else:
            return "I couldn't find any relevant information in the book to answer your question."
    
    async def process_query(self, query: str, selected_text: Optional[str] = None, 
                           conversation_history: Optional[List[dict]] = None, 
                           use_selected_text: bool = False):
        """Process a user query and return a response"""
        if use_selected_text and selected_text:
            # Use only the selected text as context
            context = selected_text

            # Validate that the selected text is substantial enough for answering
            if len(selected_text.strip()) < 10:
                return "The selected text is too short to answer your question. Please select more text."
        else:
            # Retrieve relevant content using TF-IDF
            relevant_content = await self.retrieve_relevant_content(query)
            context = "\n".join([item["text"] for item in relevant_content])
        
        # If no context is found, provide an appropriate response
        if not context.strip():
            return "I couldn't find any relevant information in the book to answer your question. The book might not contain the information you're looking for."
        
        # Generate response using the context
        response = await self.generate_response(query, context, conversation_history)
        return response
    
    async def load_book_content(self, book_content: str, chunk_size: int = 1000):
        """Load book content into the internal document store in chunks"""
        # Split the book content into chunks
        chunks = []
        for i in range(0, len(book_content), chunk_size):
            chunk = book_content[i:i + chunk_size]
            if chunk.strip():  # Only add non-empty chunks
                chunks.append(chunk)
        
        # Add each chunk to the internal document store
        for chunk in chunks:
            await self.add_document(chunk)