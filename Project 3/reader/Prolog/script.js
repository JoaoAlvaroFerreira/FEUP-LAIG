var gameLocal;

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
				// Make Request
				getPrologRequest(requestString, handleReply);
			}
			
			//Handle the Reply
			function handleReply(data){
				
				//if(data.target.response.isArray())
				if(typeof gameLocal !== "undefined")
				gameLocal.changeBoard(data.target.response);

				
			}