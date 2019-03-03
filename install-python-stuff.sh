#! /usr/bin/env bash

set -e

# you might need
# sudo apt-get install python-virtualenv
# and some other stuff for this to work

virtualenv --python=python3.6 venv

venv/bin/pip install -r requirements.txt
