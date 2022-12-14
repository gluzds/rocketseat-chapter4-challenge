import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState('');

  function handleOpenModal(url: string){
    setSelectedImage(url);
    onOpen();
  }

  return (
    <>
      <SimpleGrid columns={3} spacing='40px'>
        {cards.map(card => <Card key={card.id} data={card} viewImage={handleOpenModal} />)}
      </SimpleGrid>

      <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={selectedImage}/>
    </>
  );
}
