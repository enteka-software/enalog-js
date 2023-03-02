import { pushEvent } from "../src/index"
import { describe, expect, test } from '@jest/globals';
import fetchMock from 'jest-fetch-mock'




describe('pushEvent', () => {
    fetchMock.enableMocks()
    beforeEach(() => {
        fetchMock.resetMocks()
    })
    test('it returns an error if no api token is provided', async () => {
        let response = await pushEvent('', {
            project: 'Test Project',
            name: 'Test Name',
            description: 'Test Description',
            push: false
        });


        // expect(response).toEqual({ Error: 'No api key provided.' })

    })

    test('it returns an error when no data is provided', async () => {
        let response = await pushEvent('', {
            project: '',
            name: '',
            description: '',
            push: false
        });


    })

    test('it returns an error when no name is provided in the data', () => {

    })

    test('it returns an error when no project is provided in the data', () => {

    })

    test('it returns an error when no description is provided', () => {

    })

    test('it returns an error when multiple keys are missing in the data object provided', () => {

    })

    test('it returns a 200 when the post is successful', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({
            "statusCode": 200,
            "body": "Event created successfully",
        }))

        let response = await pushEvent('12345', {
            project: 'Test Project',
            name: 'Test Name',
            description: 'Test Description',
            push: false
        });


        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(response).toEqual({ status: 200, message: 'Event succesfully sent to EnaLog' })

    })

    test('it returns a 404 if the event is unauthenticated', async () => {
        fetchMock.mockReject(() => Promise.reject({ status: 404, message: 'I fucking hate typescript' }))
        let response = await pushEvent('12345', {
            project: 'Test Project',
            name: 'Test Name',
            description: 'Test Description',
            push: false
        });

        expect(fetchMock).toHaveBeenCalledTimes(1)
        expect(response).toEqual({ status: 404, message: 'Error saving to Enalog' })

    })
})
