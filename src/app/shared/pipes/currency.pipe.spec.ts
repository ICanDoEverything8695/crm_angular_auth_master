import { CurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new CurrencyPipe();
    expect(pipe).toBeTruthy();
  });

  it('currency pipe should convert Googolplexs stage', () => {
    const pipe = new CurrencyPipe();
    const num = 4939503493;
    expect(pipe.transform(num)).toEqual('4.9B');
  });

  it('currency pipe should convert Millions number', () => {
    const pipe = new CurrencyPipe();
    const num = 2395923;
    expect(pipe.transform(num)).toEqual('2.4M');
  });

  it('currency pipe should convert Thousands number', () => {
    const pipe = new CurrencyPipe();
    const num = 34302;
    expect(pipe.transform(num)).toEqual('34.3K');
  });

  it('currency pipe should convert Small number', () => {
    const pipe = new CurrencyPipe();
    const num = 343;
    expect(pipe.transform(num)).toEqual('343');
  });
});
