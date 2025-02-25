import numpy as np
import requests
import faiss
from request import send_request_to_model
from json import dumps
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

response = requests.get('https://raw.githubusercontent.com/run-llama/llama_index/main/docs/docs/examples/data/paul_graham/paul_graham_essay.txt')
text = response.text

chunk_size = 2048
chunks = [text[i:i + chunk_size] for i in range(0, len(text), chunk_size)]

def get_text_embedding(user_input):
    embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/paraphrase-multilingual-MiniLM-L12-v2")
    embeddings = embed_model.get_text_embedding(user_input)
    return embeddings
text_embeddings = np.array([get_text_embedding(chunk) for chunk in chunks])

d = text_embeddings.shape[1]
index = faiss.IndexFlatL2(d)
index.add(text_embeddings)

question = "What were the two main things the author worked on before college?"
question_embeddings = np.array([get_text_embedding(question)])

D, I = index.search(question_embeddings, k=2) # distance, index
retrieved_chunk = [chunks[i] for i in I.tolist()[0]]

prompt = f"""
Context information is below.
---------------------
{retrieved_chunk}
---------------------
Given the context information and not prior knowledge, answer the query.
Query: {question}
Answer:
"""

print(dumps(send_request_to_model(prompt)))