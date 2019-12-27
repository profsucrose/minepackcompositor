gen-res-pack() {
	if [[ "`pwd`" == *"minepackcompositor"* ]]; then
		node . $*
	else
		echo "You must be in your MinePackCompositor directory to run this command!"
	fi
}
