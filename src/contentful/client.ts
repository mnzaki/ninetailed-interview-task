import contentful, {Environment, Space} from 'contentful-management'
import Result from 'true-myth/result'
import { CmsmsActivities, CmsmsError } from '../common/activities.js'

export async function createApiClient(
  accessToken: string,
  spaceId: string,
  environmentId: string
): Promise<ContentfulClient> {
  //const client = contentful.createClient({
  //  accessToken
  //})
  //const space = await client.getSpace(spaceId)
  //const env = await space.getEnvironment(environmentId)
  //return new ContentfulClient(/*client, */space, env)
  return new ContentfulClient()
}

export class ContentfulClient implements CmsmsActivities {
  constructor(
    // TODO this type doesn't work
    //private client: ReturnType<typeof contentful.createClient>,
    private space?: Space,
    private environment?: Environment
  ) { }
  async createContentType(name: string): Promise<Result<string, CmsmsError>> {
    if (Math.random() > 0.5) {
      console.log(`created content type '${name}'`)
      return Result.ok(name)
    } else {
      console.log(`failed to create content type '${name}'`)
      return Result.err({ reason: 'stars not aligned' })
    }
  }
  async createContent(ctype: string, name: string): Promise<Result<string, CmsmsError>> {
    if (Math.random() > 0.5) {
      console.log(`created content '${name}' of type '${ctype}'`)
      return Result.ok(`${ctype}-${name}`)
    } else {
      console.log(`failed to create content '${name}' of type '${ctype}'`)
      return Result.err({ reason: 'dice roll mismatch' })
    }
  }
}

