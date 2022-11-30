import { Result } from 'true-myth'

export type CmsmsError = { reason: string }
export type ContentTypeId = string
export type ContentId = string

export interface CmsmsActivities {
  createContentType(name: string): Promise<Result<ContentTypeId, CmsmsError>>
  createContent(ctype: string, name: string): Promise<Result<ContentId, CmsmsError>>
}

export interface Cmsms {
  createActivities: () => Promise<CmsmsActivities>,
  getQueueName: () => string
}

