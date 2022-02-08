/* eslint no-param-reassign: "off" */

/**
 * Copyright 2021 X-Integrate GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

const { transform } = require('@openintegrationhub/ferryman');
const Influx = require('influx');

/**
 * This method will be called from OIH platform providing following data
 *
 * @param msg - incoming message object that contains keys `data` and `metadata`
 * @param cfg - configuration that is account information and configuration field values
 * @param snapshot - saves the current state of integration step for the future reference
 */
async function processTrigger(msg, cfg, snapshot = {}) {
  try {

    console.log("Inside processTrigger()");
    console.log("Config=" + cfg);

     var {
      database,
      host,
      port,
      user,
      password,
      query,
      initTime
    } = cfg;


  /*
     This function performs a login to an influx database.
  */

    const influx = new Influx.InfluxDB({
      host: host,
      database: database,
      port:port,
      user:user,
      password:password
      });


    //Check if your DB exists, if not create one
    //function getDatabaseNames() returns a list of databases
    influx.getDatabaseNames()
        .then(names=>{
            console.log('My database names are: ' + names.join(', '));
        if(!names.includes(database)){
            return influx.createDatabase(database);
        }
        else{
            console.log("Database already exist");
        }
        });

    // Set the snapshot if it is not provided
    snapshot.lastUpdated = snapshot.lastUpdated || initTime
    console.log(`Last Updated: ${snapshot.lastUpdated}`);

    query=query.replace("LTIME",snapshot.lastUpdated)

    async function query_data(influxquery){
      try {
        const data = await influx.query(influxquery)
        return data;
      } catch (e) {
        throw new Error(e);
      }
    }

    const results =await query_data(query)

    if (results.length>0){

      results.forEach(result =>{
        const emitData = {data:result};
        this.emit('data', emitData)});

      lastUpdated=results[results.length-1].time
      console.log('Timestamp of last line:' + lastUpdated);
      snapshot.lastUpdated=lastUpdated
      console.log(`New snapshot: ${snapshot.lastUpdated}`);
      this.emit('snapshot', snapshot);
  }else {
    this.emit('snapshot', snapshot);
  }
    
    console.log('Finished execution');
    this.emit('end');
  } catch (e) {
    console.log(`ERROR: ${e}`);
    this.emit('error', e);
  }
}

module.exports = {
  process: processTrigger,
};
