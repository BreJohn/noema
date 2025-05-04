import styled from "styled-components";

export const PaymentContainer = styled.div`
  display: flex;
  & .amount {
    flex: 3;
  }
  & .currency {
    flex: 1;
  }
  @media (max-width: 500px) {
    flex-direction: column; /* Stack elements vertically on small screens */

    & .amount,
    & .currency {
      flex: 1 0 auto; /* Reset flex to default behavior */
      width: 100%; /* Full width */
      margin-bottom: 8px; /* Add spacing between stacked elements */
    }
  }
`;

export const Form = styled.div`
  display: flex;
  & .amount {
    flex: 3;
  }
  & .currency {
    flex: 1;
  }
`;
