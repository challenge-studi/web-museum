import { Artist } from '../models/ArtistInterface';

export const artists: Artist[] = [
  {
    id: 1,
    name: 'Vincent',
    lastname: 'Van Gogh',
    birthday: new Date('1853-03-30'),
    death_date: new Date('1890-07-29'),
  },
  {
    id: 2,
    name: 'Pablo',
    lastname: 'Picasso',
    birthday: new Date('1881-10-25'),
    death_date: new Date('1973-04-08'),
  },
  {
    id: 3,
    name: 'Leonardo',
    lastname: 'da Vinci',
    birthday: new Date('1452-04-15'),
    death_date: new Date('1519-05-02'),
  },
];
