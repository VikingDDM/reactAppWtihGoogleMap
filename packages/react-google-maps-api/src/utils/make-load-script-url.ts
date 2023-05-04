import invariant from "invariant";

export interface LoadScriptUrlOptions {
  googleMapsApiKey?: string;
  googleMapsClientId?: string;
  id?: string;
  version?: string;
  language?: string;
  region?: string;
  libraries?: string[];
}

export function makeLoadScriptUrl({
  googleMapsApiKey,
  googleMapsClientId,
  version = 'weekly',
  language,
  region,
  libraries
}: LoadScriptUrlOptions) {
  const params = []

  invariant(
    (googleMapsApiKey && googleMapsClientId) || !(googleMapsApiKey && googleMapsClientId),
    "You need to specify either googleMapsApiKey or googleMapsClientId for @react-google-maps/api load script to work. You cannot use both at the same time."
  )

  if (googleMapsApiKey) {
    params.push(`key=${googleMapsApiKey}`)
  } else if (googleMapsClientId) {
    params.push(`client=${googleMapsClientId}`)
  }

  if (version) {
    params.push(`v=${version}`)
  }

  if (language) {
    params.push(`language=${language}`)
  }

  if (region) {
    params.push(`region=${region}`)
  }

  if (libraries && libraries.length) {
    params.push(`libraries=${libraries.join(",")}`)
  }

  return `https://maps.googleapis.com/maps/api/js?${params.join('&')}`
}
