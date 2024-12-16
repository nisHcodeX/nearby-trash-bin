import { Session } from "@core/interface";
import Cookies from 'js-cookie';

export const getCookiesValue = (key: string, needDecrypt = false) => { return Cookies.get(key) };

export const getSession = (): Session | null => {
    let str;
    str = localStorage.getItem('tb-u-in');
    let session: Session | null = null;
    if (str) {
      session = JSON.parse(str);
      return session;
    } else {
      str = getCookiesValue('tb-u-in');
      if (str) {
        session = JSON.parse(str);
        return session;
      } else return session
    }
  }

  export const setSession = (session : Session) => {
  
    localStorage.setItem('tb-u-in', JSON.stringify(session));
    localStorage.setItem('tb-u-ses', session.token);
  
    Cookies.set('tb-u-in', JSON.stringify(session), {
      domain: process.env.REACT_APP_DOMAIN_URL,
      // expires: new Date()
    });
    Cookies.set('tb-u-ses', session.token, {
      domain: process.env.REACT_APP_DOMAIN_URL,
      // expires: new Date()
    });
  }

  export const logoutUser = () => {

    localStorage.removeItem('tb-u-in');
    localStorage.removeItem('tb-u-ses');
    Cookies.remove('tb-u-in', { domain: process.env.REACT_APP_DOMAIN_URL });
    Cookies.remove('tb-u-ses', { domain: process.env.REACT_APP_DOMAIN_URL });
    window.open('/', '_self');
  }
  