import DATA_PATH_CONSTANTS from '../constants/dataPathConstants.js';

export const getTeamNames = (fs) => {
  return JSON.parse(fs.readFileSync(DATA_PATH_CONSTANTS.teamNamesDataPath, 'utf-8')).teamNames;
};

export const getFormations = (fs) => {
  return JSON.parse(fs.readFileSync(DATA_PATH_CONSTANTS.formationsDataPath, 'utf-8')).formations;
};
