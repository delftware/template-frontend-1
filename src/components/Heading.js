import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';
import { dark } from '../utils/colors';
import { headingPaddingTop, headingPaddingBottom } from '../utils/sizes';

const Container= styled.div`
    padding-top: ${headingPaddingTop};
    padding-bottom: ${headingPaddingBottom};
`

const HeadingText = styled.div`
    ${breakpoint('mobile') `
        font-size: ${props =>
            props.mobileFontSize ? `${props.mobileFontSize}px` : '40px'
        }
    `}
    ${breakpoint('tablet') `
        font-size: ${props =>
            props.tabletFontSize ? `${props.tabletFontSize}px` : '60px'
        }

    `}
    ${breakpoint('desktop') `
        font-size: ${props =>
            props.desktopFontSize ? `${props.desktopFontSize}px` : '80px'
        }
    `}
    font-weight: bold;
    color: ${props =>
        props.isOdd ? 'white' : `${dark}`
    }

    ${props => props.ellipsis && css`
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `}
`

export default class Heading extends Component {
    static defaultProps = {
        desktopFontSize: 50, 
        tabletFontSize: 40,
        mobileFontSize: 38,
        ellipsis: false
    }

    render() {
        const { isOdd, children, desktopFontSize, tabletFontSize, mobileFontSize, withPadding, ellipsis } = this.props;
        
        return (
            <Container>
                <HeadingText 
                    withPadding={withPadding} 
                    isOdd={isOdd} 
                    desktopFontSize={desktopFontSize} 
                    tabletFontSize={tabletFontSize} 
                    mobileFontSize={mobileFontSize}
                    ellipsis={ellipsis}
                >
                    {children}
                </HeadingText>
            </Container>
        )
    }
}
