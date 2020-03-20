import React from 'react'
import renderer from 'react-test-renderer'
import ChampioshipInfo from '../components/ChampioshipInfo'
import { MockedProvider } from '@apollo/react-testing'

describe('The display of element', () => {
    it('Should not regress', () => {
        const tree = renderer.create(
            <MockedProvider mocks={[]} addTypename={false}>
                <ChampioshipInfo id={'670'} />
            </MockedProvider>
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })
})