const config = {
	url: 'http://localhost:3002',
	flux_url: 'https://flux.io',
	flux_client_id: 'javier+jorge@flux.io',
}

export const sdk = new FluxSdk(config.flux_client_id, { redirectUri: config.url, fluxUrl: config.flux_url });
export const helpers = new FluxHelpers(sdk);
