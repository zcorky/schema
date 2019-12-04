import DEFAULT_LOCALE from '../langs/en_US';

export class LocaleProvider {
  private locale = DEFAULT_LOCALE;

  public set(locale: typeof DEFAULT_LOCALE) {
    this.locale = locale;
  }

  public get(): typeof DEFAULT_LOCALE {
    return this.locale;
  }

  public format(message: string) {
    return Object.keys(this.locale).reduce((_message, key) => {
      // @BUG
      return _message.replace(key, this.locale[key]);
    }, message);
  }
}

export const locale = new LocaleProvider();