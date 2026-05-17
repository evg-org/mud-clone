import * as React from "react";
import type { VariantProps } from "class-variance-authority";

import { iconVariants } from "./icon";
import { cn } from "./utils";

const mudIconModules = import.meta.glob<string>("../assets/mud/icons/**/*.svg", {
  import: "default",
  query: "?url",
});

type IconLoader = () => Promise<string>;

const canonicalMudIconNames: string[] = [];
const mudIconLoaders = Object.entries(mudIconModules).reduce<Record<string, IconLoader>>(
  (registry, [path, loader]) => {
    const iconName = path
      .replace("../assets/mud/icons/", "")
      .replace(/\.svg$/, "");

    canonicalMudIconNames.push(iconName);
    registry[iconName] = loader;
    registry[iconName.toLowerCase()] = loader;

    return registry;
  },
  {},
);
const mudIconNames = canonicalMudIconNames.sort();
const resolvedIconUrlCache = new Map<string, string>();
const pendingIconUrlCache = new Map<string, Promise<string | undefined>>();

function resolveIconEntry(name: string) {
  const loader = mudIconLoaders[name] ?? mudIconLoaders[name.toLowerCase()];

  if (!loader) {
    return undefined;
  }

  return {
    key: name.toLowerCase(),
    loader,
  };
}

function getMudIconUrl(name: string) {
  return resolvedIconUrlCache.get(name) ?? resolvedIconUrlCache.get(name.toLowerCase());
}

async function loadMudIconUrl(name: string) {
  const cachedUrl = getMudIconUrl(name);

  if (cachedUrl) {
    return cachedUrl;
  }

  const entry = resolveIconEntry(name);

  if (!entry) {
    return undefined;
  }

  const pendingUrl = pendingIconUrlCache.get(entry.key);

  if (pendingUrl) {
    return pendingUrl;
  }

  const nextPendingUrl = entry.loader().then((url) => {
    resolvedIconUrlCache.set(entry.key, url);
    resolvedIconUrlCache.set(name, url);

    return url;
  });

  pendingIconUrlCache.set(entry.key, nextPendingUrl);

  return nextPendingUrl;
}

function shouldWarnMissingAsset() {
  return (
    (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env
      ?.NODE_ENV === "development"
  );
}

function MudIcon({
  className,
  decorative = true,
  label,
  name,
  size,
  style,
  tone,
  ...props
}: Omit<React.ComponentProps<"span">, "children"> &
  VariantProps<typeof iconVariants> & {
    decorative?: boolean;
    label?: string;
    name: string;
}) {
  const [src, setSrc] = React.useState(() => getMudIconUrl(name));
  const maskUrl = src ? `url("${src}")` : "";

  React.useEffect(() => {
    const cachedUrl = getMudIconUrl(name);
    let isActive = true;

    setSrc(cachedUrl);

    if (cachedUrl) {
      return undefined;
    }

    loadMudIconUrl(name).then((loadedUrl) => {
      if (!isActive) {
        return;
      }

      if (!loadedUrl && shouldWarnMissingAsset()) {
        console.warn(`MUD icon not found: ${name}`);
      }

      setSrc(loadedUrl);
    });

    return () => {
      isActive = false;
    };
  }, [name]);

  if (!src) {
    return null;
  }

  return (
    <span
      aria-hidden={decorative ? true : undefined}
      aria-label={decorative ? undefined : label ?? name}
      data-slot="mud-icon"
      role={decorative ? undefined : "img"}
      className={cn(
        iconVariants({ size, tone }),
        !tone && "[color:inherit]",
        className,
      )}
      style={{
        WebkitMaskImage: maskUrl,
        WebkitMaskPosition: "center",
        WebkitMaskRepeat: "no-repeat",
        WebkitMaskSize: "contain",
        backgroundColor: "currentColor",
        maskImage: maskUrl,
        maskPosition: "center",
        maskRepeat: "no-repeat",
        maskSize: "contain",
        ...style,
      }}
      {...props}
    />
  );
}

export {
  MudIcon,
  getMudIconUrl,
  mudIconNames,
};
