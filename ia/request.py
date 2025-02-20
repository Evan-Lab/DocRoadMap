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
        stop=["Q:", "\n"],
        echo=False
    )
    return output

if __name__ == "__main__":
    question = argv[1]
    print(dumps(send_request_to_model(question)))