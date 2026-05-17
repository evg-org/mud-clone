import * as React from "react";

import { cn } from "./utils";
import { mudLogoNames, mudLogos } from "../generated/mud-logos";

const mudLogoRegistry: Record<string, string> = mudLogos;

function getMudLogoUrl(name: string) {
  return mudLogoRegistry[name] ?? mudLogoRegistry[name.toLowerCase()];
}

function shouldWarnMissingAsset() {
  return (
    (globalThis as { process?: { env?: { NODE_ENV?: string } } }).process?.env
      ?.NODE_ENV === "development"
  );
}

function MudLogo({
  alt,
  className,
  name,
  ...props
}: Omit<React.ComponentProps<"img">, "src"> & {
  name: string;
}) {
  const src = getMudLogoUrl(name);

  if (!src) {
    if (shouldWarnMissingAsset()) {
      console.warn(`MUD logo not found: ${name}`);
    }

    return null;
  }

  return (
    <img
      alt={alt}
      className={cn("block h-auto max-w-full", className)}
      data-slot="mud-logo"
      src={src}
      {...props}
    />
  );
}

export { MudLogo, getMudLogoUrl, mudLogoNames };
