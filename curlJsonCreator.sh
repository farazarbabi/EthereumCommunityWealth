#!/bin/bash


for i in {1..1000};  do  BLOCK=$i; B LOCKNO="0x"`echo "obase=16; ${BLOCK}" | bc`; BLOCKHX= `echo "\""$BLOCKNO"\""`; BLOCKDATA=$(curl localhost:8 545 -X POST --header 'Content-type: application/json'  --data '{"jsonrpc":"2.0","method":"eth_getBlockByNum ber","params":[$BLOCKNOQ, true],"id":1}'); echo ${BLO CKDATA}; done