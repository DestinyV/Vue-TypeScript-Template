import globalSettings from "@/settings.ts";

const title = globalSettings.title || "项目名称";

export default function getPageTitle(pageTitle: string): string {
  if (pageTitle) {
    return `${pageTitle} - ${title}`;
  }
  return `${title}`;
}
