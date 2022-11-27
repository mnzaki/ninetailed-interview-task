import { Worker } from '@temporalio/worker';
import {CmsmsActivities} from './common/activities';

async function run(
  { createActivities } : { createActivities(): Promise<CmsmsActivities> }
) {
  const worker = await Worker.create({
    workflowsPath: require.resolve('./common/workflows'),
    activities: await createActivities(),
    taskQueue: 'activities-examples',
  });

  await worker.run();
}

const cmsmsImpl = process.argv[2]
let createActivities
if (cmsmsImpl) {
  try {
  createActivities = require(`${cmsmsImpl}/activities`)
  } catch(err) {
    console.error(err)
    process.exit(1)
  }
} else {
  console.error(
    "please provide an implementation name. ",
    "for example:\n ts-node src/worker.ts contentful"
  )
  process.exit(1)
}


run(createActivities).catch((err) => {
  console.error(err);
  process.exit(1);
})
