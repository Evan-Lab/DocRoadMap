import time
import os
import requests
from no_tabs import run_script_no_tabs
from with_tabs import run_script_with_tabs

FLASK_HOST = os.getenv("FLASK_HOST", "localhost")

def post_data(url, payload=None, headers=None):
    response = requests.post(url, json=payload, headers=headers)
    if response.status_code in [200, 201]:
        return response.json()
    else:
        return {"error": f"Request failed with status {response.status_code}"}

if __name__ == "__main__":
    print("[LOGS] FLASK_HOST: ", FLASK_HOST)
    while True:
        print("[LOGS] RUN SCRIPT WITH NO TABS")
        run_script_no_tabs()
        print("[LOGS] RUN SCRIPT WITH TABS")
        run_script_with_tabs()

        url_add_element = f"http://{FLASK_HOST}:8083/db-vector/add-all"
        url_delete_element = f"http://{FLASK_HOST}:8083/db-vector/delete-all"

        print("[LOGS- WITH TABS] DELETE DATA TO DB VECTOR ")
        post_data(url_delete_element)
        print("[LOGS- WITH TABS] SEND DATA TO DB VECTOR ")
        post_data(url_add_element)

        time.sleep(3600)