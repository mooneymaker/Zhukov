import {
  CoinsIcon,
  GearSixIcon,
  GlobeHemisphereWestIcon,
  HandshakeIcon,
  ListDashesIcon,
  MegaphoneIcon,
  PackageIcon,
  RocketLaunchIcon,
  TagIcon,
  UserPlusIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/dist/ssr";

// Іконки з набору Phosphor (заливка fill), як у макеті.
// Щоб додати нову: імпортуйте її вище і впишіть у цей список під зручним імʼям.
const ICONS = {
  coins: CoinsIcon,
  gear: GearSixIcon,
  globe: GlobeHemisphereWestIcon,
  handshake: HandshakeIcon,
  list: ListDashesIcon,
  megaphone: MegaphoneIcon,
  package: PackageIcon,
  rocket: RocketLaunchIcon,
  tag: TagIcon,
  "user-plus": UserPlusIcon,
  users: UsersThreeIcon,
};

export type IconName = keyof typeof ICONS;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = ICONS[name];
  return <Component weight="fill" aria-hidden className={className} />;
}
