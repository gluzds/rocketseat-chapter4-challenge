import { Button, Box, Flex } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

type ImageData = {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

type GetImagesResponse = {
  after: string;
  data: ImageData[];
}

export default function Home(): JSX.Element {
  const getImages = async ({ pageParam = null }): Promise<GetImagesResponse> => {
    const { data } = await api.get('/images', {
      params: {
        after: pageParam,
      }
    })
    return data;
  }

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery(
    'images',
    getImages,
    {
      getNextPageParam: lastPage => lastPage?.after || null
    }
  );

  const formattedData = useMemo(() => {
    return data?.pages.map(page => page.data).flat();
  }, [data]);

  if (isLoading) {
    return (
      <Loading />
    )
  }
  if (isError) {
    return (
      <Error />
    )
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData}/>
        <Flex justify="center" pt="15px">
        {hasNextPage && (
          <Button type="button" onClick={() => fetchNextPage()}>
            {isFetchingNextPage ? 'Carregando...' : 'Carregar mais'}
          </Button>
        )}
        </Flex>
      </Box>
    </>
  );
}
