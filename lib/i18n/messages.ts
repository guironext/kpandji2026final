import type { Locale } from "@/lib/i18n/config";
import { footerMessages, type FooterMessages } from "@/lib/i18n/messages/footer";
import { headerMessages, type HeaderMessages } from "@/lib/i18n/messages/header";

export type { FooterMessages, HeaderMessages };

export type Messages = {
  header: HeaderMessages;
  footer: FooterMessages;
};

export function getMessages(locale: Locale): Messages {
  return {
    header: headerMessages[locale],
    footer: footerMessages[locale],
  };
}

/** @deprecated Prefer getMessages(locale).header */
export function getHeaderMessages(locale: Locale): HeaderMessages {
  return headerMessages[locale];
}
