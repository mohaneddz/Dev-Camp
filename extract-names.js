const fs = require('fs');

// Read the GeoJSON file
const data = JSON.parse(fs.readFileSync('public/dz.json', 'utf8'));

// Extract names and sort them
const names = data.features.map(feature => feature.properties.name).sort();

// Write the names to a new file
fs.writeFileSync('wilaya-names.json', JSON.stringify(names, null, 2));

console.log('Names extracted and saved to wilaya-names.json'); 