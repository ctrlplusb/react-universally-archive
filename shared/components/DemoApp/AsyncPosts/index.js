import { createAsyncComponent } from 'react-async-component';

export default createAsyncComponent({
  resolve: () => System.import('./Posts'),
  ssrMode: 'boundary',
  name: 'AsyncPosts',
});
