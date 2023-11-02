import PropTypes from 'prop-types';
import { ChevronDownIcon, UserCircleIcon, Bars3Icon, XMarkIcon, Square3Stack3DIcon, QuestionMarkCircleIcon, ChatBubbleOvalLeftIcon, ViewfinderCircleIcon, BookmarkIcon, BookmarkSlashIcon, EyeIcon, InformationCircleIcon, MagnifyingGlassIcon, CheckCircleIcon, SparklesIcon, FolderPlusIcon, FolderMinusIcon, InboxArrowDownIcon, ArrowUpOnSquareIcon, Squares2X2Icon, SwatchIcon, ArrowUturnLeftIcon, BanknotesIcon, ClockIcon } from "@heroicons/react/24/outline";

const icons = {
  ChevronDownIcon,
  UserCircleIcon,
  Bars3Icon,
  XMarkIcon,
  Square3Stack3DIcon,
  QuestionMarkCircleIcon,
  ChatBubbleOvalLeftIcon,
  ViewfinderCircleIcon,
  BookmarkIcon,
  BookmarkSlashIcon,
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
  SwatchIcon,
  ArrowUturnLeftIcon,
  BanknotesIcon,
  ClockIcon,
};

const Icon = ({ icon, ...props }) => {
  let IconComponent = icons[icon];
  return IconComponent ? <IconComponent {...props} /> : null;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};



export default Icon;