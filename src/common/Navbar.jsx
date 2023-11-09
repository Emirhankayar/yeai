import React, { useContext } from "react";
import { useAuth } from "../services/AuthContext"; 
import '../index.css'
import PropTypes from 'prop-types';
import Icon from "./Icons";
import { CategoryContext } from "../services/CategoryContext";
import SignInFormPage from "../components/SignInCp";

import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import MaterialComponent from "./Material";

function NavListMenu() {
  const categories = useContext(CategoryContext); // access the categories
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const handleCategoryClick = (category) => {
    // Navigate to the category page and force a page refresh
    window.location.href = `/categories?category=${category}`;
  };

  NavListMenu.propTypes = {
    onCategoryClick: PropTypes.func.isRequired,
  };
  NavList.propTypes = {
    user: PropTypes.object,
    closeNav: PropTypes.func.isRequired,
  };
  const renderItems = categories.map((category, index) => {
  
    return (
      <MenuItem
        role="menuitem"
        key={index}
        className="flex items-center gap-3 rounded-lg"
        onClick={() => handleCategoryClick(category.original)}
      >
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="flex items-center text-sm capitalize font-semibold"
          >
            <Icon icon="Squares2X2Icon" className="w-5 h-5 mr-2" />
            {category.modifiedName}
          </Typography>
        </div>
      </MenuItem>
    );
  });
  
  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" color="blue-gray" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              aria-expanded={isMenuOpen || isMobileMenuOpen}
              aria-haspopup="menu"
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >


              <a href="/categories" className="flex gap-1 items-center">
              <Icon icon="Square3Stack3DIcon" className="h-[18px] w-[18px]" aria-label="open all categories page"/>

                Categories
              </a>
              <Icon icon="ChevronDownIcon"
                strokeWidth={2.5}
                aria-label="open all categories menu"
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <Icon icon="ChevronDownIcon"
                strokeWidth={2.5}
                aria-label="close all categories menu"
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden w-full rounded-md lg:block custom-menu-list bg-gray-500 p-0 bg-opacity-80">
          <ul className="grid grid-cols-4 gap-y-2 border-none">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden custom-menu-list">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}
 
function NavList({ closeNav }) {
  const handleCategoryClick = (path) => {path};

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:items-center lg:justify-center">
      <Typography
        as="a"
        href="/about"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 hidden">
          <Icon icon="QuestionMarkCircleIcon" className="h-[18px] w-[18px]" />
          About
        </ListItem>
      </Typography>
      <NavListMenu onCategoryClick={handleCategoryClick} />
        <Typography
          as="a"
          href="/account"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">

            <Icon icon="UserCircleIcon" className="h-[18px] w-[18px]" />
            Account
          </ListItem>
        </Typography>
        <Typography
          as="a"
          href="/promote"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">

            <Icon icon="InformationCircleIcon" className="h-[18px] w-[18px]" />
            Promote
          </ListItem>
        </Typography>
        
          <ListItem className="flex items-center gap-2 py-2 hidden" onClick={() => closeNav()}>
            <Icon icon="ChatBubbleOvalLeftIcon" color="purple" className="h-[18px] w-[18px]" />
            
          </ListItem>
    </List>
  );
}

export default function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  const { user, signOut } = useAuth();
  const closeNav = () => {
    if (openNav) {
      setOpenNav(false);
    }
  };

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  return (
  <Navbar color="gray" className="mx-auto max-w-full rounded-none px-4 py-2 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Typography
          as="a"
          href="/"
          variant="h5"
          aria-label="home page"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 flex flex-row items-center gap-1 font-oxanium font-extrabold"
        >

          yeai
          <span className="bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-900 inline-block text-transparent bg-clip-text hover:animate-shift">
            .tech
            </span>

        </Typography>
        <div className="hidden lg:block">
          <NavList user={user} closeNav={closeNav}/>
        </div>
        <div className="hidden gap-2 lg:flex-row lg:flex lg:justify-end lg:items-center  lg:w-1/5">
  {user ? (
    <Button color="red" aria-label="sign out" onClick={signOut}>
      Sign Out
    </Button>
  ) : (
    <>
      <Button variant="gradient" aria-label="sign in" size="sm" onClick={handleOpen}>
        Sign in
      </Button>
      <MaterialComponent
        component="Dialog"
        size="xs"
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none"
      >
        <SignInFormPage/>
      </MaterialComponent>
    </>
      )}
    </div>

        <IconButton
          role="button"
          name="hamburgermenubutton"
          variant="text"
          value={openNav}
          color="gray"
          className="lg:hidden"
          aria-label="open nav"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <Icon icon="XMarkIcon" className="h-6 w-6" strokeWidth={2} aria-label="close menu"/>
          ) : (
            <Icon icon="Bars3Icon" className="h-6 w-6" strokeWidth={2} aria-label="open menu"/>
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList user={user}
        closeNav={closeNav} />


        {user ? (
            <Button color="red" fullWidth aria-label="sign out" onClick={signOut}>
              Sign Out
            </Button>
          ) : (
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">


              <Button variant="gradient" fullWidth size="sm" aria-label="sign in" onClick={() => {
  handleOpen();
  setOpenNav(prevState => !prevState);
}}>
              Sign in
              </Button>



          </div>
          )}

      </Collapse>
    </Navbar>
  );
}
