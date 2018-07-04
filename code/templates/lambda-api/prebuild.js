const fs = require('fs');
const path = require('path');

const modelDir = path.join(__dirname, 'src', 'model');
const configFile = path.join(__dirname, 'infrastructure', 'cf', 'lambda-api.json');
const newConfigFile = path.join(__dirname, 'infrastructure', 'cf', 'template.json');
const apiFile = path.join(__dirname, 'infrastructure', 'cf', 'apiDefinition.json');
const models = fs.readdirSync(modelDir);
const oldAPI = JSON.parse(fs.readFileSync(apiFile));
const template = JSON.parse(fs.readFileSync(configFile));
for (let i = 0; i < models.length; i += 1) {
  const model = models[i];
  const modelFile = JSON.parse(fs.readFileSync(path.join(modelDir, model)));
  oldAPI.definitions[model.replace('.json', '')] = modelFile;
}
template.Resources.ServerlessRestApi.Properties.DefinitionBody = oldAPI;
fs.writeFileSync(newConfigFile, JSON.stringify(template, null, '\t'));
