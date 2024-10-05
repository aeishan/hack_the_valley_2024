REM type dependency_script.bat in cmd in the directory of this file
REM to set up a virtual environment and install dependencies for the project
@echo off
python -m venv myenv
call myenv\Scripts\activate
pip install matplotlib flax tensorflow torch transformers Flask
pip install tf-keras
