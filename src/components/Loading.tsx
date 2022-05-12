import { AssetCard, Grid } from '@contentful/f36-components';

const LoadingItems = () => <Grid
      columnGap="spacingM"
      rowGap="spacingM"
      padding="spacingM"
      columns="1fr 1fr 1fr"
    >
  {
    new Array(6).fill('').map((v, i) =>
      <Grid.Item key={i}>
        <AssetCard
          type="image"
          title="Loading..."
          ariaLabel="Loading..."
          isLoading
        />
      </Grid.Item>
    )
  }
</Grid>

export default LoadingItems;