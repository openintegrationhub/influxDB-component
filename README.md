# InfluxDB-Connector

This connector accesses an InfluxDB and fetches data based on the provided query.

## Actions and triggers
This connector supports the following **actions** and **triggers**:

#### Triggers:
  - Get data (```getData.js```)
    ```
    fields: {
      database: 'test_db',
      host: '',
      port: '',
      user: 'root',
      password: 'root',
      query: 'select * from raw_data where time >= 'LTIME'',
      initTime: '2021-12-10 10:00:00'
    }
    ```


#### Actions:
  


## License

Apache-2.0 © 
