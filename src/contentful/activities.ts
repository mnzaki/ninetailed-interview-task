import { CmsmsActivities } from '../common/activities'
import { createApiClient } from './client'

export async function createActivities(): Promise<CmsmsActivities> {
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!
  const spaceId = process.env.CONTENTFUL_SPACE_ID!
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT!
  return createApiClient(accessToken, spaceId, environmentId)
}
