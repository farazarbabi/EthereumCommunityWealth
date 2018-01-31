//Javascript to exctract block data, transaction data and history of opcodes based on Ethereum start and end block numbers

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function blTransOp(startBlockNumber, endBlockNumber) {
	
//outer loop to trace each block data	
  for (var i = startBlockNumber; i <= endBlockNumber; i++) {
  var bltransCount = eth.getBlockTransactionCount(i);
    
	var bl = eth.getBlock(i);
    var blockdata = ["{"+'"blockNumbr":' +bl.number
	  + ',"blockHash":"' + bl.hash 
	  + '","blockSize":' + bl.size 
	  + ',"timeStamp":' + bl.timestamp 
	  + ',"difficulty":' + bl.totalDifficulty 
      + ',"nonce":"' + bl.nonce
	  + '","miner":"' + bl.miner 
      + '","gasLimit":' + bl.gasLimit 
      + ',"gasUsed":' + bl.gasUsed 
	  + ',"numbrofTransactions":' + bltransCount];

		if (bltransCount > 0) {
			var transstr = [];
			var transdata1 = [];
			var count = 0;
		//middle loop to trace transactions
		for (var j = 0 ; j < bltransCount; j++){
			
			var txH = bl.transactions[j];
			var dbug = debug.traceTransaction(txH);
			var numLogs = dbug.structLogs.length;
			var transdata2 = [];
			var transdata3 = [];
			var transdata4 = [];
			var transstr2 = [];
			var transdata1 = ['"transactions":{'  +  '"transactionHash":"' + txH + '","numbrofLogs":'  + numLogs];
				if(numLogs > 0){
				count = count+1;
			//inner loop to trace history of opcodes, etc.
			for (var k = 0 ; k < numLogs; k++){
				transdata2 = ['{"pc":' + dbug.structLogs[k].pc  
				+ ',"op":' + '"' + dbug.structLogs[k].op + '"' 
				+ ',"gas":' + dbug.structLogs[k].gas 
				+ ',"gasCost":' + dbug.structLogs[k].gasCost  
				+ ',"depth":' + dbug.structLogs[k].depth ];
				
				if (isEmpty(dbug.structLogs[k].stack) == true){
				 transdata3 = [',"stack":[]' ];
					 }else if(isEmpty(dbug.structLogs[k].stack) == false){
					 transdata3 = ',"stack":' + '["'+ dbug.structLogs[k].stack.join("\",\"")  +'"]'}
					 
				if (isEmpty(dbug.structLogs[k].memory) == true){
				 transdata4 = [',"memory":[]' ];
					 }else if(isEmpty(dbug.structLogs[k].stack) == false){
					 transdata4 = ',"memory":' + '["'+  dbug.structLogs[k].memory.join("\",\"")  +'"]' }

				//	if (isEmpty(dbug.structLogs[k].storage) == true){
				//	transdata3 = ['{}' ];
					//}else if(isEmpty(dbug.structLogs[k].storage) == false){
					// transdata3 = dbug.structLogs[k].storage;
						//	}
				var transdata5 = transdata2 + transdata3 + transdata4 + '}';
				
				if (k < (numLogs-1)){transstr2 += [transdata5+ ',']} else{transstr2 += [transdata5]}		
					}
						
			transstr += [',' +transdata1 + ',"structLogs":[' +transstr2+ "]}"];
				}else if(numLogs == 0){transstr += [',' + transdata1 + '}']}
			
			}
		var str = [ blockdata+ ',"contractTransactions":' + count + transstr + "},"];

		}else{var str = [ blockdata+  "},"];}
		
		console.log(str);
	}
}

blTransOp(0,10000)
