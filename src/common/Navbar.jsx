import React, { useEffect, useState } from "react";
import { useAuth } from "../services/AuthContext"; 
import '../index.css'
import { retrieveAllCategoriesFromSupabase } from "../utils/utils";

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

import { icons } from "./content";

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        let cachedCategories = localStorage.getItem('categories');
        if (cachedCategories) {
          setCategories(JSON.parse(cachedCategories));
        } else {
          const categories = await retrieveAllCategoriesFromSupabase();
          setCategories(categories);
          localStorage.setItem('categories', JSON.stringify(categories));
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false);
      }
    };
  
    fetchCategories();

    const cleanup = () => {
    };

    return cleanup;
  }, []);
  

  const handleCategoryClick = async (category) => {
    onCategoryClick(`/categories/${category}`);
  };

  const renderItems = [
    <a href="/categories" key="all">
      <MenuItem
        className="flex items-center gap-3 rounded-lg"
        onClick={() => handleCategoryClick("all")}
      >
        <div className="overflow-y-scroll">
          <Typography
            variant="small"
            color="blue-gray"
            className="flex items-center text-sm capitalize font-bold"
          >
            list all categories
          </Typography>
        </div>
      </MenuItem>
    </a>,
    ...categories.map((category, index) => (
      <a href={`/categories/${category}`} key={index}>
        <MenuItem
          className="flex items-center gap-3 rounded-lg"
          onClick={() => handleCategoryClick(category)}
        >
          <div className="overflow-y-scroll">
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center text-sm capitalize font-bold"
            >
              {category}
            </Typography>
          </div>
        </MenuItem>
      </a>
    )),
  ];
  
  return (
    <>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={false}
      >
        <MenuHandler>
          <Typography as="div" variant="small" color="blue-gray" className="font-normal">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >


              <icons.Square3Stack3DIcon className="h-[18px] w-[18px]"/>
                Categories

              <icons.ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <icons.ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-2xl rounded-md lg:block custom-menu-list bg-gray-500 bg-opacity-90">
          <ul className="grid grid-cols-4 gap-y-2">{renderItems}</ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden custom-menu-list">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </>
  );
}
 
function NavList({ user }) {
  const handleCategoryClick = (path) => {
    console.log("Navigating to:", path);
  };

  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <icons.QuestionMarkCircleIcon className="h-[18px] w-[18px]" />
          About Us
        </ListItem>
      </Typography>
      <NavListMenu onCategoryClick={handleCategoryClick} />
      <Typography
        as="a"
        href="/categories/Freebies"
        variant="small"
        color="blue-gray"
        className="font-normal"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4">
          <icons.SparklesIcon className="h-[18px] w-[18px]" />
          Freebies
        </ListItem>
      </Typography>
      {user && (
        <Typography
          as="a"
          href="#"
          variant="small"
          color="blue-gray"
          className="font-normal"
        >
          <ListItem className="flex items-center gap-2 py-2 pr-4">

            <icons.UserCircleIcon className="h-[18px] w-[18px]" />
            <a href="/account">
            Account
            </a>
          </ListItem>
        </Typography>
      )}
    </List>
  );
}

export default function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = React.useState(false);
  const { user, signOut } = useAuth();

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
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 flex flex-row items-center gap-1 font-oxanium font-extrabold"
        >

          yeAI
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33" />
          </svg>
        </Typography>
        <div className="hidden lg:block">
          <NavList user={user}/>
        </div>
        <div className="hidden gap-2 lg:flex-row lg:flex lg:justify-end lg:items-center  lg:w-1/5">
        
          {user ? (
            <Button variant="outlined" color="red" fullWidth size="sm" className="w-1/2" onClick={signOut}>
              Sign Out
            </Button>
          ) : (

              <a href="/sign-in">
              <Button variant="gradient" fullWidth size="sm">
              Sign in
              </Button>
              </a>

          )}
        </div>

        <IconButton
          variant="text"
          color="gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <icons.XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <icons.Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <NavList user={user} />


        {user ? (
            <Button variant="outlined" color="red" size="sm" onClick={signOut} className="w-1/2">
              Sign Out
            </Button>
          ) : (
          <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">

            <a href="/sign-in" className="w-full">
              <Button variant="gradient" fullWidth size="sm">
              Sign in
              </Button>
              </a>


          </div>
          )}

      </Collapse>
    </Navbar>
  );
}
