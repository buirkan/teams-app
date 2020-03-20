import React from 'react'
import renderer from 'react-test-renderer'
import StadiumInfo from '../components/StadiumInfo'
import { MockedProvider } from '@apollo/react-testing'

describe('The display of element', () => {
    it('Should not regress', () => {
        const tree = renderer.create(
            <MockedProvider mocks={[]} addTypename={false}>
                <StadiumInfo idEstadio={'1'} />
            </MockedProvider>
        )
        expect(tree.toJSON()).toMatchSnapshot()
    })
})