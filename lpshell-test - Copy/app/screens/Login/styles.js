import styled from 'styled-components/native'

const Container = styled.View`
  flex: 1;
  alignItems: center;
  justifyContent: center;
  margin: auto;
`;
const View = styled.View`

backgroundColor: rgba(100, 170, 51, .1);
width:50%;
height:50%;
`;
const Logo = styled.Image`
  height: 30%;
  marginBottom: 40px;
`;

const Input = styled.TextInput`
  paddingHorizontal: 5px;
  paddingVertical: 2px;
  borderRadius: 5px;
  backgroundColor: #FFF;
  alignSelf: stretch;
  marginBottom: 15px;
  marginHorizontal: 20px;
  fontSize: 10px;
`;

const ErrorMessage = styled.Text`
  textAlign: center;
  color: #fff;
  fontSize: 14px;
  marginBottom: 15px;
  marginHorizo
`;

const Button = styled.TouchableHighlight`
  padding: 5px;
  borderRadius: 5px;
  backgroundColor: #E4A83B;
  alignSelf: stretch;
  margin: 15px;
  marginHorizontal: 20px;
`;

const ButtonText = styled.Text`
  color: #FFF;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

const SignUpLink = styled.TouchableHighlight`
  padding: 10px;
  marginTop: 20px;
`;

const SignUpLinkText = styled.Text`
  color: #999;
  fontWeight: bold;
  fontSize: 16px;
  textAlign: center;
`;

export { Container, Logo, Input, ErrorMessage, Button, ButtonText, SignUpLink, SignUpLinkText};
