function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function blTransOp(startBlockNumber, endBlockNumber) {
    
  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
  var bltransCount = eth.getBlockTransactionCount(i);
  
	var bl = eth.getBlock(i);
    var blockdata = ["{"+'"blockNumber":' +bl.number
	  + ',"blockHash":"' + bl.hash 
	  + '","blockSize":' + bl.size 
	  + ',"timeStamp":' + bl.timestamp 
	  + ',"difficulty":' + bl.totalDifficulty 
      + ',"nonce":"' + bl.nonce
	  + '","miner":"' + bl.miner 
      + '","gasLimit":' + bl.gasLimit 
      + ',"gasUsed":' + bl.gasUsed 
	  + ',"numberofTransactions":' + bltransCount];

		if (bltransCount > 0) {
			var transstr = [];
			var transdata1 = [];
			var count = 0;
		for (var j = 0 ; j < bltransCount; j++){
			
			var txH = bl.transactions[j];
			var dbug = debug.traceTransaction(txH);
			var numLogs = dbug.structLogs.length;
			
			var transdata2 = [];
			var transdata3 = [];
			var transstr2 = [];
			var transdata1 = [',"transactions":{'  +  '"transactionHash":"' + txH + '","numberofLogs":'  + numLogs];
				if(numLogs > 0){
				count = count+1;
			for (var k = 0 ; k < numLogs; k++){
				transdata2 =  curl localhost:8545 -X POST --header 'Content-type: application/json' --data '{ "jsonrpc":"2.0", "method":"debug_traceTransaction", "params":["0x67e356eb2867ae23f746a59b4ee8b428a43731f67de1bc213c3c4c7db1f08a6f", {"disableStack": true, "disableMemory": true, "disableStorage": false}], "id":1}';
			transstr2 += [transdata2];
						}
						
				}else if(numLogs == 0){transstr2 = "}"}
			transstr += [transdata1 + transstr2];
			}
		var str = [blockdata+ ',"ContractTransactions":' + count , transstr + "}"];

		}else{var str = [blockdata+  "}"];}
		
		console.log(str.join(""));
	}
}

blTransOp(0,10000)