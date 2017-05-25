# MongoRest

This project exposes the mongoDB filled in assignment 3 in a REST service.

The endpoints are the following, compliant with HATEOAS (links, pagination):

- `/min_paths/` gives access to all the paths
- `/min_paths/{SRC_ID}_{DST_ID}` gives access to a specific path identified by `SRC_ID` and `DST_ID` that represent the stops id
- `/min_paths/search` gives access to different search strategies (load in browser and watch HATEOAS in action)

## Requirements

- The container `mongodb` from assignment 3 with data produced by the `MinPathCalc` project

## Execution

run the `run.sh` file
