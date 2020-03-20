import React from 'react'
import renderer from 'react-test-renderer'
import { ChampioshipList } from '../components/ChampioshipList'
import { MockedProvider } from '@apollo/react-testing'

describe('The display of element', () => {
    it('Should not regress', () => {
        const tree = renderer.create(
            <MockedProvider mocks={[]} addTypename={false}>
                <ChampioshipList idLeague='673' myTeam={{ 'id': '1012' }} />
            </MockedProvider>
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })
})