import React from 'react'
import renderer from 'react-test-renderer'
import TeamDetails from '../components/TeamDetails'
import { MockedProvider } from '@apollo/react-testing'

describe('The display of element', () => {
    it('Should not regress', () => {
        const handleFn = jest.fn()
        const tree = renderer.create(
            <MockedProvider mocks={[]} addTypename={false}>
                <TeamDetails match={[{}]} teamData={{}} displayDetails={true} handle={handleFn} />
            </MockedProvider>
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })
})