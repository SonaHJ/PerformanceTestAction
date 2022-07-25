# HCL OneTest Performance

This action enables you to run HCL OneTest Performace tests.

## How this works

You can use the HCL OneTest Performance Action that enables you to select any type of test created in HCL OneTest™ that you can add to the job in the GitHub action.

## Pre requisites

1. Create a github repository
2. Create a folder named ".github" in the root of the repository
3. Create a folder named "workflows" inside the ".github" folder.
5. Create a .yml file with any name , inside the "workflow" folder and you need to code as following example in that yml file
## Example usage

```yaml
name: HCL OneTest Performance

on:
    workflow_dispatch:
        inputs:
            workspace:
                description: 'Workspace'
                required: true
            project:
                description: 'Project'
                required: true
            suite:
                description: 'Test Suite Name'
                required: true
            imShared:
                description: 'IMShared Path'
                required: false
            configFile:
                description: 'Configfile'
                required: false
            swapDatasets:
                description: 'Dataset Override'
                required: false
            duration:
                description: 'Duration'
                required: false
            exportLog:
                description: 'Exportlog'
                required: false
            exportStats:
                description: 'Exportstats'
                required: false
            multipleValues:
                description: 'Multiple Values'
                required: false

jobs:

    WebUI-Action:
        runs-on: self-hosted
        name: HCL OneTest Performance
        steps:
         - name: HCL OneTest Performances
           uses: SonaHJ/RPTAction@main
           with:
            workspace: '${{ github.event.inputs.workspace }}'
            project: '${{ github.event.inputs.project }}'
            suite: '${{ github.event.inputs.suite }}'
            imShared: '${{ github.event.inputs.imshared }}'
            configFile: '${{ github.event.inputs.configFile }}'
            swapDatasets: '${{ github.event.inputs.swapDatasets }}'
            duration: '${{ github.event.inputs.duration }}'
            exportLog: '${{ github.event.inputs.exportLog }}'
            exportStats: '${{ github.event.inputs.exportStats }}'
            multipleValues: '${{ github.event.inputs.multipleValues }}'
```
7. Replace the example input values with your details.
8. Push it into the main branch
9. Go to the Actions section in the repository and select the workflow.
10. Click the Run workflow dropdown and the list of input boxes get displayed.

To configure agent:
1. Go to settings (Repo).
2. Select action -> runner.
3. Click Create self-hosted runner, follow the download and configure instruction

## Inputs

### `workspace`

**Required** Complete path to Eclipse workspace.

### `project`

**Required** The name of the project containing the test.	

### `suite`

**Required** Specify the relative path from the project to the test including the file name of the test. A test can be WebUI test, Compound test, Performance schedule or Accelerated Functional Test (AFT) suite. The test suite name must contain the file extension when it is an AFT suite. To run multiple tests from the same project sequentially, you must separate the tests by a colon (:). If you provide multiple tests, you cannot include an AFT suite along with it.

### `imShared`

**Optional** Complete path to HCLIMShared location, if it is not at default location.

### `configFile`

**Optional** The complete path to a file that contains the parameters for a test or schedule run, If Config file is specified then no other fields will be required.

### `swapDatasets`

**Optional** Use this option to replace dataset values during a test or schedule run. You must ensure that both original and new datasets are in the same workspace and have the same column names. You must also include the path to the dataset. For example, /project_name/ds_path/ds_filename.csv:/project_name/ds_path/new_ds_filename.csv

### `duration`

**Optional** You can use this argument to specify the duration of the stages in the Rate Schedule

### `exportLog`

**Optional** You can use this parameter to specify the file directory path to store the exported HTTP test log. You can provide multiple parameter entries when running multiple tests. You must use a colon to separate the parameter entries. For example: c:/logexport.txt:c:/secondlogexport.txt

### `exportStats`

**Optional** The complete path to a directory in which to store exported statistical report data.

### `multipleValues`

you may only define up to 10 inputs for a workflow_dispatch event. Remaining inputs need to be Key=Value pair.

https://github.community/t/you-may-only-define-up-to-10-inputs-for-a-workflow-dispatch-event/160733

https://github.com/github/docs/issues/15710

Specify the below inputs in the Key=Value format.
    Ex: publish=publish_URL_val|usercomments=Value2

**Note that separator between the key-value pairs is '|' character.**

## Supported multipleValues inputs

### `exportStatsHtml`
The complete path to a directory in which to export web analytic results. The results are exported in the specified directory. Analyze the results on a web browser without using the test workbench.

### `exportStatsFormat`
Use this field to enter one or more formats for the reports that you want to export by using a comma as a separator. The options are simple.csv, full.csv, simple.json, full.json, csv, and json. When you want to export both simple and full reports in json or csv format, you can specify json or csv as the options. The reports are saved to the location specified in the Exported Statistical Report Data File field. This field must be used in conjunction with Exported Statistical Report Data File field.

### `reportHistory`
Optional. Use this command when you want to view a record of all events that occurred during a test or schedule run, For example - jaeger,testlog.

### `labels`
Use this option to add labels to test results. To add multiple labels to a test result, you must separate each label by using a comma.

### `users`
Overrides the default number of virtual users in the run. For a schedule, the default is the number of users specified in the schedule editor. For a test, the default is one user.

### `overwrite`
Determines whether a results file with the same name is overwritten. The default value, true, means that the results file is overwritten.

### `publish`
Optional. You can use this option to publish test results to HCL OneTest Server. The format is: serverURL#project.name=projectName&teamspace.name=teamspaceName. Example: https://localhost:5443/#project.name=test&teamspace.name=ts1

### `publishFor`
Optional. You can use this option to publish the test results based on the completion status of the tests, supported values are FAIL,PASS,INCONCLUSIVE,ERROR,ALL.

### `publishReports`
Optional. You can use this option to specify the reports to be published to HCL OneTest Server. The supported values are STATS,TESTLOG.

### `rate`
Optional. You can use this argument to specify a rate that you want to achieve for a workload in the Rate Runner group,The Rate Runner group name must match with the name in the Rate Schedule.

### `results`
The name of the results file. The default result file is the test or schedule name with a time stamp appended.

### `userComments`
Add text within double quotation mark to display it in the User Comments row of the report.

### `varFile`
The complete path to the XML file that contains the variable name and value pairs.

### `vmArgs`
Java virtual machine arguments to pass in.
