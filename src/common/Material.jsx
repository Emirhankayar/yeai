import PropTypes from 'prop-types';
import { Card, 
  CardHeader, 
  CardBody, 
  CardFooter,
  Button, 
  Tooltip, 
  Typography, 
  Input, 
  IconButton, 
  Checkbox, 
  Radio, 
  Select, 
  Option, 
  Dialog, 
  Textarea, 
  Navbar, 
  Collapse,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,  } from "@material-tailwind/react";

const components = {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Tooltip,
  Typography,
  Input,
  IconButton,
  Checkbox,
  Radio,
  Select, 
  Option,
  Dialog,
  Textarea,
  Navbar, 
  Collapse,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem, 
};

const MaterialComponent = ({ component, ...props }) => {
  let Component = components[component];
  return Component ? <Component {...props} /> : null;
};

MaterialComponent.propTypes = {
  component: PropTypes.string.isRequired,
};

export default MaterialComponent;