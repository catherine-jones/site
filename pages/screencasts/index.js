import { Grid } from 'components/Grid'
import Page, { page } from 'components/Page'
import Br from 'components/Br'
import ScreencastLink from 'components/ScreencastLink'

import screencasts from './_data'

const openGraphImage = require('../../assets/images/open-graph/screencasts.png')

export default page((props) => (
  <Page
    headTitle="Buildkite Screencasts"
    title="Screencasts"
    description={
      <React.Fragment>
        See how Buildkite works in production, <Br maxWidth="30em" />
        with this series of short videos.
      </React.Fragment>
    }
    headImage={openGraphImage}
    {...props}
  >
    <Grid>
      {screencasts.map((screencast) => (
        <ScreencastLink
          screencast={screencast}
          key={screencast.pathname}
        />
      ))}
    </Grid>
  </Page>
))