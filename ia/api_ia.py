from flask import Flask, request, jsonify, Response
from llama_cpp import Llama
import json
from json import loads, dumps
import os
import sys
from rag.rag import RAG

app = Flask("DocRoadMap_IA")
app.config["DEBUG"] = True

n_threads = int(os.getenv("NUM_THREADS", os.cpu_count()))
print(f"[LOGS] Number of threads: {n_threads}")

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
            model_path="models/llama-3.2-1B-Instruct-Q4_K_M.gguf",
            n_ctx=4096,
            n_threads=n_threads,
            use_mlock=True,
            temperature=0.7,
            # max_tokens=2048,
            repeat_penalty=1.2,
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

                    Your response must be a valid, closed JSON string that exactly follows this schema:
                    {
                        "name": "string",
                        "description": "string",
                        "steps": [
                            {
                            "name": "string",
                            "description": "string"
                            }
                        ]
                    }
                    Do not include any extra text or commentary. Make sure the entire JSON object is present and correctly formatted.
                """
            },
            {
                "role": "system",
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
    
        print("[LOGS - API] GENERATE ROADMAP")
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
    except json.JSONDecodeError as e:
        print(f"JSON decode error: {e}")
        print("Raw response (start):", response[:500])
        return {"response": "Le format de réponse est invalide. Le modèle a peut-être trop répété ou généré une sortie incomplète."}
    except Exception as e:
        print(f"Error parsing response: {e}")
        return {"response": "Error: Invalid response format."}

def send_request_to_model(user_input, history, collection_name):
    try:
        llm = Llama(
            model_path="models/llama-3.2-1B-Instruct-Q4_K_M.gguf",
            n_ctx=4096,
            n_threads=n_threads,
            use_mlock=True,
            temperature=0.7,
            # max_tokens=2048,
            repeat_penalty=1.2
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
                    You are an administrative assistant. Your goal is to ask the user a series of questions to fully understand their personal situation in order to determine the appropriate administrative steps they need to take.
                    At each step:
                        Ask only one clear and concise question.

                        Wait for the user's answer before asking the next question.

                        Continue asking questions until you have enough information.

                        Once you have enough details to build a personalized administrative roadmap, set "is_roadmap": true.

                        Until then, keep "is_roadmap": false.

                    Your response must always be a valid, closed JSON string that strictly follows this schema:

                    {
                        "is_roadmap": "True if you have enough information to build a roadmap, otherwise False",
                        "question": "string"
                    }
                    Do not include any extra text or commentary. Only return the complete JSON object.
                """
            },
            {
                "role": "system",
                "content": f"""This is the history of the conversation with the user:
                --------------------
                {history}
                --------------------
                The user's current answer corresponds to the last question asked in the history.
                """
            },
            {
                "role": "system",
                "content": f"""Here is the user's answer to the last question asked
                --------------------
                Answer: {user_input}
                --------------------
                """
            }

        ]

        print("[LOGS - API] Prompt: ", messages)

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
            model_path="models/llama-3.2-1B-Instruct-Q4_K_M.gguf",
            n_ctx=4096,
            n_threads=n_threads,
            use_mlock=True,
            temperature=0.7,
            # max_tokens=2048,
            repeat_penalty=1.2
        )

        messages = [
            {
                "role": "system", 
                "content": """
                    You are a helpful conversational agent.

                    Then, based on the information the user provides, identify the purpose of their request and ask one single, precise question that will help clarify their situation or guide them in their process.

                    Do not ask multiple questions. Keep your tone friendly, professional, and concise. The question must be in french.

                    Question must be not generic, but specific to the user's situation. YOU NEED TO UNDERSTAND THE USER'S SITUATION.

                    Your response must be a valid, closed JSON string that exactly follows this schema:
                    {
                        "question": "string"
                    }
                    Do not include any extra text or commentary. Make sure the entire JSON object is present and correctly formatted.

                """
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
                msg_to_add = {
                    "role": "system", 
                    "content": f"""
        Use the information below to understand what is usually required:
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
                "question": {"type": "string"}
            },
            "required": ["question"]
            }
        }


        print("[LOGS - API] Prompt: ", messages)
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
        res_json = res if isinstance(res, dict) else (res.get_json() if isinstance(res, Response) else res)
        if res_json.get("is_roadmap") == True:
            print("[LOGS - API FLASK] Response: ", res_json['roadmap'])
            return jsonify({"is_roadmap": True, "roadmap": res_json["roadmap"]})
        else:
            return jsonify({"is_roadmap": False, 'question': res_json['question']})
    except Exception as e:
        print(f"[ERROR - FLASK API] Error during request: {e}")
        raise

@app.route('/ia/start-conversation', methods=["POST"])
def start_conversation():
    print("[LOGS - API FLASK] START Request /ia/start-conversation")
    try:
        request_data = request.get_json()

        collection_name = request_data.get('collection_name', None)

        res = start_conversation_model(collection_name)
        print("[LOGS - API FLASK] Response: ", res)
        return jsonify({'question': res['question']})
    except Exception as e:
        print(f"[ERROR - FLASK API] Error during start conversation: {e}")
        raise

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "OK"}), 200

if __name__ == '__main__':
   sys.stdout.reconfigure(line_buffering=True)
   app.run(host="0.0.0.0", port=8083, debug=True)