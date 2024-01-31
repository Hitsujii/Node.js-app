const fs = require('fs');
const path = require('path');

class JsonHandler {
    constructor() {
        this.dataPath = path.join(__dirname);
    }

    loadDataFromFile(fileName) {
        try {
            const data = fs.readFileSync(path.join(this.dataPath, fileName), 'utf8');
            return JSON.parse(data);
        } catch (error) {
            throw new Error(`Error while reading file ${fileName}: ${error}`);
        }
    }

    saveDataToFile(fileName, data) {
        try {
            const dataString = JSON.stringify(data, null, 2);
            fs.writeFileSync(path.join(this.dataPath, fileName), dataString, 'utf8');
        } catch (error) {
            throw new Error(`Error while writing to file ${fileName}: ${error}`);
        }
    }
}

module.exports = new JsonHandler();
