# InfluxDB-Connector

This connector accesses an InfluxDB and fetches data based on the provided query.

## Triggers and actions
This connector supports the following **triggers** and **actions**:

#### Triggers:
  - Get data (```getData.js```)
    
  The query field has a placeholder **LTIME**.. This parameter is replaced by  **initTime** in the first iteration.
  
  The timestamp of the last entry of the queried data set is buffered using the *oih snapshot service*. In the next iterations, **LTIME** is always replaced by the timestamp in the snapshot.

  The following is an example of the minimal configuration of this trigger:
  
    fields: {
      database: 'test_db',
      host: '',
      port: '',
      user: 'root',
      password: 'root',
      query: 'select * from raw_data where time >= 'LTIME'',
      initTime: '2021-12-10 10:00:00'
    }
    


#### Actions:
  This component does not have any actions so far.


## License

Apache-2.0 © 
