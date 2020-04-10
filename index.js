const app = require('./app');

app.listen(process.env.PORT||8000,process.env.IP,()=>{
	console.log(`Server listening on host localhost and on port 8000`);
});