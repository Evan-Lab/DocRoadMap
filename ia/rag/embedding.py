from chromadb import Documents, EmbeddingFunction, Embeddings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

class EmbeddingFunction(EmbeddingFunction):
    def __call__(self, user_input) -> Embeddings:
        embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
        embeddings = embed_model.get_text_embedding(user_input)
        return embeddings