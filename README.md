# CMS Management System

This is based on https://temporal.io and https://true-myth.js.org

The temporal [Activities Examples](https://github.com/temporalio/samples-typescript/tree/main/activities-examples)
was used as a starting point, with changes to support ES modules as required by
`true-myth`

## Running

1. Make sure Temporal Server is running locally (see the [quick install guide](https://docs.temporal.io/server/quick-install/)).
2. `npm install` to install dependencies.
3. `npm run start contentful` to start the Worker for contentful activities
4. In another shell, `npm run workflow contenful` to run the Workflow.

## Directory Structure
- `./src/common/` contains workflows and activities related to all CMSes
  - `common/workflows.ts`
  - `common/activities.ts`
    - `CmsmsActivities` is an interface for CMS management activities
- `./src/contentful` contains the implementation for Contentful
- `./src/worker.ts` is a worker that can load activites for a specific CMS and
  start accepting jobs on the CMS-specific queue
- `./src/client.ts` is a client that can request work for a specific CMS
