from llama_cpp import Llama
from sys import argv
from json import loads, dumps
import os
from .rag.rag import RAG
import requests

def send_request_to_model(question, documents):
    try:
        os.environ["LLAMA_CPP_LOG"] = "0"
        rag = RAG("test")

        chunks = rag.split_text(documents)
        # print(f"[LOGS API] CHUNKS: {chunks}")
        rag.add_knowledge(chunks)

        llm = Llama(
            model_path="ia/models/llama-3.2-1B-Instruct-f16.gguf",
            verbose=False,
            #n_ctx=32768 # Mistral
            n_ctx=131072, # LLAMA
            n_gpu_layers=0,
        )

        response_format = {
            "type": "json_object",
            "schema": {
                "type": "object",
                "properties": {
                    "name": {"type": "string"},
                    "description": {"type": "string"},
                    "steps": {
                        "type": "array",
                        "items": {
                            "type": "object",
                            "properties": {
                                "name": {"type": "string"},
                                "description": {"type": "string"},
                            },
                            "required": ["name", "description", "status", "userId", "endedAt", "sub_steps"]
                        }
                    }
                },
                "required": ["name", "description", "steps"]
            }
        }

        query = rag.query(question)
        # print(f"[LOGS] QUERY: {query}")
        messages = [
            {"role": "system", "content": "You are a helpful assistant that strictly outputs valid JSON following the provided schema."},
            {"role": "user", "content": question},
            {"role": "user", "content": f"""
    Given information from inout documents:
    -------------------
    {query}
    -------------------
        """}
        ]

        # print(f"[LOGS] MESSAGES: {messages}")
        output = llm.create_chat_completion(
            messages=messages,
            response_format=response_format,
        )

        response = output['choices'][0]['message']['content'].strip()
    except Exception as e:
        return {"response": f"[ERROR] {e}"}

    try:
        response_data = loads(response)
    except Exception as e:
        print(f"Error parsing response: {e}")
        return {"response": "Error: Invalid response format."}

    return response

if __name__ == "__main__":
    if len(argv) < 2:
        print("Usage: python script.py 'your question'")
        exit(1)

    question = argv[1]
    text_to_add = argv[2]

    response_data = send_request_to_model(question, text_to_add)
    response_data["name"] = question
    response_data["description"] = f"Steps to {question.lower()}."

    print(dumps(response_data, indent=4))
