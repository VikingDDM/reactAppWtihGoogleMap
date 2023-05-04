# Changelog

## 1.2.0-alpha5 Typescript refactoring

** Full embrace of strongly typed functionality. Autocomplete in your typescript projects out of the box.
** changed api to support async nature of react. onLoad and onUnmount func props for each component.
** added addon MarkerClusterer

## 1.1.1-alpha Additional component support

** StreetViewPanorama
** StreetViewService
** MarkerClusterer

## 1.1.0

** Re-write in Typescript
** DEPRECATED: FuctionTablesLayer (was deprecated by google and support will be cut completely on December 3, 2019)

## 1.0.10 Fix cleanup in `<LoadScript />`

## 1.0.9 Fix hanging jest-worker child processes on `setInterval`

## 1.0.8 Added StandaloneSearchBox component, update docs and examples

## 1.0.3 Moved to organization @react-google-maps

## Archive

## 1.0.5

Fixed a bug with `<LoadScript language />` prop update and cleanup after unmount

## 1.0.6

added `onUnmount` func prop to `<LoadScript />`

## 1.0.7

fix memory leak of google-maps-api-v3

## 1.0.8

added property `options` to `<GoogleMap options={}>`

options are consistent with [MapOptions Interface](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
