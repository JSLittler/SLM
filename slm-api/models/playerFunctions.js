const updateAttributeValue = (attributeValue) => {
  const updatedValue = attributeValue += Math.floor(Math.random() * 20);

  return updatedValue < 100 ? updatedValue : 100;
};

export const updatePlayerAttributes = (basePlayers) => {
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

export const getPlayers = (fs, playerDataPath) => {
  const players = JSON.parse(fs.readFileSync(playerDataPath, 'utf-8')).playersArray;

  return updatePlayerAttributes(players);
};
