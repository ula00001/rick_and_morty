import { styled } from "@mui/material/styles";

const InfoWrap = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const CharWrapper = styled('div')`
  height: 318px;
  background-color: #232222;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, .25);
  // padding: 15px;
  cursor: pointer;
  transition: 0.3s transform;
  &:hover {
    box-shadow: 0 5px 20px #9F0013;
    // transform: translateY(-8px);
  }
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  &_selected {
    box-shadow: 0 5px 20px #9F0013;
    transform: translateY(-8px);
  }
`;

const CharName = styled('div')`
  margin-top: 30px;
  font-weight: bold;
  font-size: 22px;
  line-height: 29px;
  text-transform: uppercase;
  color: #fff;
`

export default function Char({ value }) {

  return (
    <CharWrapper>
      <InfoWrap>
        <img src={value.image} alt={value.name} />
        <CharName className="char__name">{value.name}</CharName>
      </InfoWrap>
    </CharWrapper>
  )
}