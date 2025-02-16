import commandeMock from '../mock/commandes.json';
import { isCommandApi } from './CommandInterface';

describe('CommandeInterface', () => {
  console.log(commandeMock);

  it('isCommandApi should return true on correct value', () => {
    console.log(commandeMock);

    const dataCommandApiValid = commandeMock.data[0];
    expect(isCommandApi(dataCommandApiValid)).toBe(true);
  });

  it('isCommandAPi should return false on wrong value', () => {
    expect(isCommandApi('Mauvaise valeur, API est fou')).toBe(false);
  });
});
