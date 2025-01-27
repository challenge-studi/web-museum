import { artists } from './ArtistFixtures';

describe('Artists Fixtures', () => {
  it('should have at least one valid artist', () => {
    const artist = artists[0]; // On teste uniquement le premier artiste
    expect(artist).toBeTruthy(); // Vérifie que l'objet artiste existe
    expect(artist.id).toBeDefined(); // Vérifie que l'id existe
    expect(artist.name).toBeDefined(); // Vérifie que le nom existe
    expect(artist.lastname).toBeDefined(); // Vérifie que le prénom existe
    expect(artist.birthday).toBeDefined(); // Vérifie que la date de naissance existe
    expect(artist.death_date).toBeDefined(); // Vérifie que la date de décès existe
    expect(artist.birthday).toEqual(jasmine.any(Date)); // Vérifie que la date de naissance est un objet Date
    expect(artist.death_date).toEqual(jasmine.any(Date)); // Vérifie que la date de décès est un objet Date
  });
});
