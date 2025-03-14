import time
from no_tabs import run_script_no_tabs
from with_tabs import run_script_with_tabs

if __name__ == "__main__":
    while True:
        run_script_no_tabs()
        run_script_with_tabs()
        time.sleep(3600)