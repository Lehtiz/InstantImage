import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import { memo } from 'react';
import { DEFAULT_IMAGE_PATH } from '../../constants/paths';

// Show a skeleton whilst loading, and if no user defined
const User = ({ username, fullName }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link to={`/p/${username}`} className="grid grid-cols-4 gap-4 mb-6 items-center">
      <div className="flex items-center justify-between col-spaln-1">
        <img
          className="rounded-full w-16 flex mr-3"
          src={`/images/avatars/${username}.jpg`}
          alt={`${username} profile`}
          onError={(e) => {
            e.target.src = DEFAULT_IMAGE_PATH;
          }}
        />
      </div>
      <div className="col-span-3">
        <p className="font-bold text-sm">{username}</p>
        <p className="text-sm">{fullName}</p>
      </div>
    </Link>
  );

// memoize User to prevent rendering unnecessarily
export default memo(User);

// require props with types for functionality
User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string
};
