import { proxyActivities } from '@temporalio/workflow'
import { CmsmsActivities } from './index.js'

const {
  createContentType,
  createContent
} = proxyActivities<CmsmsActivities>({
  retry: {
    initialInterval: '50 milliseconds',
    maximumAttempts: 2,
  },
  startToCloseTimeout: '30 seconds',
});

// Very simple workflows just to demonstrate
export async function createContentTypeWorkflow(name: string): ReturnType<typeof createContentType> {
  const res = await createContentType(name)
  console.log('this res is a', res) // not an actual Result, but a serialized JSON object
  // if we want to use true-myth further we need to deserializeResult
  return res
}

export async function createContentWorkflow(ctypeName: string, contentName: string): ReturnType<typeof createContent> {
  const res = await createContent(ctypeName, contentName)
  console.log('this res is a', res)
  // if we want to use true-myth further we need to deserializeResult
  return res
}
