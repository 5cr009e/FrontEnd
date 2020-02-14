var fs = require('fs')
var path = require('path');

function createDir(fname){
    try{
        fs.mkdirSync(fname)
        console.log(`Created directory: ${fname}`);
    } catch(err){
        if(err.code == 'EEXIST')
        {
            console.log(`Directory ${fname} already exist.`);
        } else{
            console.log(err);
        }
    }
}

function createFile(root_dir, fname){
    fs.readFile(path.join(__dirname, fname), 'utf8', function(err, contents) {
        if(err){
            return console.log(err);
        }
        fs.writeFile(path.join(root_dir, fname), contents, function(err) {
            if(err) {
                return console.log(err);
            }
            console.log(`File ${fname} created.`);
        });
    });
}

function main(){
    const args = process.argv;
    root_dir = args[2];
    createDir(root_dir);
    const dirs = ["css", "img", "js"]
    dirs.forEach(dir => createDir(path.join(root_dir,dir)))
    const files = ["index.html","css/style.css","js/index.js"]
    files.forEach(fn => createFile(root_dir, fn))
}

main()
