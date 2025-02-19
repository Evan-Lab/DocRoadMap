#!/bin/bash

if [ -f /etc/os-release ]; then
    . /etc/os-release
    DISTRO=$ID
else
    echo "Impossible to detect the OS"
    exit 1
fi

install_dependencies_os() {
    case $DISTRO in
        ubuntu/debian)
            echo "Installation packages on Ubuntu/Debian"
            sudo apt update -y
            sudo apt install -y python3 python3-pip wget python3-dev python3-venv gcc g++ make jq
            ;;
        fedora)
            echo "Installation packages on Fedora"
            sudo dnf update -y
            sudo dnf install python3 python3-pip wget python3-venv gcc g++ make jq
        ;;
    esac
}

source_dir=$(dirname "$0")
bearer_token=$(cat "$HOME/.cache/huggingface/token")

install_dependencies_os
cd "../$source_dir"
mkdir -p "models"
cd "models"
wget --header="Authorization: Bearer ${bearer_token}" -O mistral-7b-instruct-v0.3.Q6_K.gguf https://huggingface.co/bartowski/Mistral-7B-Instruct-v0.3-GGUF/resolve/main/Mistral-7B-Instruct-v0.3-Q6_K.gguf
cd ../
pip install llama-cpp-python