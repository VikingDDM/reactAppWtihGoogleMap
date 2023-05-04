
## README

### Requirements

- basic git, JavaScript, React knowledge
- Google Maps API Key from [Google Cloud Console](https://console.cloud.google.com)
- git
- node
- yarn

### To develop locally

Clone your fork to local directory of your choice, install dependencies, set up your API Key, and start storybook server. Following commands should do the job:

- `git clone https://github.com/YOUR_USER_NAME/react-google-maps-api.git` - clone your fork
`
- `cd react-google-maps-api` - move to newly created folder
- `cp .storybook/example.maps.config.ts .storybook/maps.config.ts` - create file with API Key
- `yarn install` - install dependencies
- `yarn storybook` - run storybook server

Any changes you make to src folders of contained packages should reflect on the storybook server.
