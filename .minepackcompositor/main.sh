gen-res-pack() {
	if [[ "`pwd`" == *"MinePackCompositor"* ]]; then
		node . $*
	else
		echo "You must be in your MinePackCompositor directory to run this command!"
	fi
}
