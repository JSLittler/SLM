import ATTRIBUTE_CONSTANTS from '../constants/attributeConstants.js';

const { DEFENCE_ATTRIBUTES, ATTACK_ATTRIBUTES } = ATTRIBUTE_CONSTANTS;

const updateAttributeValue = attributeValue => {
  const updatedValue = attributeValue += Math.floor(Math.random() * 20);

  return updatedValue < 100 ? updatedValue : 100;
};

export const updatePlayerAttributes = basePlayers => {
  const updatedPlayers = basePlayers.map(p => {
    return {
      name: p.name,
      club: p.club,
      positions: p.positions,
      attributes: p.attributes.map((attribute) => {
        return {
          attributeName: Object.keys(attribute)[0],
          attributeBaseValue: Object.values(attribute)[0],
          attributeFinalValue: updateAttributeValue(Object.values(attribute)[0])
        }
      }),
    };
  });

  return updatedPlayers;
};

const getAverageAttribute = attributes => {
  const attributeTotals = attributes.map(a => a.attributeFinalValue);
  
  return Math.round(attributeTotals.reduce((a, b) => a + b) / attributeTotals.length);
}

const addGoalKeeperAverage = player => {
  const { attributes } = player;

  return {
    ...player,
    attributesAverages: [{ attributeName: 'goalKeeperAverage', attributeFinalValue: getAverageAttribute(attributes) }],
  };
};

const getAttributes = (attributesArray, attributeNames) => {
  return attributesArray.filter(a => attributeNames.includes(a.attributeName));
};

const addOutfieldAverages = player => {
  const { attributes } = player;
  const defenceAttributes = getAttributes(attributes, DEFENCE_ATTRIBUTES);
  const attackAttributes = getAttributes(attributes, ATTACK_ATTRIBUTES);

  return {
    ...player,
    attributesAverages: [
      { attributeName: 'defenceAverage', attributeFinalValue: getAverageAttribute(defenceAttributes) },
      { attributeName: 'midfieldAverage', attributeFinalValue: getAverageAttribute(attributes) },
      { attributeName: 'attackAverage', attributeFinalValue: getAverageAttribute(attackAttributes) },
    ],
  };
};

export const getPlayers = (fs, playerDataPath) => {
  const players = JSON.parse(fs.readFileSync(playerDataPath, 'utf-8')).playersArray;

  const updatedPlayers = updatePlayerAttributes(players);
  return updatedPlayers.map(p => p.positions.includes('GK') ? addGoalKeeperAverage(p) : addOutfieldAverages(p));
};
