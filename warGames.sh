echo war games simulator write a number 4 digits
while read a
do
	echo $a > out.txt
	netcat $1 $2 < out.txt
	echo " "
done
