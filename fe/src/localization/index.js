import { en } from './en';
import { uk } from './uk';

const languages = { en, uk };

const currentLanguage = languages[navigator.language];
const constants = currentLanguage ? currentLanguage : en; // en by default

export default constants;
