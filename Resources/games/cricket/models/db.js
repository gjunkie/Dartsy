
var createOrRunDb = function(){
	// Create/Open database and its table with columns
//var db = Ti.Database.open('gameData.db');
//db.execute('CREATE TABLE IF NOT EXISTS PlayerInfo (id INTEGER PRIMARY KEY, name TEXT NOT NULL, total_wins INTEGER NOT NULL, cricket_wins INTEGER NOT NULL, rounds INTEGER NOT NULL, throws NOT NULL, bull INTEGER NOT NULL, "20" INTEGER NOT NULL, nineteen INTEGER NOT NULL, eighteen INTEGER NOT NULL, seventeen INTEGER NOT NULL, sixteen INTEGER NOT NULL, fifteen INTEGER NOT NULL, fourteen INTEGER NOT NULL, thirteen INTEGER NOT NULL, twelve INTEGER NOT NULL, eleven INTEGER NOT NULL, ten INTEGER NOT NULL, nine INTEGER NOT NULL, eight INTEGER NOT NULL, seven INTEGER NOT NULL, six INTEGER NOT NULL, five INTEGER NOT NULL, four INTEGER NOT NULL, three INTEGER NOT NULL, two INTEGER NOT NULL, one INTEGER NOT NULL)');
//db.execute('CREATE TABLE IF NOT EXISTS PlayerInfo3 (id INTEGER PRIMARY KEY, name TEXT)');



var db2 = Ti.Database.open('PlayerInfo5.db');
db2.execute('CREATE TABLE IF NOT EXISTS playersTabels5 (id INTEGER PRIMARY KEY, name TEXT NOT NULL, total_wins INTEGER, cricket_wins INTEGER, rounds INTEGER, throws INTEGER, bull INTEGER, "count_20" INTEGER, "count_19" INTEGER, "count_18" INTEGER, "count_17" INTEGER, "count_16" INTEGER, "count_15" INTEGER, fourteen INTEGER, thirteen INTEGER, twelve INTEGER, eleven INTEGER, ten INTEGER, nine INTEGER, eight INTEGER, seven INTEGER, six INTEGER, five INTEGER, four INTEGER, three INTEGER, two INTEGER, one INTEGER)');



// db2.execute('CREATE TABLE IF NOT EXISTS playersTabels5 (id INTEGER PRIMARY KEY, name TEXT NOT NULL, total_wins INTEGER)');
// db2.execute('CREATE TABLE IF NOT EXISTS Cricket (id INTEGER, cricket_wins INTEGER, throws INTEGER, bull INTEGER, "count_20" INTEGER, "count_19" INTEGER, "count_18" INTEGER, "count_17" INTEGER, "count_16" INTEGER, "count_15" INTEGER,)');

var testRS = db2.execute('SELECT id,name FROM playersTabels5');
while (testRS.isValidRow())
{
  var myKey = testRS.fieldByName('id');
  var fieldA = testRS.fieldByName('name');
  debug('row data = ' + myKey + ' / ' + fieldA);
  testRS.next();
}
testRS.close();
//db.remove();

}


// Check Player name
// If player name is not in database, add new one
var checkForNewPlayer = function(playerName){
	var playerExists = db2.execute("SELECT * FROM playersTabels4 WHERE name = '" + playerName + "'");
	if (playerExists.isValidRow()){
		debug('its there')
	} else {
		debug('not there');
		db2.execute('INSERT INTO playersTabels5 (name) VALUES (?)',playerName);
	}
}



	// db = Ti.Database.open('gameData.db');
	// db.execute('INSERT INTO PlayerInfo3 (id, name) VALUES (?,?)', 2,playerName);
	
	//db2.execute('INSERT INTO PlayerInfo (name) VALUES (?)',playerName);
	// db2.execute('INSERT INTO table1 (fieldA, fieldB) VALUES (?,?)', 234,'this is row 2');
	// db2.execute('INSERT INTO table1 (fieldA, fieldB) VALUES (?,?)', 345,'this is row 3');
	// db2.execute('INSERT INTO table1 (fieldA, fieldB) VALUES (?,?)', 456,'this is row 4');

