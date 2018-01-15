import styled from 'styled-components'

import Link from 'components/Link'
import Page, { page } from 'components/Page'
import { MediaItem, ImageCell as RawImageCell, TextCell } from 'components/MediaItem'

import caseStudies from './_data'

const ImageCell = RawImageCell.extend`
  flex-grow: 0;
`

const ResultsCell = ImageCell.extend`
  display: flex;
  flex-direction: column;
  text-align: initial;
  padding: ${({ theme }) => theme.innerSpacing.s1} 0;
  margin: -${({ theme }) => theme.innerSpacing.s1};
`

const ResultItem = styled.div`
  background-color: ${({ theme }) => theme.colors.backgrounds.grey};
  padding: ${({ theme }) => theme.innerSpacing.s1};
  margin: ${({ theme }) => theme.innerSpacing.s1};
`

const Logo = styled.img`
  width: 300px;
  max-width: 100%;
`

const Image = styled.img`
  max-width: 100%;
`

export default function caseStudyPage(pathname) {
  const caseStudy = caseStudies.find((caseStudy) => caseStudy.pathname == pathname);

  return page(({ loggedIn }) => (
    <Page
      title="Case Studies"
      headTitle={caseStudy.headTitle}
      loggedIn={loggedIn}
    >
      <p>Case Study</p>

      <MediaItem>
        <TextCell>
          <h1>
            <Link href={caseStudy.link.url}>
              <a>{caseStudy.team}</a>
            </Link>
          </h1>
          <p>{caseStudy.industry} - {caseStudy.teamSize}</p>
        </TextCell>

        <ImageCell>
          <Logo
            src={caseStudy.logoImage}
            alt={`${caseStudy.team} logo`}
          />
        </ImageCell>
      </MediaItem>

      <MediaItem>
        <TextCell>
          {caseStudy.words}
        </TextCell>

        <ResultsCell>
          {caseStudy.results.map((result, index) => (
            <ResultItem key={index}>
              {result.number}{result.unit}<br/>
              {result.label}
            </ResultItem>
          ))}
        </ResultsCell>
      </MediaItem>

      <hr/>

      <blockquote>
        <p>{caseStudy.testimonial.testimonial}</p>
        <footer>
          <cite>
            <img src={caseStudy.testimonial.headshotImage} alt={caseStudy.testimonial.name}/>
            <p>
              {caseStudy.testimonial.name}
              <br/>
              {caseStudy.testimonial.title}
            </p>
          </cite>
        </footer>
      </blockquote>

      <hr/>

      <Image src={caseStudy.photoOne.image} alt={caseStudy.photoOne.alt} />
      <Image src={caseStudy.photoTwo.image} alt={caseStudy.photoTwo.alt} />
    </Page>
  ))
}