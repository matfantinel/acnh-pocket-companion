/// <reference lib="webworker" />

addEventListener('message', async ({ data }) => {
  if (data === 'start') {

    try {
      importCritterBase('fishes');
      importCritterBase('bugs');
      importCritterBase('seaCreatures');
      importFossils();
      importVillagers();
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
      const iconBase64 = await getImageBase64FromUrl(jsonObj['image_uri']);
      result.push({
        type: 'fossils',
        name: capitalize(jsonObj.name['name-USen']),
        museumPhrase: jsonObj['museum-phrase'],
        iconUri: jsonObj['image_uri'],
        iconBase64: iconBase64,
        price: jsonObj.price
      });
    }
    postMessage({ type: 'fossils', data: result });
  } catch (error) {
    console.error(error);
  }
}

async function importVillagers() {
  try {
    const response = await fetch(`../assets/data/villagers.json`);
    const jsonArray = await response.json();

    let result = [];
    for (const jsonObj of jsonArray) {
      const iconBase64 = await getImageBase64FromUrl(jsonObj['icon_uri']);
      result.push({
        type: 'villagers',
        name: capitalize(jsonObj.name['name-USen']),
        personality: jsonObj.personality,
        birthday: jsonObj['birthday-string'],        
        species: jsonObj.species,
        gender: jsonObj.gender,
        catchPhrase: jsonObj['catch-phrase'],
        iconUri: jsonObj['icon_uri'],
        iconBase64: iconBase64,
      });
    }
    result = result.sort((a, b) => a.name.localeCompare(b.name));
    postMessage({ type: 'villagers', data: result });
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
      result.push(await parseCritterBase(filename, jsonObj));
    }
    postMessage({ type: filename, data: result });
  } catch (error) {
    console.error(error);
  }
}

async function parseCritterBase(type: string, jsonObj: any) {
  const iconBase64 = await getImageBase64FromUrl(jsonObj['icon_uri']);
  return {
    type: type,
    name: capitalize(jsonObj.name['name-USen']),
    price: jsonObj.price,
    museumPhrase: jsonObj['museum-phrase'],
    iconUri: jsonObj['icon_uri'],
    iconBase64: iconBase64,
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

async function getImageBase64FromUrl(url: string) {
  const response = await fetch(url);
  const blob = await response.blob();
  return await convertBlobToBase64(blob);
}

function convertBlobToBase64(blob) {
  return new Promise(function(resolve, reject) {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
      resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });
}