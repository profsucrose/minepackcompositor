#!/bin/bash
source .minepackcompositor/main.sh
mv .minepackcompositor ~/.minepackcompositor
echo 'source ~/.minepackcompositor/main.sh' >> ~/.zshrc
echo 'source ~/.minepackcompositor/main.sh' >> ~/.bash_profile
npm i
rm init.sh