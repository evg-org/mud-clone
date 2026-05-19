import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ComponentType, MouseEvent } from "react";
import { Separator } from "@mud-clone";
import { MudLogo } from "@mud-clone/components/mud-logo";
import { defaultRoute, navGroups } from "./docs-data";
import {
  AssetsPage,
  BordersRadiusPage,
  ColorsPage,
  ElevationPage,
  IconsLogosPage,
  SpacingPage,
  TypographyPage,
} from "./pages/foundations";
import {
  AccordionPage,
  AvatarsPage,
  BadgesPage,
  ButtonsPage,
  ChipPage,
  CheckboxPage,
  InputDatePage,
  InputPhoneNumberPage,
  InputSearchPage,
  InputSelectPage,
  InputNumericPage,
  InputTextareaPage,
  InputTextPage,
  LinksPage,
  MenuPage,
  SegmentedControlPage,
  ModalPage,
  PaginationPage,
  RadioButtonPage,
  SeparatorPage,
  SwitchPage,
  TableCardPage,
  TablePage,
  TagsPage,
  TabsPage,
  TooltipPage,
} from "./pages/components";
import {
  DetailRowsPage,
  SectionHeadingPage,
} from "./pages/patterns";

type DocsRoute = {
  component: ComponentType;
  href: string;
  label: string;
};

type NavItem = {
  href: string;
  label: string;
  needsReview: boolean;
  separator?: boolean;
  visualGroup?: string;
};

type NavItemChunk =
  | {
      items: NavItem[];
      type: "grouped";
      visualGroup: string;
    }
  | {
      key: string;
      type: "separator";
    }
  | {
      item: NavItem;
      type: "single";
    };

const routes: DocsRoute[] = [
  { component: ColorsPage, href: "/colors", label: "Colors" },
  { component: TypographyPage, href: "/typography", label: "Typography" },
  { component: SpacingPage, href: "/spacing", label: "Spacing" },
  { component: BordersRadiusPage, href: "/borders-radius", label: "Borders & Radius" },
  { component: ElevationPage, href: "/elevation", label: "Elevation" },
  { component: IconsLogosPage, href: "/icons", label: "Icons" },
  { component: AssetsPage, href: "/assets", label: "Assets" },
  { component: AccordionPage, href: "/accordion", label: "Accordion" },
  { component: AvatarsPage, href: "/avatars", label: "Avatars" },
  { component: ButtonsPage, href: "/buttons", label: "Buttons" },
  { component: LinksPage, href: "/links", label: "Links" },
  { component: TagsPage, href: "/tags", label: "Tags" },
  { component: BadgesPage, href: "/badges", label: "Badges" },
  { component: ChipPage, href: "/chip", label: "Chip" },
  { component: CheckboxPage, href: "/checkbox", label: "Checkbox" },
  { component: RadioButtonPage, href: "/radio-button", label: "Radio Button" },
  { component: SwitchPage, href: "/switch", label: "Switch" },
  { component: TabsPage, href: "/tabs", label: "Tabs" },
  {
    component: SegmentedControlPage,
    href: "/segmented-control",
    label: "Segmented Control",
  },
  { component: InputSelectPage, href: "/input-select", label: "Input: Select" },
  { component: InputTextPage, href: "/input-text", label: "Input: Text" },
  { component: InputTextareaPage, href: "/input-textarea", label: "Input: Textarea" },
  { component: InputNumericPage, href: "/input-numeric", label: "Input: Numeric" },
  { component: InputDatePage, href: "/input-date", label: "Input: Date" },
  { component: InputPhoneNumberPage, href: "/input-phone-number", label: "Input: Phone Number" },
  { component: InputSearchPage, href: "/input-search", label: "Input: Search" },
  { component: TooltipPage, href: "/tooltip", label: "Tooltip" },
  { component: SeparatorPage, href: "/separator", label: "Separator" },
  { component: PaginationPage, href: "/pagination", label: "Pagination" },
  { component: TablePage, href: "/table", label: "Table" },
  { component: MenuPage, href: "/menu", label: "Menu" },
  { component: ModalPage, href: "/modal", label: "Modal" },
  { component: SectionHeadingPage, href: "/section-heading", label: "Section Heading" },
  { component: DetailRowsPage, href: "/detail-row", label: "Detail Row" },
  { component: TableCardPage, href: "/table-card", label: "Table Card" },
];

