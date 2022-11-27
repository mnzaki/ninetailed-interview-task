import { WorkflowClient } from '@temporalio/client'
import { createContentWorkflow, createContentTypeWorkflow } from './common/workflows.js'


import Result, {ResultJSON} from 'true-myth/result'

// TODO does this exist in true-myth?
// this is required because Result is serialized into a JSON object when
// returned from an Activity
export function deserializeResult<T,E>(res: ResultJSON<T,E>): Result<T, E> {
  if (res.variant == "Ok") return Result.ok(res.value)
  else return Result.err(res.error)
}


async function run(): Promise<void> {
  const client = new WorkflowClient()

  for (let n = 0; n < 3; n++) {
    let result = await client.execute(createContentTypeWorkflow, {
      args: [`ctype${n}`],
      taskQueue: 'activities-examples',
      workflowId: 'activities-examples',
    })

    result = deserializeResult(result)
    console.log('createContentTypeWorkflow', result)

    if (result.isOk) {
      const ctype = result.value
      for (let m = 0; m < 3; m++) {
        result = await client.execute(createContentWorkflow, {
          args: [ctype, `content item ${m}`],
          taskQueue: 'activities-examples',
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
