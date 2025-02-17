import expositionsMock from '../mock/exposition.json';
import { isExpositionApi } from './ExpositionInterface';

describe('ExpositionInterface', () => {
  it('isExpositionApi shoud return true on correct value', () => {
    const correctExpo = expositionsMock[0];
    expect(isExpositionApi(correctExpo)).toBe(true);
  });

  it('isExpostionApi shoud return false on wrong value', () => {
    expect(isExpositionApi('Api part en vrille')).toBe(false);
  });
});
