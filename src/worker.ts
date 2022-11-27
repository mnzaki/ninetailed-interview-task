// This package is an ES module ({"type": "module"} in package.json)
// so 'require' is not defined and needs to be created
import { createRequire } from 'module';
// @ts-ignore
const require = createRequire(import.meta.url)

import { Worker } from '@temporalio/worker';
import {CmsmsActivities} from './common/activities.js';
import createContentfulActivities from './contentful/activities.js'

const cmsmsActivities: { [k: string]: () => Promise<CmsmsActivities> } = {
  "contentful": createContentfulActivities
}

async function run() {
  const cmsmsImpl = process.argv[2]
  let createActivities

  if (cmsmsImpl) {
    createActivities = cmsmsActivities[cmsmsImpl]
    if (!createActivities) {
      console.error("bad implementation")
      process.exit(1)
    }
  } else {
    console.error(
      "please provide an implementation name. ",
      "for example:\n ts-node src/worker.ts contentful"
    )
    process.exit(1)
  }

  const worker = await Worker.create({
    workflowsPath: require.resolve('./common/workflows'),
    activities: await createActivities(),
    taskQueue: 'activities-examples',
  });

  await worker.run();
}


run().catch((err) => {
  console.error(err);
  process.exit(1);
})
