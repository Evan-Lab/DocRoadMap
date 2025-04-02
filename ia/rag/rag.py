from embedding import EmbeddingFunction
import chromadb.utils.embedding_functions as embedding_functions
import chromadb
import uuid
import os

CHROMA_HOST = os.getenv('CHROMA_HOST', 'localhost')

class RAG:
    def __init__(self, collection_name, chunk_size=2048, distance_search=5):
        self.collection_name = collection_name
        self.chunk_size = chunk_size
        self.distance_search = distance_search

        self.chroma_client = chromadb.HttpClient(host=CHROMA_HOST, port=8000)

        self.embedding_function = embedding_functions.SentenceTransformerEmbeddingFunction(
            model_name="paraphrase-multilingual-MiniLM-L12-v2"
        )

    def split_text(self, text):
        try:
            chunks = [text[i:i + self.chunk_size] for i in range(0, len(text), self.chunk_size)]
            print("[LOGS RAG] The text was successfully split")
            return chunks
        except Exception as e:
            raise
    
    def get_collection(self):
        try:
            embedding = EmbeddingFunction()
            collection = self.chroma_client.get_or_create_collection(name=self.collection_name, embedding_function=self.embedding_function)
            print(f"[LOGS RAG] Success {self.collection_name} collection recovery")
            return collection
        except Exception as e:
            print(f"[ERROR RAG] Error while retrieving {self.collection_name} collection: {e}")
            raise
    
    def delete_collection(self):
        try:
            self.chroma_client.delete_collection(self.collection_name)
            print(f"[LOGS] {self.collection_name} deleted with success")
        except Exception as e:
            print(f"[ERROR RAG] Error during the deletion of the collection {self.collection_name}: {e}")
            raise

    def add_knowledge(self, chunks):
        try:
            collection = self.get_collection()

            collection.add(
                documents=chunks,
                ids=[f"ids_{i}" for i in range(len(chunks))]
            )

            print(f"[LOGS RAG] Documents successfully added to the {self.collection_name} collection")
        except Exception as e:
            print(f"[ERROR RAG] Error adding document to {self.collection_name} collection: {e}")
            raise

    def query(self, user_input):
        try:
            collection = self.get_collection()
            splitted_query = self.split_text(user_input)

            result_query = collection.query(
                query_texts=splitted_query,
                n_results=self.distance_search
            )
            print("[LOGS - QUERY] Retrieved chunks: ", result_query["documents"])
            return result_query['documents']
        except Exception as e:
            print(f"[ERROR RAG] Error during execution of request to {self.collection_name} collection: {e}")
            raise
