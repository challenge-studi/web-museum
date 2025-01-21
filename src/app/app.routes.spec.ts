import { routes } from './app.routes';
import { HomeComponent } from './components/pages/home/home.component';

describe('Config routes', () => {
  it('should have the route home', () => {
    expect(routes).toContain({ path: '', component: HomeComponent });
  });
});
