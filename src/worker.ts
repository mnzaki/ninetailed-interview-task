// This package is an ES module ({"type": "module"} in package.json)
// so 'require' is not defined and needs to be created
import { createRequire } from 'module';
// @ts-ignore
const require = createRequire(import.meta.url)

import { Worker } from '@temporalio/worker';
import {Cmsms} from './common/index.js';

async function run() {
  const cmsmsImpl = process.argv[2]
  let cmsms: Cmsms

  if (cmsmsImpl) {
    cmsms = await import(`./${cmsmsImpl}/index.js`)
    if (!cmsms) {
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
    activities: await cmsms.createActivities(),
    taskQueue: cmsms.getQueueName(),
  });

  await worker.run();
}


run().catch((err) => {
  console.error(err);
  process.exit(1);
})
