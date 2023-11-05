import PropTypes from 'prop-types';
import { ChevronDownIcon, UserCircleIcon, Bars3Icon, XMarkIcon, Square3Stack3DIcon, QuestionMarkCircleIcon, ChatBubbleOvalLeftIcon, ViewfinderCircleIcon, BookmarkIcon, BookmarkSlashIcon, EyeIcon, InformationCircleIcon, MagnifyingGlassIcon, CheckCircleIcon, SparklesIcon, FolderPlusIcon, FolderMinusIcon, InboxArrowDownIcon, ArrowUpOnSquareIcon, Squares2X2Icon, SwatchIcon, ArrowUturnLeftIcon, BanknotesIcon, ClockIcon, HashtagIcon } from "@heroicons/react/24/outline";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faSolidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as faRegularBookmark } from '@fortawesome/free-regular-svg-icons';

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
  faSolidBookmark,
  faRegularBookmark,
  HashtagIcon,
};

const Icon = ({ icon, ...props }) => {
  let IconComponent = icons[icon];
  if (IconComponent === faSolidBookmark || IconComponent === faRegularBookmark) {
    return <FontAwesomeIcon icon={IconComponent} {...props} />;
  }
  return IconComponent ? <IconComponent {...props} /> : null;
};

Icon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default Icon;