import styled from "styled-components";

export const Container = styled.div`
  background: #e3e2e3;
  display: flex;
  font-family: "Rubik";
  min-height: 100vh;
  @media only screen and (max-width: 991px) {
    background: white;
  }
`;

export const SideBar = styled.div`
  height: 100vh;
  width: 300px;
  background: white;
  @media only screen and (max-width: 991px) {
    display: none;
  }
`;

export const List = styled.ul`
  list-style-type: none;
  padding: 0px;
  margin: 0px;
`;

export const TimeFilter = styled.p`
  color: tomato;
  font-size: 10px;
  padding: 5px 20px;
  font-weight: bold;
  i {
    padding-left: 5px;
  }
`;

export const ListItem = styled.li`
  padding: 15px 50px;
  border-left: ${props => (props.active ? "5px solid tomato" : null)};
  color: ${props => (props.active ? "black" : "#e2e3e2")};
  font-size: 14px;
  font-weight: bold;
  &:hover {
    background-color: #fafafa;
  }
  i {
    padding-right: 20px;
  }
`;

export const Header = styled.div`
  padding: 50px 50px 0px;
  display: flex;
  justify-content: space-between;
  @media only screen and (max-width: 991px) {
    padding: 50px 20px 0px;
  }
`;

export const PostContainer = styled.div`
  flex: 1;
  max-height: 100vh;
  overflow-y: auto;
`;

export const VoteCount = styled.div`
  display: flex;
  text-align: center;
  flex-direction: column;
  i {
    font-size: 20px;
    color: #9b9896;
  }
`;

export const Posts = styled.div`
  background: white;
  margin: 50px;
  box-shadow: 0 4px 20px rgba(0, 40, 143, 0.1);
  border-radius: 3px;
  overflow: hidden;
  @media only screen and (max-width: 991px) {
    margin: 50px 0px;
    box-shadow: none;
  }
`;

export const Post = styled.div`
  display: flex;
  padding: 20px 40px;
  justify-content: space-between;
  @media only screen and (max-width: 991px) {
    padding: 20px;
  }
  /* &:hover {
    background-color: #fafafa;
  } */
`;

export const PostContent = styled.div`
  display: flex;
  img {
    border-radius: 2px;
  }
  > div {
    margin: 0px 15px;
  }
`;

export const PostStuff = styled.div``;

export const Comments = styled.div`
  padding: 50px 40px;
  > div {
    width: 100%;
    display: flex;
    font-size: 14px;
    padding: 10px 0px;
    > div {
      width: 100%;
    }
  }
  @media only screen and (max-width: 991px) {
    padding-left: 20px;
  }
`;

export const AddPostContainer = styled.div`
  display: flex;
  margin: 20px;
  flex-direction: column;
  input {
    ::placeholder {
      color: #3c3a3a;
    }
    outline: none;
    border: none;
    font-size: 18px;
  }
  textarea {
    height: 100px;
    margin: 10px 0px;
    outline: none;
    font-size: 14px;
    border: none;
    color: grey;
  }
  select {
    outline: none;
  }
`;
export const Input = styled.input`
  border: none;
  outline: none;
  padding: 20px;
  font-size: ${props => (props.fontSize ? props.fontSize : 20)};
  max-width: 500px;
`;

export const Button = styled.button`
  width: 60px;
  outline: none;
  background: tomato;
  margin: 20px 0px;
  color: white;
  box-shadow: 0 4px 20px rgba(0, 40, 143, 0.1);
  border: none;
  height: 40px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  outline: none;
`;

export const Like = styled.div`
  text-align: right;
  i {
    color: tomato;
    font-size: 20px;
  }
`;

export const Count = styled.div`
  text-align: left;
  display: flex;
  font-size: 14px;
  i {
    padding: 5px;
  }
`;

export const LikeCount = styled.div`
  font-size: 14px;
`;

export const CommentsCount = styled.div``;

export const Select = styled.select`
  max-width: 100px;
`;

export const Description = styled.div`
  padding: 0px 40px;
  font-size: 12px;
  @media only screen and (max-width: 991px) {
    padding: 0px 20px;
  }
`;

export const FAB = styled.div`
  @media only screen and (max-width: 991px) {
    width: 60px;
    height: 60px;
    background: tomato;
    border-radius: 100%;
    position: absolute;
    bottom: 40px;
    right: 40px;
    z-index: 1;
    display: flex;
    font-size: 20px;
    justify-content: center;
    align-items: center;
    color: white;
    box-shadow: 2px 6px 12px -3px rgb(51, 51, 50);
  }
  display: none;
`;
