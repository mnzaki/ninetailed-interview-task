export interface CmsmsActivities {
  createContentType(name: string): Promise<void>
  createContent(ctype: string, name: string): Promise<void>
}
