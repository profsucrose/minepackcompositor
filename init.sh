#!/bin/bash
mv minepackcompositor ~/.minepackcompositor
source ~/.minepackcompositor/main.sh
echo 'source ~/.minepackcompositor/main.sh' >> ~/.zshrc
echo 'source ~/.minepackcompositor/main.sh' >> ~/.bash_profile
npm i
rm init.sh