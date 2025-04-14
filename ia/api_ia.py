from flask import Flask, request, jsonify
from llama_cpp import Llama
from json import loads, dumps
import os
import sys
from rag import RAG

app = Flask("DocRoadMap_IA")
app.config["DEBUG"] = True

n_threads = int(os.getenv("NUM_THREADS", os.cpu_count()))
print(f"[LOGS] Number of threads: {n_threads}")

# def send_request_to_model(question, collection_name):
#     print("[LOGS] start send requets to model")
#     try:
#         os.environ["LLAMA_CPP_LOG"] = "0"

#         llm = Llama(
#             model_path="models/llama-3.2-1B-Instruct-f16.gguf",
#             verbose=False,
#             n_ctx=131072, # LLAMA
#             n_gpu_layers=0,
#         )

#         response_format = {
#             "type": "json_object",
#             "schema": {
#                 "type": "object",
#                 "properties": {
#                     "name": {"type": "string"},
#                     "description": {"type": "string"},
#                     "steps": {
#                         "type": "array",
#                         "items": {
#                             "type": "object",
#                             "properties": {
#                                 "name": {"type": "string"},
#                                 "description": {"type": "string"},
#                             },
#                             "required": ["name", "description", "status", "userId", "endedAt", "sub_steps"]
#                         }
#                     }
#                 },
#                 "required": ["name", "description", "steps"]
#             }
#         }

#         messages = [
#             {"role": "system", "content": "You are a helpful assistant that strictly outputs valid JSON following the provided schema."},
#             {"role": "user", "content": question}
#         ]

#         print("[LOGS - API] Prompt: ", messages)
#         print("[LOGS - API] Collection_name: ", collection_name)
#         if collection_name is not None:
#             print(f"[LOGS - API FLASK] RAG in the collection: {collection_name}")
#             try:
#                 rag = RAG(collection_name)
#                 query = rag.query(question)

#                 print("[LOGS - QUERY] Len query: ", len(query))
#                 msg_to_add = {"role": "user", "content": f"""
#         Given information from inout documents:
#         -------------------
#         {query}
#         -------------------
#             """}
#                 messages.append(msg_to_add)
#             except Exception as e:
#                 print(f"[ERROR - FLASK API] Error during get RAG in the collection: {e}")
#                 raise

#         output = llm.create_chat_completion(
#             messages=messages,
#             response_format=response_format,
#         )

#         response = output['choices'][0]['message']['content'].strip()
#     except Exception as e:
#         return {"response": f"[ERROR] {e}"}

#     try:
#         response_data = loads(response)
#     except Exception as e:
#         print(f"Error parsing response: {e}")
#         return {"response": "Error: Invalid response format."}

#     return response

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

