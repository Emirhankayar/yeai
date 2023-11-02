import PropTypes from 'prop-types';
import { Card, CardBody, CardFooter, Button, Tooltip, Typography, Input, IconButton, Checkbox } from "@material-tailwind/react";

const components = {
  Card,
  CardBody,
  CardFooter,
  Button,
  Tooltip,
  Typography,
  Input,
  IconButton,
  Checkbox,
};

const MaterialComponent = ({ component, ...props }) => {
  let Component = components[component];
  return Component ? <Component {...props} /> : null;
};

MaterialComponent.propTypes = {
  component: PropTypes.string.isRequired,
};

export default MaterialComponent;