const graphqlEndpoint = 'https://backboard.railway.app/graphql/v2';

export function Usages(measurements, projectId, numOfDays) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - (numOfDays));

  const queries = Array.from({ length: numOfDays }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const name = `usage${i + 1}`;
    return {
      name,
      date,
      query: `
        query ${name} {
          usage(
            startDate: "${date.toISOString()}"
            endDate: "${new Date(date.getTime() + 86400000).toISOString()}"
            measurements: [${measurements.join(', ')}]
            projectId: "${projectId}"
          ) {
            measurement
            value
          }
        }
      `
    };
  });

  const promises = queries.map(query => {
    return fetch(graphqlEndpoint, {
      method: 'POST',
      headers: { 
          'Content-Type': 'application/json' ,
          "Authorization": `Bearer 6b98ed28-aa10-4d5c-b72a-9c63145ea36c`
      },
      body: JSON.stringify({ query: query.query })
    })
      .then(response => response.json())
      .then(result => ({ name: query.name, date: query.date, result }))
  });

  return Promise.all(promises)
    .then(results => {
      const data = {};

      measurements.forEach(measurement => {
        data[measurement] = results.map(result => {
          const usageData = result.result.data.usage.find(data => data.measurement === measurement);
          return usageData ? usageData.value : null;
        });
      });

      const days = results.map(result => result.date.getDate());

      return { data, days };
    })
    .catch(error => console.error(error));
}

// const measurements = ['MEMORY_USAGE_GB', 'CPU_USAGE', 'NETWORK_TX_GB'];
// const projectId = '60df2ee9-386c-4399-abe2-dbb1823332e8';
// const numOfDays = 4;

// fetchUsageData(measurements, projectId, numOfDays)
//   .then(result => {
//     console.log(result);
//   })
//   .catch(error => console.error(error));