def generate_roadmap(user_input, collection_name):
    try:
        

        llm = Llama(
            # model_path="models/llama-3.2-1B-Instruct-f16.gguf",
            model_path="models/llama-3.2-1B-Instruct-IQ3_M.gguf",
            verbose=True,
            n_ctx=131072, # LLAMA
            # n_gpu_layers=0,
            n_threads = n_threads
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
                            "required": ["name", "description"]
                        }
                    }
                },
                "required": ["name", "description", "steps"]
            }
        }

        messages = [
            {
                "role": "system", 
                "content": """
You are a conversational agent designed to assist users in completing administrative procedures.
Your role is to generate a detailed and precise roadmap, in French, that outlines all the necessary steps the user must follow to complete the administrative procedure.

You have access to:

The history of the conversation to understand the user's personal situation.

The documents and information related to the procedure.

Your roadmap must be:

Written entirely in French.

Clear, precise, and actionable, adapted to the user's situation.

As complete as possible: do not hesitate to add extra steps if you believe they are necessary (e.g., gathering documents, contacting institutions, preparing for deadlines).
                """
            },
            {
                "role": "user",
                "content": f"""This is the history of the conversation with the user:
                --------------------
                {user_input}
                --------------------
                """
            }
        ]

        if collection_name is not None:
            print(f"[LOGS - API FLASK] RAG in the collection: {collection_name}")
            try:
                rag = RAG(collection_name)
                query = rag.query("""
                    You are an expert assistant specialized in administrative procedures.
                    Given a specific procedure identified as {collection_name}, retrieve all relevant information needed to complete it.

                    Specifically, extract:

                    The step-by-step process to complete the procedure

                    The documents required at each step

                    The recipients or institutions to which documents must be sent

                    The people or entities the user should contact or request information from

                    The websites or online platforms where forms or services must be accessed

                    Return the information in clear, structured English, focusing on precision and completeness. Do not include generic advice — only information that is directly related to the specific procedure.
                """)

                print("[LOGS - QUERY] Len query: ", len(query))
                msg_to_add = {
                    "role": "user", 
                    "content": f"""
                        You have access to the following documents related to the procedure:
                        -------------------
                        {query}
                        -------------------
                    """
                }
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
        print("[LOGS - API] Response: ", response)
        response_data = loads(response)
        print("[LOGS - API] Response: ", response_data)
        return response_data
    except Exception as e:
        print(f"Error parsing response: {e}")
        return {"response": "Error: Invalid response format."}

def send_request_to_model(user_input, history, collection_name):
    try:
        

        llm = Llama(
            # model_path="models/llama-3.2-1B-Instruct-f16.gguf",
            model_path="models/llama-3.2-1B-Instruct-IQ3_M.gguf",
            verbose=True,
            n_ctx=131072, # LLAMA
            # n_gpu_layers=0,
            n_threads = n_threads
        )
        
        response_format = {
            "type": "json_object",
            "schema": {
                "type": "object",
                "properties": {
                    "is_roadmap": {"type": "boolean"},
                    "question": {"type": "string"},
                },
                "required": ["is_roadmap", "question"]
            }
        }
        messages = [
            {
                "role": "system",
                "content": """
                    You are a conversational agent designed to assist users in completing administrative procedures. Your goal is to ask relevant questions, one at a time, to understand the user's personal situation and determine all the necessary steps to complete the procedure.
                    You have access to the history of messages exchanged with the user as well as documents related to the procedure. You must never ask the same question twice, and all your questions must be contextually appropriate.
                    When you believe you have collected enough information to generate the necessary steps, you must stop asking questions and generate a detailed action plan. All your interactions must be in French.
                """
            },
            {
                "role": "user",
                "content": f"""This is the history of the conversation with the user:
                --------------------
                {history}
                --------------------
                The user's current answer corresponds to the last question asked in the history.
                """
            },
            {
                "role": "user",
                "content": f"""Here is the user's answer to the last question asked
                --------------------
                Answer: {user_input}
                --------------------
                """
            }

        ]

        if collection_name is not None:
            print(f"[LOGS - API FLASK] RAG in the collection: {collection_name}")
            try:
                rag = RAG(collection_name)
                query = rag.query(f"""
                    You are an expert assistant specialized in administrative procedures.
                    Given a specific procedure identified as {collection_name}, retrieve all relevant information needed to complete it.

                    Specifically, extract:

                    The step-by-step process to complete the procedure

                    The documents required at each step

                    The recipients or institutions to which documents must be sent

                    The people or entities the user should contact or request information from

                    The websites or online platforms where forms or services must be accessed

                    Return the information in clear, structured English, focusing on precision and completeness. Do not include generic advice — only information that is directly related to the specific procedure.
                """)

                print("[LOGS - QUERY] Len query: ", len(query))
                msg_to_add = {
                    "role": "user", 
                    "content": f"""
                        You have access to the following documents related to the procedure:
                        -------------------
                        {query}
                        -------------------
                    """
                }
                messages.append(msg_to_add)
            
            except Exception as e:
                print(f"[ERROR - FLASK API] Error during get RAG in the collection: {e}")
                raise
        

        output = llm.create_chat_completion(
            messages=messages,
            response_format=response_format)
        response = output['choices'][0]['message']['content'].strip()
    except Exception as e:
        return {"response": f"[ERROR] {e}"}

    try:
        print("[LOGS - API] Response: ", response)
        response_data = loads(response)
        print("[LOGS - API] Response: ", response_data)
        if response_data.get("is_roadmap") == True:
            return jsonify({"is_roadmap": True, "roadmap": generate_roadmap(history + " Answer: " + user_input, collection_name)})
    except Exception as e:
        print(f"Error parsing response: {e}")
        return {"response": "Error: Invalid response format."}


