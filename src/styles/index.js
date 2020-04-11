import styled, {keyframes} from 'styled-components';


export const Row = styled.div`
    padding: 20px;
    display: flex;
    justify-content: space-between;
`;

export const Avatar = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
`


export const Thumbnail = styled.img`
    width: 100%;
    height: 400px;
    object-fit: contain;
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
`;

const Card = styled.div`
    box-shadow: 0 2px 4px 0 rgba(36, 127, 167, 0.73);
    margin: 20px;
    display: flex;
    flex-direction: column; 
    max-width: 650px;
`;

export const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`;

export const InnerContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

export const Text = styled.span`
    font-size: 16px;
    font-weight: bold;
`;

export const Input = styled.input`
    margin: 5px 0px;
    padding: 10px;
    outline: none;
    border: 1px solid #f1f1f1;
    border-radius: 2px;
`;

export const Select = styled.select`
    margin: 5px 0px;
    height: 40px;
    background: none;
    outline: none;
    border: 1px solid #f1f1f1;
`;

export const Button = styled.button`
    border: none;
    color: white;
    outline: none;
    height: 40px;
    padding: 0px 20px;
    border-radius: 2px;
    background: rgba(36,127,167,0.73);
    font-size: 12px;
`

const spin = keyframes`
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
`;

export const MyLoader = styled.div`
    border: 4px solid #f3f3f3;
    border-radius: 50%;
    border-top: 4px solid rgba(36,127,167,0.73);
    width: 40px;
    height: 40px;
    -webkit-animation: ${spin} 2s linear infinite; /* Safari */
    animation: ${spin} 2s linear infinite;
`;


export default Card;