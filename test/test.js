
async function main(){
    /*const Influx = require('influx');


    const influx = new Influx.InfluxDB({
        host: host,
        database: database,
        port:port,
        user:user,
        password:password
        });

    influx.getDatabaseNames()
        .then(names=>{
            console.log('My database names are: ' + names.join(', '));
        if(!names.includes(database)){
            return influx.createDatabase(database);
        }
        else{
            console.log("Database already exist")
        }
        });



 async function query_data(influxquery,callback){
     console.log("influxquery"+influxquery)
        influx.query(influxquery).catch(err=>{
        console.log(err);
        }).then(results=>{
            if (results.length>0){
                lasttimestamp=results[results.length-1].time
                console.log('Timestamp of last line:' + lasttimestamp);
                snapshot.lasttimestamp=lasttimestamp
                results.forEach(result => console.log(result.time))
                callback(lasttimestamp)
            }

        })}

async function handleResult(last){

    console.log("snapshot timestamp:" + last)
    query="select * from raw_data where time >= 'LTIME'"
    newquery2=query.replace("LTIME",last.toJSON())
    console.log("newquery2:" + newquery2)
    influx.query(newquery2).catch(err=>{
        console.log(err);
        }).then(results=>{
            console.log('results: '+ results)
            if (results.length>0){
                lasttimestamp=results[results.length-1].time.toJSON()
                console.log('Timestamp of last line:' + lasttimestamp);
                snapshot.lasttimestamp=lasttimestamp
                results.forEach(result => )
            }

        })
}
    var snapshot={}
    //snapshot.lastUpdated=1

    // Set the snapshot if it is not provided
    snapshot.lastUpdated = snapshot.lastUpdated || (new Date(0)).toISOString();

    newquery="select * from raw_data where time >= '2021-12-10 10:00:00'"
    console.log("newquery"+newquery)
    //newquery=query.replace("LTIME","'2021-12-10 13:50:00'")
    //Query data
    //query_data(newquery,handleResult.bind(this))
    // Set the snapshot if it is not provided

    
    //await query_data(newquery2)*/

    try {
        /*
           This function performs a login and returns an access token.
           If your application supports persistent API keys, you can instead simply use the key directly.
        */
           const Influx = require('influx');
           host= "localhost",
           database="ex",
           port="8086",
           user="admin",
           password="admin",
           initTime="2021-12-10 10:00:00"
           query="select * from raw_data where time >= 'LTIME'"
           snapshot={}
      
      
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
                  console.log("Database already exist")
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
              console.log('data', emitData)});
      
            lastUpdated=results[results.length-1].time
            console.log('Timestamp of last line:' + lastUpdated);
            snapshot.lastUpdated=lastUpdated
            console.log(`New snapshot: ${snapshot.lastUpdated}`);
            console.log('snapshot', snapshot);
        }else {
          console.log('snapshot', snapshot);
        }
          
          console.log('Finished execution');
          console.log('end');
        } catch (e) {
          console.log(`ERROR: ${e}`);
          console.log('error', e);
        }
      
}

main()