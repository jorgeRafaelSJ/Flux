const config = {
	url: 'http://localhost:8080',
	flux_url: 'https://flux.io/',
	flux_client_id: '49de46bb-50cf-4e07-9755-69ae456e8b36'
}

export const sdk = new FluxSdk(config.flux_client_id, { redirectUri: config.url, fluxUrl: config.flux_url });
export const helpers = new FluxHelpers(sdk);
