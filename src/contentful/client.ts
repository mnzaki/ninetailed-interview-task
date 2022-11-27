import contentful, {Environment, Space} from 'contentful-management'
import { CmsmsActivities } from '../common/activities'

export async function createApiClient(
  accessToken: string,
  spaceId: string,
  environmentId: string
): Promise<ContentfulClient> {
  const client = contentful.createClient({
    accessToken
  })
  const space = await client.getSpace(spaceId)
  const env = await space.getEnvironment(environmentId)
  return new ContentfulClient(/*client, */space, env)
}

export class ContentfulClient implements CmsmsActivities {
  constructor(
    // TODO this type doesn't work
    //private client: ReturnType<typeof contentful.createClient>,
    private space: Space,
    private environment: Environment
  ) { }

  async createContentType(name: string): Promise<void> {
    console.log('created content type', name)
  }

  async createContent(ctype: string, name: string): Promise<void> {
    console.log('created content', name, 'of type', ctype)
  }
}

