# How to Install Mistral-7B

All instructions to install Mistral 7B

Version exact: Mistral-7B-Instruct-v0.3-Q6_K.gguf

## Requirements

### Hugging Face

#### On the website

Go to this website:
```bash
https://huggingface.co/settings/tokens
```

- Create your account
- Create your access token if necessary

!! Store your access token somewhere, as you won't be able to copy/paste it later. !!

#### On your computer
Start by creating a virtual environment in your project directory:
```bash
python -m venv .env
```

Activate the virtual environment. On Linux:
```bash
source .env/bin/activate
```

Activate virtual environment on Windows:
```bash
.env/Scripts/activate
```

Now you’re ready to install huggingface_hub
```bash
pip install --upgrade huggingface_hub
```

Install the CLI
```bash
pip install -U "huggingface_hub[cli]"
```

(REQUIRED if you want to install automatically) Login to Hugging Face, paste your access token
```bash
huggingface-cli login
```

Deactivate the virtual environment
```bash
deactivate
```

## Installation

### Script Bash

You can use directly the script bash in the folder:
```bash
install.sh
```

OS Supported:
- Fedora
- Ubuntu
- Debian

### Manually

#### Ubuntu / Debian

Update packages
```bash
sudo apt update -y
```

Install necessary packages
```bash
sudo apt install -y python3 python3-pip wget python3-dev python3-venv gcc g++ make jq
```

Create the folder "models" on the ia folders, where the mistral model will be stocked
```bash
mkdir -p models
```

Download the model
```bash
cd models
wget --header="Authorization: Bearer ${bearer_token}" -O mistral-7b-instruct-v0.3.Q6_K.gguf https://huggingface.co/bartowski/Mistral-7B-Instruct-v0.3-GGUF/resolve/main/Mistral-7B-Instruct-v0.3-Q6_K.gguf
cd ../
```

Install llama.cpp
```bash
pip install llama-cpp-python
```

## Test the model

To test the models, you have a test.py file in the installation folder.

You need to run it in the installation folder for it to work.

```bash
python test.py
```