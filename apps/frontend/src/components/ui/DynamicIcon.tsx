import {
  Shield, 
  BrainCircuit,
  BrickWallShield,
  FishIcon,
  Rocket,
  Flame,
  ShieldCheck,
  KeyRound,
  ShieldQuestionMark,
  Footprints,
  BookType,
  BotMessageSquare,
  BriefcaseBusiness,
  Cable,
  Cast,
  DoorOpen,
  Ghost,
  Headset,
  LaptopMinimal,
  LockKeyhole,
  MailWarning,
  MessageSquareOff,
  QrCode,
  Router,
  Scale,
  ScanEye,
  ShieldPlus,
  Sparkle,
  Sparkles,
  Swords,
  VenetianMask,
  WifiOff,
  FingerprintPattern,
  FileLock,
  Bomb,
  Bot,
  Crosshair,
  MonitorSmartphone,
  Users,

} from 'lucide-react';

const ICON_MAP = {
  shield: Shield,
  'brain-circuit': BrainCircuit,
  'brick-wall-shield': BrickWallShield,
  'fishing-hook': FishIcon,
  'shield-check': ShieldCheck,
  rocket: Rocket,
  flame: Flame,
  'key-round': KeyRound,
  'shield-question-mark': ShieldQuestionMark,
  footprints: Footprints,
  'book-type': BookType,
  'bot-message-square': BotMessageSquare,
  'briefcase-business': BriefcaseBusiness,
  cable: Cable,
  cast: Cast,
  'door-open': DoorOpen,
  'file-lock': FileLock,
  'fingerprint-pattern': FingerprintPattern,
  ghost: Ghost,
  headset: Headset,
  'laptop-minimal': LaptopMinimal,
  'lock-keeyhole': LockKeyhole,
  'mail-warning': MailWarning,
  'message-square-off': MessageSquareOff,
  'qr-code': QrCode,
  router: Router,
  scale: Scale,
  'scan-eye': ScanEye,
  'shield-plus': ShieldPlus,
  sparkles: Sparkles,
  swords: Swords,
  'venetian-mask': VenetianMask,
  'wifi-off': WifiOff,
  bomb: Bomb,
  bot: Bot,
  crosshair: Crosshair,
  'monitor-smartphone': MonitorSmartphone,
  users: Users,
  default: Shield
};

interface DynamicIconProps {
  name: string;
  className?: string;
}

export function DynamicIcon({ name, className }: DynamicIconProps) {
  const normalizedName = name?.toLowerCase() || 'default';

  const IconComponent =
    (ICON_MAP as Record<string, React.ElementType>)[normalizedName] ||
    ICON_MAP.default;

  return <IconComponent className={className} />;
}