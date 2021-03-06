import React, { ChangeEvent, useEffect, useState } from 'react';
import {
  Heading,
  FormControl,
  TextInput,
  Box,
  Grid,
  IconButton,
  Pagination
} from '@contentful/f36-components';
import { DialogExtensionSDK } from '@contentful/app-sdk';
import { useSDK } from '@contentful/react-apps-toolkit';
import { CloseIcon } from '@contentful/f36-icons';
import { PixabayApi } from '../services/Pixabay';
import ImageResource from '../models/ImageResource';
import useDebounce from '../hooks/useDebounce';
import LoadingItems from '../components/Loading';
import ItemResult from '../components/ItemResult';

const Pixabay = new PixabayApi();

const Dialog = () => {
  const sdk = useSDK<DialogExtensionSDK>();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [results, setResults] = useState<ImageResource[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedImg, setSelectedImg] = useState<ImageResource | null>(null);

  // Pagination
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState(0);

  const debounceSearch = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debounceSearch) {
      Pixabay.search(debounceSearch, page)
        .then(
          data => {
            setLoading(false);
            setResults(data.hits);
            setTotalPages(Math.round(data.totalHits / 21));
          }
        )
    } else {
      setLoading(false);
      setResults([]);
    }
  }, [debounceSearch, page]);

  useEffect(() => {
    if (selectedImg) {
      sdk.close(selectedImg);
    }
  }, [selectedImg, sdk]);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    setResults([]);
    setSearchTerm(e.target.value);
  }

  const closeDialog = () => {
    sdk.close();
  }

  return <>
    <IconButton
      variant="transparent"
      aria-label="Close Dialog"
      icon={<CloseIcon />}
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
      }}
      onClick={closeDialog}
    />
    <Box padding="spacingM">
      <Heading id="search-title">Search Pixabay</Heading>
      <FormControl style={{ marginBottom: 0, width: '100%' }}>
        <TextInput
          value={searchTerm}
          type="text"
          name="searchTerm"
          placeholder="Search Pixabay for photos"
          aria-labelledby="search-title"
          onChange={onChange}
        />
      </FormControl>
    </Box>

    {loading && <LoadingItems />}

    {(results.length === 0 && searchTerm !== '') && <Box padding="spacingM">No photos found for <em>{searchTerm}</em>.</Box>}

    <Grid
      columnGap="spacingM"
      rowGap="spacingM"
      padding="spacingM"
      columns="1fr 1fr 1fr"
    >
      {
        results.map(r =>
          <Grid.Item key={r.id}>
            <ItemResult
              image={r}
              setSelectedImg={setSelectedImg}
              selectedImg={selectedImg}
            />
          </Grid.Item>
        )
      }
    </Grid>
    {
      (results.length > 0 && !loading) &&
      <Box
        padding="spacingM">
        <Pagination
          activePage={page}
          onPageChange={setPage}
          itemsPerPage={21}
          isLastPage={(page + 1) >= totalPages}
        />
      </Box>
    }
  </>
};

export default Dialog;
