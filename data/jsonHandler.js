const fs = require('fs');
const path = require('path');

const loadDataFromFile = (fileName) => {
    try {
        const data = fs.readFileSync(path.join(__dirname, fileName), 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Error while reading file ${fileName}: ${error}`);
    }
};

const saveDataToFile = (fileName, data) => {
    try {
        const dataString = JSON.stringify(data, null, 2);
        fs.writeFileSync(path.join(__dirname, fileName), dataString, 'utf8');
    } catch (error) {
        throw new Error(`Error while writing to file ${fileName}: ${error}`);
    }
};

module.exports = {
    loadDataFromFile,
    saveDataToFile
};
