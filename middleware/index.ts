import { authMiddleware as auth } from "./auth.middleware";
import { i18nMiddleware as i18n } from "./i18n.middleware";

export const i18nMiddleware = i18n;

export const authMiddleware = auth;
