from flask import Flask, request, jsonify
from llama_cpp import Llama
from json import loads, dumps
import os
import sys
from rag import RAG

app = Flask("DocRoadMap_IA")
app.config["DEBUG"] = True

def send_request_to_model(question, collection_name):
    print("[LOGS] start send requets to model")
    try:
        os.environ["LLAMA_CPP_LOG"] = "0"

        llm = Llama(
            model_path="models/llama-3.2-1B-Instruct-f16.gguf",
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

        messages = [
            {"role": "system", "content": "You are a helpful assistant that strictly outputs valid JSON following the provided schema."},
            {"role": "user", "content": question}
        ]

        print("[LOGS - API] Prompt: ", messages)
        print("[LOGS - API] Collection_name: ", collection_name)
        if collection_name is not None:
            print(f"[LOGS - API FLASK] RAG in the collection: {collection_name}")
            try:
                rag = RAG(collection_name)
                query = rag.query(question)

                print("[LOGS - QUERY] Len query: ", len(query))
                msg_to_add = {"role": "user", "content": f"""
        Given information from inout documents:
        -------------------
        {query}
        -------------------
            """}
                messages.append(msg_to_add)
            except Exception as e:
                print(f"[ERROR - FLASK API] Error during get RAG in the collection: {e}")
                raise

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

def read_all_file(folder_path):
    text = ""

    if not os.path.isdir(folder_path):
      raise FileNotFoundError()
   
    for filename in os.listdir(folder_path):
      filepath = os.path.join(folder_path, filename)

      if os.path.isfile(filepath):
        try:
            with open(filepath, 'r', encoding='utf-8') as file:
               text += file.read() + '\n'
        except Exception as e:
           raise
    return text

@app.route('/', methods=['GET'])
def hello_world():
   return "Hello World !"

@app.route('/db-vector/add-all', methods=['POST'])
def add_all():
    try:
        directory = "dataset/"

        for root, dirs, files in os.walk(directory):
            for subdir in dirs:
                print(os.path.join(root, subdir))
                text = read_all_file(os.path.join(root, subdir))
                print(f"[LOGS] Get collection {subdir}")
                rag = RAG(subdir)
                splitted_text = rag.split_text(text)
                rag.add_knowledge(splitted_text)
        return jsonify({'status': 'SUCCESS'})
    except Exception as e:
        return jsonify({'status': "ERROR", "message": e}), 500


@app.route('/db-vector/delete-all', methods=['POST'])
def delete_all():
    try:
      directory = "dataset/"

      for root, dirs, files in os.walk(directory):
            for subdir in dirs:
                print(os.path.join(root, subdir))
                rag = RAG(subdir)
                rag.delete_collection()
    except Exception as e:
      return jsonify({"status": "ERROR", "messages": e})

@app.route('/ia/request', methods=["POST"])
def send_request():
    print("[LOGS - API FLASK] START Request /ia/request")
    try:
        request_data = request.get_json()

        collection_name = request_data.get('collection_name', None)
        user_input = request_data['user_input']

        res = send_request_to_model(user_input, collection_name)
        return jsonify({"status": 'SUCCESS', 'result': dumps(res, indent=4)})
    except Exception as e:
        raise

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "OK"}), 200

if __name__ == '__main__':
   sys.stdout.reconfigure(line_buffering=True)
   app.run(host="0.0.0.0", port=8083, debug=True)