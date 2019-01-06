var gameLocal;
var lastRequest;

function getPrologRequest(requestString, onSuccess, onError, port)
			{
				var requestPort = port || 8081
				var request = new XMLHttpRequest();
				request.open('GET', 'http://localhost:'+requestPort+'/'+requestString, true);

				request.onload = onSuccess || function(data){console.log("Request successful. Reply: " + data.target.response);};
				request.onerror = onError || function(){console.log("Error waiting for response");};

				request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
				request.send();
			}
		
			function makeRequest(requestString, game)
			{
				gameLocal = game;
				lastRequest = requestString;
				getPrologRequest(requestString, handleReply);
			}
			
			//Handle the Reply
			function handleReply(data){
				
				/* if(data.target.response = '400 (Bad Request)')
				makeRequest(lastRequest, gameLocal); */
				
				if(typeof gameLocal !== "undefined"){ 
					
				gameLocal.changeBoard(data.target.response);
			
				}

			
			
				
			}