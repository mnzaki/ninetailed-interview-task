import { WorkflowClient } from '@temporalio/client'
import { createContentWorkflow, createContentTypeWorkflow } from './common/workflows.js'

import Result, {ResultJSON} from 'true-myth/result'
import {Cmsms} from './common/index.js'

// TODO does this exist in true-myth?
// this is required because Result is serialized into a JSON object when
// returned from an Activity
export function deserializeResult<T,E>(res: ResultJSON<T,E>): Result<T, E> {
  if (res.variant == "Ok") return Result.ok(res.value)
  else return Result.err(res.error)
}

async function run(): Promise<void> {
  const cmsmsImpl = process.argv[2]
  let cmsms: Cmsms

  if (cmsmsImpl) {
    //createActivities = cmsmsActivities[cmsmsImpl]
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

  const client = new WorkflowClient()

  for (let n = 0; n < 3; n++) {
    let result = await client.execute(createContentTypeWorkflow, {
      args: [`ctype${n}`],
      taskQueue: cmsms.getQueueName(),
      workflowId: 'activities-examples',
    })

    result = deserializeResult(result)
    console.log('createContentTypeWorkflow', result)

    if (result.isOk) {
      const ctype = result.value
      for (let m = 0; m < 3; m++) {
        result = await client.execute(createContentWorkflow, {
          args: [ctype, `content item ${m}`],
          taskQueue: cmsms.getQueueName(),
          workflowId: 'activities-examples',
        })
        result = deserializeResult(result)
        console.log('createContentWorkflow', result)
      }
    }
    console.log("\n")
  }
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
