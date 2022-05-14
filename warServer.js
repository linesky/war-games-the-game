var fs = require("fs"); 
var nt = require("net");
var atm_id=Array(1500);
var atm_value=Array(1500);
var atm_id_count=1;
var srv=nt.createServer();
srv.on("connection",Connection);

srv.listen(8080,function(){
	console.log("war game  simulates game server")
});

function Connection(connection){
connection.on('data',onData);
connection.on('close',onClose);
connection.on('error',onError);
	function onData(data){
		var vv=0;
		var n=0;
		var z=0;
		var t=0;
		var ref="";
		ref=connection.remoteAddress.toString();
		vv=data.toString();
		vv=vv.replace("\n","");
		vv=vv.replace("\r","");
		if(vv.length==4){
			for (n=0;n<atm_id_count;n++){
				if(ref==atm_id[n]){
					z=1;
					var m=atm_value[n].split("");
					var mm=vv.split("");
					var nn=0;
					var ss="";
					for(nn=0;nn<4;nn++){
						if(mm[nn]==m[nn]){
							ss=ss+mm[nn].toString();
						}else{
							ss=ss+"*";
						}
					}
					connection.end("	="+ss);
					console.log(ref+" "+atm_value[n]+" "+ss.toString());
				}
			}
			if(z==0){
				var n=0
				atm_id[atm_id_count]=ref
				atm_value[atm_id_count]=""
				for(n=0;n<4;n++){
					atm_value[atm_id_count]=atm_value[atm_id_count]+(Math.floor(Math.random()*9)).toString();
				}
				var m=atm_value[atm_id_count].split("");
				var mm=vv.split("");
				var nn=0;
				var ss="";
				for(nn=0;nn<4;nn++){
					if(mm[nn]==m[nn]){
						ss=ss+mm[nn].toString();
					}else{
						ss=ss+"*";
					}
				}
				connection.end("	="+ss);
				console.log(ref+" "+atm_value[atm_id_count]+" "+ss.toString());
				atm_id_count++;
			}
		}else{
			connection.end("the code must have 4 digits	=");
		}	
		
		
	}
	function onClose(){
		connection.destroy();
	}
	function onError(data){
		console.log(data);
		connection.destroy();
	}



}
