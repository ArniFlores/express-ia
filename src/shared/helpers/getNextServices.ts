export function getNextService(services: any[], currentServiceIndex: number) {
  const service = services[currentServiceIndex];
  currentServiceIndex = (currentServiceIndex + 1) % services.length;
  return service;
}
