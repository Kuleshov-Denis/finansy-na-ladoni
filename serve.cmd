@echo off
cd /d "%~dp0"
python -m http.server 4174 --bind 127.0.0.1
