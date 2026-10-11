import {
  GlobeHemisphereWestIcon,
  ListDashesIcon,
  RocketLaunchIcon,
  TagIcon,
  UserPlusIcon,
} from "@phosphor-icons/react/dist/ssr";

// Іконки з набору Phosphor (заливка fill), як у макеті.
// Щоб додати нову: імпортуйте її вище і впишіть у цей список під зручним імʼям.
const ICONS = {
  globe: GlobeHemisphereWestIcon,
  list: ListDashesIcon,
  rocket: RocketLaunchIcon,
  tag: TagIcon,
  "user-plus": UserPlusIcon,
};

export type IconName = keyof typeof ICONS;

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const Component = ICONS[name];
  return <Component weight="fill" aria-hidden className={className} />;
}
