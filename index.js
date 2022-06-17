const core = require('@actions/core');

const github = require('@actions/github');
const path = require("path");

const os = require('os');
const fs = require('fs');

const main = async () => 
{

const productpath = core.getInput('productpath',{required: true});

const imshared = core.getInput('imshared',{required: false});

const workspace = core.getInput('workspace',{required: false});

const project = core.getInput('project',{required: false});

const suite = core.getInput('suite',{required: false});

const vmargs = core.getInput('vmargs',{required: false});

const varfile = core.getInput('varfile',{required: false});

const swapdatasets = core.getInput('swapdatasets',{required: false});

const exportstats = core.getInput('exportstats',{required: false});

const exportstatsformat = core.getInput('exportstatsformat',{required: false});

const overridermlabels = core.getInput('overridermlabels',{required: false});

const rate = core.getInput('rate',{required: false});

const duration = core.getInput('duration',{required: false});

const configfile = core.getInput('configfile',{required: false});

const exportlog = core.getInput('exportlog',{required: false});

const exportstatreportlist = core.getInput('exportstatreportlist',{required: false});

const labels = core.getInput('labels',{required: false});

const exportstatshtml = core.getInput('exportstatshtml',{required: false});

const overwrite = core.getInput('overwrite',{required: false});

const results = core.getInput('results',{required: false});

const users   = core.getInput('users',{required: false});

const usercomments = core.getInput('usercomments',{required: false});

const publish = core.getInput('publish',{required: false});

const publish_for = core.getInput('publish_for',{required: false});

const publishreports = core.getInput('publishreports',{required: false});

const reporthistory = core.getInput('reporthistory',{required: false});
try
{

if (configfile) {
    if (process.platform == 'linux') {
      script = 'cd ' + '"' + productpath + '/cmdline"' + '\n'
        + 'bash cmdline.sh'
        + ' -configfile ' + '"' + configfile + '"';
    }
    else if (process.platform == 'win32') {
      script = 'cd ' + '"' + productpath + '\\cmdline"' + '\n'
        + './cmdline.bat'
        + ' -configfile ' + '"' + configfile + '"';
    }

  }
  else {

    if (workspace == null || project == null || suite == null || imshared == null) {
      tl.setResult(tl.TaskResult.Failed, "WorkSpace,Project, imshared & Suite are mandotory parameters");
    }
    //Script formation
    if (process.platform == 'linux') {
      script = 'cd ' + '"' + productpath + '/cmdline"' + '\n'
        + 'bash cmdline.sh'
        + ' -workspace ' + '"' + workspace + '"'
        + ' -project ' + '"' + project + '"'
        + ' -eclipsehome ' + '"' + productpath + '"'
        + ' -plugins ' + '"' + imshared + '/plugins"'
        + ' -suite ' + '"' + suite + '"';
    }
    else if (process.platform == 'win32') {
      script = 'cd ' + '"' + productpath + '\\cmdline"' + '\n'
        + './cmdline.bat'
        + ' -workspace ' + '"' + workspace + '"'
        + ' -project ' + '"' + project + '"'
        + ' -eclipsehome ' + '"' + productpath + '"'
        + ' -plugins ' + '"' + imshared + '\\plugins"'
        + ' -suite ' + '"' + suite + '"';
    }

    if (vmargs) {
      script = script.concat(' -vmargs ' + '"' + vmargs + '"')
    }
    if (varfile) {
      script = script.concat(' -varfile ' + '"' + varfile + '"')
    }
    if (swapdatasets) {
      script = script.concat(' -swapdatasets ' + '"' + swapdatasets + '"')
    }
    if (overridermlabels) {
      script = script.concat(' -overridermlabels ' + '"' + overridermlabels + '"')
    }
    if (exportstats) {
      script = script.concat(' -exportstats ' + '"' + exportstats + '"')
    }
    if (exportstatsformat) {
      script = script.concat(' -exportstatsformat ' + '"' + exportstatsformat + '"')
    }
    if (configfile) {
      script = script.concat(' -configfile ' + '"' + configfile + '"')
    }
    if (rate) {
      script = script.concat(' -rate ' + '"' + rate + '"')
    }
    if (duration) {
      script = script.concat(' -duration ' + '"' + duration + '"')
    }
    if (exportlog) {
      script = script.concat(' -exportlog ' + '"' + exportlog + '"')
    }
    if (exportstatreportlist) {
      script = script.concat(' -exportstatreportlist ' + '"' + exportstatreportlist + '"')
    }
    if (labels) {
      script = script.concat(' -labels ' + '"' + labels + '"')
    }
    if (exportstatshtml) {
      script = script.concat(' -exportstatshtml ' + '"' + exportstatshtml + '"')
    }
    if (overwrite) {
      script = script.concat(' -overwrite ' + overwrite)
    }
    if (results) {
      script = script.concat(' -results ' + '"' + results + '"')
    }
    if (users) {
      script = script.concat(' -users ' + '"' + users + '"')
    }
    if (usercomments) {
      script = script.concat(' -usercomments ' + '"' + usercomments + '"')
    }

    if (publish_for) {
      script = script.concat(' -publish_for ' + '"' + publish_for + '"')
    }
    if (publishreports) {
      script = script.concat(' -publishreports ' + '"' + publishreports + '"')
    }
    if (reporthistory) {
      script = script.concat(' -history ' + '"' + reporthistory + '"')
    }

    if (publish) {
      script = script.concat(' -publish ' + '"""' + publish + '"""')
    }
  }

  let tempDir = os.tmpdir();
                      let filePath = path.join(tempDir, suite + '.ps1');
                        await fs.writeFileSync(
                                filePath,
                                script, 
                                { encoding: 'utf8' });
                        
                        console.log(script);
                        console.log('========================== Starting Command Output ===========================');
                        var spawn = require("child_process").spawn,child;
                        child =  spawn("powershell.exe",[filePath]);
                        child.stdout.on("data",function(data){
                            console.log(" " + data);
                        });
                        child.stderr.on("data",function(data){
                            console.log("Errors: " + data);
                            
                        });
                        child.on("exit",function(){
                            console.log("Powershell Script finished");
                           
                        });
                        await new Promise( (resolve) => {
                          child.on('close', resolve)
                        });
                        child.stdin.end();
                        
                        
                        var fResultFile = tempDir + path.sep + "CommandLineLog.txt"; 
                        
                      
                          if (fs.existsSync(fResultFile)) {
                            
                              var verdictRegex = /--VERDICT=(INCONCLUSIVE|ERROR|PASS|FAIL).*/
                              var serverRegex = /--PUBLISH_URL=(.*)/;
                              var reportRegex = /--REPORT=(.*)[|]--URL=(.*)/;
                              var reports = {};
                              var isVerdictSet = false;
                              var verdict;
                              var publishURL;
                              var reportSet = false;
                              
                              var data = fs.readFileSync(fResultFile, 'utf-8')
                                  .split('\n');
                              data.forEach(line => {
                                  if (!isVerdictSet && verdictRegex.test(line)) {
                                      var result = verdictRegex.exec(line);
                                      verdict = result[1];
                                      console.log("Test Result is: "+verdict);
                                      isVerdictSet = true;
                          if(verdict=='ERROR' || verdict=='FAIL')
                          {
                            core.setFailed("Test Result is: FAIL");
                          }
                                  }
                                  else if(publishURL==undefined && serverRegex.test(line)){
                                      var result = serverRegex.exec(line);
                                      publishURL = result[1];
                                  }
                                  else if(reportRegex.test(line)){
                                      var reps = reportRegex.exec(line);
                                      reports[reps[1]] = reps[2];
                                      reportSet = true;
                                  }
                              });

                              if(!isVerdictSet){
                                  console.log("Test Result is: FAIL");
                                  core.setFailed("Test Result is: FAIL");
                              }
                              if(publishURL!=undefined && reportSet){
                                  console.log("");
                                  console.log("Published Reports information:");
                                  for(var i in reports){
                                      console.log(i+" : "+url.resolve(publishURL, reports[i]));
                                  }
                              }
                          }
                          else {
                              console.log("Test Result is: FAIL");
                              core.setFailed("Test Result is: FAIL");
                          }
                      
                      console.log("");
    }    
    catch (error)
           {
              core.setFailed(error.message);
           }      
}

main();
