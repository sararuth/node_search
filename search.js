const path = require('path');
const fs = require('fs');
let extension = process.argv[2]; 
let text = process.argv[3];
let filesPath = [];
let queueDirs = [];

const search = (directory) => {
	let files = fs.readdirSync(directory);
	files.forEach (file => {
		if (fs.lstatSync(file).isDirectory()){
			let tempDirectory = path.join(directory, file);
			queueDirs.push(tempDirectory);
        }
		if (validFile (file, extension, text)){
			let data = fs.readFileSync(file, {encoding: 'utf-8'});
			if (data.indexOf(text) !== -1){
			    let result = path.join(directory, file);
			    console.log(result)
			    filesPath.push(result);
			}
		}
    });
}

const validFile = (file, extension) => {
    let fileExt = path.parse(file).ext;
	let  fileName = path.parse(file).name;
	if ("." + extension === fileExt){
		return true;
    }
	return false;	
}

do {
	search (process.cwd());
	let dir = queueDirs.shift();
	process.chdir(dir);	
	
} while (queueDirs.length > 0);

