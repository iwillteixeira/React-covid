import { useLocation, useNavigate, NavLink } from 'react-router-dom';
import { HiOutlineChevronLeft } from 'react-icons/hi';
import { BsGearWide } from 'react-icons/bs';
import { useSelector } from 'react-redux';

const headerStyles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'var(--primary-bc-color)',
    width: '100%',
    padding: '0.5rem',
  },
  title: {
    fontFamily: 'var(--title-font)',
    fontWeight: '300',
  },
};

const titleHandler = (path, continent, country, region) => {
  // Implement route to this later >>

  if (path.includes('/region/')) {
    return `${region}/cases`;
  }

  if (path.includes('/country/')) {
    return `${country}/cases`;
  }

  if (path.includes('/continent/')) {
    return `${continent}/cases`;
  }

  return 'Home';
};

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { continent, country, region } = useSelector((state) => state.covidData);
  const title = titleHandler(location.pathname, continent, country, region);

  return (
    <nav style={headerStyles.container}>
      {
        (location.pathname === '/') ? (<span style={{ width: '16px' }} />) : (
          <NavLink
            to=""
            className="active"
          >
            {' '}
            <HiOutlineChevronLeft onClick={() => navigate(-1)} />
          </NavLink>
        )
      }
      <p style={headerStyles.title}>{title}</p>
      <BsGearWide />
    </nav>
  );
};

export default Header;
