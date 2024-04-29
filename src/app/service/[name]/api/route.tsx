async function getService(params: string) {
  const baseUrl = 'https://api.imats.se/';
  const health = '/actuator/health';
  const uptime = '/actuator/uptime';
  const res = await fetch(baseUrl + params + health);

  if (!res.ok) {
    throw new Error('Network response was not ok');
  }

  console.log('res', res);

  return res.json();
}

export default async function Service(param: string) {
  const data = await getService(param);
  console.log('data', data);

  return <main></main>;
}
