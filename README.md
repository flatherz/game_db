# Videogame Database Microservice

### Request Data
- Requests to the Videoame Database Microservice are made by making a GET request with a single query parameter called 'game' to this URL: http://flip1.engr.oregonstate.edu:5000/search. 
- For example, if I wanted to search for the game *Frogger*, I would make a GET request that looks like this: http://flip1.engr.oregonstate.edu:5000/search?game=Frogger. Such a GET request can be made via CURL, an HTML form, or however else one would like.
- The top 10 search results are returned.

### Receive Data
The microservice response is a JSON object which can be parsed using the JSON parser of your choice. It will have the following name/value pairs.

![image](https://user-images.githubusercontent.com/122326493/218616127-15c81c45-529e-4bdf-a246-823609877051.png)
Note the first id is the game id, the second id is in cover sub-heading and is the cover id that associated the cover art to the game. The url is also in the cover sub-heading and links to videogame art.

### Sequence Diagram
Here is a diagram that shows you the sequence of events that occurs when you make a request.

![image](https://user-images.githubusercontent.com/122326493/218615832-139e909d-cd44-442b-9773-6039f039c804.png)

UML sequence diagram showing how requesting and receiving data work. Make it detailed enough that your partner (and your grader) will understand

### Help & Tips
- You can check to see if the microservice is up and running by checking this URL: http://flip1.engr.oregonstate.edu:5000/
- The microservice is running on the flip server, so make sure you are logged in to the VPN to use it.
- Different browsers handle raw JSON differently. If you are trying to understand how the JSON response is formatted, try making your request in Firefox or Edge.
