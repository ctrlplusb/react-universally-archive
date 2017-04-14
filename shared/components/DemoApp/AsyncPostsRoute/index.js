import { asyncComponent } from 'react-async-component';

export default asyncComponent({
  resolve: () => System.import('./PostsRoute'),
  ssrMode: 'boundary',
  name: 'PostsRoute',
});
