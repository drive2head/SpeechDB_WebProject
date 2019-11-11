let entity = require("./entity.js"); /* only for debug */
let userAuth = require("./userAuth.js");
let graphDB = require("./graphDB.js");
let log = require("./log.js");

const express = require('express');
const app = express();

app.use(express.urlencoded());
app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Port: ${port}`));

async function userExist(username, password)
{
	let user = await userAuth.getUser(username);
	if (user === null)
		return false;
	if (user.password !== password)
		return false;
	return user;
}

app.post('/signin', (req, res) => {
    let username = req.body.username,
        password = req.body.password;

    userExist(username, password)
    .then(result => {
    	const completed = Boolean(result);
    	log.addLog(req.body.username, 'access.signin', 'userExist', completed, result, '/signin');
    	res.send(result);
    });
});

app.post('/signup', (req, res) => {
    let username = req.body.username,
        password = req.body.password,
        name = req.body.name,
        surname = req.body.surname;
    // добавить проверку того, что юзер не существует
    userAuth.addUser(username, password, name, surname);
    // log.addLog(req.body.username, 'access.signup', null, true, JSON.stringify(result), '/signup');
    res.send(true);
});

app.post('/person', (req, res) => {
    let username = req.body.username,
        password = req.body.password;
        
    userExist(username, password)
    .then(result => {
    	const completed = Boolean(result);
    	log.addLog(req.body.username, 'access.profile', 'userExist', completed, result, '/person');
    	res.send(result);
    });
});

app.post('/add_data', (req, res) => {
<<<<<<< HEAD
	console.log(req.body.record);
=======
>>>>>>> c6ca0af3876bd84e52e791e7176c0da6b3f84523
	graphDB.addRecordPersonPhonemes(req.body.record, req.body.person, req.body.sounds)
	.then(result => {
		log.addLog(req.body.username, 'query.add', 'graphDB.addRecordPersonPhonemes', result.completed, result.output, '/add_data');
		if (result.completed) {
			res.send("Data was successfully loaded!");
		}
		else {
			res.send("Data WAS NOT loaded!");
		}
	});
});

app.post('/change_person', (req, res) => {
	// let person = entity.Person('James', 'English', 'New York', 'USA');
	let result = graphDB.changePerson(req.body.person, req.body.id)
	.then(result => {
		log.addLog(req.body.username, 'query.change', 'graphDB.changePerson', result.completed, result.output, '/change_person');
		if (result.completed) {
			res.send("Person was successfully changed!");
		}
		else {
			res.send("Person WAS NOT changed!");
		}
	});
});

app.post('/change_phoneme', (req, res) => {
	// let phoneme = entity.Phoneme('a', '0.123', '0.456', 'german');
	let result = graphDB.changePhoneme(req.body.phoneme, req.body.id)
	.then(result => {
		log.addLog(req.body.username, 'query.change', 'graphDB.changePhoneme', result.completed, result.output, '/change_phoneme');
		if (result.completed) {
			res.send("Phoneme was successfully changed!");
		}
		else {
			res.send("Phoneme WAS NOT changed!");
		};
	});
});

// app.get('/get_data', (req, res) => {
	/* smth */
// });
