import { EthXPage } from './app.po';

describe('eth-x App', () => {
  let page: EthXPage;

  beforeEach(() => {
    page = new EthXPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
