import { Button } from "react-bootstrap";

function CustomSecureButton(props: any) {
  return <Button {...props}> {props?.children} </Button>;
}

export default CustomSecureButton;
