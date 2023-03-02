import { pushEvent } from "../src/index"
import { describe, expect, test } from '@jest/globals';


describe('pushEvent', () => {
    test('it returns an error if no api token is provided', () => {
        let response = pushEvent('', {
            project: 'Test Project',
            name: 'Test Name',
            description: 'Test Description',
            push: false
        });

        console.log(response)


    })

    test('it returns an error when no data is provided', () => {

    })

    test('it returns an error when no name is provided in the data', () => {

    })

    test('it returns an error when no project is provided in the data', () => {

    })

    test('it returns an error when no description is provided', () => {

    })

    test('it returns an error when multiple keys are missing in the data object provided', () => {

    })

    test('it returns a 200 when the post is successful', () => {

    })

    test('it returns a 404 if the event is unauthenticated', () => {

    })
})
