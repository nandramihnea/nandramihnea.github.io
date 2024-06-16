# Nuant FE Test - nandramihnea version

Demo link: [Demo](https://pokedex-mihnea.netlify.app/)

In this repo you will find everything you need to know about how I went on implementing the task.
Starting from ideation phase to implementation and deployment in the end.


### Ideation phase

![Screenshot](ideation.png)

In this image you can see what was my tought proccess during the ideation phase:

- Firstly copied the tasks to be done in order to see them more clearly
- Afterwards decided what routes should the app have
- Broke down the routes into components
- Decided what things I should take into consideration while developing
- Finally broke down the main task into smaller ones


### Tests

Tests can be run by using the `npm run test` command


### Documentation (Storybook)

Storybook documentation can be run by using the `npm run storybook` command


### Challanges faced

1. installing shadcn on vite was quite nasty for a first try because I faced a time consuming error ~35'
   because the command to initalize shadcn was using yarn behind npx and I didn't have yarn installed globally
2. battling with tests - didn't quite understand why didn't the normal api call and I needed to mock it ~perhaps the sync
3. debouncing the input value when using URLSearchParams


### Aprox. timings
- understading the task: 5`27"
- setting up the env + starting fresh: 3'56"
- breaking down the tasks: 34'23'
- setting up testing + docs + shadcn: 1h28'45"
- routing: 37'18"
- homepage: 13'46"
- list page: 1h25'7" (results) + (search) + tests
- filter: 1h55'14"
- optimisations: ~40'
- styling: ~25'
