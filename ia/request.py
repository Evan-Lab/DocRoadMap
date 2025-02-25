from llama_cpp import Llama
from sys import argv
from json import dumps
import os

def send_request_to_model(question):
    os.environ["LLAMA_CPP_LOG"]="0"
    llm = Llama(
        model_path="../ia/models/mistral-7b-instruct-v0.3.Q6_K.gguf",
        verbose=False,
        n_ctx=32768
    )

    output = llm(
        f"Q: {question}. A:",
        max_tokens=None,
        stop=[],
        echo=False
    )
    response = output['choices'][0]['text'].strip()
    
    formatted_response = response.split("\n")
    formatted_response = [line.strip() for line in formatted_response if line.strip()]

    return {"response": formatted_response}

if __name__ == "__main__":
    question = argv[1]
    response_data = send_request_to_model(question)

    #line by line print
    for line in response_data["response"]:
        print(line)

    print(dumps(response_data)) #serialize json print