const routeMap = new Map(routes.map((route) => [route.href, route]));
const routeAliases = new Map([
  ["/foundations/colors", "/colors"],
  ["/foundations/typography", "/typography"],
  ["/foundations/spacing", "/spacing"],
  ["/foundations/borders-radius", "/borders-radius"],
  ["/foundations/elevation", "/elevation"],
  ["/foundations/icons-logos", "/icons"],
  ["/foundations/assets", "/assets"],
  ["/components/avatars", "/avatars"],
  ["/components/buttons", "/buttons"],
  ["/components/links", "/links"],
  ["/components/tags", "/tags"],
  ["/components/badges", "/badges"],
  ["/components/checkbox", "/checkbox"],
  ["/components/radio-button", "/radio-button"],
  ["/components/switch", "/switch"],
  ["/components/chip", "/chip"],
  ["/components/segmented-control", "/segmented-control"],
  ["/components/segmented-controls", "/segmented-control"],
  ["/components/input-text", "/input-text"],
  ["/components/input-numeric", "/input-numeric"],
  ["/components/input-date", "/input-date"],
  ["/components/input-phone-number", "/input-phone-number"],
  ["/components/input-textarea", "/input-textarea"],
  ["/components/input-search", "/input-search"],
  ["/components/input-select", "/input-select"],
  ["/components/accordion", "/accordion"],
  ["/components/menu", "/menu"],
  ["/components/tabs", "/tabs"],
  ["/components/tooltip", "/tooltip"],
  ["/components/separator", "/separator"],
  ["/components/pagination", "/pagination"],
  ["/components/table", "/table"],
  ["/components/tables", "/table"],
  ["/components/table-card", "/table-card"],
  ["/components/modal", "/modal"],
  ["/components/overlays", "/modal"],
  ["/components/overlays-tabs", "/modal"],
  ["/overlays", "/modal"],
  ["/overlays-tabs", "/modal"],
  ["/custom-components/table-card", "/table-card"],
  ["/custom-components/modal", "/modal"],
  ["/custom-components/overlays", "/modal"],
  ["/custom-components/overlays-tabs", "/modal"],
  ["/custom-components/detail-row", "/detail-row"],
  ["/custom-components/detail-rows", "/detail-row"],
  ["/custom-components/section-heading", "/section-heading"],
  ["/custom-components/section-headings", "/section-heading"],
  ["/patterns/table-card", "/table-card"],
  ["/patterns/modal", "/modal"],
  ["/patterns/overlays", "/modal"],
  ["/patterns/overlays-tabs", "/modal"],
  ["/patterns/detail-row", "/detail-row"],
  ["/patterns/detail-rows", "/detail-row"],
  ["/patterns/section-heading", "/section-heading"],
  ["/patterns/section-headings", "/section-heading"],
]);
const viteBaseUrl = import.meta.env.BASE_URL.replace(/\/$/, "");

type MudClonePreviewProps = {
  basePath?: string;
};

function normalizeBasePath(basePath?: string) {
  const normalized = (basePath ?? viteBaseUrl).replace(/\/$/, "");

  return normalized === "/" ? "" : normalized;
}

function toBrowserHref(routeHref: string, basePath: string) {
  return basePath ? `${basePath}${routeHref}` : routeHref;
}

function normalizeRoute(pathname: string, basePath: string) {
  const path =
    basePath && pathname.startsWith(basePath)
      ? pathname.slice(basePath.length) || "/"
      : pathname;

  if (path === "/" || path === "") {
    return defaultRoute;
  }

  const canonicalPath = routeAliases.get(path) ?? path;

  return routeMap.has(canonicalPath) ? canonicalPath : defaultRoute;
}

function chunkNavItems(items: NavItem[]) {
  const chunks: NavItemChunk[] = [];
  let index = 0;

  while (index < items.length) {
    const item = items[index];

    if (item.separator) {
      chunks.push({ key: `separator-${index}`, type: "separator" });
      index += 1;
      continue;
    }

    if (!item.visualGroup) {
      chunks.push({ item, type: "single" });
      index += 1;
      continue;
    }

    const groupItems = [item];
    index += 1;

    while (items[index]?.visualGroup === item.visualGroup) {
      groupItems.push(items[index]);
      index += 1;
    }

    chunks.push({
      items: groupItems,
      type: "grouped",
      visualGroup: item.visualGroup,
    });
  }

  return chunks;
}

