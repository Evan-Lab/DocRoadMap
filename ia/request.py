from llama_cpp import Llama
from sys import argv
from json import loads, dumps
import os
import sys

def send_request_to_model(question):
    os.environ["LLAMA_CPP_LOG"] = "0"

    llm = Llama(
        model_path="../ia/models/mistral-7b-instruct-v0.3.Q6_K.gguf",
        verbose=False,
        n_ctx=32768
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

    messages = [
        {"role": "system", "content": "You are a helpful assistant that strictly outputs valid JSON following the provided schema."},
        {"role": "user", "content": question}
    ]

    output = llm.create_chat_completion(
        messages=messages,
        response_format=response_format,
    )

    response = output['choices'][0]['message']['content'].strip()

    try:
        response_data = loads(response)
    except Exception as e:
        print(f"Error parsing response: {e}")
        return {"response": "Error: Invalid response format."}

    return response_data

if __name__ == "__main__":
    if len(argv) < 2:
        print("Usage: python script.py 'your question'")
        exit(1)

    question = argv[1]

    response_data = send_request_to_model(question)
    response_data["name"] = question
    response_data["description"] = f"Steps to {question.lower()}."

    print(dumps(response_data, indent=4))
