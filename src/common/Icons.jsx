import PropTypes from "prop-types";
import {
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  Square3Stack3DIcon,
  ExclamationCircleIcon,
  QuestionMarkCircleIcon, // use in about
  HeartIcon,
  ViewfinderCircleIcon,
  EyeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon, //? could be used
  SparklesIcon, // ? could be used
  FolderPlusIcon,
  FolderMinusIcon,
  InboxArrowDownIcon,
  ArrowUpOnSquareIcon,
  Squares2X2Icon,
  ArrowUturnLeftIcon,
  BanknotesIcon,
  ClockIcon,
  HashtagIcon,
  ArrowUpRightIcon,
  CurrencyDollarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowLeftCircleIcon,
  EllipsisHorizontalCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

const icons = {
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  Square3Stack3DIcon,
  QuestionMarkCircleIcon,

  ViewfinderCircleIcon,

  EyeIcon,
  InformationCircleIcon,
  MagnifyingGlassIcon,
  CheckCircleIcon,
  SparklesIcon,
  FolderPlusIcon,
  FolderMinusIcon,
  InboxArrowDownIcon,
  ArrowUpOnSquareIcon,
  Squares2X2Icon,
  HeartIcon,

  ArrowUturnLeftIcon,
  BanknotesIcon,
  ClockIcon,

  HashtagIcon,
  ArrowUpRightIcon,

  CurrencyDollarIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowLeftCircleIcon,
  ExclamationCircleIcon,
  
  XCircleIcon,
  EllipsisHorizontalCircleIcon,
};

const Icon = ({ icon, ...props }) => {
  let IconComponent = icons[icon];
  return IconComponent ? <IconComponent {...props} /> : null;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;