function DocsNavLink({
  activeHref,
  browserBasePath,
  item,
  navigate,
}: {
  activeHref: string;
  browserBasePath: string;
  item: NavItem;
  navigate: (event: MouseEvent<HTMLAnchorElement>, href: string) => void;
}) {
  return (
    <a
      aria-current={item.href === activeHref ? "page" : undefined}
      data-active={item.href === activeHref ? "true" : undefined}
      href={toBrowserHref(item.href, browserBasePath)}
      onClick={(event) => navigate(event, item.href)}
    >
      {item.needsReview && (
        <span className="docs-nav-review-dot" aria-hidden="true" />
      )}
      {item.label}
    </a>
  );
}

export function MudClonePreview({ basePath }: MudClonePreviewProps = {}) {
  const browserBasePath = normalizeBasePath(basePath);
  const mainRef = useRef<HTMLElement>(null);
  const [activeHref, setActiveHref] = useState(() =>
    normalizeRoute(window.location.pathname, browserBasePath),
  );

  const scrollToPageStart = useCallback(() => {
    mainRef.current?.scrollTo({ top: 0 });
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const normalizedHref = normalizeRoute(window.location.pathname, browserBasePath);
    const normalizedBrowserHref = toBrowserHref(normalizedHref, browserBasePath);

    if (window.location.pathname !== normalizedBrowserHref) {
      window.history.replaceState(null, "", normalizedBrowserHref);
    }
  }, [browserBasePath, scrollToPageStart]);

  useEffect(() => {
    const handlePopState = () => {
      const normalizedHref = normalizeRoute(window.location.pathname, browserBasePath);
      const normalizedBrowserHref = toBrowserHref(normalizedHref, browserBasePath);

      if (window.location.pathname !== normalizedBrowserHref) {
        window.history.replaceState(null, "", normalizedBrowserHref);
      }

      setActiveHref(normalizedHref);
      scrollToPageStart();
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [browserBasePath, scrollToPageStart]);

  const activeRoute = useMemo(
    () => routeMap.get(activeHref) ?? routeMap.get(defaultRoute)!,
    [activeHref],
  );
  const ActivePage = activeRoute.component;

  function navigate(event: MouseEvent<HTMLAnchorElement>, href: string) {
    event.preventDefault();

    if (href !== activeHref) {
      window.history.pushState(null, "", toBrowserHref(href, browserBasePath));
      setActiveHref(href);
    }

    scrollToPageStart();
  }

  return (
    <div className="docs-app">
      <aside className="docs-sidebar" aria-label="Preview navigation">
        <a
          aria-label="MUD-clone preview home"
          className="docs-sidebar-brand"
          href={toBrowserHref(defaultRoute, browserBasePath)}
          onClick={(event) => navigate(event, defaultRoute)}
        >
          <MudLogo className="docs-logo" name="government-logo" />
          <span>
            <span>MUD-clone</span>
            <strong>Preview</strong>
          </span>
        </a>

        <nav className="docs-nav">
          {navGroups.map((group) => (
            <div className="docs-nav-group" key={group.label}>
              <p>{group.label}</p>
              {chunkNavItems(group.items).map((chunk) => {
                if (chunk.type === "separator") {
                  return (
                    <Separator
                      className="docs-nav-separator"
                      key={`${group.label}-${chunk.key}`}
                      thickness="extra-thin"
                      tone="subtle"
                    />
                  );
                }

                if (chunk.type === "grouped") {
                  return (
                    <div
                      className="docs-nav-visual-group"
                      data-visual-group={chunk.visualGroup}
                      key={`${group.label}-${chunk.visualGroup}`}
                    >
                      {chunk.items.map((item) => (
                        <DocsNavLink
                          activeHref={activeHref}
                          browserBasePath={browserBasePath}
                          item={item}
                          key={item.href}
                          navigate={navigate}
                        />
                      ))}
                    </div>
                  );
                }

                return (
                  <DocsNavLink
                    activeHref={activeHref}
                    browserBasePath={browserBasePath}
                    item={chunk.item}
                    key={chunk.item.href}
                    navigate={navigate}
                  />
                );
              })}
            </div>
          ))}
        </nav>
      </aside>

      <main className="docs-main" ref={mainRef}>
        <ActivePage />
      </main>
    </div>
  );
}
