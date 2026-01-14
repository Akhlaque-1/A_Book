import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pickle
import os
from typing import List, Tuple

class TFIDFEmbedder:
    def __init__(self):
        self.vectorizer = TfidfVectorizer(
            lowercase=True,
            stop_words='english',
            max_features=10000,
            ngram_range=(1, 2)
        )
        self.documents = []
        self.document_vectors = None
    
    def fit(self, documents: List[str]):
        """Fit the TF-IDF vectorizer on the documents"""
        self.documents = documents
        self.document_vectors = self.vectorizer.fit_transform(documents)
    
    def encode(self, texts: List[str]) -> np.ndarray:
        """Encode new texts using the fitted vectorizer"""
        if isinstance(texts, str):
            texts = [texts]
        return self.vectorizer.transform(texts)
    
    def find_similar(self, query: str, top_k: int = 5) -> List[Tuple[int, float]]:
        """Find the most similar documents to the query"""
        query_vector = self.encode([query])
        similarities = cosine_similarity(query_vector, self.document_vectors).flatten()
        
        # Get top_k most similar documents
        top_indices = similarities.argsort()[-top_k:][::-1]
        results = [(idx, similarities[idx]) for idx in top_indices if similarities[idx] > 0]
        
        return results
    
    def save(self, filepath: str):
        """Save the fitted vectorizer and documents"""
        data = {
            'vectorizer': self.vectorizer,
            'documents': self.documents
        }
        with open(filepath, 'wb') as f:
            pickle.dump(data, f)
    
    def load(self, filepath: str):
        """Load a previously saved vectorizer and documents"""
        with open(filepath, 'rb') as f:
            data = pickle.load(f)
        
        self.vectorizer = data['vectorizer']
        self.documents = data['documents']
        self.document_vectors = self.vectorizer.transform(self.documents)