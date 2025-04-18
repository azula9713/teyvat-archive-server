import { EnkaClient } from "enka-network-api";

const enka = new EnkaClient({
  defaultLanguage: "en",
  githubToken: process.env.AUTH_TOKEN,
  cacheDirectory: "/tmp/enka-cache"
});

enka.cachedAssetsManager.activateAutoCacheUpdater({
  instant: true, // Run the first update check immediately
  timeout: 60 * 60 * 24 * 1000, // 1 day interval
  onUpdateStart: async () => {
    console.log("Updating Genshin Data...");
  },
  onUpdateEnd: async () => {
    enka.cachedAssetsManager.refreshAllData(); // Refresh memory
    console.log("Genshin Data Updated!");
  }
});

export function getAllCharactersFromEnka() {
  return enka.getAllCharacters();
}

export function getCharacterByIdFromEnka(id: number, skillDepotId: number) {
  return enka.getCharacterById(id, skillDepotId);
}

export function getAllWeaponsFromEnka() {
  return enka.getAllWeapons();
}

export const getWeaponByIdFromEnka = (id: string) => {
  return enka.getWeaponById(id);
};

export const getAllArtifactsFromEnka = () => {
  return enka.getAllArtifacts();
};

export const getAllArtifactSetsFromEnka = () => {
  return enka.getAllArtifactSets();
};

export const getArtifactSetByIdFromEnka = (id: string) => {
  return enka.getArtifactSetById(id);
};

export function getMaterialByEnkaId(materialId: number) {
  return enka.getMaterialById(materialId);
}

export function refetchEnkaCache() {
  return enka.cachedAssetsManager.fetchAllContents();
}
