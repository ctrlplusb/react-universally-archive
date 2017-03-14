import Counter from '../Counter';

describe('Counter store', () => {
  it('initializes with zero count', () => {
    const store = new Counter();
    expect(store.count).toBe(0);
  });

  it('initializes with set count', () => {
    const store = new Counter({ count: 10 });
    expect(store.count).toBe(10);
  });

  it('increments count', () => {
    const store = new Counter();
    store.inc();
    expect(store.count).toBe(1);
  });

  it('decrements count', () => {
    const store = new Counter();
    store.dec();
    expect(store.count).toBe(-1);
  });

  it('pretty prints count', () => {
    const store = new Counter({ count: 12 });
    store.inc();
    expect(store.pretty).toBe('Counter is 13');
  });
});
