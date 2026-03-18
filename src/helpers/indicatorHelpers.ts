import { AppTagsVariant } from "@/components/global/AppTags";
import { IndicatorType } from "@/types/indicator";

export const TYPE_ICONS: Record<IndicatorType, string> = {
  ip: '⬡',
  domain: '◎',
  hash: '#',
  url: '🔗',
};

export const TAG_VARIANTS: Record<string, AppTagsVariant> = {
  'tor-exit': 'red',
  'scanner': 'blue',
  'brute-force': 'teal',
  'proxy': 'gray',
  'botnet': 'red',
  'vpn': 'gray',
  'mining': 'teal',
  'ddos': 'red',
  'ssh-attack': 'red',
  'smtp-spam': 'red',
  'c2': 'purple',
  'malware': 'red',
  'phishing': 'red',
  'dga': 'gray',
  'fast-flux': 'blue',
  'typosquat': 'gray',
  'sinkhole': 'gray',
  'parking': 'gray',
  'exploit-kit': 'red',
  'ransomware': 'red',
  'trojan': 'red',
  'backdoor': 'blue',
  'dropper': 'purple',
  'worm': 'gray',
  'infostealer': 'gray',
  'rat': 'purple',
  'cryptominer': 'purple',
  'rootkit': 'purple'
};