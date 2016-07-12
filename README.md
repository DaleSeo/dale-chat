# dale-chat
Simple Chatting Server using NodeJS

# Run
- Memory DB version
```
node mb-server.js
```
- Mongo DB version
```
node web.js
```

# Test
- List up messags
```
curl http://localhost:3000/messages/list.json
```
- Create a message
```
curl -d 'name=Dale&message=Hi' http://localhost:3000/messages/create.json
 ```
