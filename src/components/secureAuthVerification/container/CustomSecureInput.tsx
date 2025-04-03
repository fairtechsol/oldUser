import { Form } from "react-bootstrap";

import { useMediaQuery, useTheme } from "@mui/material";
import "./style.scss";

interface SelectItem {
  value: string;
  name: string;
}

const CustomSecureInput = ({
  title,
  formInline,
  labelCol,
  inputCol,
  bgColor,
  errors,
  id,
  touched,
  inputClass,
  type,
  options,
  customStyle,
  inputIcon,
  isUnderlinedInput,
  ...prop
}: any) => {
  const theme = useTheme();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <Form.Group
        className={`${
          customStyle ?? ""
        } d-flex gap-1 position-relative inputMain`}
      >
        {title ? (
          <Form.Label className={`${matchesMobile && "title-12"} mb-0`}>
            {title}
          </Form.Label>
        ) : (
          ""
        )}
        {type === "select" ? (
          <Form.Select
            className={`${inputClass ?? ""} bg-${bgColor} ${
              isUnderlinedInput && "underline-textbox"
            }`}
            name={id}
            {...prop}
          >
            {options?.map((item: SelectItem) => (
              <option key={item?.value} value={item?.value}>
                {item?.name}
              </option>
            ))}
          </Form.Select>
        ) : (
          <Form.Control
            className={` ${inputClass ?? ""} bg-${bgColor} ${
              isUnderlinedInput && "underline-textbox"
            }`}
            name={id}
            type={type}
            {...prop}
          />
        )}
        {inputIcon && <div className="input-icon">{inputIcon}</div>}
      </Form.Group>
    </>
  );
};

export default CustomSecureInput;
