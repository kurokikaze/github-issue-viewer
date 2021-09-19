# Running the project

The project is run by execuing `yarn start` to start Metro and then (for connected android or emulator) executing `yarn android` in the separate console.

More about running on iOS simulator: https://reactnative.dev/docs/running-on-simulator-ios

# Building the project

The Android build is done with either `yarn build-android` or `yarn build-android-windows` (in Windows). The apk files will be in `app/build/outputs/apk`.

The iOS version is built with CocoaPods, the podfile is in `ios/Podfile`.

# Architecture overview

The project uses modern react stack: Typescript, React, Redux, Redux-Observable for epics, jest for unit tests.

Directory-by-directory overview:

## __tests__

Tests are written in Typescript (and typed), run using jest, redux-mock-store, react-test-renderer (for components).

## actions

Actions are simple objects, we do not use redux-thunk in favor of epics. This will simplify the actions and move all action-to-action mapping to epics.

## components

The components. Components are written using hooks, some of them just pure functions.

## epics

Epics live here.

### index

The app logic is stored here: which actions cause which actions and under which conditions.

### libraryBindings

Here actions are bound to library (API) calls. This is the only place in the app where actions and library calls are found together. This separation makes it a bit easier to search for and new APIs. 

## library

Functions to call different APIs live here, along with all necessary helpers (parsing answers, probably authentication etc). The library definitions are simple async functions, all binding to actions is done in `epics/libraryBindings`.

## reducers

Pretty standard redux reducers.

## screens

The components for aplication screens (that would've been `pages` in frontend app).

## selectors

Helper functions for getting data from the store.

## styles

General styles for applications that are not theme-specific. Theme-specific styles (light/dark) live in `themes`.

## testData

Test issues/organizations/repos used in unit tests. Should eventually be moved inside the `__tests__`.

## utils

Common helpers for the whole project.

## types.ts

Typescript types for application entities and API responses (should be separated if more APIs are added).