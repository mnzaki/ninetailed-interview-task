import { CmsmsActivities } from '../common/activities.js'
import { createApiClient } from './client.js'

export default async function createActivities(): Promise<CmsmsActivities> {
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN!
  const spaceId = process.env.CONTENTFUL_SPACE_ID!
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT!
  return createApiClient(accessToken, spaceId, environmentId)
}
