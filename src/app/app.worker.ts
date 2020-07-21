/// <reference lib="webworker" />

addEventListener('message', async ({ data }) => {
  if (data === 'start') {

    try {
      importCritterBase('fishes');
      importCritterBase('bugs');
      importCritterBase('seaCreatures');
      importFossils();
    } catch (error) {
      console.error(error);
    }
  }
});

function capitalize(str: string) { 
  return str.toLowerCase().replace(/(?:^|\s|["'([{])+\S/g, match => match.toUpperCase()); 
}

async function importFossils() {
  try {
    const response = await fetch(`../assets/data/fossils.json`);
    const jsonArray = await response.json();

    const result = [];
    for (const jsonObj of jsonArray) {
      result.push({
        type: 'fossils',
        name: capitalize(jsonObj.name['name-USen']),
        museumPhrase: jsonObj['museum-phrase'],
        iconUri: jsonObj['image_uri'],
        price: jsonObj.price
      });
    }
    postMessage({ type: 'fossils', data: result });
  } catch (error) {
    console.error(error);
  }
}

async function importCritterBase(filename: string) {
  try {
    const response = await fetch(`../assets/data/${filename}.json`);
    const jsonArray = await response.json();

    const result = [];
    for (const jsonObj of jsonArray) {
      result.push(parseCritterBase(filename, jsonObj));
    }
    postMessage({ type: filename, data: result });
  } catch (error) {
    console.error(error);
  }
}

function parseCritterBase(type: string, jsonObj: any) {
  return {
    type: type,
    name: capitalize(jsonObj.name['name-USen']),
    price: jsonObj.price,
    museumPhrase: jsonObj['museum-phrase'],
    iconUri: jsonObj['icon_uri'],
    availability: parseAvailability(jsonObj['availability'])
  }
}

function parseAvailability(jsonObj: any) {
  return {
    location: jsonObj.location,
    rarity: jsonObj.rarity,
    time: jsonObj.time,
    isAllDay: jsonObj.isAllDay,
    isAllYear: jsonObj.isAllYear,
    monthsNorthernHemisphere: jsonObj['month-array-northern'],
    monthsSouthernHemisphere: jsonObj['month-array-southern'],
    hoursOfDay: jsonObj['time-array']
  }  
}