def start_conversation_model(collection_name):
    try:
        llm = Llama(
            # model_path="models/llama-3.2-1B-Instruct-f16.gguf",
            model_path="models/llama-3.2-1B-Instruct-IQ3_M.gguf",
            verbose=True,
            n_ctx=131072, # LLAMA
            # n_gpu_layers=0,
            n_threads = n_threads
        )

        messages = [
            {
                "role": "system", 
                "content": """
You are a helpful conversational agent. When the conversation begins, your first task is to politely introduce yourself to the user in one or two short sentences.

Then, based on the information the user provides, identify the purpose of their request and ask one single, precise question that will help clarify their situation or guide them in their process.

Do not ask multiple questions. Keep your tone friendly, professional, and concise. The question must be in french"""
            },
        ]

        if collection_name is not None:
            print(f"[LOGS - API FLASK] RAG in the collection: {collection_name}")
            try:
                rag = RAG(collection_name)
                query = rag.query(f"""
You are an expert assistant tasked with helping users complete administrative or procedural tasks.
Given a procedure identified as {collection_name}, list the general information or documents that are typically required from a user in order to initiate or complete this procedure.

Do not ask the user any questions.
Instead, return a concise list (bullet points or short phrases) of the standard data or documents that should be requested from the user.
Focus only on what is commonly needed, not on edge cases.""")

                print("[LOGS - QUERY] Len query: ", len(query))
                msg_to_add = {"role": "user", "content": f"""
        Given information from input documents:
        -------------------
        {query}
        -------------------
            """}
                messages.append(msg_to_add)
            except Exception as e:
                print(f"[ERROR - FLASK API] Error during get RAG in the collection: {e}")
                raise

        response_format = {
            "type": "json_object",
            "schema": {
            "type": "object",
            "properties": {
                "message": {"type": "string"},
                "question": {"type": "string"}
            },
            "required": ["message", "question"]
            }
        }

        output = llm.create_chat_completion(
            messages=messages,
            response_format=response_format)
        response = output['choices'][0]['message']['content'].strip()
    except Exception as e:
        return {"response": f"[ERROR] {e}"}

    try:
        print("[LOGS - API] Response: ", response)
        response_data = loads(response)
        print("[LOGS - API] Response: ", response_data)
        return response_data
    except Exception as e:
        print(f"Error parsing response: {e}")
        return {"response": "Error: Invalid response format."}

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
        history = request_data.get('history', None)

        res = send_request_to_model(user_input, history, collection_name)
        if res.get("is_roadmap") == True:
            return jsonify({"is_roadmap": True, "roadmap": res['roadmap']})
        else:
            return jsonify({"is_roadmap": False, 'question': res['question']})
    except Exception as e:
        raise

@app.route('/ia/start-conversation', methods=["POST"])
def start_conversation():
    print("[LOGS - API FLASK] START Request /ia/start-conversation")
    try:
        request_data = request.get_json()

        collection_name = request_data.get('collection_name', None)

        res = start_conversation_model(collection_name)
        return jsonify({"message": res['message'], 'question': res['question']})
    except Exception as e:
        raise

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "OK"}), 200

if __name__ == '__main__':
   sys.stdout.reconfigure(line_buffering=True)
   app.run(host="0.0.0.0", port=8083, debug=True)