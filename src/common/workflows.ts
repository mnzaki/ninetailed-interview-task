import { proxyActivities } from '@temporalio/workflow';
import { CmsmsActivities } from './common/activities';

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

export async function createContentTypeWorkflow(): Promise<void> {
  await createContentType('thing')
}

export async function createContentWorkflow(): Promise<void> {
  await createContent('thing', 'table')
}
