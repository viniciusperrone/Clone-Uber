import React from 'react';

import { Container, TypeTitle, TypeDescription, TypeImage, RequestButton, RequestButtonText } from './style';

import uberx from '../../assets/uberx.png';

const Details: React.FC = () => {
  return (
      <Container>
          <TypeTitle>Popular</TypeTitle>
          <TypeDescription>Viagens baratas</TypeDescription>

          <TypeImage source={uberx}/>
          <TypeTitle>UberX</TypeTitle>
          <TypeDescription>R$12,00</TypeDescription>

          <RequestButton onPress={() => {}}>
              <RequestButtonText>SOLICITAR UBER</RequestButtonText>
          </RequestButton>

      </Container>
  );
}

export default Details;